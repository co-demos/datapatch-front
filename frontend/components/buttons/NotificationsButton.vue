<template>

  <v-menu
    offset-y
    close-on-click
    open-on-hover
    color="white"
    >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        dark
        small
        class="mr-3"
        v-bind="attrs"
        v-on="on"
        >
        <v-badge
          :value="newNotifs"
          class=""
          color="red"
          overlap
          dark
          dot
          >
          <v-icon
            small
            >
            icon-bell
          </v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-list 
      dense 
      >
      <v-list-item>
        <v-list-item-action>
          <v-badge
            :value="newNotifs"
            color="red"
            overlap
            dot
            >
            <v-icon class="mr-2">
              icon-bell
            </v-icon>
          </v-badge>
        </v-list-item-action>
        <v-list-item-content class="text-left">
          <span class="mt-1 font-italic ml-n1">
            {{ $tc( 'notifications.notifsCount', newNotifs, { count: newNotifs } ) }}
          </span>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider 
      class="bg-white"
    />

    <v-list
     dense
     light
      >

      <v-list-item 
        to="/invitations?invitType=received"
        router
        exact
        >
        <v-list-item-action>
          <v-badge
            :content="notif_invitations.length"
            :value="notif_invitations.length"
            color="red"
            overlap
            >
            <v-icon small class="mr-2">
              icon-user-plus
            </v-icon>
          </v-badge>
        </v-list-item-action>
        <v-list-item-content>
          <span class="mt-1 mx-1">
            {{ $tc( 'notifications.userInvitationsResp', notif_invitations.length, { count: notif_invitations.length } ) }}
          </span>
        </v-list-item-content>
      </v-list-item>

      <v-list-item 
        to="/messages"
        router
        exact
        disabled
        >
        <v-list-item-action>
          <v-badge
            :content="notif_messages.length"
            :value="notif_messages.length"
            color="red"
            overlap
            >
            <v-icon small class="mr-2 mb-n1">
              icon-mail
            </v-icon>
          </v-badge>
        </v-list-item-action>
        <v-list-item-content>
          <span class="mt-1 mx-1">
            {{ $tc( 'notifications.userMessagesReceived', notif_messages.length, { count: notif_messages.length } ) }}
          </span>
        </v-list-item-content>
      </v-list-item>

      <v-list-item 
        to="/moderations"
        router
        exact
        disabled
        >
        <v-list-item-action>
          <v-badge
            :content="notif_moderations.length"
            :value="notif_moderations.length"
            color="red"
            overlap
            >
            <v-icon small class="mr-2 mb-n1">
              icon-message-square
            </v-icon>
          </v-badge>
        </v-list-item-action>
        <v-list-item-content>
          <span class="mt-1 mx-1">
            {{ $tc( 'notifications.userModerationResp', notif_moderations.length, { count: notif_moderations.length } ) }}
          </span>
        </v-list-item-content>
      </v-list-item>

    </v-list>

  </v-menu>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'NotificationsButton',
    data () {
      return {
        connected: false,
        notif_invitations: [],
        notif_messages: [],
        notif_moderations: [],

      }
    },
    beforeMount() {
      this.notif_invitations = [ ...this.pendingInvitations ]
    },
    watch: {
      pendingInvitations(next, prev) {
        this.notif_invitations = [ ...next ]
      },
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
        userData: (state) =>  state.user.userData,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
        userId: 'user/userId',
        pendingInvitations: 'invitations/getSharedItemsPending',
      }),
      newNotifs() {
        let invits = this.notif_invitations.length
        let messages = this.notif_messages.length
        let moderations = this.notif_moderations.length
        return invits + messages + moderations
      }
    }
  }

</script>
