<template>
  <v-dialog
    v-model="dialog"
    overflowed
    max-width="700"
    >
    <!-- MODAL TITLE -->
    <v-card>
      
      <!-- CLOSE MODAL -->
      <v-card-actions class="mr-5 pt-3 pb-0 px-0">
        <v-spacer></v-spacer>
        <v-btn
          icon
          small
          rounded
          elevation="0"
          @click="dialog = false"
          >
          <v-icon>icon-clear</v-icon>
        </v-btn>
      </v-card-actions>

      <!-- TITLE MODAL -->
      <v-card-title class="headline py-0 mb-0">
        <v-row class="align-center">
          <v-col cols="4" class="text-center">
            <ItemAvatar
              :item="localItem"
              :itemType="itemType"
              :noAvatar="noAvatar"
              :hover="false"
              :heightAvatar="56"
            />
          </v-col>

          <v-col cols="8">
            <span
              :class="`${localItem.color || 'black'}--text`"
              >
              {{ localItem.title }}
              <!-- <br> wsId: {{ fromWorkspace }} -->
            </span>
            <v-spacer/>
          </v-col>
        </v-row>
      </v-card-title>

      <ModalTabs
        :tabsSpaces="tabsSpaces"
        :localItem="localItem"
        :itemType="itemType"
        :itemModel="itemModel"
        :apiUrl="apiUrl"
        :action="action"
        :updateCurrentDataset="updateCurrentDataset"
        :onlyLocalUpdate="onlyLocalUpdate"
      />
      <!-- <v-toolbar
        flat dense
        class="mb-4"
        >
        <v-tabs
          v-model="tab"
          dense
          centered
          color="grey"
          center-active
          icons-and-text
          >
          <v-tabs-slider></v-tabs-slider>

          <v-tab
            v-for="tabname in tabsSpaces"
            :key="tabname"
            :href="`#modal-tab-${tabname}`"
            >
            {{ $t(`tabs.${tabname}`) }}
          </v-tab>
        </v-tabs>
      </v-toolbar>

      <v-tabs-items v-model="tab" 
        :class="`${action === 'create' ? 'py-0 mb-5' : 'pt-0 pb-5'}`">

        <v-tab-item 
          v-for="tabname in tabsSpaces"
          :key="tabname"
          :value="`modal-tab-${tabname}`"
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

      </v-tabs-items> -->


      <!-- BTNS -->
      <v-card-actions v-if="action === 'create'" class="mr-5 pb-5">
        <v-spacer></v-spacer>
        <v-btn
          color="grey darken-1"
          class="px-3"
          dark
          large
          tile
          elevation="0"
          @click="dialog = false"
          >
          {{ $t('buttons.cancel') }}
        </v-btn>
        <v-btn
          color="primary darken-1"
          class="px-3"
          dark
          large
          tile
          elevation="0"
          @click="createItem()"
          >
          {{ $t(`buttons.${action}`) }}
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>

import { mapState } from 'vuex'

export default {

  name: 'ModalItem',
  props: [
    'item',
    'fromWorkspace',
    'itemModel',
    'parentDialog',
    'itemType',
    'action',
    'apiUrl',
    'noAvatar',
    'updateCurrentDataset',
    'onlyLocalUpdate'
  ],
  watch: {
    item () {
      this.localItem = { ...this.item }
    },
    parentDialog () {
      this.dialog = true
    },
  },
  data () {
    return {
      localItem: undefined,
      dialog: false,
      tab: null,
      tabsSpaces: []
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
    }),
  },
  beforeMount () {
    this.localItem = { ...this.item }
    this.tabsSpaces = Object.keys(this.itemModel)
  },
  methods: {
    createItem() {
      let itemPayload = this.localItem
      // this.tab = 0
      this.dialog = false
      this.$emit('createItem', itemPayload)
    },
  }
}

</script>
