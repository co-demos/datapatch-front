<template>

  <v-container fluid pb-0>
    <!-- <pre>{{ itemModel }}</pre> -->
    <v-row
      v-for="model in itemModel"
      :key="model.name"
      v-if="model.inModal"
      dense
      class="align-top"
      >

      <!-- <pre>{{ model }}</pre> -->

      <v-col cols="4">
        <v-subheader class="text-right">
          {{ $t(model.label) }} :
        </v-subheader>

        <!-- DEBUGGING -->
        <!-- <pre>
          {{ model.field === 'select' ? model.options : '' }}
        </pre> -->
        <!-- <pre>
          {{ model.field === 'select' ? model.options.items : '' }}
        </pre> -->
      </v-col>
    
      <v-col cols="8">
        <v-text-field
          filled
          hide-details="auto"
          :disabled="model.readonly"
          :clearable="model.clearable"
          v-if="model.field === 'text'"
          v-model="localItem[model.name]"
          dense
          @input="updateItemDebounced()"
        />

        <v-textarea
          filled
          rows="3"
          class="mb-2"
          hide-details="auto"
          :disabled="model.readonly"
          :clearable="model.clearable"
          v-if="model.field === 'textarea'"
          v-model="localItem[model.name]"
          dense
          @input="updateItemDebounced()"
        />
        <v-select
          filled
          hide-details="auto"
          :disabled="model.readonly"
          :clearable="model.clearable"
          v-if="model.field === 'select'"
          v-model="localItem[model.name]"
          :items="model.options.items"
          :item-text="model.options.text"
          :item-value="model.options.value"
          dense
          @change="updateItemDebounced()"
          >
          <!-- custom items list -->
          <template 
            v-if="model.options.custom"
            v-slot:item="{ item: selectItem }"
            >
            <v-icon v-if="model.options.prependIcon" small class="mr-3">
              {{ model.options.valueIsIcon ? selectItem : selectItem.icon }}
              <!-- {{ selectItem }} -->
            </v-icon>

            <v-icon v-if="model.options.prependColor" small class="mr-3" :color="selectItem">
              icon-square1
            </v-icon>

            <span v-if="model.options.translate">
              {{ $t(selectItem[model.options.text]) }}
              <!-- {{ selectItem }} - {{ model }} -->
            </span>
            <span v-if="!model.options.translate">
              {{ selectItem }}
            </span>

          </template>

          <!-- custom selected item -->
          <template 
            v-if="model.options.custom"
            v-slot:selection="{ item: selectedItem }"
            >
            <v-icon v-if="model.options.prependIcon" small class="mr-3">
              {{ model.options.valueIsIcon ? selectedItem : selectedItem.icon }}
              <!-- {{ selectedItem }} -->
            </v-icon>

            <v-icon v-if="model.options.prependColor" small class="mr-3" :color="selectedItem">
              icon-square1
            </v-icon>

            <span v-if="model.options.translate">
              {{ $t(selectedItem[model.options.text]) }}
            </span>
            <span v-if="!model.options.translate">
              {{ selectedItem }}
            </span>

          </template>

        </v-select>
      </v-col>

    </v-row>
  </v-container>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'ModalFields',
    props: [
      'item',
      'itemModel',
      'itemType',
      'apiUrl',
      'action',
      'updateCurrentDataset',
      'onlyLocalUpdate',
    ],
    data () {
      return {
        localItem: undefined,
        dialog: false,
        tab: null,
      }
    },
    watch: {
      item (next) {
        this.localItem = this.item
      }
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
      }),
      ...mapGetters({
        getUserWorkspaceById: 'workspaces/getUserItemById',
        headerUser: 'user/headerUser'
      })
    },
    beforeMount () {
      // this.log && console.log('C-ModalFields > beforeMount > this.apiUrl :' , this.apiUrl)
      // this.log && console.log('C-ModalFields > beforeMount > this.item :' , this.item)
      this.localItem = this.item
      // this.log && console.log('C-ModalFields > beforeMount > this.localItem :' , this.localItem)
    },
    methods: {
      updateItemDebounced() {
        // cancel pending call
        clearTimeout(this._timerId)

        // delay new call 500ms
        this._timerId = setTimeout(() => {
          this.updateItem()
        }, 500)
      },
      updateItem() {
        if (this.action === 'update'){

          // this.log && console.log('C-ModalFields > updateItem > this.apiUrl :' , this.apiUrl)
          let itemPayload = this.localItem
          // this.log && console.log('C-ModalFields > updateItem > itemPayload :' , itemPayload)
          // this.log && console.log('C-ModalFields > updateItem > this.itemModel :' , this.itemModel)

          // don't forget ux if update workspace
          if (this.itemType === 'workspaces') {
            let currentWs = this.getUserWorkspaceById(this.item.id)
            itemPayload.datasets = currentWs.datasets
          }

          if (!this.onlyLocalUpdate) {
            this.$axios
              .put(`${this.apiUrl}/${this.item.id}`, itemPayload, this.headerUser)
              .then(resp => {
                // this.log && console.log('C-ModalFields > updateItem > resp.data : ', resp.data)
                this.$store.dispatch(`${this.itemType}/updateUserItem`, resp.data)
  
                if (this.updateCurrentDataset) {
                  this.$store.dispatch(`${this.itemType}/setCurrentItem`, resp.data)
                }
              })
          } else {
            this.log && console.log('C-ModalFields > updateItem > onlyLocalUpdate > itemPayload :' , itemPayload)
          }

        }
      },
    }
  }
</script>
