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

    <DataTables
      :currentDataset="currentDataset"
      :currrentDatasetTables="tablesBlank"
    />

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

  </v-container>

</template>


<script>

  import { mapState, mapGetters, mapActions } from 'vuex'
  import { Dataset } from '@/utils/utilsDatasets'
  import { configHeaders } from '@/utils/utilsAxios'

  import { Field, helpHeadersFields, endHeadersFields, defaultHeaders } from '@/utils/utilsFields'
  import { TableMetaData, defaultTableData } from '@/utils/utilsTables'

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
        itemModel: undefined,

        tablesBlank: [],

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



      let tableBlankHeaders = []
      for (let [i, defaultHeader] of defaultHeaders.entries()) {
        // this.log && console.log(`\nC-DataTable > beforeMount > defaultHeader : `, defaultHeader)
        let now = new Date(Date.now())
        let fieldClass = new Field(
          this.userId,
          defaultHeader.value,
          defaultHeader.text,
          defaultHeader.type,
          `${this.$t('dataPackage.description')} - ${defaultHeader.title}`,
          now.toISOString(),
          i + 1, 
        )
        // fieldClass.fixed = i === 0
        fieldClass.divider = true
        tableBlankHeaders.push(fieldClass)
      }

      // SET ROWS FOR BLANK
      let tableBlankRows = defaultTableData

      // SET TABLE FOR BLANK
     let now = new Date(Date.now())
     let tableBlank = new TableMetaData(
        this.userId,
        this.$t('tables.defaultTitle'),
        this.$t('tables.defaultDescription'),
        1,
        now.toISOString(),
        tableBlankHeaders,
        tableBlankRows
      )
      let tableBlankData = tableBlank.data
      let tableBlankDataCopy = { 
        ...tableBlankData,
        id: 2,
        title: this.$t('tables.defaultTitle') + '-2',
        tableFields: tableBlankData.tableFields.slice(0, 4),
        tableData: tableBlankData.tableData.slice(0, 5),
      }
      this.log && console.log(`\nC-DatasetImportData > beforeMount > tableItem : `, tableBlank)
      this.tablesBlank = [ tableBlankData, tableBlankDataCopy ]


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
    }

  }

</script>
