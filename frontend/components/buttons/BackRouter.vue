<template>

  <v-btn
    text
    dark
    @click="$router.back()"
    class="text-none ml-5"
    >
    <v-icon small>
      icon-arrow-left
    </v-icon>
    {{ $t('buttons.back') }}
  </v-btn>

</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'BackRouter',
}

</script>
