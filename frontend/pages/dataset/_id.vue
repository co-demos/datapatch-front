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

      <template v-slot:extension>
        <v-tabs
          dense
          v-model="tab"
          align-with-title
          >
          <v-tabs-slider></v-tabs-slider>
          <v-tab
            v-for="table in datasetTables"
            :key="table"
            >
            {{ table }}
          </v-tab>
        </v-tabs>
      </template>

    </v-toolbar>

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

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="table in datasetTables"
        :key="table"
        >
        <DataTable
          :localItem="currentDataset"
          :dataHeaders="dataHeaders"
          :dataRows="dataRows"
          :fulllWidth="true"
        />
      </v-tab-item>
    </v-tabs-items>




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
      tab: null,
      datasetTables: [ 'table 1', 'table 2', 'table 3' ],
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
