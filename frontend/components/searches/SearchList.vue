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
            v-if="groupedActionBtns.length > 0"
            >
            <SearchAction
              v-for="btn in groupedActionBtns"
              :key="btn.tooltip"
              :action="btn"
              :customColor="customColor"
              :outlined="true"
              :disabled="isLoading || btn.disabled"
              @itemAction="handleModal({action: btn.action, isGroupedAction: true})"
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
      <!-- - user: <code>{{ user }}</code><br><br> -->
      <!-- - hidden: <code>{{ hidden }}</code><br><br> -->
      - selected: <code>{{ selected }}</code><br><br>
      - selectedTypes : <code>{{ selectedTypes }}</code><br><br>
      - authChoices: <code><pre>{{ authChoices }}</pre></code><br>
      - preselectedAction : <code>{{ preselectedAction }}</code><br>
      - showMessageBox : <code>{{ showMessageBox }}</code><br>
      - showAuthBoxes : <code>{{ showAuthBoxes }}</code><br>
      - auth : <code>{{ auth }}</code><br><br>
      - selectionFiltered : <code>{{ selectionFiltered.length }}</code><br>

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

    <!-- ACTION DIALOG -->
    <v-expand-transition>

      <v-card
        v-show="showMessageBox && preselectedAction"
        outlined
        light
        elevation="0"
        class="my-2 pa-3"
        :style="'width: 100%'"
        >

        <!-- CLOSE MODAL -->
        <v-card-actions class="mr-3 px-0 pb-0">
          <v-spacer></v-spacer>
          <v-btn
            icon
            small
            rounded
            elevation="0"
            @click="closeMessageBox()"
            >
            <v-icon>icon-clear</v-icon>
          </v-btn>
        </v-card-actions>

        <v-card-title class="py-0 mt-n5 mb-5 justify-center">
          <v-icon
            small
            class="mr-4"
            color="grey"
            >
            {{ actionIcon }}
          </v-icon>
          {{ $t(`buttons.${this.preselectedAction}`) }}
        </v-card-title>

        <!-- REPEAT USERS / GROUPS -->
        <v-row
          class="ma-0 mb-2"
          >
          <v-col cols="3" class="offset-1">
            <!-- {{ $t('invitations.invitees') }} -->
            {{ $tc(selectionLabelBox, selectionFiltered.length) }}
          </v-col>
          <v-col 
            cols="7"
            v-if="selectionFiltered && selectionFiltered.length"
            class="pt-1 pb-0"
            >
            <SearchItemChip
              v-for="item in selectionFiltered"
              :key="`${item.item_type}_${item.id}`"
              :item="item"
              :dense="true"
              :isLoading="isLoading"
              :itemIcon="item.icon || itemTexts[item.item_type].defaultIcon"
              :itemTxt="getItemInfos(item, 'txt')"
              @selectItem="unselectItem(item)"
            />
          </v-col>
          <v-col 
            v-else
            cols="7"
            class=""
            >
            <span
              class="grey--text font-italic"
              >
              {{ $t('errors.emptySelection') }}
            </span>
          </v-col>
        </v-row>

        <!-- ACTION / AUTHS -->
        <v-row
          v-if="showAuthBoxes"
          class="mx-0 my-2"
          >
          <v-col cols="3" class="offset-1">
            {{ $t('tabs.auth') }}
          </v-col>
          <v-col 
            cols="7"
            class="py-0"
            >
            <v-row class="ml-1 mb-1 align-top justify-left">
              <v-radio-group
                v-model="auth"
                >
                <v-radio
                  v-for="authChoice in authChoices"
                  :key="authChoices.role"
                  :value="authChoice.name"
                  >
                  <template v-slot:label>
                    <b>{{ $t(authChoice.role) }}</b> : 
                    {{ $t(authChoice.label) }}
                    <v-tooltip
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
                        {{ $t(`${authChoice.role}Help`) }}
                      </span>
                    </v-tooltip>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-row>
          </v-col>
        </v-row>

        <!-- ACTION / MESSAGE -->
        <v-row
          class="ma-0"
          >
          <v-col cols="3" class="offset-1">
            {{ $t('dataPackage.title') }}
          </v-col>
          <v-col 
            cols="7"
            class="py-0 mb-2"
            >
            <v-text-field
              filled
              hide-details="auto"
              clearable
              v-model="messageTitle"
              dense
            />
          </v-col>
        </v-row>

        <v-row
          class="ma-0 pt-2"
          >
          <v-col cols="3" class="offset-1">
            {{ $t('dataPackage.message') }}
          </v-col>
          <v-col 
            cols="7"
            class="py-0 mb-2"
            >
            <v-textarea
              filled
              rows="3"
              class="mb-2"
              hide-details="auto"
              clearable
              v-model="message"
              dense
            />
          </v-col>
        </v-row>

        <!-- ACTION / BUTTONS -->
        <v-row class="mx-0 my-4">
          <v-col cols="3" class="offset-1">
            <v-btn
              color="grey darken-1"
              class="px-3"
              dark
              large
              block
              tile
              elevation="0"
              @click="closeMessageBox()"
              >
              <v-icon
                class="mr-4"
                >
                icon-clear
              </v-icon>
              {{ $t('buttons.cancel') }}
            </v-btn>
          </v-col>
          <v-col cols="7">
            <v-btn
              :color="selectionFiltered.length < 1 ? '' : 'primary darken-1'"
              class="px-3"
              :dark="selectionFiltered.length > 0 "
              block
              large
              tile
              elevation="0"
              :disabled="selectionFiltered.length < 1"
              @click="handleGroupAction(preselectedAction)"
              >
              <v-icon
                small
                class="mr-4"
                >
                {{ actionIcon }}
              </v-icon>
              {{ $t(`buttons.${preselectedAction}`) }}
            </v-btn>
          </v-col>
        </v-row>

      </v-card>
    </v-expand-transition>

    <!-- SELECTION ITEMS -->
    <v-col
      v-show="showListItems"
      cols="12"
      class="pa-0 mt-2 mb-6"
      >
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
            @removeFromItems="removeFromItems"
            @closeModal="$emit('closeModal')"
            @selectActionType="handleModal"
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
  import { AuthLevelsChoices } from '@/utils/utilsAuths.js'

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
      SearchItemChip: () => import(/* webpackChunkName: "SearchItemChip" */ '@/components/searches/SearchItemChip.vue'),
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
        isLoading: false,
        items: [],
        selected: [],
        selectedAlone: [],
        filterTypes: [],
        btnActions: true,
        btnFilters: false,

        showListItems: true,
        showMessageBox: false,
        showAuthBoxes: false,

        preselectedAction: 'invite',

        messageTitle: "",
        message: "",

        auth: 'read',
        authChoices: undefined,

        buttons: {
          link: {
            action: 'link',
            groupAction: false,
            icon: 'icon-external-link',
            tooltip: 'buttons.link',
          },
          add: {
            action: 'add',
            groupAction: true,
            icon: 'icon-plus',
            tooltip: 'buttons.add',
            labelbox: '',
            showRules: [
              (item, user) => !( item.owner_id === user.id )
            ],
            disabled: true,
          },
          join: {
            action: 'join',
            groupAction: true,
            icon: 'icon-user-check',
            tooltip: 'buttons.join',
            labelbox: '',
            showRules: [
              (item, user) => !( item.owner_id === user.id ) && !( item.authorized_users && item.authorized_users.includes(user.email) )
            ],
            disabled: true,
          },
          invite: {
            action: 'invite',
            groupAction: true,
            icon: 'icon-user-plus',
            tooltip: 'buttons.invite',
            labelbox: 'invitations.invitees',
            ignoreForSpaces: ['landing', 'navbar', 'workspaces_list', 'datasets_pages'],
            showRules: [
              (item, user) => {
                let isOwner = item.owner_id === user.id
                let isMember = false
                if (item.item_type === 'group') {
                  isMember = item.users && item.users.find( u => u.email === user.email)
                } else {
                  isMember = item.authorized_users && item.authorized_users.find( email => email === user.email)
                }
                return !isOwner && !isMember
              }
            ]
          },
          message: {
            action: 'message',
            groupAction: true,
            icon: 'icon-mail',
            tooltip: 'buttons.message',
            labelbox: 'messages.recipients',
            showRules: [
              (item, user) => { return item.item_type === 'user' ? item.id !== user.id : item.owner_id !== user.id }
            ],
            disabled: false,
          },
          comment: {
            action: 'comment',
            groupAction: false,
            icon: 'icon-message-square',
            tooltip: 'buttons.comment',
            labelbox: 'messages.recipients',
            disabled: false,
          },
        }
      }
    },
    beforeMount () {
      this.items = this.hidden.filter( i => i && !i.header )
      this.filterTypes = this.itemsTypes
      this.authChoices = [...AuthLevelsChoices]
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
        user: (state) => state.user.userData,
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
      groupedActionBtns() {
        let actions = this.actionBtns.filter(action => !!action.groupAction )
        return actions
      },
      filterBtns() {
        let filters = []
        return filters
      },
      filterPeoplerGroupFromSelected() {
        const canBeInvited = ['user', 'group']
        let filtered = this.selected.filter( selected => canBeInvited.includes(selected.item_type) )
        // filter out current user
        let filteredUsers = filtered.filter( selected => selected.item_type === 'user' && selected.id !== this.user.id )
        let filteredGroups = filtered.filter( selected => selected.item_type === 'group' )
        return [ ...filteredUsers, ...filteredGroups ]
      },
      filterCommentable() {
        const canBeCommented = ['workspace', 'group', 'dataset', 'table']
        let filtered = this.selected.filter( selected => canBeCommented.includes(selected.item_type) )
        return filtered
      },
      filterJoinable() {
        const canBeCommented = ['workspace', 'group', 'dataset', 'table']
        let filtered = this.selected.filter( selected => canBeCommented.includes(selected.item_type) )
        return filtered
      },
      peopleGroupICanInvite() {
        let filtered = this.filterPeoplerGroupFromSelected
        // this.log && console.log('\nC-SearchList > peopleGroupICanInvite > filtered :' , filtered)
        //   const correctType = canBeInvited.includes(selected.item_type)
        //   let notOwner
        //   if ( selected.item_type === 'user' ) {
        //     notOwner = selected.email !== this.user.email
        //   } else {
        //     notOwner = selected.owner
        //   }
        //   const boolArray = [correctType, notOwner]
        //   return boolArray.every(v => v === true)
        // })
        return filtered
      },
      actionIcon() {
        let btn = this.buttons[this.preselectedAction]
        return btn.icon
      },
      selectionLabelBox() {
        let btn = this.buttons[this.preselectedAction]
        return btn.labelbox
      },
      selectionFiltered() {
        switch (this.preselectedAction) {
          case 'invite' :
            return this.peopleGroupICanInvite
          case 'message' :
            return this.filterPeoplerGroupFromSelected
          case 'add' :
            break
          case 'join' :
            return this.filterJoinable
          case 'comment' :
            return this.filterCommentable
        }
      },
    },
    methods: {
      handleInput(val) {
        this.$emit('blur', val)
      },
      unselectItem(item) {
        this.selected = this.selected.filter( selected => selected.id !== item.id && selected.type !== item.item_type)
      },
      handleGroupAction(val) {
        this.log && console.log('\nC-SearchList > handleAction > val :' , val)
        this.log && console.log('C-SearchList > handleAction > this.selected :' , this.selected)
        this.log && console.log('C-SearchList > handleAction > this.relatedSpace :' , this.relatedSpace)
        this.log && console.log('C-SearchList > handleAction > this.relatedItem :' , this.relatedItem)

        let payload = {}

        switch (val) {
          case 'invite' :
            let targetType = this.relatedItem.item_type
            // this.log && console.log('C-SearchList > handleAction > invite > this.auth :' , this.auth)
            // this.log && console.log('C-SearchList > handleAction > invite > this.authChoices :' , this.authChoices)
            let authObj = this.authChoices.find( auth => auth.name === this.auth )
            payload = {
              title: this.messageTitle,
              message: this.message,
              auths: authObj.auths,
              invitation_to_item_type: this.relatedItem.item_type,
              invitation_to_item_id: this.relatedItem.id,
              // invitor_id: this.user.id,
              invitees: this.selectionFiltered
                .map( selected => {
                  return { 
                    invitee_type: selected.item_type,
                    invitee_id: selected.id,
                    invitee_email: selected.email,
                  }
                })
            }
            this.log && console.log('C-SearchList > handleAction > invite > payload :' , payload)
            let url = `${this.api[targetType + 's']}/${this.relatedItem.id}/invite`
            this.isLoading = true
            this.log && console.log('C-SearchList > handleAction > invite > url :' , url)
            this.$axios.post( url, payload, this.headerUser)
              .then(resp => {
                this.log && console.log('C-SearchList > handleAction > resp.data : ', resp.data)
                this.isLoading = false
              })
              .catch(error => {
                this.isLoading = false
              })
            break
          case 'message' :
            payload = {
              title: this.messageTitle,
              message: this.message,
              recipients: this.selectionFiltered
                .map( selected => {
                  return { 
                    recipient_type: selected.item_type,
                    recipient_id: selected.id,
                    recipient_email: selected.email,
                  }
                })
            }
            this.log && console.log('C-SearchList > handleAction > message > payload :' , payload)
            break
          case 'add' :
            break
          case 'join' :
            break
          case 'comment' :
            break
        }
      },
      removeFromItems(val) {
        // this.log && console.log('\nC-SearchList > removeFromItems > val :' , val)
        // this.log && console.log('C-SearchList > removeFromItems > this.items :' , this.items)
        // this.selected = this.selected.filter(item => val.includes(item))
        let newItems = this.items.filter( item => item !== val)
        // this.log && console.log('C-SearchList > removeFromItems > this.items :' , this.items)
        this.handleInput(newItems)
      },

      closeMessageBox() {
        this.showListItems = true
        this.showMessageBox = false
        this.showAuthBoxes = false
      },

      handleModal(val) {
        this.log && console.log('\nC-SearchList > handleModal > val :' , val)
        let action = val.action

        this.showListItems = false
        this.preselectedAction = action

        if ( !val.isGroupedAction ) {
          this.selected = [ val.item ]
        }

        const openMessage = ['invite', 'comment', 'message', 'join']

        if ( openMessage.includes(action) ) {
          this.showMessageBox = true
        }

        if ( action === 'invite' ) {
          this.showAuthBoxes = true
          this.messageTitle = this.$t('invitations.messageTitle', {
            itemTitle: this.relatedItem.title,
          })
          this.message = this.$t('invitations.messageDefault', {
            username: this.user.username,
            itemTitle: this.relatedItem.title,
            itemtype: this.$t(`dataPackage.${this.relatedItem.item_type}`),
          })
        }

      }
    }
  }

</script>
