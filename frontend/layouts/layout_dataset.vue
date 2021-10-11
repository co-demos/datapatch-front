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

    <FloatingCommentsBox/>

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
  name: 'layoutDataset',
  components: {
    DefaultNavbar: () => import(/* webpackChunkName: "DefaultNavbar" */ '@/components/navbars/DefaultNavbar.vue'),
    FloatingCommentsBox: () => import(/* webpackChunkName: "FloatingCommentsBox" */ '@/components/dialogs/FloatingCommentsBox.vue'),
    BasicFooter: () => import(/* webpackChunkName: "BasicFooter" */ '@/components/footers/BasicFooter.vue'),
  },
}
</script>
