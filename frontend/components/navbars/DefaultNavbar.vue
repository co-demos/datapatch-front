<template>

  <v-container class="DefaultNavbar">

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :expand-on-hover="miniVariant"
      fixed
      app
      style="max-height: 100%"
      >

      <MenuList
        :items="items"
        :isFirst="true"
      />

      <MenuList 
        v-if="isAuthenticated"
        :items="itemsUser.connected"
      />

      <MenuList 
        v-else
        :items="itemsUser.notConnected"
      />

      <MenuList
        :items="itemsLegal"
      />

    </v-navigation-drawer>

    <v-app-bar
      :color="navbarColor || 'primary'"
      :class="`px-4`"
      clipped-left
      dark
      fixed
      dense
      flat
      app
      :style="`${addBorder ? 'border-bottom: 1px dashed rgba(255, 255, 255, .3) !important;': ''}`"
      >
      <!-- :extension-height="searchHeight" -->
      <!-- :style="`${ searchOpen ? 'box-shadow: 0 20px 10px -2px white !important;' : ''}`" -->

      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-app-bar-nav-icon
            small
            class="mx-3"
            v-bind="attrs"
            v-on="on"
            @click.stop="drawer = !drawer"
            >
            <v-icon small>
              icon-menu
            </v-icon>
          </v-app-bar-nav-icon>
        </template>
        {{ $t('buttons.drawer')}}
      </v-tooltip>

      <v-toolbar-title>
        <nuxt-link
          class="white--text link-light"
          to="/"
          >

          <span v-if="!noTitle">
            {{ title }}
          </span>

          <span v-else>
            DP
          </span>

          <!-- <div class="pt-12" v-else>
            <LogoAnimated
              :yoyo="true"
              :repeat="0"
              :animated="true"
              :height="'60px'"
              :customColor="'white'"
              :customColorBis="'white'"
              :customTextBis="' '"
              :customText="' '"
            />
          </div> -->

        </nuxt-link>
      </v-toolbar-title>

      <BackRouter v-if="!noBack && $nuxt.context.from"/>

      <Breadcrumbs/>

      <v-spacer/>

      <Languages/>

      <!-- DEBUGGING / TEST IO -->
      <v-btn
        v-if="false"
        elevation="0"
        class="ml-5 mr-3"
        fab
        x-small
        :color="searchOpen ? 'white' : 'transparent'"
        @click.stop="ioBroadcastAction(
          {}, // ioData - item
          [ 'jparis.py@gmail.com' ], // rooms
          { item_type: 'item', method: 'get', get_list: false } // callback
        )"
        >
        <v-icon
          :class="searchOpen ? 'primary--text' : ''"
          small
          >
          icon-mail
        </v-icon>
      </v-btn>

      <NotificationsButton v-if="isAuthenticated"/>

      <UserButton/>

      <v-tooltip 
        bottom
        >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            elevation="0"
            class="ml-5"
            fab
            :color="searchOpen ? 'white' : 'transparent'"
            x-small
            v-bind="attrs"
            v-on="on"
            @click.stop="closeCommentsBox(); searchOpen = !searchOpen"
            >
            <v-icon
              :class="searchOpen ? 'primary--text' : ''"
              small
              >
              icon-search1
            </v-icon>
          </v-btn>
        </template>
        <span>
          {{ $t('workspaces.searchDataset') }}
        </span>
      </v-tooltip>

    </v-app-bar>

    <v-dialog
      v-model="searchOpen"
      fullscreen
      hide-overlay
      transition="dialog-top-transition"
      >

      <v-card
        :color="navbarColor || 'primary'"
        >
        
        <!-- CLOSE MODAL -->
        <v-card-actions class="mr-5 pt-3 pb-0 px-0">
          <v-spacer></v-spacer>
          <v-btn
            icon
            small
            rounded
            elevation="0"
            @click="closeCommentsBox(); searchOpen = false"
            dark
            >
            <v-icon>icon-clear</v-icon>
          </v-btn>
        </v-card-actions>

        <v-card-title class="white--text justify-center">
          {{ $t('datapatch.testSearch') }}
        </v-card-title>

        <v-row
          class="align-center justify-center py-3"
          >
          <v-col
            cols="10"
            class="mb-12"
            :height="searchHeight"
            >
            <SearchAny
              :itemTypes="['users', 'groups', 'workspaces', 'datasets', 'tables']"
              :searchLabel="'buttons.searchText'"
              :searchPlaceholder="'buttons.queryText'"
              :flat="true"
              :solo="true"
              :light="true"
              :dense="false"
              :customClass="''"
              :customColor="'white'"
              :relatedSpace="'navbar'"
              @closeModal="searchOpen = false"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

  </v-container>

</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'DefaultNavbar',
    components: {
      Languages: () => import('@/components/buttons/Languages.vue'),
      NotificationsButton: () => import('@/components/buttons/NotificationsButton.vue'),
      UserButton: () => import('@/components/buttons/UserButton.vue'),
    },
    props: [
      'noTitle',
      'noBack',
      'getDatasetColor',
      'forceColor',
      'addBorder'
    ],
    watch: {
      isAuthenticated(next) {
        this.drawer = next ? true : false
      },
    },
    data () {
      return {
        title: 'Data patch',
        clipped: true,
        drawer: false,
        miniVariant: true,
        fixed: false,
        searchHeight: "600px",
        searchOpen: false,

        items: [
          {
            icon: 'icon-home',
            title: 'pages.home',
            to: '/'
          },
          {
            icon: 'icon-info1',
            title: `pages.documentation`,
            to: '/documentation',
            disabled: true
          },
        ],
        itemsLegal: [
          { divider: true },
          {
            icon: 'icon-gavel',
            title: `pages.legal`,
            to: '/legal',
          },
        ],

        itemsUser: {
          connected: [
            { divider: true },
            {
              icon: 'icon-database',
              title: `pages.myWorkspaces`,
              to: '/workspaces'
            },
            {
              icon: 'icon-clipboard',
              title: `pages.mySchemas`,
              to: '/schemas',
              disabled: true
            },
            { divider: true },
            {
              icon: 'icon-users',
              title: 'pages.groups',
              to: '/groups'
            },
            {
              icon: 'icon-user-plus',
              title: 'pages.invitations',
              to: '/invitations'
            },
            {
              icon: 'icon-mail',
              title: 'pages.messages',
              to: '/messages'
            },
            { divider: true },
            {
              icon: 'icon-user',
              title: 'pages.me',
              to: '/me'
            },
            // {
            //   icon: 'icon-bell',
            //   title: 'pages.notifications',
            //   to: '/notifications'
            // },
            // { divider: true },
            {
              icon: 'icon-log-out',
              title: 'login.out',
              to: '/logout'
            },
          ],
          notConnected: [
            { divider: true },
            {
              icon: 'icon-database',
              title: `pages.workspaces`,
              to: '/workspaces'
            },
            {
              icon: 'icon-clipboard',
              title: `pages.schemas`,
              to: '/schemas'
            },
            { divider: true },
            {
              icon: 'icon-log-in',
              title: 'login.in',
              to: '/login'
            },
            {
              icon: 'icon-edit-3',
              title: 'login.sign',
              to: '/sign'
            },
          ],
        }
      }
    },
    mounted() {
      this.socket = this.$nuxtSocket({
        name: 'main',
        path: '/ws/socket.io',
        transport: ['websocket'],
      })
      this.socket.on('handshake', (data) => {
        this.log && console.log("\nC-NotificationsButton > mounted > this.socket - handshake > data : ", data)
        this.log && console.log("C-NotificationsButton > mounted > this.socket - handshake > this.user : ", this.user)
        if (this.user.id) {
          this.socket.emit('join_own_room', {
            sid: data.sid,
            user_email: this.user.email,
            user_id: this.user.id
          })
        }
      })
      this.socket.on('own_room', (data) => {
        this.log && console.log("\nC-NotificationsButton > mounted > this.socket - own_room > data : ", data)
      })
      this.socket.on('action_message', (data) => {
        this.log && console.log("\nC-NotificationsButton > mounted > this.socket - action_message > data : ", data)
        if (data.callback.method === 'get' && !data.callback.get_list ) {
          this.getItem(data)
        }
        if (data.callback.method === 'get' && data.callback.get_list ) {
          this.getItems(data)
        }
      })
    },
    computed: {
      navbarColor() {
        let color
        if (this.forceColor) {
          color = this.forceColor
        } else {
          color = this.getDatasetColor ? this.currentDataset.color : 'primary'
        }
        return color
      },
      ...mapState({
        log: (state) =>  state.log,
        user: (state) =>  state.user.userData,
        api: (state) => state.api,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
        userId: 'user/userId',
        currentDataset: 'datasets/getCurrentItem',
        headerUser: 'user/headerUser'
      })
    },
    methods: {
      ...mapActions({
        togggleShowCommentsBox: 'comments/togggleShowCommentsBox',
        // populateCurrentItem: 'comments/populateCurrentItem',
      }),
      closeCommentsBox() {
        this.togggleShowCommentsBox(false)
        // this.$emit('closeComment')
      },
      ioBroadcastAction(ioData, rooms, callback) {
        // FOR TESTING PURPOSES
        this.log && console.log("C-InvitationItem > ioBroadcastAction > ioData : ", ioData)
        let payload = {
          from_user_email: this.user.email,
          item_type: 'invitation',
          item_id: 40,
          target_rooms: rooms,
          action: 'accept',
          callback: callback
        }
        this.log && console.log("C-InvitationItem > ioBroadcastAction > payload : ", payload)
        this.socket.emit('broadcast_action', payload)
      },
      getItem(data) {
        this.log && console.log("\nC-NotificationsButton > getItem > data : ", data)
        const itemTypePlural = `${data.callback.item_type}s`
        const url = data.callback.url ? data.callback.url : `${this.api[itemTypePlural]}/${data.item_id}`
        this.$axios.get( url, this.headerUser )
          .then(resp => {
            this.log && console.log('C-NotificationsButton > getItem > resp.data : ', resp.data)
            let isCurrentUserOwner = resp.data.owner_id === this.user.id ? 'updateUserItem' : 'updateSharedItem'
            this.log && console.log('C-NotificationsButton > getItem > isCurrentUserOwner : ', isCurrentUserOwner)
            this.$store.dispatch(`${itemTypePlural}/${isCurrentUserOwner}`, {data: resp.data})
            this.isLoading = false
          })
          .catch(error => {
            this.isLoading = false
          })
      },
      getItems(data) {
        this.log && console.log("\nC-NotificationsButton > getItems > data : ", data)
        const itemTypePlural = `${data.callback.item_type}s`
        const url = data.callback.url ? data.callback.url : `${this.api[itemTypePlural]}`
        this.$axios.get( url, this.headerUser )
          .then(resp => {
            this.log && console.log('C-NotificationsButton > getItems > resp.data : ', resp.data)
            let itemsUser = resp.data.filter( item => item.owner_id === this.user.id )
            if (itemTypePlural === 'invitations' ) {
              let itemsShared = resp.data.filter( item => item.invitee === this.user.email )
            } else {
              let itemsShared = resp.data.filter( item => item.owner_id !== this.user.id )
            }
            this.$store.dispatch(`${itemTypePlural}/populateUserItems`, itemsUser )
            this.$store.dispatch(`${itemTypePlural}/populateSharedItems`, itemsShared )
            this.isLoading = false
          })
          .catch(error => {
            this.isLoading = false
          })
      }
    }
  }
</script>
