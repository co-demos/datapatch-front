<style scoped>
  .call-border {
    border: 3px solid white !important;
  }
</style>

<template>

  <v-row 
    class="align-center justify-left mt-2 mb-12 pb-12"
    style="height: 100%;"
    >

    <!-- WELCOME MESSAGE -->
    <v-col cols="12" class="mt-12 pa-0 mb-10 pb-10">
      <div class="text-center white--text text-h4 font-weight-bold">
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
      <div class="text-center" style="height: 300px;">
        <LogoAnimated
          :yoyo="true"
          :repeat="0"
          :animated="true"
          :height="'300px'"
          :customColor="customColor"
          :customColorBis="'white'"
        />
      </div>
    </v-col>

    <!-- INTRO TEXTS + CALL TO ACTION -->
    <v-col cols="5" class="pa-0">
      <v-card
        class="elevation-0 pa-3 primary"
        >
        <v-card-text
          class="text-justify font-weight-bold white--text"
          v-html="$t('datapatch.pitch')"
        />
      </v-card>

      <div class="text-center">
        <v-btn
          dark
          elevation="0"
          class="font-weight-bold pl-12 pr-6 call-border"
          :color="customColor"
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
      </div>

      <v-card 
        class="elevation-0 pa-3 primary"
        >
        <v-card-text
          class="text-justify font-weight-bold white--text"
          v-html="$t('datapatch.pitch_bis')"
        />
      </v-card>

    </v-col>
    
    <v-col cols="12" class="mt-1">
    </v-col>

    <!-- ANCHOR LINKS -->
    <v-col cols="8" class="offset-2 pa-0 pt-5 mt-12 mb-5">
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
            color="white"
            elevation="0"
            class="text-none"
            @click="$vuetify.goTo(link.to)"
            >
            <!-- :to="link.to" -->
            <v-icon x-small class="mr-1">
              icon-hash
            </v-icon>
            <span class="">
              {{ $t(link.text) }}
            </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>

    <br>

    <v-col cols="10" class="offset-1 mb-0 px-2">
      <p class="text-center white--text caption">
        <span v-html="$t('datapatch.infos')"/>
        <v-icon x-small class="mx-1 white--text">
          icon-github
        </v-icon>
        <a
          class="white--text"
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
        
        customColor: undefined,
        colors: [
          'accent',
          'secondary',
          'info',
          'warning',
          // 'error',
          // 'success',
          // 'white',
        ]
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

    beforeMount() {
      this.customColor = this.randomColor
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        userData: (state) =>  state.user.userData,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated'
      }),
      randomColor() {
        const colorIdx = Math.floor(Math.random() * this.colors.length)
        return this.colors[colorIdx]
      },
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
