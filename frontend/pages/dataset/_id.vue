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
          x-small
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
  import { TableMetaData, defaultTableData, CreateBlankTable } from '@/utils/utilsTables'

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

      this.tablesBlank = CreateBlankTable(
        this.userId,
        this.$t('tables.defaultTitle'),
        this.$t('tables.defaultDescription')
      )
      this.setCurrentTables(this.tablesBlank)

    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        appTitle: (state) => state.appTitle,
        api: (state) => state.api,
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
    }

  }

</script>
