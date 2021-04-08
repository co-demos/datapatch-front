<template>
  <v-list 
    :class="`${isFirst ? 'pt-5 mt-5 pb-0' : 'py-0'}`"
    >
    <v-list-item
      v-for="(item, i) in items"
      :key="i"
      :to="item.divider ? '' : item.to"
      router
      exact
      >

      <v-divider v-if="item.divider"></v-divider>

      <v-list-item-action
        v-if="!item.divider"
        >
        <v-icon>
          {{ item.icon }}
        </v-icon>
      </v-list-item-action>

      <v-list-item-content
        v-if="!item.divider"
        >
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
