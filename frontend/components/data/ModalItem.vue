<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    overflowed
    >
    <!-- MODAL TITLE -->
    <v-card>

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

      <v-card-title class="headline pt-0 mb-2">
        <v-row class="align-center">
          <v-col cols="4" class="text-center">
            <v-avatar
              v-if="!noAvatar"
              :color="localItem.color || 'primary'"
              rounded
              size="56"
              >
              <v-icon dark v-if="localItem.icon" class="mx-3">
                {{ localItem.icon }}
              </v-icon>
              <span v-else class="white--text">
                {{ getInitials(localItem.name) }}
              </span>
            </v-avatar>

            <v-icon
              v-if="noAvatar && localItem.icon"
              dark
              :color="localItem.color || 'black'"
              class="mx-3"
              >
              {{ localItem.icon }}
            </v-icon>

          </v-col>
          <v-col cols="8">
            <span
              :class="`${localItem.color || 'black'}--text`"
              >
              {{ localItem.name }}
            </span>
            <v-spacer/>
          </v-col>
        </v-row>
      </v-card-title>

      <!-- TABS -->
      <v-toolbar
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

      <!-- TABS ITEMS -->
      <v-tabs-items v-model="tab" class="py-0 mb-5">

        <v-tab-item 
          v-for="tabname in tabsSpaces"
          :key="tabname"
          :value="`modal-tab-${tabname}`"
          >
          <v-card-text>
            <ModalFields
              :item="localItem"
              :itemModel="itemModel[tabname]"
            />
          </v-card-text>
        </v-tab-item>

      </v-tabs-items>


      <!-- BTNS -->
      <v-card-actions class="mr-5 pb-5">
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
          @click="dialog = false"
          >
          {{ $t(`buttons.${action}`) }}
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>

import { initialsFromString } from '@/utils/utilsDatasets'

export default {

  name: 'ModalItem',
  props: [
    'item',
    'itemModel',
    'parentDialog',
    'itemType',
    'action',
    'noAvatar'
  ],
  watch: {
    parentDialog () {
      this.dialog = true
    }
  },
  data () {
    return {
      localItem: this.item,
      dialog: false,
      tab: null,
      tabsSpaces: []
    }
  },
  beforeMount () {
    this.tabsSpaces = Object.keys(this.itemModel)
  },
  methods: {
    getInitials(itemName) {
      return initialsFromString(itemName)
    },
  }
}

</script>
