<style scoped>
  .table-btn {
    border-style: solid;
    border-color: white !important;
  }
</style>

<template>

  <v-container class="mb-5 px-0 pt-0 mx-0">

    <AlertSnack
      :position="'bottom'"
      :onlyErrors="true"
    />

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
        <v-icon class="mr-4 pb-1">
          {{ currentDataset.icon }}
        </v-icon>
        <span>
          {{ currentDataset.title }}
        </span>
        <v-btn
          icon
          small
          class="ml-2"
          @click="dialog += 1"
          >
          <v-icon
            small
            >
            icon-more-vertical
          </v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>

    </v-toolbar>

    <v-row 
      :class="`align-center ${currentDataset.color} mb-n4 pl-12 pt-3`"
      >
      <v-col cols="11" class="pl-5">
            <!-- :dark="datasetTables.indexOf(table) === tab" -->
            <!-- :class="`${datasetTables.indexOf(table) === tab ? 'white' : currentDataset.color}`" -->
        <v-btn
          v-for="table in datasetTables"
          :key="table.id"
          tile
          :outlined="tab !== table.id"
          :class="`mx-2`"
          :color="`white`"
          @click="currentTable = table, tab = table.id"
          >
          <span
            :class="`px-3 text-none font-weight-bold ${tab === table.id ? currentDataset.color : 'white' }--text`"
            >
            {{ table.title }}
          </span>
        </v-btn>

        <v-btn
          icon
          small
          color="white"
          class="mb-1"
          @click="addTable()"
          >
          <v-icon class="font-weight-bold">
            icon-plus
          </v-icon>
        </v-btn>

      </v-col>

      <v-spacer/>

      <v-col class="pr-5">
        <v-btn
          icon
          small
          color="white"
          class="mb-2"
          >
          <v-icon class="">
            icon-message-square
          </v-icon>
        </v-btn>

      </v-col>

    </v-row>

    <!-- DIALOG FOR DATASET INFOS -->
    <ModalItem
      :parentDialog="dialog"
      :item="currentDataset"
      :itemModel="itemModel"
      :itemType="itemType"
      :action="'update'"
      :apiUrl="api.datasets"
      :updateCurrentDataset="true"
    />


    <DataTable
      :localItem="currentDataset"
      :dataHeaders="dataHeaders"
      :dataRows="dataRows"
      :fulllWidth="true"
      :table="currentTable"
    />

  </v-container>

</template>


<script>

  import { mapState, mapGetters, mapActions } from 'vuex'
  import { Dataset } from '@/utils/utilsDatasets'
  import { configHeaders } from '@/utils/utilsAxios'

  export default {
    name: 'Dataset',
    layout: 'dataset',
    middleware: [
      'getDatasetById'
    ],
    head() {
      return {
        title: `${this.appTitle} - ${this.$t('pages.dataset')}`,
        htmlAttrs: {
          lang: this.$i18n.locale
        },
      }
    },
    data () {
      return {
        dialog: 0,
        tab: undefined,
        datasetTables: [ 
          { title: 'table 1', id: 0 },
          { title: 'table 2', id: 1 },
          { title: 'table 3', id: 2 },
        ],
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
          // { 
          //   text: `${this.currentDataset.title}`,
          //   noTranslate: true,
          //   disabled: true,
          //   to: `/dataset/${this.$route.params.id}`,
          // }
        ],
        itemType: 'datasets',
        dataHeaders: undefined,
        dataRows: undefined,
        itemModel: undefined,
        currentTable: undefined,

      }
    },
    beforeMount () {
      // this.log && console.log(`P-Dataset _id > this.$route :`, this.$route)
      this.dsId = this.$route.params.id
      // this.log && console.log(`P-Dataset _id > this.dsId :`, this.dsId)
      // this.log && console.log(`P-Dataset _id > this.currentDataset :`, this.currentDataset)
      let pathData = {
        text: `${this.currentDataset.title}`,
        noTranslate: true,
        disabled: true,
        to: `/dataset/${this.dsId}`,
      }
      this.pathItems.push(pathData)
      this.updatePath(this.pathItems)

      let emptyDataset = new Dataset()
      this.itemModel = {
        infos: emptyDataset.infos,
        auth: emptyDataset.auth,
        prefs: emptyDataset.prefs,
      }
      // this.LocalItem = this.currentDataset
      this.currentTable = this.datasetTables[0]
      this.tab = this.currentTable.id
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        appTitle: (state) => state.appTitle,
        api: (state) => state.api,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
        currentDataset: 'datasets/getCurrentItem',
      })
    },
    methods: {
      ...mapActions({
        updatePath: 'updateCrumbsPath',
      }),
      addTable() {
        let newId = this.datasetTables.length + 1
        let newTable = {
          title: `new table ${newId}`,
          id: newId
        }
        this.datasetTables.push(newTable)
        this.currentTable = newTable
        this.tab = newTable.id
      }
    }

  }

</script>
