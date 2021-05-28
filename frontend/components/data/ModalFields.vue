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

      <!-- DEBUGGING -->
      <code v-if="false && model.field === 'combobox'">
        <!-- <pre>{{ localItem[model.name] }}</pre> -->
        <pre>{{ localItem }}</pre>
        <!-- <pre>{{ model }}</pre> -->
      </code>

      <v-col cols="4" class="">

        <v-subheader class="">
          {{ $t(model.label) }}
          <v-tooltip
            v-if="model.tooltip"
            right
            >
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="mx-2"
                color="grey"
                dark
                x-small
                v-bind="attrs"
                v-on="on"
                >
                icon-info
              </v-icon>
            </template>
            <span>
              {{ $t(model.tooltip) }}
            </span>
          </v-tooltip>
          :
        </v-subheader>

        <!-- DEBUGGING -->
        <p class="text-caption" v-if="false">
          <!-- <pre>
            {{ model.field === 'select' ? model.options : '' }}
          </pre> -->
          <!-- <pre>
            {{ model.field === 'select' ? model.options.items : '' }}
          </pre> -->

          <!-- <code v-if="model.field === 'combobox'">
            <pre>
              {{ model.field === 'combobox' ? model.options : '' }}
            </pre>
          </code> -->

          <!-- <code v-if="model.field === 'checkbox'">
            - {{ findPreprendIcon(localItem[model.name], model) }}<br><br>
            - {{ localItem }}<br><br>
            - {{ model }}
          </code> -->
        </p>

      </v-col>
    
      <v-col cols="8">

        <v-checkbox
          v-if="model.field === 'checkbox'"
          hide-details="auto"
          :disabled="model.readonly"
          :clearable="model.clearable"
          :label="findText(localItem[model.name], model)"
          :off-icon="findPreprendIcon(false, model)"
          :on-icon="findPreprendIcon(true, model)"
          v-model="localItem[model.name]"
          dense
          @input="updateItemDebounced()"
        />

        <v-text-field
          v-if="model.field === 'text'"
          filled
          hide-details="auto"
          :disabled="model.readonly"
          :clearable="model.clearable"
          v-model="localItem[model.name]"
          dense
          @input="updateItemDebounced()"
        />

        <v-text-field
          v-if="model.field === 'integer'"
          filled
          hide-details="auto"
          type="number"
          :disabled="model.readonly"
          :clearable="model.clearable"
          v-model="localItem[model.name]"
          dense
          @input="updateItemDebounced()"
        />

        <v-textarea
          v-if="model.field === 'textarea'"
          filled
          rows="3"
          class="mb-2"
          hide-details="auto"
          :disabled="model.readonly"
          :clearable="model.clearable"
          v-model="localItem[model.name]"
          dense
          @input="updateItemDebounced()"
        />

        <v-combobox
          v-if="model.field === 'combobox'"
          filled
          multiple
          class="mb-2"
          hide-details="auto"
          :hint="$t(model.hint)"
          persistent-hint
          chips
          :disabled="model.readonly"
          :clearable="model.clearable"
          v-model="localItem[model.name]"
          :items="localItem[model.name] || comboboxItems"
          dense
          hide-selected
          @change="splitAndUpdate(model)"
          >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :color="model.chipColor || localItem.color || 'black'"
              :input-value="data.selected"
              class="mr-1 my-1"
              label
              small
              >
              <span v-if="model.showField" class="pr-2 white--text">
                {{ data.item[model.showField] }}
              </span>
              <span v-else class="pr-2 white--text">
                {{ data.item }}
              </span>
              <v-icon
                x-small
                color="white"
                @click="data.parent.selectItem(data.item)"
                >
                icon-clear
              </v-icon>
            </v-chip>
          </template>
        </v-combobox>

        <v-select
          v-if="model.field === 'select'"
          filled
          hide-details="auto"
          :disabled="model.readonly"
          :clearable="model.clearable"
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

            <v-tooltip
              v-if="model.options.tooltip"
              top
              >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="mx-2"
                  color="grey"
                  dark
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  >
                  icon-info
                </v-icon>
              </template>
              <span>
                {{ $t(selectItem[model.options.tooltip]) }}
              </span>
            </v-tooltip>

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

            <v-tooltip
              v-if="model.options.tooltip"
              top
              >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  class="mx-2"
                  color="grey"
                  dark
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  >
                  icon-info
                </v-icon>
              </template>
              <span>
                {{ $t(selectedItem[model.options.tooltip]) }}
              </span>
            </v-tooltip>

          </template>

        </v-select>
      </v-col>

    </v-row>
  </v-container>

</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

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
      'needUpdateStore'
    ],
    data () {
      return {
        localItem: undefined,
        dialog: false,
        tab: null,
        comboboxItems: []
      }
    },
    watch: {
      item (next) {
        this.localItem = this.item
        // this.localItem = this.itemType === 'fields' ? { ...this.item } : this.item
      }
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
      }),
      ...mapGetters({
        getUserWorkspaceById: 'workspaces/getUserItemById',
        headerUser: 'user/headerUser',
      })
    },
    beforeMount () {
      // this.log && console.log('C-ModalFields > beforeMount > this.apiUrl :' , this.apiUrl)
      // this.log && console.log('C-ModalFields > beforeMount > this.item :' , this.item)
      this.localItem = this.item
      // this.localItem = this.itemType === 'fields' ? { ...this.item } : this.item
      // this.log && console.log('C-ModalFields > beforeMount > this.localItem :' , this.localItem)
    },
    methods: {
      ...mapActions({
        updateTable: 'tables/updateTable',
        updateColumnInCurrentTableFields: 'tables/updateColumnInCurrentTableFields',
      }),
      findText(value, model) {
        // this.log && console.log('\nC-ModalFields > findText > value :' , value)
        // this.log && console.log('C-ModalFields > findText > model :' , model)
        let valueStr = Boolean(value)
        let needTranslation = model.options.translate
        let item = model.options.items.find( i => i.value === valueStr.toString() )
        return needTranslation ? this.$t(item.text) : item.text
      },
      findPreprendIcon(value, model) {
        let valueStr = Boolean(value)
        let needPrependIcon = model.options.prependIcon
        if (needPrependIcon) {
          let item = model.options.items.find( i => i.value === valueStr.toString())
          return item.icon
        }
      },
      splitAndUpdate(model) {
        let splitted = this.localItem[model.name].join(',').replace(/ /g, ',')
        // this.log && console.log('C-ModalFields > splitAndUpdate > splitted 1 :' , splitted)
        splitted = splitted.split(',').filter(el => el !== '')
        // this.log && console.log('C-ModalFields > splitAndUpdate > splitted 2 :' , splitted)
        this.localItem[model.name] = [...new Set(splitted)]
        // this.log && console.log('C-ModalFields > splitAndUpdate > this.localItem[model.name] :' , this.localItem[model.name])
        this.updateItemDebounced()
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
        if ( this.action === 'update' ){
          this.log && console.log('\nC-ModalFields > updateItem > this.itemType :' , this.itemType)
          // this.log && console.log('C-ModalFields > updateItem > this.item :' , this.item)
          // this.log && console.log('C-ModalFields > updateItem > this.apiUrl :' , this.apiUrl)
          // this.log && console.log('C-ModalFields > updateItem > this.needUpdateStore :' , this.needUpdateStore)
          // this.log && console.log('C-ModalFields > updateItem > this.onlyLocalUpdate :' , this.onlyLocalUpdate)
          // this.log && console.log('C-ModalFields > updateItem > this.updateCurrentDataset :' , this.updateCurrentDataset)
          // this.log && console.log('C-ModalFields > updateItem > this.itemModel :' , this.itemModel)
          
          let itemPayload = this.localItem
          this.log && console.log('C-ModalFields > updateItem > itemPayload :' , itemPayload)

          // don't forget ux if update workspace
          if (this.itemType === 'workspaces') {
            let currentWs = this.getUserWorkspaceById(this.item.id)
            itemPayload.datasets = currentWs.datasets
          }

          if ( this.needUpdateStore ) {
            this.log && console.log('C-ModalFields > updateItem > needUpdateStore > itemPayload :' , itemPayload)
            switch (itemPayload.item_type) {
              case 'table' :
                this.updateTable(itemPayload)
                break
              case 'field' :
                this.updateColumnInCurrentTableFields(itemPayload)
                break
            }
          }

          if ( !this.onlyLocalUpdate ) {
            this.$store.commit(`${this.itemType}/setItemLoading`, this.item.id)
            
            let itemId = this.item.id
            if (this.itemType === 'fields') {
              itemId = this.$store.getters['tables/getCurrentTableId'] // get id from table
              let currentTable = this.$store.getters['tables/getCurrentTable'] // get id from table
              // this.log && console.log('C-ModalFields > updateItem > !this.onlyLocalUpdate > currentTable :' , currentTable)
              itemPayload = currentTable
            }
            this.log && console.log('C-ModalFields > updateItem > itemPayload :' , itemPayload)

            this.$axios
              .put(`${this.apiUrl}/${itemId}`, itemPayload, this.headerUser)
              .then(resp => {
                this.log && console.log('C-ModalFields > updateItem > resp.data : ', resp.data)
                
                if (this.itemType !== 'fields') {
                  this.$store.dispatch(`${this.itemType}/updateUserItem`, resp.data)
                }
                
                if (this.updateCurrentDataset) {
                  this.$store.dispatch(`${this.itemType}/setCurrentItem`, resp.data)
                }

                this.$store.commit(`${this.itemType}/setItemLoading`, undefined)
              })
          } else {
            // this.log && console.log('C-ModalFields > updateItem > onlyLocalUpdate > itemPayload :' , itemPayload)
          }

        }
      },
    }
  }
</script>
