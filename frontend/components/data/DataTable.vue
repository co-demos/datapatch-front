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
    

    <!-- DEBUGGING -->
    <!-- <v-row class="text-caption"> -->
      <!-- <v-col cols="12">
        <h5>
          <hr> DEBUG FROM : DataTable
        </h5>
      </v-col> -->
      <!-- <v-col cols="4">
        datasetItem: <br>
        <code><pre>{{ datasetItem }}</pre></code>
      </v-col> -->
      <!-- <v-col cols="4">
        tableItem: <br>
        <code><pre>{{ { 
              id: tableItem.id, 
              title: tableItem.title, 
              tableDataLength: tableItem.tableData.length, 
              tableFieldsLength: tableItem.tableFields.length 
          } }}</pre></code>
      </v-col> -->
      <!-- <v-col cols="3">
        dataHeaders: <br>
        <code><pre>{{ dataHeaders }}</pre></code>
      </v-col> -->
      <!-- <v-col cols="3">
        dataRows: <br>
        <code><pre>{{ dataRows }}</pre></code>
      </v-col> -->
    <!-- </v-row> -->
    <!-- <hr> -->

    <!-- CUSTOM TABLE FOR DATA PATCH -->
    <DataPatchTable
      :dataFields="dataFields"
      :dataRows="tableRows"
    />

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

      // 'dataHeaders',
      // 'dataRows',

      'fulllWidth',
      'noToolbar',
      'fromCreate'
    ],
    data () {
      return {
        dataFields: [],
        tableRows: [],
      }
    },
    beforeMount () {
      
      // SET HEADERS
      if (this.tableItem && this.tableItem.tableFields.length > 0 ) {
        this.dataFields = [ ...this.tableItem.tableFields ]
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
      // this.dataFields = [ ...this.tableItem.tableFields ]

      // SET ROWS
      if (this.tableItem && this.tableItem.tableData > 0 ) {
        this.tableRows = [ ...this.tableItem.tableData ]
      } else {
        this.tableRows = defaultTableData
      }
      // this.tableRows = [ ...this.tableItem.tableData ]


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
