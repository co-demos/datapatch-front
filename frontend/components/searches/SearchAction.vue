<style scoped>
  .action-border {
    border: thin solid white;
  }
</style>

<template>

  <v-tooltip
    top
    >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        elevation="0"
        class="ma-1 action-border"
        :color="customColor ? 'white' : 'grey'"
        fab
        x-small
        v-bind="attrs"
        v-on="on"
        >
        <v-icon
          :class="`${customColor ? 'primary' : 'white'}--text`"
          size="12"
          >
          {{ action.icon }}
        </v-icon>
      </v-btn>
    </template>
    <span>
      {{ $t(action.tooltip)}}
      <!-- {{ btn.icon }} -->
    </span>
  </v-tooltip>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'SearchAction',
    props: [
      'action',
      'customColor',
    ],
  }

</script>
