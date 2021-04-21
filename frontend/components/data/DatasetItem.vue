<style scoped>
  .no-decoration {
    text-decoration: none !important;
  }

  .add-border {
    border: thin solid lightGrey !important;
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
    class="pl-2 align-center justify-left"
    >
   
    <!-- ADD DATASET BTN -->
    <v-col
      v-if="action === 'create'"
      cols="4"
      >
      <v-menu
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
            @click.stop="dialogCreate += 1"
            >
            <!-- @click.stop="dialog += 1" -->
            <v-icon dark>
              icon-plus
            </v-icon>
          </v-avatar>

        </template>

        <v-list dense>
        
          <v-subheader class="pa-5 text-uppercase">
            {{ $t('buttons.options') }}
          </v-subheader>

            <!-- @click.stop="dialog += 1" -->
          <v-list-item
            @click.stop="openCreateWithPreset('csv')"
            >
            <v-list-item-action>
              <v-icon small>
                icon-download
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('datasets.importDataCsv') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider/>

          <v-list-item
            @click.stop="openCreateWithPreset('blank')"
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
            @click.stop="openCreateWithPreset('copyPaste')"
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
      <p class="text-body-2 grey--text pt-0 ma-0">
        {{ $t('datasets.newDataset') }}
        <!-- <br> wsId: {{ fromWorkspace }} -->
      </p>
    </v-col>


    <!-- DATASET CARD -->
    <v-col
      v-if="action === 'update'"
      cols="11"
      class="pr-1"
      >
      <nuxt-link
        :to="`/dataset/${ds.id}`"
        class="ml-0 no-decoration text-none"
        >
        <v-card 
          v-if="action !== 'create'"
          flat
          outlined
          :class="`text-none pa-3 ${hover ? 'add-border' : ''}`"
          :color="`${hover ? 'white' : 'grey lighten-4'}`"
          @mouseover="hover = true"
          @mouseleave="hover = false"
          >
          <v-card-actions class="pa-0">

            <v-row
              class="align-center wrap justify-left flex-grow-1"
              >

              <!-- DATASET AVATAR -->
              <v-col cols="3" class="">
                <ItemAvatar
                  :item="ds"
                  :hover="hover"
                  :heightAvatar="heightAvatar"
                />
              </v-col>

              <!-- DATASET TITLE -->
              <v-col cols="8" class="ml-2">
                <p
                  :class="`text-body-1 ${hover ? 'font-weight-bold black' : 'grey-darken-1' }--text pa-0 ma-0`"
                  >
                  <!-- id: {{ ds.id }} - -->
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
              <!-- icon-chevron-down1 -->
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
        
          <v-subheader class="pa-5 text-uppercase">
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
            @click.stop="dialogDelete += 1"
            >
            <!-- @click.stop="deleteDataset()" -->
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
    
    <!-- DIALOG FOR DATASET INFOS -->
    <ModalItem
      :parentDialog="dialog"
      :item="ds"
      :fromWorkspace="fromWorkspace"
      :itemModel="itemModel"
      :itemType="itemType"
      :action="action"
      :apiUrl="apiUrl"
      @createItem="createDataset"
    />
  
      <!-- DIALOG FOR DATASET INFOS -->
    <ModalCreateDataset
      :parentDialog="dialogCreate"
      :item="ds"
      :fromWorkspace="fromWorkspace"
      :itemModel="itemModel"
      :itemType="itemType"
      :action="action"
      :apiUrl="apiUrl"
      :presetCreate="presetCreate"
      @createItem="createDataset"
    />

    <!-- DIALOG FOR DATASET DELETE -->
    <ModalDelete
      :parentDialog="dialogDelete"
      :confirmDeleteTitle="$t('datasets.deleteDataset')"
      :confirmDeleteMsg="$t('datasets.deleteDatasetConfirm')"
      :itemToDelete="ds"
      @confirmDelete="deleteDataset()"
    />

  </v-row>
</template>


<script>

import { mapState, mapGetters } from 'vuex'
import { Dataset } from '@/utils/utilsDatasets'

export default {

  name: 'DatasetItem',
  components: {
    ModalCreateDataset: () => import(/* webpackChunkName: "ModalCreateDataset" */ '@/components/data/ModalCreateDataset.vue'),
  },
  props: [
    'datasetId',
    'fromWorkspace',
    'action',
    'isAlone'
  ],
  data () {
    return {
      dialog: 0,
      dialogCreate:0,
      dialogDelete: 0,

      presetCreate: undefined,

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
      // this.log && console.log("C-DatasetItem > watch > datasetId > next :", next)
      this.ds = next && { ...this.getUserDatasetById(next) }
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
    // this.log && console.log(`\nC-DatasetItem > ${this.action} > beforeMount > this.datasetId :`, this.datasetId)
    let emptyDataset = new Dataset()
    this.itemModel = {
      infos: emptyDataset.infos,
      auth: emptyDataset.auth,
      prefs: emptyDataset.prefs,
    }
    if (this.action === 'update') {
      // this.log && console.log(`C-DatasetItem > ${this.action} > beforeMount > this.datasetId :`, this.datasetId)
      this.itemModel.meta = emptyDataset.meta
      this.ds = this.getUserDatasetById(this.datasetId)
    } else {
      // this.log && console.log("\nC-DatasetItem > beforeMount > this.dataset :", this.dataset)
      this.resetEmptyDataset()
    }
    // this.log && console.log(`C-DatasetItem > ${this.action} > beforeMount > this.ds :`, this.ds)
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
    openCreateWithPreset (preset) {
      this.log && console.log("C-DatasetItem > openCreateWithPreset > preset :", preset)
      this.presetCreate = preset
      this.dialogCreate += 1
    },
    shareDataset() {
      // TO DO
      this.log && console.log("C-DatasetItem > shareDataset > this.headerUser :", this.headerUser)
      // this.log && console.log("C-DatasetItem > shareDataset > this.ws :", this.ws)
      // this.$axios
      //   .put(`${this.api.datasets}/share`, this.ws, this.headerUser)
      //   .then(resp => {
      //     this.log && console.log('C-DatasetItem > shareDataset > resp.data : ', resp.data)
      //   })
    },
    resetEmptyDataset() {
      // this.log && console.log(`C-DatasetItem > fromWorkspace ${this.fromWorkspace} > resetEmptyDataset ...`)
      let emptyDataset = new Dataset(this.userId, this.$t('datasets.defaultTitle'), this.$t('datasets.defaultDescription'))
      emptyDataset.randomBasics = true
      this.ds = emptyDataset.data
    },
    createDataset(itemPayload) {
      // this.log && console.log('C-DatasetItem > createItem > itemPayload :' , itemPayload)
      this.$axios
        .post(`${this.api.datasets}/`, itemPayload, this.headerUser)
        .then(resp => {
          // this.log && console.log('C-DatasetItem > createItem > resp.data : ', resp.data)
          this.$store.dispatch(`datasets/appendUserItem`, resp.data)
          // this.log && console.log('C-DatasetItem > createItem > this.localItem : ', this.localItem)
          // this.log && console.log('C-DatasetItem > createItem > this.emptyItem : ', this.emptyItem)
          
          this.resetEmptyDataset()

          // action from workspace append dataset to workspace.datasets
          let currentWs = this.getUserWorkspaceById(this.fromWorkspace)
          // this.log && console.log('C-DatasetItem > createItem > currentWs : ', currentWs)
          let wsPreviousDatasets = currentWs.datasets && currentWs.datasets.ids || []
          let payloadWs = { ...currentWs }
          payloadWs.datasets = {
            ids: [ ...wsPreviousDatasets, resp.data.id ]
          }
          // this.log && console.log('C-DatasetItem > createItem > payloadWs : ', payloadWs)
          this.$axios
            .put(`${this.api.workspaces}/${this.fromWorkspace}`, payloadWs, this.headerUser)
            .then( resp => {
              this.$store.dispatch(`workspaces/updateUserItem`, resp.data)
            })

        })
    },
    deleteDataset() {
      // this.log && console.log("C-DatasetItem > deleteDataset > this.headerUser :", this.headerUser)
      // this.log && console.log(`\nC-DatasetItem > deleteDataset > ds ${this.ds.id} > this.fromWorkspace :`, this.fromWorkspace)
      this.$axios
        .delete(`${this.apiUrl}/${this.ds.id}`, this.headerUser)
        .then(resp => {
          // this.log && console.log(`C-DatasetItem > deleteDataset > ds ${this.ds.id} > resp.data : `, resp.data)
          this.$store.dispatch(`${this.itemType}/removeUserItem`, resp.data)
          
          // delete dataset reference from ALL workspace datasets
          // this.log && console.log('C-DatasetItem > deleteDataset > this.getUserWorkspaces : ', this.getUserWorkspaces)
          for (let ws of this.getUserWorkspaces) {
            // this.log && console.log(`\n...C-DatasetItem > deleteDataset > ds ${this.ds.id} > ws.id : `, ws.id)
            let wsPreviousDatasets = ws.datasets && ws.datasets.ids || []
            // this.log && console.log(`...C-DatasetItem > deleteDataset > ${this.ds.id} > wsPreviousDatasets : `, wsPreviousDatasets)
            let payloadWs = { ...ws }
            payloadWs.datasets = {
              ids: wsPreviousDatasets.filter(ds => ds !==  this.ds.id )
            }
            // this.log && console.log(`...C-DatasetItem > deleteDataset > ds ${this.ds.id} > payloadWs : `, payloadWs)
            this.$store.dispatch(`workspaces/updateUserItem`, payloadWs)
          }
        })
    },
  }

}
</script>
