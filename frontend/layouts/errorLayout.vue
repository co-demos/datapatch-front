<template>
  <v-app dark>

    <DefaultNavbar :forceColor="'error'"/>

    <v-main class="error">
      <nuxt />
    </v-main>

    <BasicFooter/>

  </v-app>
</template>

<script>

import { mapState } from 'vuex'

export default {
  components: {
    DefaultNavbar: () => import('@/components/navbars/DefaultNavbar.vue'),
    BasicFooter: () => import('@/components/footers/BasicFooter.vue'),
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
    }),
  },
}
</script>
