<style scoped>

/* .add-shadow {
  background-image: 
    linear-gradient(to right, white, white), 
    linear-gradient(to right, white, white), 
    linear-gradient(to right, rgba(255, 255, 255, .50), rgba(255, 255, 255, 0)), 
    linear-gradient(to left, rgba(255, 255, 255, .50), rgba(255, 255, 255, 0));
  background-position: left center, right center, left center, right center;
  background-repeat: no-repeat;
  background-color: transparent;
  background-size: 0px 100%, 0px 100%, 50px 100%, 50px 100%;
  background-attachment: local, local, scroll, scroll;
} */

.hide-x-scroll-parent{
  display: flex;
  flex-wrap: nowrap !important;
  overflow: scroll;
  /* overflow-x: auto !important; */
  margin-bottom: -1px;
  /* padding-right: 100px; */

}

::-webkit-scrollbar {
  height: 0;  /* Remove scrollbar space */
  background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
/* ::-webkit-scrollbar-thumb {
  background: #FF0000;
} */
</style>

<template>

  <div class="DataTables">

    <!-- DEBUGGING -->
    <v-row class="text-caption mb-3" v-if="false">
      <v-col cols="12">
        <h5>
          <hr> DEBUG FROM : DataTables
        </h5>
      </v-col>

      <v-col cols="4" v-if="true">
        tab (getter): <code>{{ tab }}</pre></code> <br>
        getTablesNeedReload (getter): <code>{{ getTablesNeedReload }}</pre></code> <br>
      </v-col>

      <v-col cols="4" v-if="true">
        getCurrentTables (getter): <br>
        <code>{{ getCurrentTables && getCurrentTables.map( t => { return { id: t.id, title: t.title, table_fieldsLength: t.table_fields.length, table_dataLength: t.table_data.length } } ) }}</pre></code>
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
          table_dataLength: getCurrentTable.table_data.length, 
          table_fieldsLength: getCurrentTable.table_fields.length 
        } }}</pre></code>
      </v-col>

    </v-row>

    <!-- TABS TABLES -->
    <v-row 
      v-if="tab"
      :class="`align-center justify-center ${fromCreate ? '' : getDatasetColor} my-0 pl-5 pt-0 flex-grow-0`"
      >

      <!-- ADD TABLE -->
      <v-col cols="1" class="pa-0 text-center">

        <!-- <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              small
              :color="`${ fromCreate ? 'primary' : 'white' }`"
              :class="`mb-2 mx-0`"
              v-bind="attrs"
              v-on="on"
              @click="addTable()"
              >
              <v-icon
                small
                :class="`font-weight-bold`"
                >
                icon-plus
              </v-icon>
            </v-btn>
          </template>
          <span>
            {{ $t('tables.addTable') }}
          </span>
        </v-tooltip> -->

        <v-menu
          v-if="currentDataset"
          open-on-hover
          offset-x
          >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              small
              :color="`${ fromCreate ? 'primary' : 'white' }`"
              :class="`mb-2 mx-0`"
              v-bind="attrs"
              v-on="on"
              @click.stop="fromCreate ? addTable() : dialogCreate += 1"
              >
              <v-icon
                small
                :class="`font-weight-bold`"
                >
                icon-plus
              </v-icon>
            </v-btn>
          </template>

          <v-list dense>
          
            <v-subheader class="pa-5 text-uppercase">
              {{ $t('tables.newTable') }}
            </v-subheader>

            <v-list-item
              v-for="importOption in importOptions"
              :key="importOption.value"
              v-if="!importOption.disabled"
              @click.stop="openCreateWithPreset(importOption.value)"
              >
              <v-list-item-action>
                <v-icon small>
                  {{ importOption.icon }}
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t(importOption.title) }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list>
        </v-menu>

        <!-- DIALOG FOR DATASET CREATION -->
        <ModalCreateTable
          v-if="currentDataset"
          :parentDialog="dialogCreate"
          :item="currentDataset"
          :fromWorkspace="false"
          :itemModel="itemModel"
          :itemType="itemType"
          :action="'create'"
          :apiUrl="apiUrl"
          :presetCreate="presetCreate"
          @createItem="false"
        />

      </v-col>

      <!-- TABLE TABS -->
      <v-col 
        :cols="fromCreate ? 10 : 9" 
        class="pa-0"
        >

        <v-row class="ma-0">
          <draggable
            v-model="tables"
            v-bind="dragOptionsTables"
            tag="div"
            class="row ma-0 pa-0 hide-x-scroll-parent add-shadow"
            @start="drag=true"
            @end="drag=false; updateTablesOrder()"
            >
            <TableItem
              v-for="table in tables"
              :key="`table-tab-${table.id}`"
              :tab="tab"
              :currentDataset="currentDataset"
              :tableId="table.id"
              :itemModel="itemModel"
              :itemShare="itemModelShare"
              :itemType="itemType"
              :fromCreate="fromCreate"
              @changeTab="changeTab"
              @removeTable="deleteTable"
            />
          </draggable>
        </v-row>

      </v-col>

      <v-spacer/>

      <!-- NOTIFICATIONS / COMMENTS -->
      <v-col 
        v-if="!fromCreate"
        cols="1" class="pr-5 pt-0 pb-2 ma-0"
        >
        <v-tooltip
          left
          >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              x-small
              color="white"
              v-bind="attrs"
              v-on="on"
              class=""
              >
              <v-icon
                small
                class=""
                >
                icon-bell
              </v-icon>
            </v-btn>
          </template>
          {{ $t('datasets.btnNotifications') }}
        </v-tooltip>
      </v-col>

    </v-row>

    <!-- TABLES -->
    <v-row
      v-if="tab"
      class="mt-n1"
      >
      <v-col 
        cols="12"
        class="ma-0 pt-0"
        >

        <DataPatchTools
          v-if="!noToolbar"
          :tableId="tab"
          v-model="tableOptions"
        />

        <!-- CUSTOM TABLE FOR DATA PATCH -->
        <DataPatchTable
          :tableId="tab"
          :onlyLocalUpdate="fromCreate"
        />

      </v-col>
    </v-row>

  </div>

</template>


<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

  import { CreateEmptyBlankTable } from '@/utils/utilsTables'
  import { importOptionsInfos } from '@/utils/utilsImports.js'

  export default {
    name: 'DataTables',
    components: {
      ModalCreateTable: () => import(/* webpackChunkName: "ModalCreateTable" */ '@/components/data/table/ModalCreateTable.vue'),
    },
    props: [
      'currentDataset',
      'noToolbar',
      'fromCreate',
    ],
    watch: {
      getCurrentTables(next, prev) {
        this.log && console.log(`\C-DataTables > watch > getCurrentTables > next :`, next)
        this.log && console.log(`C-DataTables > watch > getCurrentTables > prev :`, prev)
        this.log && console.log(`C-DataTables > watch > getCurrentTables > this.getCurrentTableId :`, this.getCurrentTableId)
        if (next) {
          this.log && console.log(`C-DataTables > watch > getCurrentTables > next (A) ...`)
          this.tables = next && next.length && [ ...next ]
          if (!prev) {
            this.log && console.log(`C-DataTables > watch > getCurrentTables > A > !prev ...`)
            this.tab = next && next.length && next[0].id
            // this.setCurrentTableId({ tableId: this.tab, temp: this.fromCreate })
            this.setCurrentTableId({ tableId: this.getCurrentTableId, temp: this.fromCreate })
          } else {
            this.log && console.log(`C-DataTables > watch > getCurrentTables > A > prev ...`)
            this.tab = this.getCurrentTableId
          }
        } else {
          this.log && console.log(`C-DataTables > watch > getCurrentTables > !next (B) ...`)
          this.tables = undefined
          this.tab = undefined
        }
        this.log && console.log(`C-DataTables > watch > getCurrentTables > this.tab :`, this.tab)
        this.log && console.log(`C-DataTables > watch > getCurrentTables > this.getCurrentTableId :`, this.getCurrentTableId)
      },
    },
    data () {
      return {
        itemType: 'tables',
        apiUurl: undefined,

        drag: false,

        dialogCreate: 0,
        presetCreate: undefined,
        importOptions: importOptionsInfos,

        tab: undefined,
        tables: undefined,

        tableOptions: {
          search: '',
          sortBy: undefined,
          page: 1,
          itemsPerPage: 20,
          pagesTotal: 2,
        },
      }
    },
    beforeMount () {

      this.apiUrl =  this.api[this.itemType]

      // set default tab
      // this.log && console.log(`\nC-DataTables > beforeMount > this.getCurrentTables : `, this.getCurrentTables)
      let hasTables = this.getCurrentTables && this.getCurrentTables.length
      // this.log && console.log(`C-DataTables > beforeMount > hasTables : `, hasTables)
      this.tab = hasTables && this.getCurrentTableId // this.getCurrentTables[0].id
      // this.log && console.log(`C-DataTables > beforeMount > this.tab : `, this.tab)
      this.tables = hasTables && [ ...this.getCurrentTables ]
      this.setCurrentTableId({ tableId: this.tab, ttemp: this.fromCreate })
   },
    computed: {
      dragOptionsTables() {
        return {
          animation: 200,
          group: "tables",
          disabled: false,
          ghostClass: "ghost"
        }
      },
      getDatasetColor() {
        let color = this.fromCreate ? 'grey darken-1' : this.currentDataset.color
        return color
      },
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
        itemModel: (state) => state.tables.itemModel,
        itemModelShare: (state) => state.tables.itemModelShare,
      }),
      ...mapGetters({
        userId: 'user/userId',
        headerUser: 'user/headerUser',

        isAuthenticated: 'user/isAuthenticated',

        getTablesNeedReload: 'tables/getTablesNeedReload',
        getCurrentTables: 'tables/getCurrentTables',
        getCurrentTable: 'tables/getCurrentTable',
        getCurrentTableId: 'tables/getCurrentTableId',
      })
    },
    methods: {
      ...mapActions({
        togggleTablesIsLoading: 'tables/togggleIsLoading',
        setCurrentTables: 'tables/setCurrentTables',
        setCurrentTableId: 'tables/setCurrentTableId',
        appendTableStart: 'tables/appendTableStart',
        updateTable: 'tables/updateTable',
        removeTable: 'tables/removeTable',
      }),
      async changeTab(tableId) {
        let datasetId = this.currentDataset.id
        
        if (!this.fromCreate) {
          this.togggleTablesIsLoading({bool: true, temp: this.fromCreate})
          const tablemetaId = tableId
          // this.log && console.log('C-DataTables > this.$route : ', this.$route)
          // this.$router.replace({ params: { ...this.$route.params, table_id: tableId } })
          this.$router.replace(`/dataset/${datasetId}/table/${tableId}`)
          let tableData = await this.$axios
            .get(`${this.api.tables}/${tablemetaId}/data`, this.headerUser)
            .then( respTable => {
              // this.log && console.log('C-DataTables > changeTab > respTable.data : ', respTable.data)
              return respTable.data
            })
          let table = this.currentDataset.tables.find( t => t.id === tableId)
          table.table_data = tableData
          // this.log && console.log('C-DataTables > changeTab > table : ', table)
          this.updateTable({ table: table, temp: this.fromCreate })
        }

        this.tab = tableId
        this.setCurrentTableId({ tableId: tableId, temp: this.fromCreate })
      },
      openCreateWithPreset (preset) {
        this.log && console.log("C-DataTables > openCreateWithPreset > preset :", preset)
        this.presetCreate = preset
        this.dialogCreate += 1
      },
      updateTablesOrder() {
        this.log && console.log(`\nC-DataTables > updateTablesOrder > this.tables : `, this.tables)
        this.setCurrentTables({tables: this.tables, tableId: this.tab, temp: this.fromCreate})
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
        // this.log && console.log(`\nC-DataTables > addTable > newTable : `, newTable)
        this.appendTableStart({ table: newTable, temp: this.fromCreate })
        this.changeTab(newTable.id)
      },
      deleteTable(table) {
        this.log && console.log(`\nC-DataTables > deleteTable > table : `, table )
        // avoid deleting table if this is the only one
        let canDeleteTable = this.getCurrentTables.length > 1
        if (canDeleteTable) {
          this.removeTable({table: table, temp: this.fromCreate})
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
