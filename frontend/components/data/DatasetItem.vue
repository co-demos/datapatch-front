<style scoped>
.no-decoration {
  text-decoration: none !important;
}
</style>

<template>

  <div class="mb-5">

    <!-- ADD DATASET BTN -->
    <v-row 
      v-if="item.addBtn"
      class="align-center justify-center pt-0"
      >
      <v-menu
        open-on-hover
        right
        offset-x
        >
        <template v-slot:activator="{ on, attrs, value }">
          <v-avatar
            :color="`${value ? 'black' : 'grey'} lighten-1`"
            class="ml-0"
            rounded
            size="56"
            v-bind="attrs"
            v-on="on"
            >
            <v-icon dark>icon-plus</v-icon>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in itemsCreate"
            :key="index"
            >
            <v-list-item-title>
              <v-icon small class="mr-2">
                {{ item.icon }}
              </v-icon>
              {{ $t(item.textCode) }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-row>

    <!-- DATASET CARD -->
    <v-row 
      v-if="!item.addBtn"
      class="align-center justify-center"
      >

      <!-- DATASET AVATAR -->
      <nuxt-link
        class="ml-0 no-decoration"
        :to="`/dataset/${item.id}`"
        >
        <v-avatar
          @mouseover="hover = true"
          @mouseleave="hover = false"
          :color="`${hover ? 'black' : item.color}`"
          class="ml-5"
          rounded
          size="56"
          >
          <span class="white--text headline no-decoration">
            {{ getInitials(item.name) }}
          </span>
        </v-avatar>
      </nuxt-link>

      <!-- DATASET BTNS -->
      <!-- <v-col
        class="ml-0"
        > -->

        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              icon
              x-small
              v-bind="attrs"
              v-on="on"
              >
              <v-icon>icon-more-vertical</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('datasets.prefsDataset') }}</span>
        </v-tooltip>

        <!-- <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              icon
              x-small
              v-bind="attrs"
              v-on="on"
              >
              <v-icon>icon-settings</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('datasets.editDataset') }}</span>
        </v-tooltip> -->

      <!-- </v-col> -->
    </v-row>

    <v-row
      v-if="!item.addBtn"
      class="align-center justify-center mt-4"
      >
      <span class="text-body-2">
        {{ item.name }}
      </span>
    </v-row>

    <!-- <v-card outlined>

      <v-card-title>
        <h4>{{ item.name }}</h4>
      </v-card-title>

      <v-switch
        :input-value="isExpanded(item)"
        :label="$t(`buttons.${isExpanded(item) ? 'close' : 'showDetails'}`)"
        class="pl-4 mt-0"
        @change="(v) => expand(item, v)"
      ></v-switch>

      <v-divider></v-divider>

      <v-list
        v-if="isExpanded(item)"
        dense
        >
        <v-list-item 
          v-for="info in infos"
          :key="info.key"
          >
          <v-list-item-content>
            {{ $t(info.textCode) }}
          </v-list-item-content>
          <v-list-item-content class="align-end">
            {{ item[ info.key ] }}
          </v-list-item-content>
        </v-list-item>

      </v-list>

    </v-card> -->

  </div>
</template>


<script>

import { mapState } from 'vuex'
import { Workspace } from '@/utils/utilsWorkspaces'

export default {

  name: 'DatasetItem',
  props: [
    'item',
    // 'isExpanded',
    // 'expand'
  ],
  data () {
    return {
      show: false,
      hover: false,
      itemsCreate: [
        { textCode: 'datasets.importData', icon: 'icon-upload', function: 'importData' },
        { textCode: 'datasets.blankDataset', icon: 'icon-edit-3', function: 'blankDataset' },
        { textCode: 'datasets.pasteDataset', icon: 'icon-copy', function: 'pasteDataset' },
      ],
      infos: [
        { textCode: 'dataPackage.description', key: 'description' },
        { textCode: 'dataPackage.owner', key: 'owner' },
        { textCode: 'dataPackage.creationDate', key: 'creationDate' },
        { textCode: 'dataPackage.licence', key: 'licence' },
        { textCode: 'dataPackage.id', key: 'id' },
      ]
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      api: (state) => state.api,
    })
  },
  methods: {
    getInitials(itemName) {
      let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')
      let initials = [...itemName.matchAll(rgx)] || []
      initials = (
        (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
      ).toUpperCase()
      return initials
    },
    addDataset() {
      this.log && console.log("C-DatasetItem > addDataset ...")
    }
  }

}
</script>
