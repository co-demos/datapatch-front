<template>
  <v-menu
    offset-y
    close-on-click
    >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        text
        dark
        v-bind="attrs"
        v-on="on"
        >
        {{ $i18n.locale }}
      </v-btn>
    </template>
    <v-list v-model="$i18n.locale">
      <v-list-item
        v-for="lang in $i18n.locales"
        :key="lang.code"
        :value="lang.code"
        @click="$i18n.setLocale(lang.code)"
        >
        {{ lang.name }}
        </v-list-item
      >
    </v-list>
  </v-menu>
</template>
<script>
export default {
  name: 'Languages',
}
</script>
