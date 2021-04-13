<template>

  <v-btn
    text
    dark
    rounded
    small
    @click="$router.back()"
    class="text-none ml-5"
    >
    <v-icon small class="">
      icon-arrow-left
    </v-icon>
    <span class="body-2">
      {{ $t('buttons.back') }}
    </span>
  </v-btn>

</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'BackRouter',
}

</script>
