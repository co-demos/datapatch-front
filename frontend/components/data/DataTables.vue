<style scoped>
.hide-x-scroll-parent{
  display: flex;
  flex-wrap: nowrap !important;
  overflow: scroll;
  overflow-x: auto !important;
  margin-bottom: -1px;
  padding-right: 100px;
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
      v-if="tab && getCurrentTables"
      :class="`align-center ${fromCreate ? '' : getDatasetColor} my-0 pl-12 pt-3`"
      >
      <v-col cols="11" class="pl-5 pb-0 pt-0 pr-12">
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
            @removeTable="deleteTable"
          />
          <!-- :table="table" -->

          <!-- v-if="!fromCreate" -->
          <v-btn
            text
            x-small
            :color="`${ this.fromCreate ? 'primary' : 'white' }`"
            :class="`mb-2 ml-0`"
            @mouseover="hoverPlus=true"
            @mouseleave="hoverPlus=false"
            @click="addTable()"
            >
            <v-icon
              small
              :class="`font-weight-bold`"
              >
              icon-plus
            </v-icon>
            <span
              v-show="hoverPlus" 
              :class="`ml-1 text-none`"
              >
              {{ $t('tables.addTable') }}
            </span>
          </v-btn>
            
        </div>

      </v-col>

      <v-spacer/>

      <v-col class="pr-5 pt-0 pb-1 ma-0">
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
      v-if="tab && getCurrentTables"
      class="mt-n1"
      >
      <v-col 
        cols="12"
        class="ma-0 pt-0"
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
      'noToolbar',
      'fromCreate',
      'needReload',
    ],
    watch: {
      needReload(next) {
        if (next) {
          this.tab = this.getCurrentTables && this.getCurrentTables.length && this.getCurrentTables[0].id
          this.setCurrentTableId(this.tab)
        }
      },
    },
    data () {
      return {
        itemType: 'tables',
        itemModel: undefined,

        tab: undefined,
        hoverPlus: true,

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
      this.log && console.log(`\nC-DataTables > beforeMount > this.getCurrentTables : `, this.getCurrentTables)
      this.tab = this.getCurrentTables && this.getCurrentTables.length && this.getCurrentTables[0].id
      // this.tab = this.currrentDatasetTables[0].id
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
        getTablesNeedReload: 'tables/getTablesNeedReload',
        getCurrentTables: 'tables/getCurrentTables',
        getCurrentTable: 'tables/getCurrentTable',
        getCurrentTableId: 'tables/getCurrentTableId',
        getTableById: 'tables/getTableById',
      })
    },
    methods: {
      ...mapActions({
        setCurrentTables: 'tables/setCurrentTables',
        setCurrentTableId: 'tables/setCurrentTableId',
        appendTable: 'tables/appendTable',
        removeTable: 'tables/removeTable',
      }),
      changeTab(tableId) {
        this.tab = tableId
        this.setCurrentTableId(tableId)
      },
      addTable() {
        let existingIds = this.getCurrentTables.map(t => t.id)
        let newId = this.getCurrentTables.length + 1
        newId = existingIds.includes(newId) ? newId + 1 : newId
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
      },
      deleteTable(table) {
        this.log && console.log(`\nC-DataTables > deleteTable > table : `, table )
        // avoid deleting table if this is the only one
        let canDeleteTable = this.getCurrentTables.length > 1
        if (canDeleteTable) {
          this.removeTable(table)
          if (this.tab === table.id) {
            let newTab = this.getCurrentTables[0].id
            this.tab = newTab
            this.changeTab(newTab)
          }
        }
      }
    }

  }

</script>
