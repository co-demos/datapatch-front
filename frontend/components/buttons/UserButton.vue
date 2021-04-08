<template>
  <v-menu
    offset-y
    close-on-click
    open-on-hover
    >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        dark
        v-bind="attrs"
        v-on="on"
        >
        <v-icon v-if="!isAuthenticated">
          icon-log-in
        </v-icon>
        <v-icon v-else>
          icon-user
        </v-icon>
      </v-btn>
    </template>
    
    <MenuList
      v-if="!isAuthenticated"
      :items="itemsLogin"
    />

    <MenuList
      v-if="isAuthenticated"
      :items="itemsUser"
    />

  </v-menu>
</template>
<script>

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'UserButton',
  data () {
    return {
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
          icon: 'icon-users',
          title: 'pages.groups',
          to: '/groups'
        },
        {
          icon: 'icon-bell',
          title: 'pages.notifications',
          to: '/notifications'
        },
        { divider: true },
        {
          icon: 'icon-log-out',
          title: 'login.out',
          to: '/logout'
        },
      ]
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: (state) =>  state.user.auth.isAuthenticated
    })
  }
}

</script>
