<template>
  <v-app dark>

    <DefaultNavbar/>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <BasicFooter/>

  </v-app>
</template>

<script>

export default {
  components: {
    DefaultNavbar: () => import('@/components/navbars/DefaultNavbar.vue'),
    BasicFooter: () => import('@/components/footers/BasicFooter.vue'),
  },
  data () {
    return {
    }
  }
}
</script>
