<template>
  <v-chip
    :color=" isLoading ? 'grey' : item.color"
    label
    :small="dense"
    class="my-1 mr-1"
    dark
    >

    <v-icon
      v-if="item.item_type"
      small
      class="mr-3"
      color="white"
      >
      {{ itemIcon }}
    </v-icon>

    <span class="pr-2 white--text">
      {{ itemTxt }}
    </span>

    <v-divider
      vertical
      color="white"
      class="mx-3"
    />

    <span v-if="item.item_type" class="caption font-italic">
      {{ $t(`dataPackage.${item.item_type}`) }}
    </span>

    <v-icon
      small
      color="white"
      class="ml-3"
      @click="$emit('selectItem', item)"
      >
      icon-clear
    </v-icon>

  </v-chip>
</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'SearchItemChip',
    props: [
      'dense',
      'isLoading',
      'item',
      'itemIcon',
      'itemTxt'
    ],
    data () {
      return {
      }
    }
  }

</script>
