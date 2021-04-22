<style scoped>
  .container {
    max-width: 100%;
  }
</style>
<template>
  <v-app dark>

    <DefaultNavbar 
      :noTitle="true"
      :getDatasetColor="true"
    />

    <v-main class="pt-5">

      <v-container class="my-0 px-0 pt-0">
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
}
</script>
