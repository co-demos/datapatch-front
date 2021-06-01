<template>
  <v-form ref="form">

    <v-row class="justify-center align-center">
      <v-col cols="12" class="align-center">

        <v-combobox
          v-model="model"
          no-filter
          hide-no-data
          :items="items"
          :search-input.sync="search"
          hide-selected
          :label="$t(searchLabel)"
          multiple

          :small-chips="dense"

          :outlined="!solo"
          :solo="solo"
          :flat="flat"
          :light="light"
          :dense="dense"
          :color="customColor || 'grey'"
          >

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

          <!-- NO DATA -->
          <template v-slot:no-data>
            <v-list-item>
              <span class="caption">
                ... {{ $t(searchPlaceholder) }}
              </span>
            </v-list-item>
          </template>
          
          <!-- SELECTION -->
          <template v-slot:selection="{ attrs, item, parent, selected }">
            <v-chip
              v-if="item === Object(item)"
              v-bind="attrs"
              :color="`${item.color}`"
              :input-value="selected"
              label
              :small="dense"
              dark
              >

              <v-icon
                v-if="item.item_type"
                small
                class="mr-3"
                color="white"
                >
                {{ item.icon || itemTexts[item.item_type].defaultIcon }}
              </v-icon>

              <span class="pr-2 white--text">
                <!-- {{ item.text }} -->
                {{ getItemInfos(item, 'SELECTION') }}
              </span>

              <v-divider
                vertical
                color="white"
                class="mx-3"
              />

              <span v-if="item.item_type">
                {{ $t(`dataPackage.${item.item_type}`) }}
              </span>

              <v-icon
                small
                color="white"
                class="ml-3"
                @click="parent.selectItem(item)"
                >
                icon-clear
              </v-icon>

            </v-chip>
          </template>

          <!-- LIST OF SELECTABLE ITEMS -->
          <template v-slot:item="{ index, item }">
            <v-chip
              :color="`${item.color}`"
              dark
              label
              :small="dense"
              >
              <v-icon
                v-if="item.item_type"
                small
                class="mr-3"
                color="white"
                >
                {{ item.icon || itemTexts[item.item_type].defaultIcon }}
              </v-icon>
              <!-- {{ item.text }} -->
              {{ getItemInfos(item, 'SELECTABLE') }}
            </v-chip>
            <v-spacer/>
            <span class="caption grey--text">
              {{ $t(`dataPackage.${item.item_type}`)}}
            </span>

          </template>

          <!-- OUTER ICON -->
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
    <v-row class="justify-left align-top" v-if="false">
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
        v-if="model && model.length > 0 && canDisplay"
        class="justify-center"
        >
        <v-col cols="6">

          <!-- {{ model }} -->

          <v-list
            :class="`text-left mt-3`"
            dense
            rounded
            three-line
            >
            <v-list-item-group
              color="primary"
              >
              <v-list-item
                v-for="item in model.filter( i => i && !i.header )"
                :key="`${item.item_type}-${item.id}`"
                >

                <v-list-item-avatar>
                  <v-icon
                    dark
                    :class="item.color || 'black'"
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
          </v-list>

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

        isError: false,
        errorMsg: undefined,

        canDisplay: false,
        
        itemTexts: {
          user: {txt: 'username', defaultIcon:'icon-user' },
          group: {txt: 'title', defaultIcon:'icon-users' },
          workspace: {txt: 'title', defaultIcon:'icon-apps' },
          dataset: {txt: 'title', defaultIcon:'icon-database' },
          table: {txt: 'title', defaultIcon:'icon-table' },
        },
        showCheckboxes: false,

        minCharRules: rules.minCharRules( this.$t('rules.valEnter'), this.$t('rules.minChars') ),
        emailRules: rules.emailRules( this.$t('rules.emailRequired'), this.$t('rules.emailValid') ),

        entries: [],
        itemsArray: [],
        selectArray: [],

        // DEBUG
        activator: null,
        attach: null,

        header: { header: this.$t(this.searchPlaceholder) },
        items: [
          { header: this.$t(this.searchPlaceholder) },
          // {
          //   text: 'Joe',
          //   id: 1,
          //   name: 'This is my group',
          //   surname: 'This is my group',
          //   username: 'Jpy',
          //   color: 'blue',
          //   item_type: 'user'
          // },
          // {
          //   text: 'My group',
          //   id: 1,
          //   title: 'This is my group',
          //   description: 'my group description',
          //   color: 'red',
          //   icon: 'icon-users',
          //   item_type: 'group'
          // },
          // {
          //   text: 'My workspace',
          //   id: 1,
          //   title: 'This is my workspace',
          //   description: 'my workspace description',
          //   color: 'primary',
          //   icon: 'icon-apps',
          //   item_type: 'workspace'
          // },
          // {
          //   text: 'My dataset',
          //   id: 1,
          //   title: 'This is my dataset',
          //   description: 'my dataset description',
          //   color: 'warning',
          //   icon: 'icon-database',
          //   item_type: 'dataset'
          // },
        ],

        search: null,
        model: [],

      }
    },
    beforeMount() {
      this.searchTypes = this.itemTypes
    },
    watch: {

      search (val) {
        if (val)  {
          this.selectArray = []
          this.log && console.log('C-SearchAny > watch > search > val :' , val)
          this.log && console.log('C-SearchAny > watch > search > this.search :' , this.search)
          this.querySearchDebounced(val)
        }
      },

      model (val, prev) {
        this.log && console.log('\nC-SearchAny > watch > model > val :' , val)
        this.log && console.log('C-SearchAny > watch > model > prev :' , prev)
        
        if (val.length === prev.length) return

        this.model = val.map(item => {
          if ( typeof item === 'null' || typeof item === 'string') {
            // item = {
            //   text: item,
            //   color: 'black',
            // }
            // this.items.push(item)
          } else {
            return item
          }
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
    },
    methods: {

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
        this.log && console.log('\nC-SearchAny > buildItems > this.search :', this.search)
        this.log && console.log('C-SearchAny > buildItems > this.selectArray :', this.selectArray)
        let itemsArrray = [ this.header ]
        // let itemsArrray = [ ]
        if (data) {
          for (let type of this.searchTypes) {
            // this.log && console.log('C-SearchAny > buildItems > type :' , type)
            // this.log && console.log('C-SearchAny > buildItems > data :' , data)
            if (data[type] && data[type].results.length ) {
              let entriesForType = data[type].results.map( i => {
                i.text = i[ this.itemTexts[i.item_type].txt ]
                return i
              })
              // this.log && console.log('C-SearchAny > buildItems > entriesForType :' , entriesForType)
              itemsArrray.push(...entriesForType)
            }
          }
          this.log && console.log('C-SearchAny > buildItems > itemsArrray :' , itemsArrray)
        }
        return itemsArrray
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
            this.items = this.buildItems(resp.data)
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
