<template>
  <v-select
    :items="items"
    filled
    dense
    hide-details
    v-model="hidden"
    item-text="label"
    item-value="sep"
    :label="showLabel && $t('imports.selectSep')"
    @change="handleInput"
    >
    <template 
      v-slot:item="{ item: selectItem }"
      >
      {{ $t(selectItem.label) }} &nbsp;<code>{{ selectItem.sepTxt }}</code>
    </template>
    <template 
      v-slot:selection="{ item: selectedItem }"
      >
      {{ showLabel ? '' : $t('imports.sep_prefix') }} {{ $t(selectedItem.label) }} &nbsp;<code>{{ selectedItem.sepTxt }}</code>
    </template>
  </v-select>

</template>

<script>

  // cf : https://www.digitalocean.com/community/tutorials/vuejs-add-v-model-support
  // cf : https://www.digitalocean.com/community/tutorials/how-to-add-v-model-support-to-custom-vue-js-components
  // cf : https://gist.github.com/AndreKR/80953c53bdd1b3a8dfe0f6f6f29a6020
  // cf : https://v3.vuejs.org/guide/migration/v-model.html#using-v-bind-sync

  export default {
    name: 'SelectSeparator',
    props: [
      'hidden',
      'showLabel',
      'items',
    ],
    model: {
      prop: 'hidden',
      event: 'blur'
    },
    data () {
      return {}
    },
    methods: {
      handleInput(val) {
        this.$emit('blur', val)
      }
    }
  }

</script>
