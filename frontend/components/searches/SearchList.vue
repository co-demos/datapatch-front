<template>
  <v-row class="align-top justify-center ma-0 mt-3">

    <!-- HEADER + BTNS -->
    <v-col cols="12" class="mb-0 pa-0">
      <v-row class="ma-0 pl-0 pr-1 py-0 justify-center align-center">
        
        <!-- GROUPED ACTION BTN -->
        <v-col cols="1" class="pl-6">
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
                  :class="`${btnActions ? (customColor ? 'grey' : 'white') : (customColor ? 'white' : 'grey')}--text`"
                  >
                  icon-check-square
                </v-icon>
              </v-btn>
            </template>
            {{ $t('buttons.groupedActions')}}
          </v-tooltip>
        </v-col>

        <!-- GROUPED ACTIONS -->
        <v-col 
          cols="5"
          :class="`pa-0 text-left`"
          >
          <div
            v-show="btnActions"
            v-if="actionBtns.length > 0"
            >
            <SearchAction
              v-for="btn in actionBtns"
              :key="btn.tooltip"
              :action="btn"
              :customColor="customColor"
              :outlined="true"
              @itemAction="handleGroupAction(btn.action)"
            />
          </div>
          <p
            v-else
            :class="`my-2 caption ${customColor ? 'white--text' : ''}`"
            >
            {{ $t('buttons.needSelect') }}
          </p>
        </v-col>

        <!-- HELPER TEXT -->
        <v-col cols="5" class="text-left pa-0">
          <span
            :class="`font-weight-bold ${customColor ? 'white' : 'grey'}--text`"
            >
            {{ $t('buttons.yourSelection') }}
          </span>
        </v-col>

        <!-- FILTER BTN -->
        <v-col
          cols="1"
          class="text-right"
          >
          <v-tooltip 
            v-if="itemsTypes.length > 1"
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
                  :class="`${btnFilters ? (customColor ? 'grey' : 'white') : (customColor ? 'white' : 'grey')}--text`"
                  >
                  icon-eye
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
          class="ma-0 mb-2"
          >
          <!-- GROUPED ACTIONS -->
          <!--
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
                :outlined="true"
                @itemAction="handleGroupAction(btn.action)"
              />
            </div>
            <p
              v-else
              :class="`my-2 caption ${customColor ? 'white--text' : ''}`"
              >
              {{ $t('buttons.needSelect') }}
            </p>
          </v-col> -->

          <!-- FILTERS -->
          <v-col 
            v-show="btnFilters"
            cols="12"
            class="py-0 mb-2"
            >
            <v-row class="ma-0 align-top justify-center">
              <v-col
                v-for="type in itemsTypes"
                :key="type"
                cols="3"
                class="pa-0"
                >
                <v-checkbox
                  v-model="filterTypes"
                  dense
                  :value="type"
                  :label="$t(`dataPackage.${type}`)"
                  :dark="!!customColor"
                  :color="customColor ? '' : 'grey'"
                  on-icon="icon-check-square"
                  off-icon="icon-square"
                  hide-details
                  class="pa-0 ma-1"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-expand-transition>

    <!-- SELECTION IIEMS -->
    <v-col cols="12" class="pa-0 mt-2 mb-6">
      <draggable
        v-model="items"
        v-bind="dragOptions"
        draggable=".list-item"
        group="selection"
        @start="drag=true"
        @end="drag=false"
        >
        <v-scale-transition
          v-for="item in items"
          :key="`${item.item_type}-${item.id}`"
          >
          <SearchListItem
            v-show="filterTypes.includes(item.item_type)"
            v-model="selected"
            :item="item"
            :itemTexts="itemTexts"
            :getItemInfos="getItemInfos"
            :buttons="buttons"
            :customColor="customColor"
            :relatedSpace="relatedSpace"
            :relatedItem="relatedItem"
            @closeModal="$emit('closeModal')"
          />
        </v-scale-transition>
      </draggable>
    </v-col>

    <!-- <v-col
      v-if="!noEndDivider"
      cols="10" class="mb-12"
      >
      <v-divider
        :dark="!!customColor"
      />
    </v-col> -->
    
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
      'relatedSpace',
      'relatedItem',
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
        // this.log && console.log('\nC-SearchList > watch > hidden > val :' , val)
        // this.log && console.log('C-SearchList > watch > hidden > prev :' , prev)
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
        btnActions: true,
        btnFilters: false,
        buttons: {
          link: {
            action: 'link',
            icon: 'icon-external-link',
            tooltip: 'buttons.link',
          },
          add: {
            action: 'add',
            icon: 'icon-plus',
            tooltip: 'buttons.add',
            showRules: [
              (item, user) => !( item.owner_id === user.id )
            ],
            disabled: true,
          },
          addToGroup: {
            action: 'addToGroup',
            icon: 'icon-user-plus',
            tooltip: 'buttons.addToGroup',
            ignoreForSpaces: ['navbar', 'workspaces_list', 'datasets_pages'],
            showRules: [
              (item, user) => !( item.owner_id === user.id ) && !( item.users && item.users.find( u => u.email === user.email ) )
            ]
          },
          // share: {
          //   action: 'share',
          //   icon: 'icon-share',
          //   tooltip: 'buttons.share'
          // },
          join: {
            action: 'join',
            icon: 'icon-user-check',
            tooltip: 'buttons.join',
            showRules: [
              (item, user) => !( item.owner_id === user.id ) && !( item.authorized_users && item.authorized_users.includes(user.email) )
            ]
          },
          invite: {
            action: 'invite',
            icon: 'icon-user-plus',
            tooltip: 'buttons.invite',
            showRules: [
              (item, user) => (item.owner_id === user.id) || (item.authorized_users && item.authorized_users.includes(user.email))
            ]
          },
          message: {
            action: 'message',
            icon: 'icon-mail',
            tooltip: 'buttons.message',
            showRules: [
              (item, user) => { return item.item_type === 'user' ? item.id !== user.id : item.owner_id !== user.id }
            ],
            disabled: true,
          },
          comment: {
            action: 'comment',
            icon: 'icon-message-square',
            tooltip: 'buttons.comment',
            disabled: true,
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
      // noEndDivider() {
      //   return !!this.relatedItem
      // },
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
      handleGroupAction(val) {
        this.log && console.log('\nC-SearchList > handleAction > val :' , val)
        this.log && console.log('C-SearchList > handleAction > this.selected :' , this.selected)
        this.log && console.log('C-SearchList > handleAction > this.relatedSpace :' , this.relatedSpace)
        this.log && console.log('C-SearchList > handleAction > this.relatedItem :' , this.relatedItem)
      }
    }
  }

</script>
