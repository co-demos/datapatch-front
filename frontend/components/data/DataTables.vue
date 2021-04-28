<template>

  <div>

    <!-- DEBUGGING -->
    <!-- <v-row class="text-caption"> -->
      <!-- <v-col cols="12">
        <h5>
          <hr> DEBUG FROM : DataTables
        </h5>
      </v-col>
      <v-col cols="4">
        currentDataset (prop): <br>
        <code><pre>{{ currentDataset }}</pre></code>
      </v-col> -->
      <!-- <v-col cols="4">
        datasetTables (local): <br>
        <code><pre>{{ datasetTables.map( t => { return { id: t.id, title: t.title, tableFieldsLength: t.tableFields.length, tableDataLength: t.tableData.length } } ) }}</pre></code>
      </v-col> -->
      <!-- <v-col cols="4">
        currentTable (local): <br>
        <code><pre>{{ { 
              id: currentTable.id, 
              title: currentTable.title, 
              tableDataLength: currentTable.tableData.length, 
              tableFieldsLength: currentTable.tableFields.length 
          } }}</pre></code>
      </v-col> -->
    <!-- </v-row> -->
    <!-- <hr> -->

    <!-- TABS TABLES -->
    <v-row 
      :class="`align-center ${fromCreate ? '' : getDatasetColor} mb-n4 pl-12 pt-3`"
      >
      <v-col cols="11" class="pl-5 pb-0">
        <v-row class="align-center">

          <!-- TABLE TAB -->
          <TableItem
            v-for="table in datasetTables"
            :key="`table-tab-${table.id}`"
            :tab="tab"
            :currentDataset="currentDataset"
            :table="table"
            :itemModel="itemModel"
            :itemType="itemType"
            :fromCreate="fromCreate"
            @changeTab="changeTab"
          />

          <v-btn
            v-if="!fromCreate"
            icon
            small
            :color="`${ this.fromCreate ? getDatasetColor : 'white' }`"
            class="mb-1 ml-2"
            @click="addTable()"
            >
            <v-icon class="font-weight-bold">
              icon-plus
            </v-icon>
          </v-btn>

        </v-row>

      </v-col>

      <v-spacer/>

      <v-col class="pr-5 pb-0 mb-2">
        <v-btn
          v-if="!fromCreate"
          icon
          small
          color="white"
          class=""
          >
          <v-icon small class="">
            icon-message-square
          </v-icon>
        </v-btn>

      </v-col>

    </v-row>    

    <!-- TABLES -->
    <v-row
      v-for="table in datasetTables"
      :key="`table-${table.id}`"
      v-show="tab === table.id"
      >
      <v-col 
        cols="12"
        class="ma-0"
        >
        <DataTable
          v-if="tab === table.id"
          :datasetItem="currentDataset"
          :tableItem="table"
          :noToolbar="noToolbar"
          :fromCreate="fromCreate"
          :fulllWidth="true"
        />
      </v-col>
    </v-row>

  </div>

</template>


<script>

  import { TableMetaData, defaultTableData } from '@/utils/utilsTables'
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'DataTables',
    props: [
      'currentDataset',
      'currrentDatasetTables',
      'noToolbar',
      'fromCreate'
    ],
    data () {
      return {
        itemType: 'tables',
        itemModel: undefined,

        tab: undefined,

        datasetTables: [],

      }
    },
    beforeMount () {
      // create model
      let emptyTable = new TableMetaData()
      this.itemModel = {
        infos: emptyTable.infos,
        auth: emptyTable.auth,
      }
      this.log && console.log(`\nC-DataTables > beforeMount > emptyTable : `, emptyTable)

      // populate tables array
      if (this.currrentDataset && !this.currrentDatasetTables) {
        this.log && console.log(`C-DataTables > beforeMount > this.currrentDataset : `, this.currrentDataset)
        this.datasetTables = [ ...this.currrentDatasetTables.tables ]
      }
      if (this.currrentDatasetTables) {
        this.log && console.log(`C-DataTables > beforeMount > this.currrentDatasetTables : `, this.currrentDatasetTables)
        this.datasetTables = [ ...this.currrentDatasetTables ]
      }
      this.log && console.log(`C-DataTables > beforeMount > this.datasetTables : `, this.datasetTables)

      // set default tab
      this.tab = this.datasetTables[0].id
    },
    computed: {
      getDatasetColor() {
        let color = this.fromCreate ? 'grey darken-1' : this.currentDataset.color
        return color
      },
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
      })
    },
    methods: {
      // getTextColor(tableId) {
      //   let color = this.getDatasetColor
      //   let txtColor = this.tab !== tableId ? 'white' : color
      //   if (this.fromCreate) {
      //     txtColor = this.tab !== tableId ? color : 'white'
      //   }
      //   return txtColor
      // },
      // getTabBackgroundColor(tableId) {
      //   let color = this.getDatasetColor
      //   let bgColor = this.tab !== tableId ? color : 'white'
      //   if (this.fromCreate) {
      //     bgColor = this.tab !== tableId ? 'white' : color
      //   }
      //   return bgColor
      // },
      changeTab(tableId) {
        this.tab = tableId
      },
      addTable() {
        let newId = this.datasetTables.length + 1
        // let emptyTable = new TableMetaData()
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
