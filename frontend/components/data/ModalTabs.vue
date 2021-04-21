<template>
  <v-container class="">

    <!-- TITLE  -->
    <v-card-title
      v-if="appendTitle"
      class="headline pt-0"
      >
      <v-row class="align-center">
        <v-col cols="3" class="text-center">
          <ItemAvatar
            :item="localItem"
            :noAvatar="false"
            :hover="false"
            :heightAvatar="50"
          />
        </v-col>
        <v-col cols="8">
          <span
            :class="`${localItem.color || 'black'}--text`"
            >
            {{ localItem.title }}
          </span>
          <v-spacer/>
        </v-col>
      </v-row>
    </v-card-title>

    <v-divider v-if="appendTitle" class="mt-3 mb-4 "/>

    <!-- {{ tab }}
    <br>
    {{ tabsSpaces }} -->

    <!-- TABS -->
    <v-row dense>
    <!-- <v-toolbar
      flat dense
      class=""
      > -->
      <v-col class="offset-3">
        <v-tabs
          v-model="tab"
          dense
          centered
          color="grey"
          center-active
          icons-and-text
          >
          <v-tab
            v-for="tabname in tabsSpaces"
            :key="tabname"
            class="text-none"
            >
            {{ $t(`tabs.${tabname}`) }}
          </v-tab>
        </v-tabs>
      </v-col>
    <!-- </v-toolbar> -->
    </v-row>

    <!-- TABS ITEMS -->
    <v-tabs-items 
      v-model="tab" 
      :class="`${action === 'create' ? 'py-0' : 'pt-0 pb-5'}`"
      >

      <v-tab-item 
        v-for="tabname in tabsSpaces"
        :key="tabname"
        >
        <v-card-text>
          <ModalFields
            :item="localItem"
            :itemModel="itemModel[tabname]"
            :itemType="itemType"
            :apiUrl="apiUrl"
            :action="action"
          />
        </v-card-text>
      </v-tab-item>

    </v-tabs-items>
  </v-container>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'ModalTabs',
  props: [
    'appendTitle',
    'tabsSpaces',
    'localItem',
    'itemType',
    'itemModel',
    'apiUrl',
    'action'
  ],
  data () {
    return {
      tab: null,
      // tabsSpacesLocal: []
    }
  },
  beforeMount () {
    this.tab = 0
    // this.tabsSpacesLocal = this.tabsSpaces
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
    }),
  },
}
</script>
