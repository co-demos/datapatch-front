<template>
  <v-container class="pt-0 mt-2">

    <!-- TITLE  -->
    <v-card-title
      v-if="appendTitle"
      class="headline pt-0"
      >
      <v-row class="align-center">
        <v-col cols="4" class="text-center">
          <ItemAvatar
            :item="localItem"
            :itemType="itemType"
            :heightAvatar="50"
          />
        </v-col>
        <v-col cols="8" class="text-center">
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
    <v-row
      v-show="tabsSpaces.length > 1"
      dense
      >
      <v-col class="offset-4">
        <v-tabs
          v-model="tab"
          centered
          dense
          grow
          color="grey"
          center-active
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
            v-if="localItem"
            :item="localItem"
            :itemModel="itemModel[tabname]"
            :itemType="itemType"
            :apiUrl="apiUrl"
            :action="action"
            :updateCurrentDataset="updateCurrentDataset"
            :onlyLocalUpdate="onlyLocalUpdate"
            :needUpdateStore="needUpdateStore"
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
    'action',
    'updateCurrentDataset',
    'onlyLocalUpdate',
    'needUpdateStore',
  ],
  data () {
    return {
      tab: null,
      // tabsSpacesLocal: []
    }
  },
  beforeMount () {
    // this.log && console.log(`\nC-ModalTabs > beforeMount > this.itemType : `, this.itemType )
    // this.log && console.log(`C-ModalTabs > beforeMount > this.localItem : `, this.localItem )
    // this.log && console.log(`C-ModalTabs > beforeMount > this.itemModel : `, this.itemModel )
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
