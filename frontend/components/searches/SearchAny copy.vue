<template>
  <v-form ref="form">
      <!-- @change="updateItemDebounced()" -->
      <!-- @change="chooseItem" -->
      <!-- 
      -->
      <!-- item-text="item_type"
      item-value="id"  -->
    <v-row class="justify-center align-center">
      <v-col cols="12" class="align-center">

   
        <v-combobox
          v-model="selectArray"
          :items="itemsArray"
          :loading="isLoading"

          :search-input.sync="search"

          :label="$t(searchLabel)"
          :placeholder="$t(searchPlaceholder)"
          clearable
          hide-details

          :outlined="!solo"
          :flat="flat"
          :solo="solo"
          :light="light"
          :dense="dense"
          :color="customColor || 'grey'"

          hide-no-data

          multiple
          return-object
          :filter="filter"
          >
          <!-- 
          no-filter
          item-value="id"
          :error="isError"
          :error-messages="[errorMsg]"
          :rules="minCharRules" 
          -->

          <!-- PREPEND ICON -->
          <template v-slot:prepend>
            <v-tooltip 
              bottom
              >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  :class="`${customColor || 'grey'}--text mr-4`"
                  v-on="on"
                  >
                  icon-search1
                </v-icon>
              </template>
              <span>
                {{ $t(searchLabel) }}
              </span>
            </v-tooltip>
          </template>

          <!-- LIST SELECTABLE -->
          <template
            v-slot:item="{ item, on, parent, attrs }"
            >
            <v-icon
              v-if="item.item_type"
              v-bind="attrs"
              small
              class="mr-3"
              :color="item.color"
              v-on="on"
              >
              {{ item.icon || itemTexts[item.item_type].defaultIcon }}
            </v-icon>
            {{ getItemInfos(item, 'item') }}
            <v-spacer/>
            {{ $t(`dataPackage.${item.item_type}`)}}
          </template>

          <!-- SELECTED ITEM -->
          <template
            v-slot:selection="{ attrs, item, selected, parent, select }"
            >
            <!-- <div
              > -->
              <v-chip
                v-if="item === Object(item) && item.item_type"
                v-bind="attrs"
                :input-value="selected"
                :color="item.color || 'grey' "
                class="white--text pr-3 ma-3"
                @click="parent.selectItem(item)"
                >
                <!-- @click="selectItem(item, parent)" -->
                <!-- v-on="on" -->
                <v-icon
                  small
                  class="mr-3"
                  color="white"
                  >
                  {{ item.icon || itemTexts[item.item_type].defaultIcon }}
                </v-icon>
                {{ getItemInfos(item, 'selected') }}
                <v-divider
                  vertical
                  color="white"
                  class="mx-3"
                />
                <span class="mr-3">
                  {{ $t(`dataPackage.${item.item_type}`) }}
                </span>
              </v-chip>

          </template>

          <template v-slot:append-outer>
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="mx-4 my-0"
                :color="showCheckboxes ? customColor || 'primary' : customColor || 'grey'"
                @click="showCheckboxes = !showCheckboxes"
                v-bind="attrs"
                v-on="on"
                >
                {{ showCheckboxes ? 'icon-plus-square' : 'icon-plus-square' }}
              </v-icon>
              </template>
              <span>
                {{ $t('buttons.searchCheckboxes')}}
              </span>
            </v-tooltip>
          </template>

        </v-combobox>
      </v-col>

      <!-- CHECKBOXES -->
      <v-expand-transition>
        <v-col
          v-show="showCheckboxes"
          cols="12"
          class="align-center"
          >
          <v-row>
            <v-col
              cols="4"
              class="align-top"
              >
              <p
                :class="`caption font-weight-bold text-center ${customColor ? 'white--text' : ''}`"
                >
                {{ $t('buttons.searchIn') }}
              </p>
            </v-col>
            <v-col
              cols="4"
              class="align-top"
              >
              <p
                :class="`caption font-weight-bold text-left ${customColor ? 'white--text' : ''}`"
                >
                {{ $t('dataPackage.itemType') }}
              </p>
              <v-checkbox
                v-for="type in itemTypes"
                :key="type"
                dense
                v-model="searchTypes"
                :label="$t(`dataPackage.${type}`)"
                :value="type"
                :dark="!!customColor"
                hide-details
                class="my-1"
              />
            </v-col>
            <v-col
              cols="4"
              class="align-top"
              >
              <p
                :class="`caption font-weight-bold text-left ${customColor ? 'white--text' : ''}`"
                >
                {{ $t('auth.authTypesRead') }}
              </p>
              <v-radio-group v-model="searchAuthLevel">
                <v-radio
                  v-for="auth in authTypes"
                  :key="auth.name"
                  dense
                  :value="auth.name"
                  :dark="!!customColor"
                  hide-details
                  class="my-1"
                  >
                  <template v-slot:label>
                    <div>
                      <span
                        :dark="!!customColor"
                        class="body-2"
                        >
                        {{ $t(auth.label) }}
                      </span>
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon
                            x-small
                            :dark="!!customColor"
                            v-bind="attrs"
                            v-on="on"
                            >
                            icon-info
                          </v-icon>
                        </template>
                        {{ $t(auth.tooltip) }}
                      </v-tooltip>
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
        </v-col>
      </v-expand-transition>
    </v-row>

    <!-- DEBUGGING -->
    <v-row class="justify-left align-top" v-if="true">
      <v-divider/>
      <v-col cols="4" class="text-left">
        - search: <code>{{ search }}</pre></code>
      </v-col>
      <v-col cols="4" class="text-left">
        - selectArray: <code>{{ selectArray }}</pre></code>
      </v-col>
      <v-col cols="4" class="text-left">
        - searchAuthLevel: <code>{{ searchAuthLevel }}</pre></code>
      </v-col>
      <v-col cols="6" class="text-left">
        - itemsArray: <br><code><pre>{{ itemsArray }}</pre></code>
      </v-col>
      <v-col cols="6" class="text-left">
        - entries: <br><code><pre>{{ entries }}</pre></code>
      </v-col>
      <v-divider/>
    </v-row>

    <v-expand-transition>
      <v-row
        v-if="selectArray.length > 0 && canDisplay"
        class="justify-center"
        >
        <v-col cols="6">

          {{ selectArray }}

          <!-- <v-list
            :class="`text-left mt-3`"
            dense
            rounded
            three-line
            >

            <v-list-item-group
              color="primary"
              >
              <v-list-item
                v-for="item in selectArray"
                :key="`${item.item_type}-${item.id}`"
                >

                <v-list-item-avatar>
                  <v-icon
                    dark
                    :color="item.color || 'black'"
                    >
                    {{ item.icon || itemTexts[item.item_type].defaultIcon }}
                  </v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ getItemInfos(item, 'select') }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ $t(`dataPackage.${item.item_type}`) }}
                  </v-list-item-subtitle>
                </v-list-item-content>

              </v-list-item>
            </v-list-item-group>

          </v-list> -->

        </v-col>
      </v-row>
    </v-expand-transition>
  </v-form>
</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  import { rules } from '@/utils/utilsRules.js'
  import { AuthsOptions } from '@/utils/utilsAuths.js'

  export default {
    name: 'SearchAny',
    props: [
      'itemTypes',
      'searchLabel',
      'searchPlaceholder',
      'flat',
      'solo',
      'light',
      'dense',
      'customClass',
      'customColor'
    ],
    data () {
      return {
        descriptionLimit: 60,
        isLoading: false,

        searchTypes: [],
        
        authTypes: AuthsOptions,
        searchAuthLevel: AuthsOptions.find(auth => auth.name === 'public').name,

        search: null,
        entries: [],
        itemsArray: [],
        selectArray: [],

        isError: false,
        errorMsg: undefined,

        canDisplay: false,
        
        itemTexts: {
          user: {txt: 'username', defaultIcon:'icon-user' },
          group: {txt: 'title', defaultIcon:'icon-users' },
          workspace: {txt: 'title', defaultIcon:'icon-app' },
          dataset: {txt: 'title', defaultIcon:'icon-database' },
          table: {txt: 'title', defaultIcon:'icon-table' },
        },
        showCheckboxes: false,

        minCharRules: rules.minCharRules( this.$t('rules.valEnter'), this.$t('rules.minChars') ),
        emailRules: rules.emailRules( this.$t('rules.emailRequired'), this.$t('rules.emailValid') ),

        // DEBUG
        activator: null,
        attach: null,
        colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
        editing: null,
        editingIndex: -1,
        items: [
          { header: 'Select an option or create one' },
          {
            text: 'Foo',
            color: 'blue',
          },
          {
            text: 'Bar',
            color: 'red',
          },
        ],
        nonce: 1,
        menu: false,
        model: [
          {
            text: 'Foo',
            color: 'blue',
          },
        ],
        x: 0,
        search: null,
        y: 0,
      }
    },
    beforeMount() {
      this.searchTypes = this.itemTypes
    },
    watch: {
      search (val) {
        this.selectArray = []
        this.log && console.log('C-SearchAny > watch > search > val :' , val)
        this.log && console.log('C-SearchAny > watch > search > this.search :' , this.search)
        this.querySearchDebounced(val)
      },
      select (val, prev) {
        this.log && console.log('\nC-SearchAny > watch > select > val :' , val)
        this.log && console.log('C-SearchAny > watch > select > prev :' , prev)
      },
      model (val, prev) {
        if (val.length === prev.length) return

        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
              color: this.colors[this.nonce - 1],
            }

            this.items.push(v)

            this.nonce++
          }

          return v
        })
      },
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
      }),
      ...mapGetters({
        headerUser: 'user/headerUser',
      }),
      // items() {
      //   this.log && console.log('\nC-SearchAny > getItems > this.search :', this.search)
      //   this.log && console.log('C-SearchAny > getItems > this.selectArray :', this.selectArray)
      //   let itemsArrray = []
      //   if (this.canDisplay && this.entries) {
      //     for (let type of this.searchTypes) {
      //       this.log && console.log('C-SearchAny > getItems > type :' , type)
      //       this.log && console.log('C-SearchAny > getItems > this.entries :' , this.entries)
      //       if (this.entries[type] && this.entries[type].results.length ) {
      //         let entriesForType = this.entries[type].results
      //         this.log && console.log('C-SearchAny > getItems > entriesForType :' , entriesForType)
      //         itemsArrray.push(...entriesForType)
      //       }
      //     }
      //     this.log && console.log('C-SearchAny > items > itemsArrray :' , itemsArrray)
      //   }
      //   return itemsArrray
      // },
    },
    methods: {
      selectItem(item, parent) {
        this.log && console.log('\nC-SearchAny > selectItem > item :' , item)
        this.log && console.log('C-SearchAny > selectItem > parent :' , parent)
        // parent.selectItem(item)
      },
      edit (index, item) {
        if (!this.editing) {
          this.editing = item
          this.editingIndex = index
        } else {
          this.editing = null
          this.editingIndex = -1
        }
      },
      filter (item, queryText, itemText) {
        this.log && console.log('\nC-SearchAny > filter > item :' , item)
        this.log && console.log('C-SearchAny > filter > queryText :' , queryText)
        this.log && console.log('C-SearchAny > filter > itemText :' , itemText)
        if (item.header) return false
        const hasValue = val => val != null ? val : ''
        const text = hasValue(itemText)
        const query = hasValue(queryText)
        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
        // return true
      },
      getItemInfos(item, from) {
        // this.log && console.log('\nC-SearchAny > getItemInfos > item :' , item)
        // this.log && console.log('C-SearchAny > getItemInfos > from :' , from)
        if ( item && item.item_type ) {
          const itemType = item.item_type
          const itemConfig = this.itemTexts[itemType]
          return item[itemConfig.txt]
        } else {
          return item
        }
      },
      buildItems(data) {
        this.log && console.log('\nC-SearchAny > getItems > this.search :', this.search)
        this.log && console.log('C-SearchAny > getItems > this.selectArray :', this.selectArray)
        let itemsArrray = []
        if (data) {
          for (let type of this.searchTypes) {
            this.log && console.log('C-SearchAny > getItems > type :' , type)
            this.log && console.log('C-SearchAny > getItems > data :' , data)
            if (data[type] && data[type].results.length ) {
              let entriesForType = data[type].results
              this.log && console.log('C-SearchAny > getItems > entriesForType :' , entriesForType)
              itemsArrray.push(...entriesForType)
            }
          }
          this.log && console.log('C-SearchAny > items > itemsArrray :' , itemsArrray)
        }
        return itemsArrray
      },
      chooseItem(val) {
        this.log && console.log('C-SearchAny > chooseItem > val :' , val)
      },
      querySearchDebounced(val) {
        // this.log && console.log('\nC-SearchAny > querySearchDebounced > val :', val)
        // this.log && console.log('C-SearchAny > querySearchDebounced > this.search :', this.search)
        // this.log && console.log('C-SearchAny > querySearchDebounced > this.selectArray :', this.selectArray)
        clearTimeout(this._timerId)
        this._timerId = setTimeout(() => {
          this.querySearch(val)
        }, 500)
      },
      querySearch (val) {
        this.log && console.log('\nC-SearchAny > querySearch > val :', val)
        this.log && console.log('C-SearchAny > querySearch > this.search :', this.search)
        this.log && console.log('C-SearchAny > querySearch > this.selectArray :', this.selectArray)

        // this.log && console.log('C-SearchAny > querySearch > this.$refs.form :' , this.$refs.form)
        // this.log && console.log('C-SearchAny > querySearch > this.$refs.form.validate() :' , this.$refs.form.validate())
        
        // if ( this.$refs.form.validate() ) {
        const urlSearch = this.api.searches
        this.itemsArray = []

        // if (this.isLoading) return

        this.isLoading = true
        this.canDisplay = false

        let item_types_query = this.searchTypes.map(type => `&item_types=${type}`).join('')
        let auth_types_query = `&auth_type=${this.searchAuthLevel}`

        this.$axios.get(`${urlSearch}/any?q=${val}${item_types_query}${auth_types_query}`, this.headerUser)
          .then(resp => {
            this.log && console.log('\nC-SearchAny > querySearch > resp.data :' , resp.data)
            const data = resp.data
            this.count = data.length
            this.entries = resp.data
            this.itemsArray = this.buildItems(resp.data)
            this.canDisplay = true
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (
            this.isLoading = false
          ))
        // }
      },
    }

  }
</script>
