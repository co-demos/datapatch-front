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

</style>

<template>
  <div class="DatasetItem">

    <v-row
      v-if="ds"
      v-show="!currentLoadingState"
      class="pl-2 align-center justify-left"
      >

      <!-- ADD DATASET BTN -->
      <v-col
        v-if="action === 'create'"
        v-show="!isLoading"
        cols="3"
        class="align-center"
        >
        <v-menu
          open-on-hover
          offset-x
          >
          <template v-slot:activator="{ on, attrs, value }">

            <v-avatar
              :color="`${value ? 'primary' : 'grey lighten-2'}`"
              class="ml-1"
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
              {{ $t('datasets.newDataset') }}
            </v-subheader>

            <v-list-item
              v-for="importOption in importOptions"
              :key="importOption.value"
              v-if="!importOption.disabled"
              @click.stop="openCreateWithPreset(importOption.value)"
              >
              <v-list-item-action>
                <v-icon small>
                  {{ importOption.icon }}
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t(importOption.title) }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list>

        </v-menu>
      </v-col>

      <!-- NEW DATASET MESSAGE -->
      <v-col v-if="isAlone && !isLoading" cols="8 " class="pa-0">
        <p class="text-body-2 grey--text pt-0 ma-0">
          {{ $t('datasets.newDataset') }}
          <!-- <br> wsId: {{ fromWorkspace }} -->
        </p>
      </v-col>

      <!-- DIALOG FOR DATASET CREATION -->
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
            flat
            outlined
            :class="`text-none pa-2 ${hover ? 'add-border' : ''} elevation-0`"
            :color="`${hover ? 'white' : 'grey lighten-4'}`"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            >
            <!-- v-if="action !== 'create'" -->
            <v-card-actions class="pa-0">

              <v-row
                class="align-center wrap justify-left flex-grow-1"
                >

                <!-- DATASET AVATAR -->
                <v-col cols="3" class="pa-3">
                  <ItemAvatar
                    :item="ds"
                    :hover="hover"
                    :heightAvatar="heightAvatar"
                  />
                </v-col>

                <!-- DATASET TITLE -->
                <v-col cols="9" class="align-center pl-1 py-1">
                  <p
                    :class="`text-body-2 ${hover ? 'font-weight-bold black' : 'grey-darken-1' }--text pa-0 ma-0`"
                    >
                    <!-- id: {{ ds }} -->
                    {{ ds.title }} 
                  </p>
                  <p class="caption pa-0 ma-0 text-lowercase font-italic">
                    {{ ds.tables.length }} {{ $tc('dataPackage.table', ds.tables.length) }}
                    <!-- - {{ datasetId }} -->
                    <!-- - {{ ds.id }} -->
                    <!-- - {{ currentLoadingState }} -->
                  </p>
                </v-col>

              </v-row>

            </v-card-actions>
            
          </v-card>
        </nuxt-link>
      </v-col>

      <!-- DATASET BTNS -->
      <v-col 
        v-if="action !== 'create'"
        cols="1"
        class="ma-0 pa-0"
        >
        <v-menu
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
              {{ $t('datasets.prefsDataset') }}
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
                  {{ $t('datasets.editDataset') }}
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

              <!-- @click.stop="dialogComment += 1; dialog += 1" -->
            <v-list-item
              @click.stop="openComments(ds)"
              >
              <v-list-item-action>
                <v-icon small>
                  icon-message-square
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t('datasets.commentDataset') }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider/>
  
            <v-list-item
              @click.stop="dialogShare += 1; dialog += 1"
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
        v-if="ds"
        :parentDialog="dialog"
        :parentComment="dialogComment"
        :parentShare="dialogShare"
        :item="ds"
        :fromWorkspace="fromWorkspace"
        :itemModel="action === 'update' ? itemModelMeta : itemModel"
        :itemType="itemType"
        :action="action"
        :apiUrl="apiUrl"
        @createItem="createDataset"
      />

      <!-- DIALOG FOR DATASET INFOS -->
      <!-- <ModalShare
        v-if="ds"
        :parentDialog="dialogShare"
        :item="ds"
        :fromWorkspace="fromWorkspace"
        :itemModel="itemModelShare"
        :itemType="itemType"
        :action="action"
        :apiUrl="apiUrl"
      /> -->

      <!-- DIALOG FOR DATASET DELETE -->
      <ModalDelete
        :parentDialog="dialogDelete"
        :confirmDeleteTitle="$t('datasets.deleteDataset')"
        :confirmDeleteMsg="$t('datasets.deleteDatasetConfirm')"
        :itemToDelete="ds"
        @confirmDelete="deleteDataset()"
      />

    </v-row>

    <v-row
      v-show="currentLoadingState"
      class="ma-0 align-center"
      >
      <!-- v-show="true" -->
      <!-- <v-col cols="3" class="px-4">
        <v-skeleton-loader
          type="button"
        />
      </v-col>
      <v-col cols="9" class="pl-0 mt-2 pr-5">
        <v-skeleton-loader
          type="text, text"
        />
      </v-col> -->
      <v-col cols="11" class="pa-0 ma-0 ml-2">
        <v-skeleton-loader
          type="image"
          max-height="50px"
        />
      </v-col>
    </v-row>

  </div>
</template>


<script>

  import { mapState, mapGetters, mapActions } from 'vuex'
  import { Dataset } from '@/utils/utilsDatasets'

  import { importOptionsInfos } from '@/utils/utilsImports.js'

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
        dialogCreate: 0,
        dialogComment: 0,
        dialogShare: 0,
        dialogDelete: 0,

        isLoading: false,

        presetCreate: undefined,
        importOptions: importOptionsInfos,

        heightAvatar: 36,
        hover: false,
        
        itemType: 'datasets',
        ds: undefined,
        apiUrl: undefined,

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
      this.isLoading = true
    },
    mounted () {
      // this.log && console.log(`\nC-DatasetItem > ${this.action} > mounted > this.datasetId :`, this.datasetId)

      if (this.action === 'update') {
        // this.log && console.log(`C-DatasetItem > ${this.action} > mounted > this.datasetId :`, this.datasetId)
        setTimeout(() => {
          this.ds = this.getUserDatasetById(this.datasetId)
          this.isLoading = false
        }, 200)
      } else {
        // this.log && console.log("\nC-DatasetItem > mounted > this.dataset :", this.dataset)
        setTimeout(() => {
          this.resetEmptyDataset()
          this.isLoading = false
        }, 100)
      }
      // this.log && console.log(`C-DatasetItem > ${this.action} > mounted > this.ds :`, this.ds)
      this.apiUrl =  this.api[this.itemType]

      this.socket = this.$nuxtSocket({
        name: 'main',
        path: '/ws/socket.io',
        transport: ['websocket'],
      })
      this.socket.on('handshake', (data) => {
        this.log && console.log("\nC-DatasetItem > mounted > this.socket - handshake > data : ", data)
        this.socket.emit('join_item_room', {
          sid: data.sid,
          item_type: 'dataset',
          item_id: this.datasetId
        })
      })
      this.socket.on('item_room', (data) => {
        this.log && console.log("\nC-DatasetItem > mounted > this.socket - item_room > data : ", data)
      })
      this.socket.on('action_message', (data) => {
        this.log && console.log("\nC-DatasetItem > mounted > this.socket - action_message > data : ", data)
        if (data.callback.item_type === 'comment' && data.callback.method === 'get' && data.callback.get_list ) {
          this.log && console.log("\nC-DatasetItem > mounted > this.socket - action_message > data.callback : ", data.callback)
          this.togggleCommentsNeedReload(true)
        }
      })

    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
        itemModel: (state) => state.datasets.itemModel,
        itemModelMeta: (state) => state.datasets.itemModelMeta,
        itemModelShare: (state) => state.datasets.itemModelShare,
        loadingItem: (state) => state.datasets.loadingItem,
      }),
      ...mapGetters({
        userId: 'user/userId',
        getUserWorkspaces: 'workspaces/getUserItems',
        getUserWorkspaceById: 'workspaces/getUserItemById',
        getUserDatasetById: 'datasets/getUserItemById',
        // getLoading: 'datasets/getLoadingById',
        headerUser: 'user/headerUser'
      }),
      currentDataset() {
        return this.getUserDatasetById(this.datasetId)
      },
      currentLoadingState() {
        return this.action === 'update' && this.loadingItem === this.datasetId
      },
    },
    methods: {
      ...mapActions({
        togggleShowCommentsBox: 'comments/togggleShowCommentsBox',
        populateCurrentItem: 'comments/populateCurrentItem',
        togggleCommentsNeedReload: 'comments/togggleNeedReload',
      }),
      openComments(item) {
        this.populateCurrentItem(item)
        this.togggleShowCommentsBox(true)
      },
      // currentLoadingState() {
      //   return this.loadingItem === this.datasetId
      // },
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
        let now = new Date(Date.now())
        let emptyDataset = new Dataset(
          this.userId,
          this.$t('datasets.defaultTitle'),
          this.$t('datasets.defaultDescription'),
          now.toISOString()
        )
        emptyDataset.randomBasics = true
        this.ds = emptyDataset.data
      },
      async createDataset(itemPayload) {
        this.log && console.log('C-DatasetItem > createItem > itemPayload :' , itemPayload)
        let resp = await this.$axios
          .post(`${this.api.datasets}/`, itemPayload, this.headerUser)
          .then(respPost => {
            this.log && console.log('C-DatasetItem > createItem > respPost.data : ', respPost.data)
            this.$store.dispatch(`datasets/appendUserItem`, respPost.data)
            // this.log && console.log('C-DatasetItem > createItem > this.localItem : ', this.localItem)
            // this.log && console.log('C-DatasetItem > createItem > this.emptyItem : ', this.emptyItem)
            
            this.resetEmptyDataset()

            // action from workspace : append new dataset to workspace.datasets
            let currentWs = this.getUserWorkspaceById(this.fromWorkspace)
            // this.log && console.log('C-DatasetItem > createItem > currentWs : ', currentWs)
            let wsPreviousDatasets = currentWs.datasets && currentWs.datasets.ids || []
            let payloadWs = { ...currentWs }
            payloadWs.datasets = {
              ids: [ ...wsPreviousDatasets, respPost.data.id ]
            }
            // this.log && console.log('C-DatasetItem > createItem > payloadWs : ', payloadWs)
            this.$axios
              .put(`${this.api.workspaces}/${this.fromWorkspace}`, payloadWs, this.headerUser)
              .then( respPut => {
                this.$store.dispatch(`workspaces/updateUserItem`, {data: respPut.data})

                // commented during backend dev / debugging
                this.$router.push(`/dataset/${respPost.data.id}`)
                return
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
              payloadWs.data = {
                ids: wsPreviousDatasets.filter(ds => ds !==  this.ds.id )
              }
              // this.log && console.log(`...C-DatasetItem > deleteDataset > ds ${this.ds.id} > payloadWs : `, payloadWs)
              this.$store.dispatch(`workspaces/updateUserItem`, {data: payloadWs})
            }
          })
      },
    }

  }
</script>
