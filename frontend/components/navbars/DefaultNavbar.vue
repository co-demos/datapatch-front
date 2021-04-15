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
      color="primary"
      class="px-4"
      clipped-left
      dark
      fixed
      dense
      flat
      app
      >

      <v-app-bar-nav-icon
        small
        class="ml-2"
        @click.stop="drawer = !drawer"
        >
        <v-icon small>
          icon-menu
        </v-icon>
      </v-app-bar-nav-icon>
      
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

    </v-app-bar>


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
    'noBack'
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
            title: `pages.myworkspaces`,
            to: '/workspaces'
          },
          {
            icon: 'icon-clipboard',
            title: `pages.myschemas`,
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
          {
            icon: 'icon-users',
            title: 'pages.groups',
            to: '/groups'
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
    ...mapState({
      log: (state) =>  state.log
    }),
    ...mapGetters({
      isAuthenticated: 'user/isAuthenticated'
    })
  }
}
</script>
