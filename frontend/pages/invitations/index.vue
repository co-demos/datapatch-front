<template>

  <v-container class="mb-12 mt-6 mx-12">

    <v-row
      fill-height
      class="justify-center align-top"
      >

      <v-col 
        cols="5"
        class="offset-1"
        >
        <p class="text-center">
          {{ $t('invitations.userInvitationsReceived')}}
        </p>
        <p>
          <code><pre>{{ userInvitations }}</pre></code>
        </p>
      </v-col>

      <v-col 
        cols="5"
        class=""
        >
        <p class="text-center">
          {{ $t('invitations.userInvitationsSent')}}
        </p>
        <p>
          <code><pre>{{ sharedInvitations }}</pre></code>
        </p>
      </v-col>

    </v-row>

  </v-container>

</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'
  // import { Invitation } from '@/utils/utilsInvitations'
  import { mapOrder } from '@/utils/utilsFunctions'

  export default {
    name: 'Invitations',
    layout: 'layout_listings',
    middleware: [
      'getUserInvitations'
    ],
    components: {
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
        dialog: 0,
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
      })
    },
    methods: {
      ...mapActions({
        updatePath: 'updateCrumbsPath',
      }),
    }
  }

</script>
