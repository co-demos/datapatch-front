<style scoped>
.no-decoration {
  text-decoration: none !important;
}
.btn-dataset-title {
  white-space: normal !important;
}
.ds-title{
  /* display: flex;
  flex: 1 0 auto; */
  /* min-width: 100% !important; */
  /* flex-grow: 1; */
}
</style>

<template>

  <v-row
    v-if="ds"
    class="pl-2 pb-3 align-center justify-left"
    >

    <!-- ADD DATASET BTN -->
    <v-col
      cols="4"
      :class="`pa-0`"
      >
      <v-menu
        v-if="action === 'create'"
        open-on-hover
        offset-x
        >
        <template v-slot:activator="{ on, attrs, value }">
          <v-avatar
            :color="`${value ? 'primary' : 'grey lighten-2'}`"
            class="ml-2"
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
        <!-- <br> wsId: {{ fromWorkspace }} -->
      </p>
    </v-col>


    <!-- DATASET CARD -->
    <v-row
      class="align-center justify-left mr-7 mb-1"
      >
      <v-col cols="11" class="pr-1">
        <nuxt-link
          :to="`/dataset/${ds.id}`"
          class="ml-0 no-decoration text-none"
          >
          <v-card 
            v-if="action !== 'create'"
            flat
            class="text-none pa-3"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            :color="`${hover ? 'white' : 'grey lighten-4'}`"
            >
            <v-card-actions class="pa-0">

              <v-row
                class="align-center wrap justify-left flex-grow-1"
                >

                <!-- DATASET AVATAR -->
                <v-col cols="3" class="">
                  <v-avatar
                    class="ml-0"
                    rounded
                    :color="`${ds.color} ${hover ? '' : ''}`"
                    :size="heightAvatar"
                    :width="heightAvatar"
                    >
                    <v-icon v-if="ds.icon" dark class="white--text">
                      {{ ds.icon }}
                    </v-icon>
                    <span v-else class="white--text headline no-decoration">
                      {{ getInitials(ds.title) }}
                    </span>
                  </v-avatar>
                </v-col>

                <!-- DATASET TITLE -->
                <v-col wrap cols="8" class="">
                  <p
                    :class="`text-body-1 ${hover ? 'font-weight-bold black' : 'grey-darken-1' }--text pa-0 ma-0`"
                    >
                    id: {{ ds.id }} -
                    {{ ds.title }} 
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

            <v-list-item
              disabled
              @click.stop="dialog += 1"
              >
              <v-list-item-action>
                <v-icon small>
                  icon-copy
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t('datasets.copyDataset') }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider/>

            <v-list-item
              disabled
              @click.stop="dialog += 1"
              >
              <v-list-item-action>
                <v-icon small>
                  icon-user-plus
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t('datasets.inviteDataset') }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider/>

            <v-list-item
              @click.stop="deleteDataset()"
              >
              <v-list-item-action>
                <v-icon small>
                  icon-trash-2
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t('datasets.deleteDataset') }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list>

        </v-menu>
      </v-col>
    </v-row>
    
    <!-- DIALOG FOR DATASET INFOS -->
    <ModalItem
      :item="ds"
      :fromWorkspace="fromWorkspace"
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
    'datasetId',
    'dataset',
    'fromWorkspace',
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
      ds: undefined,
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

      // infos: [
      //   { title: 'dataPackage.description', key: 'description' },
      //   { title: 'dataPackage.owner', key: 'owner' },
      //   { title: 'dataPackage.creationDate', key: 'creationDate' },
      //   { title: 'dataPackage.licence', key: 'licence' },
      //   { title: 'dataPackage.id', key: 'id' },
      // ]
    }
  },
  watch: {
    datasetId(next) {
      // this.log && console.log("C-DatasetItem > watch > datasetId ...")
      this.ds = next && { ...this.getUserDatasetById(next) }
    },
    dataset(next) {
      // this.log && console.log("C-DatasetItem > watch > dataset ...")
      this.ds = { ...next }
    },
    currentDataset(next) {
      // this.log && console.log("C-DatasetItem > watch > currentDataset ...")
      // this.log && console.log("C-DatasetItem > watch > currentDataset > next : ", next)
      if (next) {
        // this.log && console.log("C-DatasetItem > watch > currentDataset > next.id : ", next.id)
        this.ds = { ...next }
      }
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
      // this.log && console.log("\nC-DatasetItem > beforeMount > this.datasetId :", this.datasetId)
      this.itemModel.meta = emptyDataset.meta
      this.ds = this.getUserDatasetById(this.datasetId)
    } else {
      // this.log && console.log("\nC-DatasetItem > beforeMount > this.dataset :", this.dataset)
      this.ds = { ...this.dataset }
    }
    // this.log && console.log("C-DatasetItem > beforeMount > this.ds :", this.ds)
    this.apiUrl =  this.api[this.itemType]
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      api: (state) => state.api,
    }),
    ...mapGetters({
      userId: 'user/userId',
      getUserWorkspaces: 'workspaces/getUserItems',
      getUserWorkspaceById: 'workspaces/getUserItemById',
      getUserDatasetById: 'datasets/getUserItemById',
      headerUser: 'user/headerUser'
    }),
    currentDataset() {
      let dsId = this.datasetId
      return dsId && this.getUserDatasetById(dsId)
    },
  },
  methods: {
    getInitials(itemName) {
      return initialsFromString(itemName)
    },
    shareDataset() {
      // TO DO
      this.log && console.log("C-DatasetItem > shareDataset > this.headerUser :", this.headerUser)
      // this.log && console.log("C-DatasetItem > shareDataset > this.ws :", this.ws)
      // this.$axios
      //   .put(`${this.apiUrl}/${this.ws.id}/share`, this.ws, this.headerUser)
      //   .then(resp => {
      //     this.log && console.log('C-DatasetItem > updateUserLoc > resp.data : ', resp.data)
      //   })
    },
    deleteDataset() {
      // this.log && console.log("C-DatasetItem > deleteDataset > this.headerUser :", this.headerUser)
      // this.log && console.log("C-DatasetItem > deleteDataset > this.ds.id :", this.ds.id)
      // this.log && console.log("C-DatasetItem > deleteDataset > this.fromWorkspace :", this.fromWorkspace)
      this.$axios
        .delete(`${this.apiUrl}/${this.ds.id}`, this.headerUser)
        .then(resp => {
          this.log && console.log('C-DatasetItem > deleteDataset > resp.data : ', resp.data)
          this.$store.dispatch(`${this.itemType}/removeUserItem`, resp.data)
          
          // delete dataset reference from ALL workspace datasets
          // this.log && console.log('C-DatasetItem > deleteDataset > this.getUserWorkspaces : ', this.getUserWorkspaces)
          for (let ws of this.getUserWorkspaces) {
            this.log && console.log('C-DatasetItem > deleteDataset > ws : ', ws)
            let wsPreviousDatasets = ws.datasets && ws.datasets.ids || []
            if ( wsPreviousDatasets.length && wsPreviousDatasets.includes(this.ds.id) ) {
              let payloadWs = { ...ws }
              payloadWs.datasets = {
                ids: wsPreviousDatasets.filter(ds => ds !==  this.ds.id )
              }
              this.$axios
                .put(`${this.api.workspaces}/${ws.id}`, payloadWs, this.headerUser)
                .then(resp => {
                  this.$store.dispatch(`workspaces/updateUserItem`, resp.data)
                })
            }
          }

          // let currentWs = this.getUserWorkspaceById(this.fromWorkspace)
          // let wsPreviousDatasets = currentWs.datasets && currentWs.datasets.ids || []
          // // this.log && console.log('C-DatasetItem > deleteDataset > wsPreviousDatasets : ', wsPreviousDatasets)
          // let payloadWs = { ...currentWs }
          // payloadWs.datasets = {
          //   ids: wsPreviousDatasets.filter(ds => ds !==  this.ds.id )
          // }
          // // this.log && console.log('C-DatasetItem > deleteDataset > payloadWs : ', payloadWs)
          // this.$axios
          //   .put(`${this.api.workspaces}/${this.fromWorkspace}`, payloadWs, this.headerUser)
          //   .then(resp => {
          //     // this.log && console.log('C-DatasetItem > deleteDataset > resp.data : ', resp.data)
          //     this.$store.dispatch(`workspaces/updateUserItem`, resp.data)
          //   })
        })
    },
  }

}
</script>
