<template>
  <v-row class="align-top justify-center ma-0">

    <!-- HEADER + BTNS -->
    <v-col cols="12" class="mb-1 pa-0">
      <v-row class="ma-0 pl-2 pr-1 py-0 justify-center align-center">
        <v-col cols="1" class="pl-4">
          <v-tooltip 
            right
            >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                :outlined="!customColor"
                :class="`${btnActions ? (customColor ? 'white' : 'grey') : (customColor ? '' : 'white')}`"
                v-bind="attrs"
                v-on="on"
                @click.stop="btnActions = !btnActions "
                >
                <v-icon
                  small
                  :class="`${btnActions ? (customColor ? 'primary' : 'white') : (customColor ? 'white' : 'grey')}--text`"
                  >
                  icon-check-square
                </v-icon>
              </v-btn>
            </template>
            {{ $t('buttons.groupedActions')}}
          </v-tooltip>
        </v-col>
        <v-col cols="10" class="text-center">
          <span
            :class="`font-weight-bold ${customColor ? 'white' : 'grey'}--text`"
            >
            {{ $t('buttons.yourSelection') }}
          </span>
        </v-col>
        <v-col cols="1" class="text-right">
          <v-tooltip 
            left
            >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                :outlined="!customColor"
                :class="`${btnFilters ? (customColor ? 'white' : 'grey') : (customColor ? '' : 'white')}`"
                v-bind="attrs"
                v-on="on"
                @click.stop="btnFilters = !btnFilters ; btnFilters ? btnActions = true : ''"
                >
                <v-icon
                  small
                  :class="`${btnFilters ? (customColor ? 'primary' : 'white') : (customColor ? 'white' : 'grey')}--text`"
                  >
                  icon-filter
                </v-icon>
              </v-btn>
            </template>
            {{ $t('buttons.selectionFilters')}}
          </v-tooltip>
        </v-col>
      </v-row>
    </v-col>

    <!-- DEBUGGING -->
    <v-col cols="12" v-if="false">
      <p class="font-weight-bold">from SearchList</p>
      - hidden: <code>{{ hidden }}</code><br><br>
      - selected: <code>{{ selected }}</code><br><br>
      - selectedTypes : <code>{{ selectedTypes }}</code><br><br>
      <!-- - filters: <code>{{ filters }}</code><br><br> -->
    </v-col>

    <v-expand-transition>
      <v-col
        v-show="btnActions || btnFilters"
        cols"12"
        >
        <v-row
          class="ma-0"
          >
          <!-- GROUPED ACTIONS -->
          <v-col 
            v-show="btnActions"
            cols="6"
            :class="`py-0 mb-2 text-left`"
            >
            <div
              v-if="actionBtns.length > 0"
              >
              <SearchAction
                v-for="btn in actionBtns"
                :key="btn.tooltip"
                :action="btn"
                :customColor="customColor"
              />
            </div>
            <p
              v-else
              :class="`my-2 caption ${customColor ? 'white--text' : ''}`"
              >
              {{ $t('buttons.needSelect') }}
            </p>
          </v-col>

          <!-- FILTERS -->
          <v-col 
            v-show="btnFilters"
            cols="6"
            :class="`py-0 mb-2 ${btnActions ? '' : 'offset-6'}`"
            >
            <!-- selectedTypes : {{ selectedTypes }} -->
            <v-row class="ma-0 align-top justify-end">
              <v-col
                v-for="type in itemsTypes"
                :key="type"
                cols="6"
                class="pa-0"
                >
                <v-checkbox
                  v-model="filterTypes"
                  :value="type"
                  :label="$t(`dataPackage.${type}`)"
                  :dark="!!customColor"
                  :color="customColor ? '' : 'grey'"
                  hide-details
                  class="pa-0 ma-1"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-expand-transition>

    <!-- SLECTION IIEMS -->
    <v-col cols="12" class="pa-0">
      <draggable
        v-model="items"
        v-bind="dragOptions"
        draggable=".selection"
        group="selection"
        @start="drag=true"
        @end="drag=false"
        >
        <SearchListItem
          v-for="item in items"
          v-show="filterTypes.includes(item.item_type)"
          :key="`${item.item_type}-${item.id}`"
          v-model="selected"
          :item="item"
          :itemTexts="itemTexts"
          :getItemInfos="getItemInfos"
          :buttons="buttons"
          :customColor="customColor"
        />
      </draggable>
    </v-col>
  </v-row>
</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'SearchList',
    props: [
      'hidden',
      'itemTexts',
      'getItemInfos',
      'customColor',
      'filters',
      // 'actionBtns'
    ],
    components: {
      SearchListItem: () => import(/* webpackChunkName: "SearchListItem" */ '@/components/searches/SearchListItem.vue'),
      SearchAction: () => import(/* webpackChunkName: "SearchAction" */ '@/components/searches/SearchAction.vue'),
    },
    model: {
      prop: 'hidden',
      event: 'blur'
    },
    watch: {
      hidden(val, prev) {
        this.log && console.log('\nC-SearchList > watch > hidden > val :' , val)
        this.log && console.log('C-SearchList > watch > hidden > prev :' , prev)
        // updated selected if model change
        this.items = val.filter( i => i && !i.header )
        this.selected = this.selected.filter(item => val.includes(item))
      },
      itemsTypes (val, prev) {
        // append new types if not present previously
        let newTypes = val.filter(type => !prev.includes(type) )
        this.filterTypes.push(...newTypes) 
      }
    },
    data () {
      return {
        drag: false,
        items: [],
        selected: [],
        filterTypes: [],
        btnActions: false,
        btnFilters: false,
        buttons: {
          link: {
            icon: 'icon-external-link',
            tooltip: 'buttons.link',
          },
          add: {
            icon: 'icon-plus',
            tooltip: 'buttons.add',
          },
          addToGroup: {
            icon: 'icon-user-plus',
            tooltip: 'buttons.addToGroup',
          },
          // share: {
          //   icon: 'icon-share',
          //   tooltip: 'buttons.share'
          // },
          join: {
            icon: 'icon-user-check',
            tooltip: 'buttons.join',
          },
          invite: {
            icon: 'icon-user-plus',
            tooltip: 'buttons.invite',
          },
          message: {
            icon: 'icon-mail',
            tooltip: 'buttons.message'
          },
          comment: {
            icon: 'icon-message-square',
            tooltip: 'buttons.comment'
          },
        }
      }
    },
    beforeMount () {
      this.items = this.hidden.filter( i => i && !i.header )
      this.filterTypes = this.itemsTypes
    },
    computed: {
      dragOptions() {
        return {
          animation: 200,
          group: "selection",
          disabled: false,
          ghostClass: "ghost"
        }
      },
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
      }),
      ...mapGetters({
        headerUser: 'user/headerUser',
      }),
      itemsTypes() {
        let types = this.hidden.map(item => item.item_type)
        types = new Set(types)
        return [...types]
      },
      selectedTypes() {
        let types = this.selected.map(item => item.item_type)
        types = new Set(types)
        return [...types]
      },
      actionBtns() {
        let actions = []
        this.selectedTypes.forEach(type => {
          actions.push(...this.itemTexts[type].actions)
        })
        actions = [...new Set(actions)]
        actions = actions.map( action => this.buttons[action] )
        return actions
      },
      filterBtns() {
        let filters = []
        return filters
      }
    },
    methods: {
      handleInput(val) {
        this.$emit('blur', val)
      },
    }
  }

</script>
