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
    <v-col cols="4" class="pa-0">
      <v-menu
        v-if="action === 'create'"
        open-on-hover
        offset-x
        >
        <template v-slot:activator="{ on, attrs, value }">
            <v-avatar
              :color="`${value ? 'black' : 'grey ligthen-2'}`"
              class="mt-2 ml-2 col col-4"
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

        <v-list dense>
        
          <v-subheader class="pa-5">
            {{ $t('buttons.options') }}
          </v-subheader>

          <v-list-item
            @click.stop="dialog += 1"
            >
            <v-list-item-action>
              <v-icon small>
                icon-download
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('datasets.importData') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider/>

          <v-list-item
            @click.stop="dialog += 1"
            >
            <v-list-item-action>
              <v-icon small>
                icon-edit-3
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('datasets.blankDataset') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider/>

          <v-list-item
            @click.stop="dialog += 1"
            >
            <v-list-item-action>
              <v-icon small>
                icon-copy
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('datasets.pasteDataset') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>

      </v-menu>
    </v-col>

    <!-- NEW DATASET MESSAGE -->
    <v-col v-if="isAlone" cols="6" class="pa-0">
      <p class="text-body-2 grey--text pt-1 ma-0">
        {{ $t('datasets.newDataset') }}
      </p>
    </v-col>


    <!-- DATASET CARD -->
    <v-row
      class="align-center justify-left mr-7 mb-2"
      >
      <v-col cols="11" class="pr-1">
        <nuxt-link
          :to="`/dataset/${dataset.id}`"
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
                    :color="`${dataset.color} ${hover ? 'darken-2' : ''}`"
                    :size="heightAvatar"
                    >
                    <v-icon v-if="dataset.icon" dark class="white--text">
                      {{ dataset.icon }}
                    </v-icon>
                    <span v-else class="white--text headline no-decoration">
                      {{ getInitials(dataset.title) }}
                    </span>
                  </v-avatar>
                </v-col>

                <!-- DATASET TITLE -->
                <v-col cols="8" class="pa-0">
                  <p class="text-body-2 black--text pa-0 ma-0">
                    {{ dataset.title }}
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
          bottom
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


          <!-- <MenuList
            :items="itemsSettings"
          />
          <v-divider class="bg-white"/>
          <MenuList
            :items="itemsShare"
          />
          <v-divider class="bg-white"/>
          <MenuList
            :items="itemsDelete"
          /> -->

          <v-list dense>
          
            <v-subheader class="pa-5">
              {{ $t('buttons.options') }}
            </v-subheader>

            <v-list-item
              @click.stop="dialog += 1"
              >
              <v-list-item-action>
                <v-icon small>
                  icon-hash
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t('datasets.prefsDataset') }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <!-- <v-divider/> -->

          </v-list>

        </v-menu>
      </v-col>
    </v-row>
    
    <!-- DIALOG FOR DATASET INFOS -->
    <ModalItem
      :item="dataset"
      :emptyItem="emptyItem"
      :itemModel="itemModel"
      :parentDialog="dialog"
      :itemType="itemType"
      :action="action"
      :apiUrl="apiUrl"
    />
  
  </v-row>
</template>


<script>

import { mapState, mapGetters } from 'vuex'
import { Dataset, initialsFromString } from '@/utils/utilsDatasets'

export default {

  name: 'DatasetItem',
  props: [
    'dataset',
    'emptyItem',
    'action',
    'isAlone'
  ],
  data () {
    return {
      dialog: 0,
      heightAvatar: 50,
      hover: false,

      itemType: 'datasets',
      // dataset: undefined,
      itemModel: undefined,
      apiUrl: undefined,

      // itemsCreate: [
      //   { title: 'datasets.importData', icon: 'icon-download', function: 'importData' },
      //   { title: 'datasets.blankDataset', icon: 'icon-edit-3', function: 'blankDataset' },
      //   { title: 'datasets.pasteDataset', icon: 'icon-copy', function: 'pasteDataset' },
      // ],

      // itemsSettings: [
      //   // { title: 'datasets.renameDataset', icon: 'icon-edit-3', function: 'importData' },
      //   { title: 'datasets.prefsDataset', icon: 'icon-settings', function: 'importData' },
      //   { title: 'datasets.copyDataset', icon: 'icon-copy', function: 'importData' },
      // ],
      // itemsShare: [
      //   { title: 'datasets.inviteDataset', icon: 'icon-user-plus', menu: [] },
      // ],
      // itemsDelete: [
      //   { title: 'datasets.deleteDataset', icon: 'icon-trash-2', function: 'deleteDataset' },
      // ],

      // infos: [
      //   { title: 'dataPackage.description', key: 'description' },
      //   { title: 'dataPackage.owner', key: 'owner' },
      //   { title: 'dataPackage.creationDate', key: 'creationDate' },
      //   { title: 'dataPackage.licence', key: 'licence' },
      //   { title: 'dataPackage.id', key: 'id' },
      // ]
    }
  },
  beforeMount () {
    // this.dataset = { ...this.item }
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
    }),
    ...mapGetters({
      userId: 'user/userId',
      headerUser: 'user/headerUser'
    })
  },
  methods: {
    getInitials(itemName) {
      return initialsFromString(itemName)
    },
    addDataset() {
      this.log && console.log("C-DatasetItem > addDataset ...")
    },
    shareDataset() {
      // TO DO
      this.log && console.log("C-DatasetItem > shareDataset > this.headerUser :", this.headerUser)
      // this.log && console.log("C-DatasetItem > shareDataset > this.ws :", this.ws)
      // this.$axios
      //   .put(`${this.apiUrl}/${this.ws.id}/share`, this.ws, this.headerUser)
      //   .then(resp => {
      //     this.log && console.log('C-WorkspaceItem > updateUserLoc > resp.data : ', resp.data)
      //   })
    },
    deleteDataset() {
      this.log && console.log("C-DatasetItem > deleteWorkspace > this.headerUser :", this.headerUser)
      this.$axios
        .delete(`${this.apiUrl}/${this.dataset.id}`, this.headerUser)
        .then(resp => {
          this.log && console.log('C-DatasetItem > deleteWorkspace > resp.data : ', resp.data)
          this.$store.dispatch(`${this.itemType}/removeUserItem`, resp.data)
        })
    },
  }

}
</script>
