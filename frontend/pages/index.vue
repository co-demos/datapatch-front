<template>
  <v-layout
    column
    justify-center
    align-center
    class="my-5 mx-4"
    >
  
    <v-flex
      xs12
      sm8
      md6
      class="mb-12"
      >

      <Alert 
        :dismissible="true"
      />

      <LandingHead/>

      <v-divider/>

      <LandingCarousel/>
      <v-divider/>

      <LandingUsecases/>
      <v-divider/>

      <LandingRoadmap/>
      <v-divider/>

      <LandingStack/>

    </v-flex>
  </v-layout>
</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Home',
    components: {
      LandingHead: () => import(/* webpackChunkName: "LandingHead" */ '@/components/landing/LandingHead.vue'),
      LandingCarousel: () => import(/* webpackChunkName: "LandingCarousel" */ '@/components/landing/LandingCarousel.vue'),
      LandingUsecases: () => import(/* webpackChunkName: "LandingUsecases" */ '@/components/landing/LandingUsecases.vue'),
      LandingRoadmap: () => import(/* webpackChunkName: "LandingRoadmap" */ '@/components/landing/LandingRoadmap.vue'),
      LandingStack: () => import(/* webpackChunkName: "LandingStack" */ '@/components/landing/LandingStack.vue'),
    },
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
