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

</style>

<template>

  <v-card
    elevation="0"
    outlined
    flat
    :class="`invit mb-2 py-3 ${hover ? 'add-border' : ''}`"
    :color="`${hover ? 'white' : 'grey lighten-4'}`"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    >

    <v-row class="ma-0 align-center">

      <!-- item invited to -->
      <v-col 
        cols="1"
        @click="showDetails = !showDetails"
        >
        <p class="text-center mb-1">
          <!-- <code>{{ invit.id }}</code> -->
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
        <!-- <p class="text-center mb-1">
            </template>
            <span class="grey--text">
              {{ $t( `dataPackage.${invit.invitation_to_item_type}`) }}
            </span>
        </p> -->

        <!-- <code>{{ invit.invitation_to_item_id }}</code> -->
        <v-row class="align-center font-weight-bold ma-0 pl-4">
          
          <v-col cols="2" class="pa-0">
            <ItemAvatar
              :item="invit.invitation_item"
              :heightAvatar="30"
            />
          </v-col>

          <v-col cols="10" class="pa-0 pt-1">
            <!-- <v-icon
              small
              class="mr-2"
              :color="invit.invitation_item.color"
              >
              {{ invit.invitation_item.icon }}
            </v-icon> -->
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
          elevation="0"
          :class="`${btnIsDisabled ? 'disabledBtn' : '' }`"
          :color="btnIsDisabled ? 'grey' : btnActionColor"
          :loading="isLoading"
          @click="handleAction()"
          >
          <v-icon
            small
            :color="`${ btnIsDisabled ? 'grey lighten-1' : 'white'}`"
            class="pr-2"
            >
            {{ btnActionIcon }}
          </v-icon>
          <span :class="`${ btnIsDisabled ? 'grey--text text--lighten-1' : ''}`">
            {{ $t(btnActionLabel) }}
          </span>
        </v-btn>
      </v-col>

      <!-- ACTION CHOICES -->
      <v-col cols="1" class="align-center justify-center pl-0">
        <v-menu
          open-on-hover
          offset-y
          :disabled="btnIsDisabled"
          >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              icon
              dense
              color="black"
              class="px-0"
              :disabled="btnIsDisabled"
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

        <!-- auth details -->
        <v-row  class="ma-0 mt-3 align-center justify-center pb-3">
          <v-col cols="3" class="text-center align-center grey--text">
            {{ $t('auth.authLevels') }} :
          </v-col>
          <v-col cols="9" class="text-left align-center">
            <v-row>
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
          </v-col>
        </v-row>

        <!-- message -->
        <v-divider class="border-dash"/>
        <v-row  class="ma-0 mt-3 align-top">
          <v-col cols="3" class="grey--text">
            <p class="text-center mb-2">
              {{ $t('dataPackage.message') }} :
            </p>
          </v-col>
          <v-col cols="9">
            <p class="mb-2">
              {{ invit.message }}
            </p>
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
        <v-row  class="ma-0 mt-3 align-top justify-center">
          <v-col cols="3" class="pl-4 text-center">
            <p>
              <span class="grey--text">
              {{ $t( `dataPackage.itemTypeSingular`) }} : 
              </span>
              <br>
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

          <v-col cols="4" class="pl-4 text-center">
            <span class="grey--text">
              {{ $t('invitations.sentBy') }} :
            </span>
            <br>
            {{ invitSender }}
          </v-col>

          <v-col cols="2" class="pl-4 text-center">
            <!-- <p>
              <span v-html="$t('invitations.sentDate', { date : invitSentDate.date } )"/>
            </p> -->
            <span class="grey--text">
              {{ $t('invitations.sentDate') }} :
            </span>
            <br>
            {{ invitSentDate.date }}
          </v-col>

          <v-col cols="3" class="pl-4 text-center">
            <!-- <p>
              <span v-html="$t('invitations.sentTime', { time : invitSentDate.time } )"/>
            </p> -->
            <span class="grey--text">
              {{ $t('invitations.sentTime') }} :
            </span>
            <br>
            {{ invitSentDate.time }}
          </v-col>
        </v-row>

      </div>
    </v-expand-transition>

  </v-card>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  import { ItemTypesOptions, InvitationStatuses } from '@/utils/utilsInvitations'
  import { AuthLevelsChoices } from '@/utils/utilsAuths'

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
            for: ['sent', 'received'] 
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
        ]
      }
    },
    beforeMount () {
      this.authChoices = [...AuthLevelsChoices]
      // choose default action for invitations
      this.action = this.invitType === 'sent' ? 'edit' : 'accept'
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
        return `${name} ${surname} (${email})`
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
      ioBroadcastAction(ioData) {
        this.log && console.log("C-InvitationItem > ioBroadcastAction > ioData : ", ioData)
        let payload = {
          from_user_email: this.user.email,
          item_type: 'invitation',
          item_id: ioData.id,
          target_rooms: [ioData.owner.email],
          // action: ioData.invitation_status,
          action: this.action,
          callback: { item_type: 'invitation', method: 'get' }
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

        // for responses
        if (this.invitType === 'received') {
          // accept/refuse invitation
          this.$axios.post( url, payload, this.headerUser)
            .then(resp => {
              this.log && console.log('C-InvitationItem > handleAction > resp.data : ', resp.data)
              this.$store.dispatch(`invitations/updateSharedItem`, {data: resp.data})
              this.ioBroadcastAction( resp.data )
              this.isLoading = false
            })
            .catch(error => {
              this.isLoading = false
            })
        } 
        
        // for updates
        else {
          // update invitation
          this.$axios.put( url, payload, this.headerUser)
            .then(resp => {
              this.log && console.log('C-InvitationItem > handleAction > resp.data : ', resp.data)
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
