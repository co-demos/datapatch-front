<template>

  <v-row class="align-center mt-5 mb-12 pb-12">

    <v-col cols="8" class="pa-0 pt-4">
      <div class="text-center">
        <LogoAnimated
          :yoyo="true"
          :repeat="0"
          :animated="true"
          :height="'300px'"
        />
      </div>
    </v-col>

    <v-col cols="4" class="px-2 py-0">
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
            block
            elevation="0"
            class="px-12 font-weight-bold"
            color="primary"
            nuxt
            large
            :to="`/${ isAuthenticated ? 'workspaces' : 'login'}`"
            >
            <span>
              {{ $t(`${ isAuthenticated ? 'buttons.continue' : 'login.in'}`) }}
            </span>
            <v-icon class="ml-3">
              {{ isAuthenticated ? 'icon-chevron-right1' : 'icon-log-in'}}
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>

  </v-row>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'LandingHead',
    props: [],
    data () {
      return {

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
    },
  }

</script>
