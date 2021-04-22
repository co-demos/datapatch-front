<template>

  <v-container class="my-5 px-0 mx-0">

    <!-- dataset page for <code>{{ dsId }}</code><br> -->

    <DataTable
      :localItem="currentDataset"
      :dataHeaders="dataHeaders"
      :dataRows="dataRows"
      :fulllWidth="true"
    />

  </v-container>

</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'
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
      dataHeaders: undefined,
      dataRows: undefined,

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
