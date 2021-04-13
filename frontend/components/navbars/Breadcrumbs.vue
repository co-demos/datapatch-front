<template>

  <v-breadcrumbs
    :items="crumbs"
    divider="/"
    >
    <template v-slot:item="{ item }">
      <v-breadcrumbs-item
        dark
        :to="item.to"
        :disabled="item.disabled"
        >
        <span 
          :class="`${item.disabled ? 'grey-lighten-2-' : 'white-'}-text`"
          >
          {{ $t(item.text) }}
        </span>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>

</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Breadcrumbs',
  data () {
    return {
      items: [
      ]
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
    }),
    ...mapGetters({
      crumbs: 'getCrumbs',
    }),
  },
}

</script>
