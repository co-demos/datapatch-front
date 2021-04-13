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
          <v-icon v-if="item.icon" dark>
            {{ item.icon }}
          </v-icon>
          <span v-else class="white--text headline no-decoration">
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
            @click.stop="dialog += 1"
            >
            <v-icon>icon-more-vertical</v-icon>
          </v-btn>
        </template>
        <MenuList
          :items="itemsSettings"
        />
        <v-divider class="bg-white"/>
        <MenuList
          :items="itemsShare"
        />
        <v-divider class="bg-white"/>
        <MenuList
          :items="itemsDelete"
        />
      </v-menu>

    </v-row>

    <v-row
      v-if="!item.addBtn"
      class="align-center justify-center mt-4 text-center"
      >
      <span class="text-body-2">
        {{ item.name }}
      </span>
    </v-row>
    
    <!-- DIALOG FOR DATASET INFOS -->
    <ModalItem
      :item="item"
      :itemModel="itemModel"
      :parentDialog="dialog"
    />
  
  </div>
</template>


<script>

import { mapState } from 'vuex'
import { Workspace } from '@/utils/utilsWorkspaces'
import { Dataset, initialsFromString } from '@/utils/utilsDatasets'

export default {

  name: 'DatasetItem',
  props: [
    'item',
  ],
  data () {
    return {
      dialog: 0,
      hover: false,
      itemModel: undefined,
      itemsCreate: [
        { title: 'datasets.importData', icon: 'icon-download', function: 'importData' },
        { title: 'datasets.blankDataset', icon: 'icon-edit-3', function: 'blankDataset' },
        { title: 'datasets.pasteDataset', icon: 'icon-copy', function: 'pasteDataset' },
      ],
      itemsSettings: [
        // { title: 'datasets.renameDataset', icon: 'icon-edit-3', function: 'importData' },
        { title: 'datasets.prefsDataset', icon: 'icon-settings', function: 'importData' },
        { title: 'datasets.copyDataset', icon: 'icon-copy', function: 'importData' },
      ],
      itemsShare: [
        { title: 'datasets.inviteDataset', icon: 'icon-user-plus', menu: [] },
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
  beforeMount () {
    let emptyDataset = new Dataset()
    this.itemModel = emptyDataset.model
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      api: (state) => state.api,
    })
  },
  methods: {
    getInitials(itemName) {
      return initialsFromString(itemName)
    },
    addDataset() {
      this.log && console.log("C-DatasetItem > addDataset ...")
    }
  }

}
</script>
