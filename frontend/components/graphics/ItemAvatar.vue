<template>

  <div>

    <v-avatar
      v-if="!noAvatar"
      :class="`${customClass ? customClass : 'ml-0'}`"
      rounded
      :color="`${hover ? (colorHover ? colorHover : item.color) : item.color}`"
      :size="heightAvatar"
      :width="heightAvatar"
      >
      <v-icon v-if="item.icon" dark class="white--text">
        {{ item.icon }}
      </v-icon>
      <span v-else class="white--text headline no-decoration">
        {{ getInitials(item.title) }}
      </span>
    </v-avatar>

    <v-icon
      v-if="noAvatar && item.icon"
      dark
      :color="item.color || 'black'"
      class="mx-3"
      >
      {{ item.icon }}
    </v-icon>
  
  </div>

</template>

<script>

import { initialsFromString } from '@/utils/utilsDatasets'

export default {
  name: 'DatasetAvatar',
  props: [
    'item',
    'heightAvatar',
    'hover',
    'colorHover',
    'customClass',
    'noAvatar'
  ],
  data () {
    return {
    }
  },
  methods: {
    getInitials(itemName) {
      return initialsFromString(itemName)
    },
  }

}

</script>
