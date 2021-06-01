<template>
  <!-- <div> -->

    <v-form ref="form">

        <!-- @change="updateItemDebounced()" -->
        <!-- @change="chooseItem" -->
        <!-- 
        -->
        <!-- item-text="item_type"
        item-value="id"  -->
      <v-row class="justify-center align-center">
        <v-col cols="7" class="align-center">
          <v-combobox
            v-model="model"
            :items="itemsArray"
            :loading="isLoading"

            :search-input.sync="search"

            :label="$t(searchLabel)"
            :placeholder="$t(searchPlaceholder)"
            clearable

            hide-details
            return-object
            no-filter

            :outlined="!solo"
            :flat="flat"
            :solo="solo"
            :light="light"
            :dense="dense"
            :color="customColor || 'grey'"
            >
            <!-- 
            hide-no-data
            :error="isError"
            :error-messages="[errorMsg]"
            :rules="minCharRules" 
            -->

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
              v-slot:item="{ item }"
              >
              <v-icon
                v-if="item.item_type"
                small
                class="mr-3"
                :color="item.color"
                >
                {{ item.icon || itemTexts[item.item_type].defaultIcon }}
              </v-icon>
              {{ getItemInfos(item, 'select') }}
              <v-spacer/>
              {{ $t(`dataPackage.${item.item_type}`)}}
            </template>

            <!-- SELECTED ITEM -->
            <template
              v-slot:selection="{ attr, on, item, selected }"
              >
              <div>
                <v-chip
                  v-if="item.item_type"
                  v-bind="attr"
                  :input-value="selected"
                  :color="item.color || 'grey' "
                  class="white--text pr-3"
                  v-on="on"
                  >
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

                <span v-else>
                  {{ item }}
                </span>
              </div>
            </template>

          </v-combobox>
        </v-col>

        <v-col cols="5" class="align-center">
          <p class="caption">
            {{ $t('buttons.searchIn') }}
          </p>
          <v-row>
            <v-col cols="6" class="align-top">
              <span class="caption">
                {{ $t('dataPackage.itemType') }}
              </span>
              <v-checkbox
                v-for="type in itemTypes"
                :key="type"
                dense
                v-model="searchTypes"
                :label="$t(`dataPackage.${type}`)"
                :value="type"
                hide-details
                class="my-1"
              />
            </v-col>
            <v-col cols="6" class="align-top">
              <span class="caption">
                {{ $t('auth.authTypes') }}
              </span>
              <v-checkbox
                v-for="auth in authTypes"
                :key="auth"
                dense
                v-model="searchAuths"
                :label="$t(`auth.${auth}`)"
                :value="auth"
                hide-details
                class="my-1"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
        
      <!-- <v-row class="justify-center align-center">
        <v-col>
          {{ $t('buttons.searchIn') }}
        </v-col>
        <v-col
          v-for="type in itemTypes"
          :key="type"
          class="justify-center"
          cols="3"
          >
          <v-checkbox
            dense
            v-model="searchTypes"
            :label="$t(`dataPackage.${type}`)"
            :value="type"
          />
        </v-col>
      </v-row> -->

      <!-- DEBUGGING -->
      <v-row class="justify-left align-top" v-if="false">
        <v-divider/>
        <v-col cols="6" class="text-left">
          - search: <code>{{ search }}</pre></code>
        </v-col>
        <v-col cols="6" class="text-left">
          - model: <code>{{ model }}</pre></code>
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
        <v-list
          v-if="model && canDisplay"
          class="primary lighten-3 text-left"
          >
          {{ model }}
          <!-- <v-list-item
            v-for="(field, i) in fields"
            :key="i"
            >
            <v-list-item-content>
              <v-list-item-title
                v-text="field.value"
              />
              <v-list-item-subtitle
                v-text="field.key"
              />
            </v-list-item-content>
          </v-list-item> -->
        </v-list>
      </v-expand-transition>
    </v-form>
  <!-- </div> -->
</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  import { rules } from '@/utils/utilsRules.js'
  
  const AuthsTtypes = [
    'ownerOnly',
    'groups',
    'users',
    'public',
  ]

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
        
        authTypes: AuthsTtypes,
        searchAuths: [ ...AuthsTtypes ],

        search: null,
        entries: [],
        itemsArray: [],
        model: null,

        isError: false,
        errorMsg: undefined,

        canDisplay: false,
        
        itemTexts: {
          user: {txt: 'email', defaultIcon:'icon-user' },
          group: {txt: 'title', defaultIcon:'icon-users' },
          workspace: {txt: 'title', defaultIcon:'icon-app' },
          dataset: {txt: 'title', defaultIcon:'icon-database' },
          table: {txt: 'title', defaultIcon:'icon-table' },
        },

        minCharRules: rules.minCharRules( this.$t('rules.valEnter'), this.$t('rules.minChars') ),
        emailRules: rules.emailRules( this.$t('rules.emailRequired'), this.$t('rules.emailValid') ),
      }
    },
    beforeMount() {
      this.searchTypes = this.itemTypes
    },
    watch: {
      search (val) {
        this.model = null
        this.log && console.log('C-SearchAny > watch > search > val :' , val)
        this.log && console.log('C-SearchAny > watch > search > this.search :' , this.search)
        this.querySearchDebounced(val)
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
      //   this.log && console.log('C-SearchAny > getItems > this.model :', this.model)
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
      // getItemTextField() {
      //   if () {

      //   }
      // },
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
        this.log && console.log('C-SearchAny > getItems > this.model :', this.model)
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
        // this.log && console.log('C-SearchAny > querySearchDebounced > this.model :', this.model)
        clearTimeout(this._timerId)
        this._timerId = setTimeout(() => {
          this.querySearch(val)
        }, 500)
      },
      querySearch (val) {
        this.log && console.log('\nC-SearchAny > querySearch > val :', val)
        this.log && console.log('C-SearchAny > querySearch > this.search :', this.search)
        this.log && console.log('C-SearchAny > querySearch > this.model :', this.model)

        // this.log && console.log('C-SearchAny > querySearch > this.$refs.form :' , this.$refs.form)
        // this.log && console.log('C-SearchAny > querySearch > this.$refs.form.validate() :' , this.$refs.form.validate())
        
        // if ( this.$refs.form.validate() ) {
        const urlSearch = this.api.searches
        this.itemsArray = []

        // if (this.isLoading) return

        this.isLoading = true
        this.canDisplay = false

        let item_types_query = this.searchTypes.map(type => `&item_types=${type}`).join('')

        this.$axios.get(`${urlSearch}/any?q=${val}${item_types_query}`, this.headerUser)
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
