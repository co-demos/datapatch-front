<style scoped>

</style>

<template>

  <div
    :class="`${fulllWidth ? 'px-0 ml-0 mr-0' : 'px-5'}`"
    >

    <!-- CUSTOM TABLE TOOLS FOR DATA PATCH -->
    <DataPatchTools
      v-if="!noToolbar"
    />

    <!-- CUSTOM TABLE FOR DATA PATCH -->
    <DataPatchTable
      :dataFields="dataFields"
      :dataRows="tableRows"
    />

    <v-row class="text-caption">

      <!-- <v-col cols="3">
        dataFields: <br>
        <code><pre>{{ dataFields }}</pre></code>
      </v-col>
      <v-col cols="3">
        tableRows: <br>
        <code><pre>{{ tableRows }}</pre></code>
      </v-col> -->

      <!-- <v-col cols="3">
        datasetItem: <br>
        <code><pre>{{ datasetItem }}</pre></code>
      </v-col>
      <v-col cols="3">
        tableItem: <br>
        <code><pre>{{ tableItem }}</pre></code>
      </v-col>
      <v-col cols="3">
        dataHeaders: <br>
        <code><pre>{{ dataHeaders }}</pre></code>
      </v-col>
      <v-col cols="3">
        dataRows: <br>
        <code><pre>{{ dataRows }}</pre></code>
      </v-col> -->

    </v-row>

  </div>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  import { Field, helpHeadersFields, endHeadersFields, defaultHeaders } from '@/utils/utilsFields'
  import { TableMetaData, defaultTableData } from '@/utils/utilsTables'

  export default {

    name: 'DataTable',
    props: [
      'datasetItem',
      'tableItem',

      'dataHeaders',
      'dataRows',

      'fulllWidth',
      'noToolbar',
    ],
    data () {
      return {
        dataFields: [],
        tableRows: [],
      }
    },
    beforeMount () {
      
      // SET HEADERS
      if (this.dataHeaders) {
        this.dataFields = [...this.dataHeaders]
      } else {
        let dataHs = []
        for (let [i, defaultHeader] of defaultHeaders.entries()) {
          // this.log && console.log(`\nC-DataTable > beforeMount > defaultHeader : `, defaultHeader)
          let now = new Date(Date.now())
          let fieldClass = new Field(
            this.userId,
            defaultHeader.value,
            defaultHeader.text,
            defaultHeader.type,
            `${this.$t('dataPackage.description')} - ${defaultHeader.title}`,
            now.toISOString()
          )
          // fieldClass.fixed = i === 0
          fieldClass.divider = true
          dataHs.push(fieldClass)
        }
        this.dataFields = dataHs
      }

      // SET ROWS
      if (this.dataRows) {
        this.tableRows = [...this.dataRows]
      } else {
        this.tableRows = defaultTableData
      }

    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
      }),
      ...mapGetters({
        userId: 'user/userId',
        headerUser: 'user/headerUser'
      }),
    },
    methods: {
    },
  }

</script>
