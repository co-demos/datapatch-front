<style scoped>
  .border-white {
    border: thin solid white !important;
  }
</style>

<template>

  <div>
    <!-- <span class="black--text" > -->
      <!-- {{ item }} -->
      <!-- - {{ itemType }} -->
    <!-- </span> -->
    <v-avatar
      v-if="!noAvatar"
      rounded
      :color="`${hover ? (colorHover ? colorHover : item.color) : item.color}`"
      :class="`${customClass ? customClass : 'ml-0'}`"
      :size="heightAvatar"
      :width="heightAvatar"
      >
      <v-icon
        v-if="item.icon"
        :size="`${heightAvatar - 16}`"
        dark class="white--text"
        >
        {{ item.icon }}
      </v-icon>
      <v-icon v-else-if="noIconTypes.includes(itemType)" dark class="black--text">
        icon-table
      </v-icon>
      <span v-else class="white--text body-1 no-decoration">
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

    <v-card
      v-if="itemType === 'fields'"
      class="mx-6 pt-1 pb-0"
      color="grey ligthen-1"
      dark
      outlined
      >
      <v-card-text class="">
        <v-icon>
          {{ fieldIcon(item.field_type) }}
        </v-icon>
      </v-card-text>
      <v-card-text class="pt-0">
        <v-icon
          dark
          small
          class=""
          >
          icon-chevron-left1
        </v-icon>
        <span class="text-body-1">
          {{ item.field_type }}
        </span>
        <v-icon
          dark
          small
          class=""
          >
          icon-chevron-right1
        </v-icon>
      </v-card-text>
    </v-card>

  </div>

</template>

<script>

import { initialsFromString } from '@/utils/utilsDatasets'
import { FieldTypes, FindFieldIcon } from '@/utils/utilsFields'

export default {
  name: 'DatasetAvatar',
  props: [
    'item',
    'itemType',
    'heightAvatar',
    'hover',
    'colorHover',
    'customClass',
    'noAvatar'
  ],
  data () {
    return {
      noIconTypes: ['tables', 'field']
    }
  },
  methods: {
    getInitials(itemName) {
      return initialsFromString(itemName)
    },
    fieldIcon (type) {
      return FindFieldIcon(type)
    },
  }

}

</script>
