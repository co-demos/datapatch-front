<style scoped>
  .no-decoration {
    text-decoration: none !important;
  }
</style>
<template>
  <v-col cols="12" class="text-center mb-10 pb-0">
    <v-row class="ma-0">
      <v-btn
        icon
        small
        color="grey"
        @click="$vuetify.goTo(top)"
        >
        <v-icon small>
          icon-chevrons-up
        </v-icon>
      </v-btn>
      <v-spacer/>
      <span class="text-h5">
        <nuxt-link
          :to="current"
          class="mr-2 no-decoration"
          >
          <v-icon
            small
            class="grey--text"
            >
            icon-hash
          </v-icon>
        </nuxt-link>
        <span class="font-weight-bold">
          {{ $t(title) }}
        </span>
      </span>
      <v-spacer/>
      <v-btn
        icon
        small
        color="grey"
        @click="$vuetify.goTo(up)"
        >
        <v-icon small>
          icon-chevron-up1
        </v-icon>
      </v-btn>
      <v-btn
        v-if="down"
        icon
        small
        color="grey"
        @click="$vuetify.goTo(down)"
        >
        <v-icon small>
          icon-chevron-down1
        </v-icon>
      </v-btn>
    </v-row>
  </v-col>
</template>

<script>
  export default {
    name: 'LandingTitle',
    props: [
      'top',
      'title',
      'current',
      'up',
      'down',
    ],
  }
</script>
