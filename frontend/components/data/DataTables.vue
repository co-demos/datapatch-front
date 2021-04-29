<style scoped>
.hide-x-scroll-parent{
  display: flex;
  flex-wrap: nowrap !important;
  overflow: scroll;
  overflow-x: auto !important;
  margin-bottom: -1px;
}
::-webkit-scrollbar {
  height: 0;  /* Remove scrollbar space */
  background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
  background: #FF0000;
}
</style>

<template>

  <div>

    <!-- DEBUGGING -->
    <v-row class="text-caption mb-3" v-if="false">
      <v-col cols="12">
        <h5>
          <hr> DEBUG FROM : DataTables
        </h5>
      </v-col>

      <v-col cols="4" v-if="false">
        currentDataset (prop): <br>
        <code><pre>{{ currentDataset }}</pre></code>
      </v-col>

      <v-col cols="4" v-if="true">
        getCurrentTables (getter): <br>
        <code>{{ getCurrentTables && getCurrentTables.map( t => { return { id: t.id, title: t.title, tableFieldsLength: t.tableFields.length, tableDataLength: t.tableData.length } } ) }}</pre></code>
      </v-col>

      <v-col cols="4" v-if="true">
        getCurrentTableId (getter): <br>
        <code>{{ getCurrentTableId }}</code>
      </v-col>

      <v-col cols="4" v-if="true">
        getCurrentTable (local): <br>
        <code><pre>{{ getCurrentTable && { 
          id: getCurrentTable.id, 
          title: getCurrentTable.title, 
          tableDataLength: getCurrentTable.tableData.length, 
          tableFieldsLength: getCurrentTable.tableFields.length 
        } }}</pre></code>
      </v-col>

    </v-row>
    <!-- <hr> -->

    <!-- TABS TABLES -->
    <v-row 
      :class="`align-center ${fromCreate ? '' : getDatasetColor} mb-n4 pl-12 pt-3`"
      >
      <v-col cols="11" class="pl-5 pb-0">
        <div class="align-center hide-x-scroll-parent">

          <!-- TABLE TAB -->
          <TableItem
            v-for="table in getCurrentTables"
            :key="`table-tab-${table.id}`"
            :tab="tab"
            :currentDataset="currentDataset"
            :tableId="table.id"
            :itemModel="itemModel"
            :itemType="itemType"
            :fromCreate="fromCreate"
            @changeTab="changeTab"
          />
            <!-- :table="table" -->

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

        </div>

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
      v-if="getCurrentTable"
      class="mt-1"
      >
      <v-col 
        cols="12"
        class="ma-0"
        >
        <DataTable
          :datasetItem="currentDataset"
          :tableId="getCurrentTableId"
          :noToolbar="noToolbar"
          :fromCreate="fromCreate"
          :fulllWidth="true"
        />
      </v-col>
    </v-row>

  </div>

</template>


<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

  import { TableMetaData, CreateEmptyBlankTable } from '@/utils/utilsTables'

  export default {
    name: 'DataTables',
    props: [
      'currentDataset',

      'currrentDatasetTables', // <-- ? to delete and replace by store getter

      'noToolbar',
      'fromCreate'
    ],
    data () {
      return {
        itemType: 'tables',
        itemModel: undefined,

        tab: undefined,

        // datasetTables: [],

      }
    },
    beforeMount () {

      // create model
      let emptyTable = new TableMetaData()
      this.itemModel = {
        infos: emptyTable.infos,
        auth: emptyTable.auth,
      }
      // this.log && console.log(`\nC-DataTables > beforeMount > emptyTable : `, emptyTable)

      // set default tab
      this.tab = this.currrentDatasetTables[0].id
      this.setCurrentTableId(this.tab)
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
        userId: 'user/userId',
        isAuthenticated: 'user/isAuthenticated',
        getCurrentTables: 'tables/getCurrentTables',
        getCurrentTable: 'tables/getCurrentTable',
        getCurrentTableId: 'tables/getCurrentTableId',
        getTableById: 'tables/getTableById',
      })
    },
    methods: {
      ...mapActions({
        setCurrentTables: 'tables/setCurrentTables',
        // setCurrentTable: 'tables/setCurrentTable',
        setCurrentTableId: 'tables/setCurrentTableId',
        appendTable: 'tables/appendTable',
      }),
      changeTab(tableId) {
        this.tab = tableId
        this.setCurrentTableId(tableId)
      },
      addTable() {
        let newId = this.getCurrentTables.length + 1
        let newTable = CreateEmptyBlankTable(
          this.userId,
          `${this.$t('tables.defaultTitle')} - ${newId}`,
          this.$t('tables.defaultDescription'),
          newId,
          false
        )[0]
        this.log && console.log(`\nC-DataTables > newTable : `, newTable)
        this.appendTable(newTable)
        this.changeTab(newTable.id)
      }
    }

  }

</script>
