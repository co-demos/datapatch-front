<template>
  <v-app dark>

    <DefaultNavbar/>

    <v-main class="mt-5 pt-5">
      <!-- {{ $i18n.locale }} -->
      <v-container>
        <nuxt />
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
  computed: {
    ...mapState({
      log: (state) => state.log,
    }),
  },
}
</script>
