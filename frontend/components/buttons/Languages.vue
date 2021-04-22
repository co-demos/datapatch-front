<template>
  <v-menu
    offset-y
    close-on-click
    open-on-hover
    >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        small
        dark
        rounded
        v-bind="attrs"
        v-on="on"
        >
        {{ $i18n.locale }}
      </v-btn>
    </template>
    <v-list v-model="$i18n.locale">
      <v-list-item
        v-for="lang in $i18n.locales"
        :key="lang.code"
        :value="lang.code"
        @click="$i18n.setLocale(lang.code), updateUserLoc(lang.code)"
        >
        {{ lang.name }}
        </v-list-item
      >
    </v-list>
  </v-menu>
</template>
<script>

import { mapState, mapGetters, mapActions } from 'vuex'
import { configHeaders } from '@/utils/utilsAxios'

export default {
  name: 'Languages',
  computed: {
    ...mapState({
      log: (state) => state.log,
      api: (state) => state.api,
      user: (state) => state.user.userData,
    }),
    ...mapGetters({
      isAuthenticated: 'user/isAuthenticated',
      userBasicInfos: 'user/userBasicInfos',
      headerUser: 'user/headerUser'
    })
  },
  methods: {
    ...mapActions({
      populateUserLocale: 'user/populateUserLocale'
    }),
    updateUserLoc (loc) {
      if (this.isAuthenticated) {
        let userBasicInfos = this.userBasicInfos
        userBasicInfos.locale = loc
        // this.log && console.log("C-Languages > updateUserLoc > userBasicInfos :", userBasicInfos)
        // this.log && console.log("C-Languages > updateUserLoc > this.headerUser :", this.headerUser)
        this.$axios
          .put(`${this.api.users}/me/`, userBasicInfos, this.headerUser)
          .then(resp => {
            // this.log && console.log('C-Languages > updateUserLoc > resp.data : ', resp.data)
            this.populateUserLocale(resp.data)
          })
      }
    }
  }
}

</script>
