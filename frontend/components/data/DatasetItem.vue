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

        <MenuList
          :items="itemsCreate"
        />

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
          :color="`${item.color} ${hover ? 'darken-2' : ''}`"
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
      <v-menu
        right
        offset-x
        open-on-hover
        >
        <template v-slot:activator="{ on: onMenu, attrs: attrsMenu }">
          <v-btn 
            icon
            x-small
            v-bind="{...attrsMenu}"
            v-on="{...onMenu}"
            >
            <v-icon>icon-more-vertical</v-icon>
          </v-btn>
        </template>
        <MenuList
          :items="itemsSettings"
        />
        <v-divider class="bg-white"/>
        <MenuList
          :items="itemsDelete"
        />
      </v-menu>

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
        { title: 'datasets.importData', icon: 'icon-download', function: 'importData' },
        { title: 'datasets.blankDataset', icon: 'icon-edit-3', function: 'blankDataset' },
        { title: 'datasets.pasteDataset', icon: 'icon-copy', function: 'pasteDataset' },
      ],
      itemsSettings: [
        { title: 'datasets.prefsDataset', icon: 'icon-settings', function: 'importData' },
      ],
      itemsDelete: [
        { title: 'datasets.deleteDataset', icon: 'icon-trash-2', function: 'deleteDataset' },
      ],
      infos: [
        { title: 'dataPackage.description', key: 'description' },
        { title: 'dataPackage.owner', key: 'owner' },
        { title: 'dataPackage.creationDate', key: 'creationDate' },
        { title: 'dataPackage.licence', key: 'licence' },
        { title: 'dataPackage.id', key: 'id' },
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
