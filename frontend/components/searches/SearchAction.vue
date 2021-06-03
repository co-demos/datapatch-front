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
        class="ma-1"
        icon
        color="grey"
        x-small
        v-bind="attrs"
        v-on="on"
        @click.stop="handleAction"
        >
        <!-- :color="customColor ? 'white' : 'grey'" -->
        <!-- :class="`${customColor ? 'primary' : 'white'}--text`" -->
        <v-icon
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

  import { mapState } from 'vuex'

  export default {
    name: 'SearchAction',
    props: [
      'action',
      'customColor',
    ],
    computed: {
      ...mapState({
        log: (state) => state.log,
      }),
    },
    methods: {
      handleAction() {
        this.$emit('itemAction')
      }
    }
  }

</script>
