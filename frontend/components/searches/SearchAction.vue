<style scoped>
  .action-border {
    border: thin solid white;
  }
</style>

<template>

  <v-tooltip
    top
    class="SearchAction"
    >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        elevation="0"
        class="mr-1"
        icon
        :outlined="outlined"
        :color="customColor || (outlined ? 'grey' : 'black') "
        :small="outlined"
        :x-small="!outlined"
        :disabled="disabled"
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
      'outlined',
      'disabled',
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
