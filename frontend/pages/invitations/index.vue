<template>

  <v-container class="mb-12">

    <v-row
      fill-height
      class="justify-center align-top"
      >

      <v-col 
        cols="10"
        class="offset-1"
        >

        <!-- GROUPS / DRAGGABLE -->
        <draggable
          v-model="myInvitations"
          v-bind="dragOptions"
          draggable=".invitation"
          invitation="invitations"
          @start="drag=true"
          @end="drag=false; updateInvitationPositions()"
          >
          <!-- <InvitationItem
            v-for="invit in myInvitations"
            :key="invit.id"
            :invitation="invit"
            :apiUrl="apiUrl"
            :dragging="drag"
          /> -->
        </draggable>
        
        <!-- ADD GROUP -->
        <v-card
          class="mb-5 pb-5 pl-2"
          flat
          >

          <v-card-title v-if="! myInvitations.length">
            {{ $t('invitations.defaultHelp') }}
          </v-card-title>

          <v-btn 
            text
            rounded
            large
            class="text-none pl-2 pr-4 text-h6 font-weight-bold" 
            color="grey"
            @click="dialog += 1"
            >
            <span>
              <v-icon class="pb-1 mr-2">
                icon-plus-circle
              </v-icon>
              {{ $t('invitations.addInvitation') }}
            </span>
          </v-btn>

          <!-- DIALOG FOR NEW GROUP INFOS -->
          <ModalItem
            :item="newInvitation"
            :noAvatar="true"
            :itemModel="itemModel"
            :parentDialog="dialog"
            :itemType="itemType"
            :action="'create'"
            :apiUrl="apiUrl"
            @createItem="createInvitation"
            @resetEmptyItem="resetEmptyInvitation()"
          />

        </v-card>

      </v-col>
    </v-row>

  </v-container>

</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'
  import { Invitation } from '@/utils/utilsInvitations'
  import { mapOrder } from '@/utils/utilsFunctions'

  export default {
    name: 'Invitations',
    layout: 'layoutListings',
    components: {
      // InvitationItem: () => import(/* webpackChunkName: "InvitationItem" */ '@/components/data/InvitationItem.vue'),
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
        drag: false,
        pathItems: [
          { 
            text: 'pages.invitations',
            disabled: true,
            to: '/invitations',
          }
        ],
        itemType: 'invitations',
        apiUrl: undefined,
        newInvitation: undefined,
        emptyInvitation: undefined,
        myInvitations: [],
      }
    },
    beforeMount () {
      this.updatePath(this.pathItems)
      this.orderInvitations()
      this.resetEmptyInvitation()
      this.apiUrl = this.api[this.itemType]
    },
    watch: {
      userInvitations (next) {
        // this.log && console.log("P-Invitations > watch > userInvitations > next : ", next)
        this.orderInvitations()
        // this.resetEmptyInvitation()
        this.updateInvitationPositions()
      }
    },
    computed: {
      dragOptions() {
        return {
          animation: 200,
          invitation: "invitations",
          disabled: false,
          ghostClass: "ghost"
        }
      },
      ...mapState({
        log: (state) => state.log,
        appTitle: (state) => state.appTitle,
        api: (state) => state.api,
        itemModel: (state) => state.invitations.itemModel,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
        userId: 'user/userId',
        uxInvitations: 'invitations/getUserUx',
        userInvitations: 'invitations/getUserItems',
        sharedInvitations: 'invitations/getSharedItems',
        headerUser: 'user/headerUser'
      })
    },
    methods: {
      ...mapActions({
        updatePath: 'updateCrumbsPath',
      }),
      orderInvitations() {
        if (this.uxInvitations && this.uxInvitations.invitations_order) {
          const invitations_order = this.uxInvitations.invitations_order
          this.myInvitations = mapOrder( [...this.userInvitations], invitations_order, 'id')
        } else {
        // this.myInvitations =[ ...this.userInvitations, ...this.myInvitationsDummies ]
          this.myInvitations = [...this.userInvitations]
        }
      },
      resetEmptyInvitation() {
        let emptyInvitation = new Invitation(
          this.userId,
          this.$t('invitations.defaultTitle'),
          this.$t('invitations.defaultMessage'),
        )
        // emptyInvitation.randomBasics = true
        this.emptyInvitation = emptyInvitation.data
        this.newInvitation = emptyInvitation.data
      },
      createInvitation(itemPayload) {
        // this.log && console.log("\nP-Invitations > createInvitation > itemPayload : ", itemPayload)
        // let now = new Date(Date.now())
        this.$axios
          .post(`${this.api.invitations}/`, itemPayload, this.headerUser)
          .then(resp => {
            this.$store.dispatch(`invitations/appendUserItem`, resp.data)
            this.resetEmptyInvitation()
          })
      },
      updateInvitationPositions() {
        // this.log && console.log("\nP-Invitations > updateInvitationPositions > this.myInvitations : ", this.myInvitations)
        let invitIndexes = this.myInvitations.map(invit => invit.id)
        let payloadUser = {
          ux_invitations: {
            invitations_order: invitIndexes
          }
        }
        // this.log && console.log("P-Invitations > updateInvitationPositions > invitIndexes : ", invitIndexes)
        this.$axios
          .put(`${this.api.users}/me/ux`, payloadUser, this.headerUser)
          .then(resp => {
            // this.log && console.log('P-Invitations > updateInvitationPositions > resp.data : ', resp.data)
            this.$store.dispatch('invitations/populateUserUX', resp.data.ux_invitations)
          })
      }
    }
  }

</script>
