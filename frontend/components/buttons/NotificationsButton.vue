<template>

  <v-btn
    icon
    dark
    small
    class="mr-3"
    >
    <v-icon small>
      icon-bell
    </v-icon>
  </v-btn>

</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'NotificationsButton',
  data () {
    return {
      connected: false,
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
