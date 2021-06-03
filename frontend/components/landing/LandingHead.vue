<template>

  <v-row 
    class="align-center justify-center mt-5 mb-12 pb-12"
    style="height: 80vh;"
    >

    <!-- WELCOME MESSAGE -->
    <v-col cols="12" class="mt-3 pa-0">
      <div class="text-center text-h5 font-weight-bold">
        <span v-if="isAuthenticated">
          {{ $t('datapatch.introUser', { name: userData.name }) }}
        </span>
        <span v-else>
          {{ $t('datapatch.intro') }}
        </span>
      </div>
    </v-col>

    <!-- LOGO -->
    <v-col cols="6" class="pa-0 pt-3">
      <div class="text-center">
        <LogoAnimated
          :yoyo="true"
          :repeat="0"
          :animated="true"
          :height="'300px'"
        />
      </div>
    </v-col>

    <!-- INTRO TEXTS + CALL TO ACTION -->
    <v-col cols="6" class="pa-0">
      <v-card 
        class="elevation-0"
        >

        <!-- <v-card-title class="headline mb-4 justify-center">
          <span v-if="isAuthenticated">
            {{ $t('datapatch.introUser', { name: userData.name }) }}
          </span>
          <span v-else>
            {{ $t('datapatch.intro') }}
          </span>
        </v-card-title> -->

        <v-card-text
          class="text-justify py-1"
          v-html="$t('datapatch.pitch')"
        />

        <v-card-text
          class="text-justify py-1 font-weight-bold"
          v-html="$t('datapatch.pitch_bis')"
        />

        <v-card-actions class="justify-center px-4 my-5">
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

    <v-col cols="8" class="pa-0 mt-3 mb-12">
      <v-row class="align-center justify-center">
        <v-col
          v-for="link in anchorLinks"
          :key="link.to"
          class="text-center px-3"
          cols="4"
          >
          <v-btn
            outlined
            block
            dark
            color="secondary"
            elevation="0"
            class="text-none"
            @click="$vuetify.goTo(link.to)"
            >
            <!-- :to="link.to" -->
            <v-icon x-small class="mr-1">
              icon-hash
            </v-icon>
            {{ $t(link.text) }}
          </v-btn>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="10" class="px-2 pt-2">
      <p class="text-center grey--text caption">
        {{ $t('datapatch.infos') }}
        <v-icon x-small class="mx-1">
          icon-github
        </v-icon>
        <a
          href="https://github.com/co-demos/fastapi-boilerplate"
          target="_blank"
          >
          {{ $t('datapatch.repo') }}
        </a>.
      </p>
    </v-col>

  </v-row>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  // import * as easings from 'vuetify/es5/services/goto/easing-patterns'

  export default {
    name: 'LandingHead',
    props: [],
    data () {
      return {
        anchorLinks: [
          { 
            to: '#LandingSearch',
            text: 'datapatch.testSearch',
          },
          { 
            to: '#LandingCarousel',
            text: 'features.featuresTitle',
          },
          { 
            to: '#LandingUsecases',
            text: 'usecases.title',
          },
          { 
            to: '#LandingRoadmap',
            text: 'roadmap.title',
          },
          { 
            to: '#LandingStack',
            text: 'stack.title',
          },
        ],

        // type: 'selector',
        // duration: 300,
        // offset: 0,
        // easing: 'easeInOutCubic',

        // number: 9999,
        // selector: '#scroll-with-options',
        // selected: 'Button',
        // elements: ['Button', 'Radio group'],

        // easings: Object.keys(easings),
      }
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        userData: (state) =>  state.user.userData,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated'
      }),
      // target () {
      //   const value = this[this.type]
      //   if (!isNaN(value)) return Number(value)
      //   else return value
      // },
      // options () {
      //   return {
      //     duration: this.duration,
      //     offset: this.offset,
      //     easing: this.easing,
      //   }
      // },
      // element () {
      //   if (this.selected === 'Button') return this.$refs.button
      //   else if (this.selected === 'Radio group') return this.$refs.radio
      //   else return null
      // },
    },
  }

</script>
