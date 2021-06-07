<template>

  <v-container>

    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :expand-on-hover="miniVariant"
      fixed
      app
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

    </v-navigation-drawer>

    <v-app-bar
      :color="navbarColor || 'primary'"
      class="px-4"
      clipped-left
      dark
      fixed
      dense
      flat
      app
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

      <v-toolbar-title v-if="!noTitle">
        <nuxt-link
          class="white--text link-light"
          to="/"
          >
          {{ title }}
        </nuxt-link>
      </v-toolbar-title>

      <BackRouter v-if="!noBack && $nuxt.context.from"/>

      <Breadcrumbs/>

      <v-spacer/>

      <Languages/>

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
            @click.stop="searchOpen = !searchOpen"
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

      <!-- <template
        v-slot:extension
        v-if="searchOpen"
        >
        <v-row
          class="align-center justify-center ma-0"
          >
          <v-col
            cols="10"
            class=""
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
            />
          </v-col>
        </v-row>
      </template> -->

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
            @click="searchOpen = false"
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
            />
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>

  </v-container>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    components: {
      Languages: () => import('@/components/buttons/Languages.vue'),
      NotificationsButton: () => import('@/components/buttons/NotificationsButton.vue'),
      UserButton: () => import('@/components/buttons/UserButton.vue'),
    },
    props: [
      'noTitle',
      'noBack',
      'getDatasetColor',
      'forceColor'
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
            to: '/documentation'
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
              to: '/schemas'
            },
            { divider: true },
            {
              icon: 'icon-user',
              title: 'pages.me',
              to: '/me'
            },
            {
              icon: 'icon-bell',
              title: 'pages.notifications',
              to: '/notifications'
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
            { divider: true },
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
        log: (state) =>  state.log
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
        currentDataset: 'datasets/getCurrentItem',
      })
    }
  }
</script>
