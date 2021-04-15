<template>
  <v-app dark>

    <DefaultNavbar 
      :noTitle="true"
    />

    <v-main class="pt-5">

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
}
</script>
