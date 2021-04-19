<style scoped>
</style>

<template>
  <v-list 
    :class="`${isFirst ? 'pt-5 mt-5 pb-0' : 'py-0'} bgd-white`"
    dense
    >
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :to="item.divider ? '' : item.to"
      :class="item.addClass ? item.addClass : '' "
      :router="!item.divider && !!item.to"
      :exact="!item.divider && !!item.to"
      >

      <v-list-item-action>
        <v-icon small>
          {{ item.icon }}
        </v-icon>
      </v-list-item-action>

      <v-list-item-content>
        <v-list-item-title 
          v-text="$t(item.title)"
        />
      </v-list-item-content>

    </v-list-item>
  </v-list>
</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'
import { configHeaders } from '@/utils/utilsAxios'

export default {

  name: 'MenuList',
  props: [
    'items',
    'isFirst',
    'itemType',
    'apiUrl',
    'action'
  ],
  computed: {
    ...mapState({
      log: (state) => state.log,
      api: (state) => state.api,
    }),
    ...mapGetters({
      isAuthenticated: 'user/isAuthenticated'
    })
  },
  methods: {

  }
}
</script>
