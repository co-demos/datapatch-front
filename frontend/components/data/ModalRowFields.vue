<template>

  <v-container fluid pb-0>

    <!-- <pre>{{ itemModel }}</pre> -->
    <!-- <pre>{{ localItem }}</pre> -->

    <v-row
      v-for="(model, index) in itemModel"
      :key="`rowModel-${index}`"
      dense
      class="align-center mb-2"
      >

      <v-col cols="3" class="text-right pr-3">
        <span>
          {{ model.title }} :
        </span>
      </v-col>
    
      <v-col cols="6">

        <!-- <pre>{{ model }}</pre> -->

        <v-text-field
          v-if="model.type === 'str'"
          filled
          hide-details="auto"
          clearable
          v-model="localItem[model.field]"
          dense
          @input="updateItemDebounced()"
        />

        <v-textarea
          v-else-if="model.type === 'longStr'"
          filled
          rows="3"
          hide-details="auto"
          v-model="localItem[model.field]"
          dense
          @input="updateItemDebounced()"
        />

        <v-textarea
          v-else-if="model.type === 'json'"
          filled
          rows="3"
          hide-details="auto"
          v-model="localItem[model.field]"
          dense
          @input="updateItemDebounced()"
        />

        <v-text-field
          v-else
          filled
          hide-details="auto"
          clearable
          v-model="localItem[model.field]"
          dense
          @input="updateItemDebounced()"
        />

      </v-col>

      <v-col cols="3" class="text-left">
        <v-btn
          small
          plain
          color="grey darken-2"
          class="px-0"
          >
          <v-icon
            x-small
            >
            {{ fieldIcon(model.type) }}
          </v-icon>
        </v-btn>
        <span  class="text-caption">
          {{ $t(fieldText(model.type)) }}
        </span>
      </v-col>

    </v-row>
  </v-container>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  import { FindFieldIcon, FindFieldText } from '@/utils/utilsFields'

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
      fieldIcon (type) {
        return FindFieldIcon(type)
      },
      fieldText(type) {
        return FindFieldText(type)
      },
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
          }
        }
      },
    }
  }
</script>
