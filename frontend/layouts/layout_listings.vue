<template>
  <v-app dark>

    <DefaultNavbar/>

    <SpaceTabs/>

    <v-main class="mt-0 pt-0">
      <!-- {{ $i18n.locale }} -->
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <AlertSnack
      :position="'bottom'"
      :onlyErrors="true"
    />

    <BasicFooter/>

  </v-app>
</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    DefaultNavbar: () => import('@/components/navbars/DefaultNavbar.vue'),
    SpaceTabs: () => import('@/components/navbars/SpaceTabs.vue'),
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
