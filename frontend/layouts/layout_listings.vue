<style>
  .custom-white {
    /* background-color: rgb(252, 252, 252); */
    background-color: rgb(248, 248, 248) !important;
  }
</style>

<template>
  <v-app dark class="custom-white">

    <DefaultNavbar/>

    <SpaceTabs/>

    <FloatingCommentsBox/>

    <v-main class="mt-0 pt-0">
      <!-- {{ $i18n.locale }} -->
      <v-container class="">
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
    DefaultNavbar: () => import(/* webpackChunkName: "DefaultNavbar" */ '@/components/navbars/DefaultNavbar.vue'),
    FloatingCommentsBox: () => import(/* webpackChunkName: "FloatingCommentsBox" */ '@/components/dialogs/FloatingCommentsBox.vue'),
    SpaceTabs: () => import(/* webpackChunkName: "SpaceTabs" */ '@/components/navbars/SpaceTabs.vue'),
    BasicFooter: () => import(/* webpackChunkName: "BasicFooter" */ '@/components/footers/BasicFooter.vue'),
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
