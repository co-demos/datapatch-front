<style scoped>
  .no-decoration {
    text-decoration: none !important;
  }
</style>
<template>
  <v-col cols="12" class="LandingTitle text-center mb-10 pb-0">
    <v-row class="ma-0">
      <v-btn
        icon
        small
        color="white"
        @click="$vuetify.goTo(top)"
        >
        <v-icon small>
          icon-chevrons-up
        </v-icon>
      </v-btn>
      <v-spacer/>
      <nuxt-link
        :to="current"
        class="no-decoration"
        >
        <span class="text-h5">
          <v-icon
            small
            class="white--text pb-1 mx-2"
            >
            icon-hash
          </v-icon>
          <span class="font-weight-bold white--text">
            {{ $t(title) }}
          </span>
          <v-icon
            small
            class="white--text pb-1 mx-2"
            >
            icon-hash
          </v-icon>
        </span>
      </nuxt-link>
      <v-spacer/>
      <v-btn
        icon
        small
        color="white"
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
        color="white"
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
      // 'top',
      'title',
      'current',
      'up',
      'down',
    ],
    data () {
      return {
        top: '#topLanding',
      }
    }
  }
</script>
