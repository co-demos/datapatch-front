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
          @click="changeActiveInvitationType('received')"
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
          @click="changeActiveInvitationType('sent')"
          >
          {{ $t('invitations.userInvitationsSent')}}
        </v-btn>
      </v-col>
    </v-row>

    <v-slide-x-transition>
      <InvitationsList
        v-show="invitType === 'received'"
        :invits="sharedInvitations"
        :invitType="'received'"
        :cols="cols"
        :offsetCols="offsetCols"
      />
    </v-slide-x-transition>

    <v-slide-x-reverse-transition>
      <InvitationsList
        v-show="invitType === 'sent'"
        :invits="userInvitations"
        :invitType="'sent'"
        :cols="cols"
        :offsetCols="offsetCols"
      />
    </v-slide-x-reverse-transition>

  </v-container>

</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'
  // import { Invitation } from '@/utils/utilsInvitations'
  // import { mapOrder } from '@/utils/utilsFunctions'

  export default {
    name: 'Invitations',
    layout: 'layout_listings',
    // middleware: [
    //   'getUserInvitations'
    // ],
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
        invitType: undefined,
        cols: 11,
        offsetCols: 0,
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
      if( this.$route.query.invitType ) {
        this.changeActiveInvitationType( this.$route.query.invitType )
      } else {
        this.changeActiveInvitationType('received')
      }
    },
    mounted() {
      // this.socket = this.$nuxtSocket({
      //   name: 'main', // Use socket "home"
      //   path: '/ws/socket.io',
      //   transport: ['websocket'],
      // })
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
    },
    methods: {
      ...mapActions({
        updatePath: 'updateCrumbsPath',
      }),
      params(data) {
        return Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
      },
      changeActiveInvitationType(invitType) {
        this.log && console.log("P-Invitations > changeActiveInvitationType > invitType : ", invitType)
        this.invitType = invitType
        this.log && console.log("P-Invitations > changeActiveInvitationType > this.$route : ", this.$route)
        
        // change url without reloading page
        let queries = JSON.parse(JSON.stringify(this.$route.query))
        queries.invitType = invitType
        // this.$router.push({ path: this.$route.path, query: { ...this.$route.query, invitType: invitType }})
        // this.$router.replace({ path: this.$route.path, query: { ...this.$route.query, invitType: invitType }})
        // this.$router.replace({ query: { ...this.$route.query, invitType: invitType }})
        // this.$router.replace({ query: queries })
        history.replaceState({}, null, `${this.$route.path}?${this.params(queries)}` )
      }
    }
  }

</script>
