<template>
  <v-layout
    column
    justify-center
    align-center
    class="my-5"
    >
  
    <v-flex
      xs12
      sm8
      md6
      class="mb-5"
      >

      <div class="text-center mt-5">
        <LogoAnimated
          :yoyo="true"
          :repeat="0"
          :animated="true"
          :height="'300px'"
        />
      </div>

      <v-card 
        class="elevation-0"
        >
        <v-card-title class="headline justify-center">
          <span v-if="isAuthenticated">
            {{ $t('datapatch.introUser', { name: userData.name }) }}
          </span>
          <span v-else>
            {{ $t('datapatch.intro') }}
          </span>
        </v-card-title>

        <Alert 
          :dismissible="true"
        />

        <v-card-text class="mt-4">
          <p>
            {{ $t('datapatch.pitch') }}
          </p>
          <p>
            {{ $t('datapatch.infos') }}
            <a
              href="https://github.com/co-demos/fastapi-boilerplate"
              target="_blank"
              >
              {{ $t('datapatch.repo') }}
            </a>.
          </p>
        </v-card-text>

        <v-card-actions class="justify-center">
          <!-- <v-spacer /> -->
          <v-btn
            dark
            tile
            elevation="0"
            class="px-5"
            color="primary"
            nuxt
            large
            :to="`/${ isAuthenticated ? 'workspaces' : 'login'}`"
            >
            {{ $t(`${ isAuthenticated ? 'buttons.continue' : 'login.in'}`) }}
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-flex>
  </v-layout>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Home',
  head() {
    return {
      title: `${this.appTitle} - ${this.$t('pages.home')}`,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
    }
  },
  beforeMount () {
    this.resetPathList()
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      appTitle: (state) => state.appTitle,
      userData: (state) =>  state.user.userData,
    }),
    ...mapGetters({
      isAuthenticated: 'user/isAuthenticated'
    })
  },
  methods: {
    ...mapActions({
      resetPathList: 'resetPathList',
    })
  }
}
</script>
