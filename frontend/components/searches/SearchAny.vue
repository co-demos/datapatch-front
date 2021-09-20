<style scoped>

  .border-white {
    border: thin solid white !important;
  }
  .border-grey {
    border: thin solid lightGrey !important;
  }
  .v-input__control > .v-input__slot {
    padding: 12px !important;
  }
  .v-input__append-outer {
    margin-top: 0px !important;
  }

</style>

<template>
  <v-form ref="form" class="SearchAny">

    <v-row class="justify-center align-center">
      
      <!-- PREPEND ICON -->
      <v-col cols="1">
        <v-tooltip 
          top
          >
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              :class="`${customColor || 'grey'}--text mx-4`"
              v-on="on"
              >
              icon-search1
            </v-icon>
          </template>
          <span>
            {{ $t(searchLabel) }}
          </span>
        </v-tooltip>
      </v-col>
      
      <!-- SEARCH BOX -->
      <v-col cols="10" class="align-center">

        <v-combobox
          v-model="model"
          no-filter
          hide-no-data
          hide-selected
          hide-details

          :items="items"
          :search-input.sync="search"
          :label="$t(searchLabel)"
          :disabled="isLoading"
          multiple
          clearable

          :small-chips="dense"

          :outlined="!solo"
          :solo="solo"
          :flat="flat"
          :light="light"
          :dense="dense"
          :color="customColor || 'grey'"

          :error="isError"
          :error-messages="errorMsg"
          >

          <!-- NO DATA -->
          <!-- <template v-slot:no-data>
            <v-list-item>
              <span class="caption">
                ... {{ $t(searchPlaceholder) }}
              </span>
            </v-list-item>
          </template> -->
          
          <!-- SELECTION -->
          <template v-slot:selection="{ attrs, item, parent, selected }" class="py-2">
            <!-- <v-chip
              v-if="item === Object(item)"
              v-bind="attrs"
              :color=" isLoading ? 'grey' : item.color"
              :input-value="selected"
              label
              :small="dense"
              class="my-1"
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
                {{ getItemInfos(item, 'txt') }}
              </span>

              <v-divider
                vertical
                color="white"
                class="mx-3"
              />

              <span v-if="item.item_type" class="caption font-italic">
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

            </v-chip> -->

            <SearchItemChip
              v-if="item === Object(item)"
              v-bind="attrs"
              :input-value="selected"
              :item="item"
              :dense="dense"
              :isLoading="isLoading"
              :itemIcon="item.icon || itemTexts[item.item_type].defaultIcon"
              :itemTxt="getItemInfos(item, 'txt')"
              @selectItem="parent.selectItem(item)"
            />

          </template>

          <!-- LIST OF SELECTABLE ITEMS -->
          <template v-slot:item="{ index, item }">
            <v-row>
              <v-col cols="3" class="text-right">
                <span class="caption grey--text">
                  {{ $t(`dataPackage.${item.item_type}`)}}
                </span>
              </v-col>
              <v-col cols="9">
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
                  {{ getItemInfos(item, 'txt') }}
                </v-chip>
              </v-col>
            </v-row>
          </template>

        </v-combobox>
      </v-col>

      <!-- OUTER ICON -->
      <v-col cols="1">
        <v-tooltip
          top
          >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              small
              :class="`${showCheckboxes ? customColor || 'grey' : 'transparent'}`"
              v-bind="attrs"
              v-on="on"
              @click="showCheckboxes = !showCheckboxes"
              >
              <v-icon
                small
                :class="`${showCheckboxes ? (customColor ? 'grey' : 'white') : (customColor ? 'white' : 'grey')}--text`"
                >
                {{ showCheckboxes ? 'icon-x-square' : 'icon-plus-square' }}
              </v-icon>
            </v-btn>
          </template>
          <span>
            {{ $t('buttons.searchCheckboxes')}}
          </span>
        </v-tooltip>
      </v-col>

      <!-- CHECKBOXES -->
      <v-expand-transition>
        <v-col
          v-show="showCheckboxes"
          cols="10"
          class="align-center justify-center pt-0"
          >
          <v-row class="justify-center">
            
            <!-- HELPER TEXT -->
            <v-col
              cols="12"
              class="align-top pb-0"
              >
              <p
                :class="`mb-0 font-weight-bold text-center ${customColor ? 'white' : 'grey'}--text`"
                >
                {{ $t('buttons.searchIn') }}
              </p>
            </v-col>

            <!-- ITEM TYPES -->
            <v-col
              cols="6"
              class="align-top justify-center"
              v-show="itemTypes.length > 1"
              >
              <v-card 
                elevation="0"
                :class="`pa-3 border-${customColor ? 'white' : 'grey' }`"
                color="transparent"
                >
                <!-- :color="customColor ? 'white' : 'grey'" -->
                <SearchItemTypes
                  v-model="searchTypes"
                  :itemTypes="itemTypes"
                  :customColor="customColor"
                  :justOneSelected="searchTypes.length < 2"
                />
              </v-card>
            </v-col>

            <!-- AUTH LEVELS -->
            <v-col
              cols="6"
              class="align-top justify-center"
              >
              <v-card 
                elevation="0"
                :class="`pa-3 border-${customColor ? 'white' : 'grey' }`"
                color="transparent"
                >
                <!-- :color="customColor ? 'white' : 'grey'" -->
                <SearchAuthLevel
                  v-model="searchAuth"
                  :customColor="customColor"
                  :onlyUsers="itemTypes.length === 1 && itemTypes[0] === 'users'"
                />
              </v-card>
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
      <!-- <v-col cols="4" class="text-left">
        - selectArray: <code>{{ selectArray }}</pre></code>
      </v-col> -->
      <v-col cols="4" class="text-left">
        - searchAuth: <code>{{ searchAuth }}</pre></code>
      </v-col>
      <v-divider/>
    </v-row>

    <!-- RESULTS SELECTION -->
    <v-expand-transition>
      <v-row
        v-if="model && model.length > 0"
        class="justify-left"
        >
        <v-col cols="10" class="pa-0 offset-1 px-3">
          <SearchList
            v-model="model"
            :itemTexts="itemTexts"
            :getItemInfos="getItemInfos"
            :customColor="customColor"
            :filters="{ types: searchTypes, auths: searchAuth  }"
            :relatedSpace="relatedSpace"
            :relatedItem="relatedItem"
            @closeModal="$emit('closeModal')"
          />
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
      'customColor',
      'relatedSpace',
      'relatedItem',
    ],
    components: {
      SearchItemTypes: () => import(/* webpackChunkName: "SearchItemTypes" */ '@/components/searches/SearchItemTypes.vue'),
      SearchAuthLevel: () => import(/* webpackChunkName: "SearchAuthLevel" */ '@/components/searches/SearchAuthLevel.vue'),
      SearchList: () => import(/* webpackChunkName: "SearchList" */ '@/components/searches/SearchList.vue'),
      SearchItemChip: () => import(/* webpackChunkName: "SearchItemChip" */ '@/components/searches/SearchItemChip.vue'),
    },
    data () {
      return {
        // descriptionLimit: 60,
        isLoading: false,

        searchTypes: [],
        searchAuth: AuthsOptions.find(auth => auth.name === 'public').name,

        isError: false,
        errorMsg: undefined,

        // canDisplay: false,
        
        itemTexts: {
          user: { 
            txt: 'username',
            txtBis: 'email',
            defaultIcon:'icon-user',
            actions: ['invite', 'message'], //addToGroup
          },
          group: { 
            txt: 'title',
            txtBis: 'description', 
            defaultIcon:'icon-users',
            actions: ['add', 'link', 'join', 'invite', 'message', 'comment'],
          },
          workspace: {
            txt: 'title',
            txtBis: 'description',
            defaultIcon:'icon-apps',
            actions: ['add', 'link', 'join', 'invite', 'comment'],
          },
          dataset: {
            txt: 'title',
            txtBis: 'description', 
            defaultIcon:'icon-database',
            actions: ['add', 'link', 'join', 'invite', 'comment'],
          },
          table: {
            txt: 'title',
            txtBis: 'description', 
            defaultIcon:'icon-table',
            actions: ['link', 'join', 'invite', 'comment'],
          },
        },
        showCheckboxes: false,

        minCharRules: rules.minCharRules( this.$t('rules.valEnter'), this.$t('rules.minChars') ),
        // emailRules: rules.emailRules( this.$t('rules.emailRequired'), this.$t('rules.emailValid') ),

        // activator: null,
        // attach: null,

        header: { header: this.$t(this.searchPlaceholder) },
        headerNoData: { header: this.$t('buttons.searchNoData') },
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

      search (val, prev) {

        // this.log && console.log('\nC-SearchAny > watch > search > val :' , val)
        // this.log && console.log('C-SearchAny > watch > search > prev :' , prev)
        // this.log && console.log('C-SearchAny > watch > search > this.items :' , this.items)
        // this.log && console.log('C-SearchAny > watch > search > this.minCharRules :' , this.minCharRules)
        
        this.showCheckboxes = false

        if ( !val && prev && this.items.length < 2) { 
          this.items = [ this.header ] 
        }

        let errorMsg = undefined
        let canProceed = this.minCharRules.map( rule => {
          // this.log && console.log('C-SearchAny > watch > search > rule :' , rule)
          let bool = false
          if (typeof rule(val) === 'string') {
            errorMsg = rule(val)
          } else {
            bool = rule(val)
          }
          return bool
        })
        // this.log && console.log('C-SearchAny > watch > search > canProceed :' , canProceed)
        // this.log && console.log('C-SearchAny > watch > search > errorMsg :' , errorMsg)

        if ( !val || val === '' || val === null ) {
          this.isError = false
          this.errorMsg = undefined
        } else if (canProceed.every(Boolean))  {
          this.isError = false
          this.errorMsg = undefined
          // this.log && console.log('C-SearchAny > watch > search > this.search :' , this.search)
          this.querySearchDebounced(val)
        } else {
          this.isError = true
          this.errorMsg = errorMsg
        }
      },

      model (val, prev) {
        // this.log && console.log('\nC-SearchAny > watch > model > val :' , val)
        // this.log && console.log('C-SearchAny > watch > model > prev :' , prev)
        
        if (val.length === prev.length) return

        // this.isError = false
        // this.errorMsg = undefined

        // this.model = val.map(item => {
        //   if ( !item || typeof item === 'null' || typeof item === 'string') {
        //     // item = {
        //     //   text: item,
        //     //   color: 'black',
        //     // }
        //     // this.items.push(item)
        //   } else {
        //     return item
        //   }
        // })

        this.model = val.filter(item => item && typeof item !== 'null' && typeof item !== 'string')
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

      getItemInfos(item, field) {
        // this.log && console.log('\nC-SearchAny > getItemInfos > item :' , item)
        // this.log && console.log('C-SearchAny > getItemInfos > from :' , from)
        if ( item && item.item_type ) {
          const itemType = item.item_type
          const itemConfig = this.itemTexts[itemType]
          return item[itemConfig[field]]
        } else {
          return item
        }
      },
      buildItems(data) {
        // this.log && console.log('\nC-SearchAny > buildItems > this.search :', this.search)
        // this.log && console.log('C-SearchAny > buildItems > data :', data)
        let itemsArray = [ ]
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
              itemsArray.push(...entriesForType)
            }
          }
          // this.log && console.log('C-SearchAny > buildItems > itemsArray :' , itemsArray)
        } 
        if (itemsArray.length > 1) {
          itemsArray.unshift(this.header)
        } else {
          itemsArray.unshift(this.headerNoData)
        }
        return itemsArray
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
        // this.log && console.log('\nC-SearchAny > querySearch > val :', val)
        // this.log && console.log('C-SearchAny > querySearch > this.search :', this.search)
        // this.log && console.log('C-SearchAny > querySearch > this.selectArray :', this.selectArray)

        // this.log && console.log('C-SearchAny > querySearch > this.$refs.form :' , this.$refs.form)
        // this.log && console.log('C-SearchAny > querySearch > this.$refs.form.validate() :' , this.$refs.form.validate())
        
        // if ( this.$refs.form.validate() ) {
        const urlSearch = this.api.searches

        // if (this.isLoading) return

        this.isLoading = true
        // this.canDisplay = false

        let item_types_query = this.searchTypes.map(type => `&item_types=${type}`).join('')
        let auth_types_query = `&auth_type=${this.searchAuth}`

        this.$axios.get(`${urlSearch}/any?q=${val}${item_types_query}${auth_types_query}`, this.headerUser)
          .then(resp => {
            // this.log && console.log('\nC-SearchAny > querySearch > resp.data :' , resp.data)
            const data = resp.data
            this.count = data.length
            this.items = this.buildItems(resp.data)
            // this.canDisplay = true
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (
            this.isLoading = false
          ))
      },
    }

  }
</script>
