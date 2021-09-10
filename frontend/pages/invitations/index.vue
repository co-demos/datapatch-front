<template>

  <v-container class="mb-12 mt-6 mx-0">

    <v-row
      fill-height
      class="justify-center align-top mb-10"
      >
      <v-col 
        :cols="cols/2"
        :class="`offset-${offsetCols}`"
        >
        <v-btn 
          block
          rounded
          elevation="0"
          dark
          :color="invitType === 'sent' ? 'grey lighten-1' : 'primary'"
          class="text-center"
          @click="invitType = 'received'"
          >
          {{ $t('invitations.userInvitationsReceived')}}
        </v-btn>
      </v-col>
      <v-col 
        :cols="cols/2"
        class=""
        >
        <v-btn 
          block
          rounded
          elevation="0"
          dark
          :color="invitType === 'sent' ? 'primary' : 'grey lighten-1'"
          class="text-center"
          @click="invitType = 'sent'"
          >
          {{ $t('invitations.userInvitationsSent')}}
        </v-btn>
      </v-col>
    </v-row>

    <InvitationsList
      v-show="invitType === 'sent'"
      :invits="userInvitations"
      :invitType="'sent'"
      :cols="cols"
      :offsetCols="offsetCols"
    />

    <InvitationsList
      v-show="invitType === 'received'"
      :invits="sharedInvitations"
      :invitType="'received'"
      :cols="cols"
      :offsetCols="offsetCols"
    />

    <!-- <v-row
      class="justify-center"
      >
      <v-col 
        cols="10"
        class="offset-1"
        >
        <InvitationsFilters
          :invitType="invitType"
        />
      </v-col>
    </v-row>

    <v-row
      class="justify-center"
      >
      <v-col 
        cols="10"
        class="offset-1"
        >
        <InvitationItem
          v-for="invit in shownInvits"
          :key="invit.id"
          :invit="invit"
          :invitType="invitType"
        />
      </v-col>
    </v-row> -->

  </v-container>

</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'
  // import { Invitation } from '@/utils/utilsInvitations'
  // import { mapOrder } from '@/utils/utilsFunctions'

  export default {
    name: 'Invitations',
    layout: 'layout_listings',
    middleware: [
      'getUserInvitations'
    ],
    components: {
      InvitationsList: () => import(/* webpackChunkName: "InvitationsList" */ '@/components/invitations/InvitationsList.vue'),
      // InvitationsFilters: () => import(/* webpackChunkName: "InvitationsFilters" */ '@/components/invitations/InvitationsFilters.vue'),
      // InvitationItem: () => import(/* webpackChunkName: "InvitationItem" */ '@/components/invitations/InvitationItem.vue'),
    },
    head() {
      return {
        title: `${this.appTitle} - ${this.$t('pages.invitations')}`,
        htmlAttrs: {
          lang: this.$i18n.locale
        },
      }
    },
    data () {
      return {
        invitType: 'received',
        cols: 10,
        offsetCols: 1,
        pathItems: [
          { 
            text: 'pages.invitations',
            disabled: true,
            to: '/invitations',
          }
        ],
        itemType: 'invitations',
        isLoading: false,
      }
    },
    beforeMount () {
      this.updatePath(this.pathItems)
    },
    watch: {
      userInvitations (next) {
        this.log && console.log("P-Invitations > watch > userInvitations > next : ", next)
      },
      sharedInvitations (next) {
        this.log && console.log("P-Invitations > watch > sharedInvitations > next : ", next)
      },
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        appTitle: (state) => state.appTitle,
        api: (state) => state.api,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
        userId: 'user/userId',
        userInvitations: 'invitations/getUserItems',
        sharedInvitations: 'invitations/getSharedItems',
        headerUser: 'user/headerUser'
      }),
      // shownInvits() {
      //   if (this.invitType === 'sent') {
      //     return this.userInvitations
      //   } else {
      //     return this.sharedInvitations
      //   }
      // }
    },
    methods: {
      ...mapActions({
        updatePath: 'updateCrumbsPath',
      }),
    }
  }

</script>
