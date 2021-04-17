<style scoped>
.no-decoration {
  text-decoration: none !important;
}
.btn-dataset-title {
  white-space: normal !important;
}
</style>

<template>

  <v-row class="pl-2 align-center justify-left">

    <!-- ADD DATASET BTN -->
    <v-menu
      v-if="action === 'create'"
      open-on-hover
      right
      offset-x
      >
      <template v-slot:activator="{ on, attrs, value }">
        <v-avatar
          :color="`${value ? 'black' : 'grey ligthen-2'}`"
          class="mt-2 ml-2"
          rounded
          :size="heightAvatar"
          v-bind="attrs"
          v-on="on"
          @click.stop="dialog += 1"
          >
          <v-icon dark>
            icon-plus
          </v-icon>
        </v-avatar>
      </template>

      <MenuList
        :items="itemsCreate"
      />

    </v-menu>

    <!-- DATASET CARD -->
    <v-row
      class="align-center justify-left mr-7 mb-2"
      >
      <v-col cols="11" class="pr-1">
        <nuxt-link
          :to="`/dataset/${item.id}`"
          class="ml-0 no-decoration text-none"
          >
          <v-card 
            v-if="action !== 'create'"
            flat
            class="text-none pa-3"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            :color="`${hover ? 'grey lighten-2' : 'grey lighten-4'}`"
            >
            <v-card-actions>

              <v-row 
                class="align-center justify-left"
                >

                <!-- DATASET AVATAR -->
                <v-col cols="4" class="pa-0">
                  <v-avatar
                    class="ml-0"
                    rounded
                    :color="`${item.color} ${hover ? 'darken-2' : ''}`"
                    :size="heightAvatar"
                    >
                    <v-icon v-if="item.icon" dark class="white--text">
                      {{ item.icon }}
                    </v-icon>
                    <span v-else class="white--text headline no-decoration">
                      {{ getInitials(item.title) }}
                    </span>
                  </v-avatar>
                </v-col>

                <!-- DATASET TITLE -->
                <v-col cols="8" class="pa-0">
                  <p class="text-body-2 black--text pa-0 ma-0">
                    {{ item.title }}
                  </p>
                </v-col>

              </v-row>

            </v-card-actions>
          </v-card>
        </nuxt-link>
      </v-col>

      <!-- DATASET BTNS -->
      <v-col cols="1" class="ma-0 pa-0">
        <v-menu
          v-if="action !== 'create'"
          right
          offset-x
          open-on-hover
          >
          <template v-slot:activator="{ on: onMenu, attrs: attrsMenu }">
            <v-btn
              x-small
              icon
              class="pl-0 tex-none"
              v-bind="{...attrsMenu}"
              v-on="{...onMenu}"
              @click.stop="dialog += 1"
              >
              <v-icon small>
                icon-more-vertical
              </v-icon>
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
      </v-col>
    </v-row>
    
    <!-- DIALOG FOR DATASET INFOS -->
    <ModalItem
      :item="item"
      :itemModel="itemModel"
      :parentDialog="dialog"
      :itemType="itemType"
      :action="action"
      :apiUrl="apiUrl"
    />
  
  </v-row>
</template>


<script>

import { mapState } from 'vuex'
import { Dataset, initialsFromString } from '@/utils/utilsDatasets'

export default {

  name: 'DatasetItem',
  props: [
    'item',
    'action'
  ],
  data () {
    return {
      dialog: 0,
      heightAvatar: 50,
      hover: false,
      itemType: 'datasets',
      itemModel: undefined,
      apiUrl: undefined,
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
    this.itemModel = {
      infos: emptyDataset.infos,
      auth: emptyDataset.auth,
      prefs: emptyDataset.prefs,
    }
    if (this.action === 'update') {
      this.itemModel.meta = emptyDataset.meta
    }
    this.apiUrl =  this.api[this.itemType]
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
