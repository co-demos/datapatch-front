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
      router
      exact
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

export default {

  name: 'MenuList',
  props: [
    'items',
    'isFirst'
  ],
}
</script>
