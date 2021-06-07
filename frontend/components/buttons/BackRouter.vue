<template>
  <v-tooltip right>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        fab
        dark
        x-small
        class="text-none ml-5"
        v-bind="attrs"
        v-on="on"
        @click="$router.back()"
        >
        <v-icon small class="">
          icon-arrow-left
        </v-icon>
      </v-btn>
    </template>
    <span>
      {{ $t('pages.back') }}
    </span>
  </v-tooltip>

</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'BackRouter',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
    }),

  },
}

</script>
