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
        small
        class="mr-3"
        dark
        v-bind="attrs"
        v-on="on"
        >
        <v-icon small v-if="!isAuthenticated">
          icon-log-in
        </v-icon>
        <v-icon small v-else>
          icon-user
        </v-icon>
      </v-btn>
    </template>

    <v-list dense v-if="isAuthenticated">
      <v-list-item class="text-center">
        <span class="mt-1 mx-1">
          {{ $t('hi', { name: this.userData.name } ) }}
        </span>
      </v-list-item>
    </v-list>

    <v-divider class="bg-white"/>

    <MenuList
      v-if="!isAuthenticated"
      :items="itemsLogin"
    />

    <MenuList
      v-if="isAuthenticated"
      :items="itemsUser"
    />

    <v-divider class="bg-white" v-if="isAuthenticated"/>

    <MenuList
      v-if="isAuthenticated"
      :items="itemsUserLogout"
    />

  </v-menu>
</template>
<script>

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'UserButton',
  data () {
    return {
      connected: false,
      itemsLogin:  [
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
      itemsUser:  [
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
        {
          icon: 'icon-user-plus',
          title: 'pages.invitations',
          to: '/invitations'
        },
      ],
      itemsUserLogout:  [
        {
          icon: 'icon-log-out',
          title: 'login.out',
          to: '/logout',
        },
      ]
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      userData: (state) =>  state.user.userData,
    }),
    ...mapGetters({
      isAuthenticated: 'user/isAuthenticated'
    })
  }
}

</script>
