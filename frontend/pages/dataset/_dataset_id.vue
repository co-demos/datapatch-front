<style scoped>
  .no-decoration {
    text-decoration: none; 
  }
  .dataset-title {
    font-size: 1.5em !important;
  }
</style>

<template>

  <v-container class="mb-5 px-0 pt-0 mx-0">

    <AlertSnack
      :position="'bottom'"
      :onlyErrors="true"
    />

    <!-- DEBUGGING -->
    <v-row class="text-caption" v-if="false">
      <v-col cols="12">
        <h5>
          <hr> DEBUG FROM : _dataset_id.vue
        </h5>
      </v-col>
      <v-col cols="12">
        itemType : <code>{{ itemType }}</code><br>
        dialog : <code>{{ dialog }}</code><br>
        currentDataset : <code>{{ currentDataset }}</code><br>
        currentDataset : <code>{{ currentDataset }}</code><br>
      </v-col>
    </v-row>

    <!-- DATASET TITLE TOOLBAR -->
    <v-toolbar
      flat
      dense
      dark
      :color="currentDataset.color"
      class="mb-0"
      >
      <v-spacer></v-spacer>
      <v-toolbar-title>

        <v-icon class="mr-4 pb-0">
          {{ currentDataset.icon }}
        </v-icon>

        <v-btn
          class="text-none no-decoration"
          text
          @click.stop="dialog = true"
          >
          <span class="dataset-title">
            {{ currentDataset.title }}
          </span>
        </v-btn>

        <v-menu
          bottom
          open-on-hover
          >
          <template v-slot:activator="{ on: onMenu, attrs: attrsMenu }">
            <v-btn
              icon
              x-small
              class="ml-2"
              v-bind="{...attrsMenu}"
              v-on="{...onMenu}"
              @click="dialog += 1"
              >
              <v-icon
                small
                >
                icon-more-vertical
              </v-icon>
            </v-btn>
          </template>
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

            <v-list-item
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

      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <DataTables
      :currentDataset="currentDataset"
      :fromCreate="false"
    />

    <!-- DIALOG FOR DATASET INFOS -->
    <ModalItem
      v-if="currentDataset"
      :parentDialog="dialog"
      :item="currentDataset"
      :itemModel="itemModel"
      :itemType="itemType"
      :action="'update'"
      :apiUrl="api.datasets"
      :updateCurrentDataset="true"
      :noLink="true"
    />

    <!-- <ModalShare
      v-if="currentDataset"
      :parentDialog="dialogShare"
      :item="currentDataset"
      :itemModel="itemModelShare"
      :itemType="itemType"
      :action="'update'"
      :apiUrl="api.datasets"
      :updateCurrentDataset="true"
    /> -->

    <!-- DIALOG FOR DATASET DELETE -->
    <ModalDelete
      v-if="currentDataset"
      :parentDialog="dialogDelete"
      :confirmDeleteTitle="$t('datasets.deleteDataset')"
      :confirmDeleteMsg="$t('datasets.deleteDatasetConfirm')"
      :itemToDelete="currentDataset"
      @confirmDelete="deleteDataset()"
    />

  </v-container>

</template>


<script>

  import { mapState, mapGetters, mapActions } from 'vuex'
  // import { Dataset } from '@/utils/utilsDatasets'
  // import { configHeaders } from '@/utils/utilsAxios'

  // import { Field, helpHeadersFields, endHeadersFields, defaultHeaders } from '@/utils/utilsFields'
  // import { TableMetaData, defaultTableData, CreateBlankTable } from '@/utils/utilsTables'

  export default {
    name: 'Dataset',
    layout: 'layout_dataset',
    middleware: [
      'getDatasetById'
    ],
    head() {
      return {
        title: `${this.appTitle} - ${this.$t('pages.dataset')} ${this.currentDataset ? ': '  + this.currentDataset.title : ''}`,
        htmlAttrs: {
          lang: this.$i18n.locale
        },
      }
    },
    data () {
      return {
        dialog: 0,
        dialogShare: 0,
        dialogDelete: 0,
 
        dsId: undefined,
        pathItems: [
          { 
            text: 'pages.workspaces',
            disabled: false,
            to: '/workspaces',
          },
          { 
            text: 'pages.dataset',
            disabled: true,
            to: '/dataset',
          },
        ],
        itemType: 'datasets',

        tablesBlank: [],

      }
    },
    beforeMount () {
      // this.log && console.log(`P-Dataset _id > this.$route :`, this.$route)
      this.dsId = this.$route.params.id
      // this.log && console.log(`P-Dataset _id > this.dsId :`, this.dsId)
      this.log && console.log(`P-Dataset _id > this.currentDataset :`, this.currentDataset)

      let pathData = {
        text: `${this.currentDataset.title}`,
        noTranslate: true,
        disabled: true,
        to: `/dataset/${this.dsId}`,
      }
      this.pathItems.push(pathData)
      this.updatePath(this.pathItems)

    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        appTitle: (state) => state.appTitle,
        api: (state) => state.api,
        itemModel: (state) => state.datasets.itemModel,
        itemModelShare: (state) => state.datasets.itemModelShare,
      }),
      ...mapGetters({
        userId: 'user/userId',
        isAuthenticated: 'user/isAuthenticated',
        currentDataset: 'datasets/getCurrentItem',
      })
    },
    methods: {
      ...mapActions({
        updatePath: 'updateCrumbsPath',
        setCurrentTables: 'tables/setCurrentTables'
      }),
      deleteDataset() {
        // this.log && console.log("C-Dataset > deleteDataset > this.headerUser :", this.headerUser)
        // this.log && console.log(`\nC-Dataset > deleteDataset > ds ${this.currentDataset.id} > this.fromWorkspace :`, this.fromWorkspace)
        this.$axios
          .delete(`${this.apiUrl}/${this.currentDataset.id}`, this.headerUser)
          .then(resp => {
            // this.log && console.log(`C-Dataset > deleteDataset > ds ${this.ds.id} > resp.data : `, resp.data)
            this.$store.dispatch(`${this.itemType}/removeUserItem`, resp.data)
            
            // delete dataset reference from ALL workspace datasets
            // this.log && console.log('C-Dataset > deleteDataset > this.getUserWorkspaces : ', this.getUserWorkspaces)
            for (let ws of this.getUserWorkspaces) {
              // this.log && console.log(`\n...C-Dataset > deleteDataset > ds ${this.ds.id} > ws.id : `, ws.id)
              let wsPreviousDatasets = ws.datasets && ws.datasets.ids || []
              // this.log && console.log(`...C-Dataset > deleteDataset > ${this.ds.id} > wsPreviousDatasets : `, wsPreviousDatasets)
              let payloadWs = { ...ws }
              payloadWs.datasets = {
                ids: wsPreviousDatasets.filter(ds => ds !==  this.ds.id )
              }
              // this.log && console.log(`...C-Dataset > deleteDataset > ds ${this.ds.id} > payloadWs : `, payloadWs)
              this.$store.dispatch(`workspaces/updateUserItem`, {data: payloadWs})
              this.$router.push(`/workspaces`)
            }
          })
      },
    }

  }

</script>
