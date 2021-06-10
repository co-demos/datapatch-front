<template>
  <v-app
    dark
    id="topLanding"
    >

    <DefaultNavbar :addBorder="offsetTop > 50"/>

    <v-main
      v-scroll="onScroll"
      id="landing-main"
      class="primary"
      dark
      >
      <v-container
        id="landing-container"
        >
        <nuxt
        />
      </v-container>
    </v-main>

    <BasicFooter/>

  </v-app>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    DefaultNavbar: () => import('@/components/navbars/DefaultNavbar.vue'),
    BasicFooter: () => import('@/components/footers/BasicFooter.vue'),
  },
  // head() {
  //   return {
  //     htmlAttrs: {
  //       lang: this.$i18n.locale
  //     },
  //   }
  // },
  data: () => ({
    offsetTop: 0,
  }),
  computed: {
    ...mapState({
      log: (state) => state.log,
    }),
  },
  methods: {
    onScroll (e) {
      // this.log && console.log('\nL-layoutLanding > onScroll > e :', e)
      // this.log && console.log('L-layoutLanding > onScroll > e.target :', e.target)
      // this.log && console.log('L-layoutLanding > onScroll > e.target.scrollingElement :', e.target.scrollingElement)
      this.offsetTop = e.target.scrollingElement.scrollTop
    },
  },
}
</script>
