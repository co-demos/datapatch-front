<template>

  <v-container class="mb-12 mt-6 mx-0 pb-12">

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
          :color="msgType === 'sent' ? 'grey lighten-1' : 'primary'"
          class="text-center text-none"
          @click="changeActiveMessageType('received')"
          >
          <v-icon small class="mr-3">
            icon-inbox
          </v-icon>
          {{ $t('messages.userMessagesReceived')}}
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
          :color="msgType === 'sent' ? 'primary' : 'grey lighten-1'"
          class="text-center text-none"
          @click="changeActiveMessageType('sent')"
          >
          <v-icon small class="mr-3">
            icon-send
          </v-icon>
          {{ $t('messages.userMessagesSent')}}
        </v-btn>
      </v-col>
    </v-row>

    <!-- <v-slide-x-transition>
      <InvitationsList
        v-show="msgType === 'received'"
        :invits="sharedMessages"
        :msgType="'received'"
        :cols="cols"
        :offsetCols="offsetCols"
      />
    </v-slide-x-transition>

    <v-slide-x-reverse-transition>
      <InvitationsList
        v-show="msgType === 'sent'"
        :invits="userMessages"
        :msgType="'sent'"
        :cols="cols"
        :offsetCols="offsetCols"
      />
    </v-slide-x-reverse-transition> -->

  </v-container>

</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'
  // import { Invitation } from '@/utils/utilsInvitations'
  // import { mapOrder } from '@/utils/utilsFunctions'

  export default {
    name: 'Messages',
    layout: 'layout_listings',
    // middleware: [
    //   'getUserInvitations'
    // ],
    components: {
      // InvitationsList: () => import(/* webpackChunkName: "InvitationsList" */ '@/components/invitations/InvitationsList.vue'),
      // InvitationsFilters: () => import(/* webpackChunkName: "InvitationsFilters" */ '@/components/invitations/InvitationsFilters.vue'),
      // InvitationItem: () => import(/* webpackChunkName: "InvitationItem" */ '@/components/invitations/InvitationItem.vue'),
    },
    head() {
      return {
        title: `${this.appTitle} - ${this.$t('pages.messages')}`,
        htmlAttrs: {
          lang: this.$i18n.locale
        },
      }
    },
    data () {
      return {
        msgType: undefined,
        cols: 11,
        offsetCols: 0,
        pathItems: [
          { 
            text: 'pages.messages',
            disabled: true,
            to: '/messages',
          }
        ],
        itemType: 'messages',
        isLoading: false,
      }
    },
    beforeMount () {
      this.updatePath(this.pathItems)
      if( this.$route.query.msgType ) {
        this.changeActiveMessageType( this.$route.query.msgType )
      } else {
        this.changeActiveMessageType('received')
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
      userMessages (next) {
        this.log && console.log("P-Messages > watch > userMessages > next : ", next)
      },
      sharedMessages (next) {
        this.log && console.log("P-Messages > watch > sharedMessages > next : ", next)
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
        userMessages: 'messages/getUserItems',
        sharedMessages: 'messages/getSharedItems',
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
      changeActiveMessageType(msgType) {
        this.log && console.log("P-Messages > changeActiveMessageType > msgType : ", msgType)
        this.msgType = msgType
        this.log && console.log("P-Messages > changeActiveMessageType > this.$route : ", this.$route)
        
        // change url without reloading page
        let queries = JSON.parse(JSON.stringify(this.$route.query))
        queries.msgType = msgType
        // this.$router.push({ path: this.$route.path, query: { ...this.$route.query, msgType: msgType }})
        // this.$router.replace({ path: this.$route.path, query: { ...this.$route.query, msgType: msgType }})
        // this.$router.replace({ query: { ...this.$route.query, msgType: msgType }})
        // this.$router.replace({ query: queries })
        history.replaceState({}, null, `${this.$route.path}?${this.params(queries)}` )
      }
    }
  }

</script>
