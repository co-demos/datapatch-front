<style scoped>

  .add-border {
    border: thin solid lightGrey !important;
  }

  .disabledBtn {
    /* background-color: rgba(255, 255, 255, 0.7) !important; */
    background-color: white !important;
    pointer-events: none;
  }

  .border-dash {
    border-style: dashed;
  }

  .rounded-left{
    border-top-left-radius: 28px;
    border-bottom-left-radius: 28px;
  }

  .rounded-right{
    border-bottom-right-radius: 28px;
    border-top-right-radius: 28px;

  }

</style>

<template>

  <v-card
    elevation="0"
    outlined
    flat
    :class="`InvitationItem invit py-3 ${hover ? 'add-border' : ''} mb-4`"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    color="white"
    >
    <!-- :color="`${hover ? 'white' : 'grey lighten-4'}`" -->

    <v-row class="ma-0 align-center">

      <!-- item invited to -->
      <v-col 
        cols="1"
        @click="showDetails = !showDetails"
        >
        <p class="text-center mb-1">
          <!-- DEBUGGING -->
          <code>{{ invit.id }}</code>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                v-on="on"
                small
                class="mr-2"
                >
                {{ itemTypeIcon }}
              </v-icon>
            </template>
            <span class="grey--text">
              {{ $t( `dataPackage.${invit.invitation_to_item_type}`) }}
            </span>
          </v-tooltip>
        </p>
      </v-col>

      <!-- status -->
      <v-col
        cols="2"
        class="text-center"
        >
        <v-chip
          text-color="white"
          :color="statusColor"
          @click="showDetails = !showDetails"
          >
          <v-icon 
            small
            class="mr-2"
            >
            {{ statusIcon }}
          </v-icon>
          {{ $t( `invitations.${invit.invitation_status}`) }}
        </v-chip>

        <!-- show details -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              v-bind="attrs"
              v-on="on"
              icon
              small
              @click="showDetails = !showDetails"
              >
              <v-icon
                small
                color="grey"
                >
                icon-info1
              </v-icon>
            </v-btn>
          </template>
          <span>
            {{ $t('invitations.details') }}
          </span>
        </v-tooltip>

      </v-col>

      <!-- item invited to -->
      <v-col 
        cols="4"
        class="align-center py-0"
        @click="showDetails = !showDetails"
        >

        <!-- <code>{{ invit.invitation_to_item_id }}</code> -->
        <v-row class="align-center font-weight-bold ma-0 pl-4">
          
          <v-col cols="2" class="pa-0">
            <ItemAvatar
              :item="invit.invitation_item"
              :heightAvatar="30"
            />
          </v-col>

          <v-col cols="10" class="pa-0 pt-1">
            <span>
              {{ invit.invitation_item.title }}
            </span>
          </v-col>
        </v-row>
      </v-col>

      <!-- auths -->
      <v-col cols="2" class="text-center">

        <span
          v-for="authLevel in authChoices"
          :key="authLevel.name"
          >
          <v-tooltip top>
          
            <template v-slot:activator="{ on, attrs }">
              <v-icon 
                v-bind="attrs"
                v-on="on"
                small 
                class="mr-2 pb-1"
                :color="invit.auths[authLevel.name]? 'green' : 'grey lighten-2'"
                >
                {{ authLevel.icon }}
              </v-icon>
            </template>

            <span>
              <v-icon 
                x-small 
                class="mr-2"
                color="white"
                >
                {{ authLevel.icon }}
              </v-icon>
              <span 
                :class="`text-body-2 ${ invit.auths[authLevel.name]? '' : 'text-decoration-line-through'}`"
                >
                {{ $t(authLevel.label) }}
              </span>
            </span>

          </v-tooltip>
        </span>

      </v-col>

      <!-- ACTION : ACCEPT / REFUSE / ... -->
      <v-col cols="2" class="align-center justify-center pr-0">
        <v-btn
          dark
          dense
          block
          tile
          elevation="0"
          :class="`${btnIsDisabled ? 'disabledBtn rounded-right' : '' } rounded-left`"
          :color="btnIsDisabled ? 'grey' : btnActionColor"
          :loading="isLoading"
          @click="handleAction()"
          >
          <v-icon
            small
            :color="`${ btnIsDisabled ? 'grey lighten-2' : 'white'}`"
            class="pr-2"
            >
            {{ btnActionIcon }}
          </v-icon>
          <span :class="`${ btnIsDisabled ? 'grey--text text--lighten-2' : ''}`">
            {{ $t(btnActionLabel) }}
          </span>
        </v-btn>
      </v-col>

      <!-- ACTION CHOICES -->
      <v-col cols="1" class="align-center justify-center pl-0">
        <v-menu
          open-on-hover
          offset-y
          :v-show="!btnIsDisabled"
          >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              dense
              color="grey lighten-2"
              class="px-0 rounded-right"
              :disabled="btnIsDisabled"
              elevation="0"
              v-bind="attrs"
              v-on="on"
              >
              <v-icon color="black">
                icon-keyboard_arrow_down
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in btnActions"
              :key="item.action"
              @click="action = item.action"
              :disabled="item.disabled"
              >
              <v-list-item-title>
                <v-icon x-small class="pr-2">
                  {{ item.icon }}
                </v-icon>
                {{ $t(item.label) }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      </v-col>

    </v-row>

    <!-- INVITATION DETAILS -->
    <v-expand-transition>
      <div v-show="showDetails" class="pt-3 px-10">

        <v-divider class="border-dash"/>

        <!-- close panel btn -->
        <v-row  class="ma-0 mt-3 align-center">
          <v-col cols="12" class="pa-0 text-right">
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  class="mr-n6"
                  @click="showDetails = false"
                  v-bind="attrs"
                  v-on="on"
                  >
                  <v-icon small>
                    icon-clear
                  </v-icon>
                </v-btn>
              </template>
              <span>
                {{ $t('invitations.detailsClose') }}
              </span>
            </v-tooltip>
          </v-col>
        </v-row>

        <!-- auth details -->
        <v-row  class="ma-0 mt-n5 align-center justify-center pb-3">
          <v-col cols="3" class="text-center align-center grey--text">

            <v-icon v-show="editMode"
              small 
              class="mr-2"
              color="grey"
              >
              icon-edit
            </v-icon>
            
            {{ $t('auth.authLevels') }} :
          </v-col>

          <!-- editable -->
          <v-col cols="9" class="text-left align-center">
            
            <v-row v-show="!editMode">
              <v-col
                v-for="authLevel in authChoices"
                :key="authLevel.name"
                v-if="invit.auths[authLevel.name]"
                cols="4"
                class="pr-1 py-1"
                >
                <span>
                  <v-icon 
                    x-small 
                    class="mr-2"
                    :color="invit.auths[authLevel.name]? 'green' : 'grey lighten-2'"
                    >
                    {{ authLevel.icon }}
                  </v-icon>
                  <span 
                    :class="`text-body-2 ${ invit.auths[authLevel.name]? '' : 'text-decoration-line-through grey--text'}`"
                    >
                    {{ $t(authLevel.label) }}
                  </span>
                </span>
              </v-col>
            </v-row>

            <v-row v-show="editMode" class="mt-0 align-center">
              <v-radio-group
                v-model="authEdit"
                class="mt-0 mb-2 ml-3"
                hide-details
                @change="updateItem('auths', authEdit)"
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

        <!-- invit title -->
        <v-divider class="border-dash"/>
        <v-row  class="ma-0 mt-3 align-center">
          <v-col cols="3" class="grey--text">
            <p class="text-center mb-2">
              <v-icon v-show="editMode"
                small 
                class="mr-2"
                color="grey"
                >
                icon-edit
              </v-icon>
              {{ $t('invitations.invitTitle') }} :
            </p>
          </v-col>

          <!-- editable -->
          <v-col cols="9">
            <p class="mb-2" v-show="!editMode">
              {{ invit.title }}
            </p>
            <v-text-field
              v-show="editMode"
              class="mb-2"
              outlined
              hide-details
              v-model="titleEdit"
              @input="updateItemDebounced('title', titleEdit)"
            />
          </v-col>

        </v-row>

        <!-- message -->
        <v-divider class="border-dash"/>
        <v-row  class="ma-0 mt-3 align-top">
          <v-col cols="3" class="grey--text">
            <p class="text-center mb-2">
              <v-icon v-show="editMode"
                small 
                class="mr-2"
                color="grey"
                >
                icon-edit
              </v-icon>
              {{ $t('dataPackage.message') }} :
            </p>
          </v-col>

          <!-- editable -->
          <v-col cols="9">
            <p class="mb-2" v-show="!editMode">
              {{ invit.message }}
            </p>
            <v-textarea
              v-show="editMode"
              class="mb-2"
              outlined
              hide-details
              auto-grow
              v-model="messageEdit"
              @input="updateItemDebounced('message', messageEdit)"
            />
          </v-col>
        </v-row>

        <!-- item details -->
        <v-divider class="border-dash"/>
        <v-row  class="ma-0 mt-3 align-top">
          <v-col cols="3" class="grey--text">
            <p class="text-center mb-2">
              {{ $t('dataPackage.description') }} :
            </p>
          </v-col>
          <v-col cols="9">
            <p class="mb-2">
              {{ invit.invitation_item.description }}
            </p>
          </v-col>
        </v-row>

        <!-- invit details -->
        <v-divider class="border-dash"/>
        <v-row  class="ma-0 mt-4 align-center justify-center">

          <!-- item infos -->
          <v-col cols="3" class="pa-1 text-center">
            <p class="mb-1">
              <span class="grey--text mb-2">
                {{ $t( `dataPackage.itemTypeSingular`) }} : 
              </span>
            </p>
            <p class="mb-1">
              <v-icon
                small
                class="mr-2"
                >
                {{ itemTypeIcon }}
              </v-icon>
              <span class="">
                {{ $t( `dataPackage.${invit.invitation_to_item_type}`) }}
              </span>
            </p>
          </v-col>

          <!-- invitee infos -->
          <v-col cols="4" class="pa-1 text-center">
            <span v-if="invitType === 'received'">
              <span class="grey--text">
                {{ $t('invitations.sentBy') }} :
              </span>
              <br>
              <span v-html="invitSender"/>
            </span>
            <span v-if="invitType === 'sent'">
              <span class="grey--text">
                {{ $t('invitations.sentTo') }} :
              </span>
              <br>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    text
                    rounded
                    small
                    class="text-none"
                    v-bind="attrs"
                    v-on="on"
                    >
                    <v-icon
                      small
                      color="black"
                      class="mr-3"
                      >
                      {{ inviteeIcon }}
                    </v-icon>
                    <span class="black--text body-2">
                      {{ invit.invitee }}
                    </span>
                  </v-btn>
                </template>
                {{ $t( sentToUserTypeText ) }}
              </v-tooltip>
            </span>
          </v-col>

          <!-- invit infos -->
          <v-col cols="5" class="pa-1 text-lleft">
            <p v-if="invitType === 'received' " class="mb-1">
              <span class="grey--text pr-0">
                {{ $t('invitations.sentTo') }} :
              </span>
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    text
                    rounded
                    x-small
                    class="text-none"
                    v-bind="attrs"
                    v-on="on"
                    >
                    <v-icon
                      small
                      color="black"
                      class="mr-3"
                      >
                      {{ inviteeIcon }}
                    </v-icon>
                    <span class="black--text body-2 pb-1">
                      {{ invit.invitee }}
                    </span>
                  </v-btn>
                </template>
                {{ $t( sentToUserTypeText ) }}
              </v-tooltip>
            </p>
            <p class="mb-1">
              <span class="grey--text pr-2">
                {{ $t('invitations.sentDate') }} :
              </span>
              {{ invitSentDate.date }}
            </p>
            <p class="mb-1">
              <span class="grey--text pr-2">
                {{ $t('invitations.sentTime') }} :
              </span>
              {{ invitSentDate.time }}
            </p>

          </v-col>
        </v-row>

      </div>
    </v-expand-transition>

  </v-card>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  import { ItemTypesOptions, InvitationStatuses } from '@/utils/utilsInvitations'
  import { AuthLevelsChoices, GetAuthObject } from '@/utils/utilsAuths'

  export default {
    name: 'InvitationItem',
    props: [
      'invit',
      'invitType'
    ],
    data() {
      return {
        hover: false,
        isLoading: false,
        action: undefined,
        hoverBtn: false,
        authChoices: [],
        showDetails: false,
        invitActions: [
          { 
            action: 'edit', 
            label: 'buttons.edit', 
            color: 'green',
            icon: 'icon-edit', 
            for: ['sent'] 
          },
          { 
            action: 'accept', 
            label: 'buttons.accept', 
            color: 'green',
            icon: 'icon-check-circle1', 
            for: ['received'] 
          },
          { 
            action: 'comment', 
            label: 'buttons.comment', 
            color: 'primary',
            icon: 'icon-message-square', 
            for: ['sent', 'received'],
            disabled: true
          },
          { 
            action: 'refuse', 
            label: 'buttons.refuse', 
            color: 'red',
            icon: 'icon-x-circle', 
            for: ['received'] 
          },
          { 
            action: 'remove', 
            label: 'buttons.remove', 
            color: 'red',
            icon: 'icon-trash-2', 
            for: ['sent'] 
          },
        ],
        editMode: false,
        // invitEdit: {},
        authEdit: undefined,
        titleEdit: undefined,
        messageEdit: undefined
      }
    },
    beforeMount () {
      this.authChoices = [...AuthLevelsChoices]
      
      // choose default action for invitations
      this.action = this.invitType === 'sent' ? 'edit' : 'accept'

      // populate edit data
      // this.invitEdit = { ...this.invit }
      // this.log && console.log("C-InvitationItem > beforeMount > this.invit.auths : ", this.invit.auths)
      this.authEdit = GetAuthObject( this.invit.auths ).name
      // this.log && console.log("C-InvitationItem > beforeMount > this.authEdit : ", this.authEdit)
      this.titleEdit = this.invit.title
      this.messageEdit =this.invit.message
    },
    mounted() {
      this.socket = this.$nuxtSocket({
        name: 'main',
        path: '/ws/socket.io',
        transport: ['websocket'],
      })
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
        user: (state) =>  state.user.userData,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
        userId: 'user/userId',
        headerUser: 'user/headerUser'
      }),
      statusInvit() {
        let invitStaus = InvitationStatuses.find( status => status.name === this.invit.invitation_status )
        return invitStaus
      },
      statusIcon() {
        return this.statusInvit.icon
      },
      statusColor() {
        return this.statusInvit.color
      },
      itemTypeIcon() {
        let itemType = ItemTypesOptions.find( type => type.name === this.invit.invitation_to_item_type )
        return itemType.icon
      },
      invitSender() {
        let name = this.invit.owner.name
        let surname = this.invit.owner.surname
        let email = this.invit.owner.email
        return `${name} ${surname} <br><i>${email}</i>`
      },
      inviteeIcon() {
        let inviteeIcon =  this.invit.invitee_type === 'group' ? 'icon-users' : 'icon-user'
        return inviteeIcon
      },
      sentToUserTypeText() {
        let sentToTypeText = this.invit.invitee_type === 'group' ? 'invitations.sentToGroup' : 'invitations.sentToUser'
        return sentToTypeText
      },
      invitSentDate() {
        let date = new Date(this.invit.created_date)
        let invitDate =  date.toLocaleDateString(this.$i18n.locale)
        let invitTime =  date.toLocaleTimeString(this.$i18n.locale)
        return { date: invitDate, time: invitTime }
      },
      btnActions() {
        let actions = this.invitActions.filter( act => act.for.includes(this.invitType) )
        return actions
      },
      btnAction() {
        let actionSelected = this.invitActions.find( act => act.action === this.action )
        return actionSelected
      },
      btnActionIcon() {
        let actionSelected = this.btnAction
        return actionSelected.icon
      },
      btnActionLabel() {
        let actionSelected = this.btnAction
        return actionSelected.label
      },
      btnActionColor() {
        let actionSelected = this.btnAction
        return actionSelected.color
      },
      btnIsDisabled() {
        return this.isloading || this.invit.invitation_status !== 'pending'
      }
    },
    methods: {
      updateItemDebounced(field, val) {
        // cancel pending call
        clearTimeout(this._timerId)

        // delay new call 500ms
        this._timerId = setTimeout(() => {
          this.updateItem(field, val)
        }, 500)
      },
      updateItem(field, val) {
        this.log && console.log("\nC-InvitationItem > updateItem > field : ", field)
        this.log && console.log("C-InvitationItem > updateItem > val : ", val)
        let url = `${this.api.invitations}/${this.invit.id}`
        if ( field === 'auths' ) {
          let authObj = this.authChoices.find( auth => auth.name === val )
          val = authObj.auths
        }
        let payload = { ...this.invit }
        payload[ field ] = val 
        this.isLoading = true
        this.$axios.put( url, payload, this.headerUser)
          .then(resp => {
            this.log && console.log('C-InvitationItem > updateItem > edit > resp.data : ', resp.data)
            this.$store.dispatch(`invitations/updateUserItem`, { data: resp.data })
            let rooms = [ resp.data.invitee ]
            let callback = { item_type: 'invitation', method: 'get' }
            this.ioBroadcastAction( resp.data, rooms,  callback )
            this.isLoading = false
          })
          .catch(error => {
            this.isLoading = false
          })
      },
      ioBroadcastAction(ioData, rooms, callback ) {
        this.log && console.log("C-InvitationItem > ioBroadcastAction > ioData : ", ioData)
        let payload = {
          from_user_email: this.user.email,
          item_type: 'invitation',
          item_id: ioData.id,
          target_rooms: rooms,
          action: this.action,
          callback: callback
        }
        this.log && console.log("C-InvitationItem > ioBroadcastAction > payload : ", payload)
        this.socket.emit('broadcast_action', payload)
      },
      handleAction() {
        this.log && console.log("C-InvitationItem > handleAction > this.action : ", this.action)
        let payload = {
          invitation_id: this.invit.id,
          action: this.action,
        } 
        this.log && console.log("C-InvitationItem > handleAction > payload : ", payload)
        let url = `${this.api.invitations}/${this.invit.id}`
        this.isLoading = true
        this.log && console.log('C-InvitationItem > handleAction > invite > url :' , url)
        

        // shared's invitations => accept/refuse
        const respActions = [ 'accept', 'refuse' ] 
        if (this.invitType === 'received' && respActions.includes(this.action) ) {
          this.$axios.post( url, payload, this.headerUser)
            .then(resp => {
              this.log && console.log('C-InvitationItem > handleAction > accept/refuse > resp.data : ', resp.data)
              this.$store.dispatch(`invitations/updateSharedItem`, { data: resp.data })
              let rooms = [ resp.data.owner.email ]
              let callback = { item_type: 'invitation', method: 'get' }
              this.ioBroadcastAction( resp.data, rooms, callback )
              this.isLoading = false
            })
            .catch(error => {
              this.isLoading = false
            })
        }

        // user's invitations => remove
        if (this.invitType === 'sent' && this.action === 'remove' ) {
          this.$axios.delete( url, this.headerUser)
            .then(resp => {
              this.log && console.log('C-InvitationItem > handleAction > remove > resp.data : ', resp.data)
              this.$store.dispatch(`invitations/removeUserItem`, { data: resp.data })
              let rooms = [ resp.data.invitee ]
              let callback = { item_type: 'invitation', method: 'get', get_list: true, url: `${this.api.users}/me/invitations` }
              this.ioBroadcastAction( resp.data, rooms, callback )
              this.isLoading = false
            })
            .catch(error => {
              this.isLoading = false
            })
        } 

        // user's invitations => edit
        if (this.invitType === 'sent' && this.action === 'edit' ) {
          this.showDetails = true
          this.isLoading = false
          this.editMode = !this.editMode
          // this.$axios.put( url, payload, this.headerUser)
          //   .then(resp => {
          //     this.log && console.log('C-InvitationItem > handleAction > edit > resp.data : ', resp.data)
          //     this.$store.dispatch(`invitations/updateUserItem`, { data: resp.data })
          //     let rooms = [ resp.data.invitee ]
          //     let callback = { item_type: 'invitation', method: 'get' }
          //     this.ioBroadcastAction( resp.data, rooms,  callback )
          //     this.isLoading = false
          //   })
          //   .catch(error => {
          //     this.isLoading = false
          //   })
        }

        // user's invitations => comment
        if (this.action === 'comment' ) {
          // update invitation
          this.$axios.put( url, payload, this.headerUser)
            .then(resp => {
              this.log && console.log('C-InvitationItem > handleAction > comment > resp.data : ', resp.data)
              let rooms = this.invitType === 'sent' ? [ resp.data.invitee ] : [ resp.data.owner.email ]
              let callback = { item_type: 'invitation', method: 'get' }
              this.ioBroadcastAction( resp.data, rooms, callback )
              this.isLoading = false
            })
            .catch(error => {
              this.isLoading = false
            })
        }

      },
    }
  }
</script>
