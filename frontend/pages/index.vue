<template>
  <v-layout
    id="LandingHead"
    column
    justify-center
    align-center
    class="my-5 mx-4"
    dark
    >
    <!-- v-scroll="onScroll" -->
  
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
      
      <!-- {{ offsetTop }} -->
      
      <v-divider id="LandingSearch" class="my-12" dark/>
      <LandingSearch/>

      <v-divider id="LandingCarousel" class="my-12" dark/>
      <LandingCarousel/>

      <v-divider id="LandingUsecases" class="my-12" dark/>
      <LandingUsecases/>

      <v-divider id="LandingRoadmap" class="my-12" dark/>
      <LandingRoadmap/>

      <v-divider id="LandingStack" class="my-12" dark/>
      <LandingStack/>

    </v-flex>
  </v-layout>
</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Home',
    layout: 'layout_landing',
    components: {
      LandingHead: () => import(/* webpackChunkName: "LandingHead" */ '@/components/landing/LandingHead.vue'),
      LandingSearch: () => import(/* webpackChunkName: "LandingSearch" */ '@/components/landing/LandingSearch.vue'),
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
    data: () => ({
      offsetTop: 0,
    }),
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
      }),
      // onScroll (e) {
      //   this.offsetTop = e.target.scrollTop
      // },
    }
  }
</script>
