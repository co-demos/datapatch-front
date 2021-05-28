<style>
.table-root {
  border-top: thin solid lightGrey !important;
  /* border-bottom: thin solid lightGrey !important; */
  border-right: thin solid lightGrey !important;
  border-left: thin solid lightGrey !important;
}
table {
  border-collapse: none;
  border-style: none;
  border-right: thin solid lightGrey !important;
}
tbody {
  /* border-bottom: thin solid lightGrey !important; */
}
th, td {
  border-bottom: thin solid lightGrey !important;
}
.table-root {
  position: relative;
}
.table-overflow {
  overflow-x: auto;
  overflow-y: hidden;
}
.fixed-columns {
  border-spacing: 0;
  table-layout: fixed;
}
.fixed-column {
  position: absolute;
  display: flex;
  align-items: center;
}
.fixed-field {
  border-right: thin solid lightGrey !important;
  padding-bottom: 1px;
}
.th-color {
  background-color: ghostWhite !important;
}
.th-color-fixed {
  /* background-color: floralwhite !important; */
  background-color: ghostWhite !important;
  border-bottom: thin solid lightGrey !important;
}
.th-help {
  width: 40px !important;
}
.th-data {
  border-right: thin solid lightGrey !important;
}
.th-end {
  border-right: thin solid lightGrey !important;
}
th {
  /* border-bottom: thin solid lightGrey !important; */
  height: 40px!important;
}
td {
  /* border-bottom: thin solid lightGrey !important; */
  height: 35px!important;
}
.td-oneline {
  /* display:  block; */
  overflow: hidden; 
  white-space: nowrap;
  /* text-overflow: ellipsis; */
  padding-left: 20px;
}
/* .td-data {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
} */
.td-drag {
  border-right: thin solid lightGrey !important;
}
.row-selected {
  /* background-color: gainsboro !important; */
  background-color: whitesmoke !important;
}
.row-resizing {
  border-right: 2px solid black !important;
}

.partial-full-height {
  height: 75vh;
}

</style>

<template>

  <div class="table-root" v-if="tableId">

    <div
      class="table-overflow" 
      :style="`margin-left: ${tableMarginLeft()}px`"
      v-show="!isTableLoading"
      >

      <table
        class="fixed-columns mb-4"
        >

        <!-- HEADERS -->
        <thead
          class="py-1"
          >

          <!-- UNFIXED COLUMNS -->
          <draggable
            v-model="tableHeaders"
            v-bind="dragOptionsHeaders"
            tag="tr"
            draggable=".th-drag"
            @start="drag=true"
            @end="drag=false; updateColumnsOrder(); triggerGetColSize *= -1"
            >
            <th
              v-for="(h, hIdx) in tableHeaders"
              :key="`h-${hIdx}`"
              :class="`\
${h.helpHeader || h.fixed ? 'th-color-fixed' : 'th-color th-data th-drag'}\
${h.fixed ? ' fixed-column' : ''}\
${h.fixed && !h.helpHeader ? ' fixed-field' : ''}\
`"
              >
              <!-- :style="`min-width: ${h.width ? h.width + 'px' : 'auto'}; ${h.fixed ? 'left:' + getHeaderLeft(h) + 'px' : ''}`" -->
              <!-- {{ h.value }} - {{ h.fixed }} - {{ h.width }} -->
              <DataPatchHeader
                :tableId="tableId"
                :header="h"
                :itemModel="fieldModel"
                :onlyLocalUpdate="onlyLocalUpdate"
                :triggerGetColSize="triggerGetColSize"
                @resizeHeader="updateHeader"
                @addColumn="addColumn"
                @hoverResize="hoverResize"
              />
            </th>
          </draggable>
        </thead>

        <!-- VALUES / ROWS -->
        <draggable
          v-model="tableRows"
          v-bind="dragOptionsRows"
          tag="tbody"
          @start="drag=true"
          @end="drag=false; updateRowsOrder()"
          >
          <tr
            v-for="(rowData, rowIdx) in tableRows"
            :key="`r-${rowIdx}`"
            >
            <td
              v-for="(h, hIdx) in tableHeaders"
              :key="`r-h-${hIdx}`"
              :class="`td \
${!h.helpHeader || h.divider ? 'td-drag' : 'td-help'}\
${h.fixed ? ' fixed-column' : ''}\
${selectedRows.includes(rowData.id) ? ' row-selected' : ''}\
${!h.helpHeader && headerResizingId === h.id ? ' row-resizing' : ''}\
`"
              :style="`\
${h.fixed ? 'left:' + getHeaderLeft(h) + 'px' : ''}\
`"
>
<!-- width: ${h.width ? h.width + 'px' : 'auto'}; \ -->
<!-- ${!h.helper ? 'td-data' : ''} \ -->
<!-- min-width: ${h.width ? h.width + 'px' : 'auto'}; \ -->
              <!-- {{ rowData[ h.value ] }} -->
              <DataPatchCell
                :tableId="tableId"
                :cellData="onlyLocalUpdate ? rowData[ h.value ] : rowData[ h.field_code ]"
                :header="h"
                :rowId="rowData.id"
                :selectedRows="selectedRows"
                :onlyLocalUpdate="onlyLocalUpdate"
                @editRow="editRow"
                @updateCellValue="updateCellValue"
                @deleteRow="deleteRow"
                @selectRow="toggleSelectRow"
              />
            </td>
          </tr>

          <!-- ADD ROW -->
          <tr>
            <td
              v-for="(h, hIdx) in tableHeaders"
              :key="`r-h-${hIdx}`"
              :class="`justify-center\
${h.fixed ? ' fixed-column' : ''} 
              `"
              :style="`\
min-width: ${h.width ? h.width + 'px' : 'auto'};\
${h.fixed ? 'left:' + getHeaderLeft(h) + 'px' : ''}
              `"
              >
              <v-btn 
                v-if="hIdx === 3"
                x-small
                plain
                :class="`px-1`"
                @click="addRow()"
                >
                <v-icon small>
                 icon-plus
                </v-icon>
              </v-btn>
            </td>
          </tr>
        </draggable>

      </table>

    </div>

    <ModalRow
      :item="rowDataToEdit"
      :itemModel="tableHeaders"
      :itemType="'row'"
      :parentDialog="dialogEditRow"
      :action="'update'"
      :onlyLocalUpdate="onlyLocalUpdate"
      @saveItem="saveItem"
    />

    <v-row
      v-show="isTableLoading"
      class="align-top justify-center ma-0 partial-full-height"
      >
      <v-col class="text-center" cols="12">
        <!-- <LogoAnimated
          :yoyo="true"
          :repeat="-1"
          :animated="true"
          :height="'200px'"
          :noText="true"
        /> -->
        <v-skeleton-loader
          class="mt-2 mb-3"
          type="text"
        />
        <v-skeleton-loader
          type="divider, table-row-divider@10"
        />
      </v-col>
    </v-row>

    <!-- DEBUGGING -->
    <v-row class="text-caption" v-if="false">
      <v-col cols="12">
        <h5>
          <hr> DEBUG FROM : DataPatchTable
        </h5>
      </v-col>
      <v-col cols="2">
        tableId: <code>{{ tableId }}</code><br>
      </v-col>
      <v-col cols="4">
        tableHeaders: <br>
        <code><pre>{{ tableHeaders }}</pre></code>
      </v-col>
      <v-col cols="6">
        tableRows: <br>
        <code><pre>{{ tableRows }}</pre></code>
      </v-col>
    </v-row>

  </div>
</template>


<script>

  import { mapState, mapGetters, mapActions } from 'vuex'
  import { Field } from '@/utils/utilsFields'

  export default {
    name: 'DataPatchTable',
    props: [
      'tableId',
      'onlyLocalUpdate',
    ],
    watch: {
      tableId(next) {
        this.log && console.log(`C-DataPatchTable > watch > tableId > next :`, next)
        if (next) {
          this.resetDisplayedTables()
        }
      },
      getCurrentTableFields(next, prev) {
        // this.log && console.log(`C-DataPatchTable > watch > getCurrentTableFields > next :`, next)
        if (next && this.tableId) {
          this.tableHeaders =  [ ...next ]
        }
      },
      getTablesNeedReload(next) {
        this.log && console.log(`C-DataPatchTable > watch > getTablesNeedReload > next :`, next)
        if (next && this.tableId) {
          this.toggleTablesNeedReload(false)
          this.resetDisplayedTables()
        }
      },
      getTablesNeedRedraw(next) {
        this.log && console.log(`C-DataPatchTable > watch > getTablesNeedRedraw > next :`, next)
        if (next && this.tableId) {
          // this.resetDisplayedTables()
          this.redrawRows()
        }
      },
    },
    data () {
      return {
        drag: false,
        dialogEditRow: 0,
        headerResizingId: undefined,

        // headers - fields
        tableHeaders: [],
        triggerGetColSize: 1,

        // rows
        tableRows: [],
        rowDataToEdit: undefined,

        // ux - pagination - search
        search: '',
        tableOptions: {
          page: 1,
          itemsPerPage: 20,
        },
        selectedRows: [],

      }
    },
    beforeMount () {

      if (this.tableId) {
        this.resetDisplayedTables()
      }
    },

    computed: {
      dragOptionsHeaders() {
        return {
          animation: 200,
          group: "headers",
          disabled: false,
          ghostClass: "ghost"
        }
      },
      dragOptionsRows() {
        return {
          animation: 200,
          group: "rows",
          disabled: false,
          ghostClass: "ghost"
        }
      },
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
        isTableLoading: (state) => state.tables.isLoading,
        fieldModel: (state) => state.fields.itemModel,
      }),
      ...mapGetters({
        userId: 'user/userId',
        headerUser: 'user/headerUser',
        
        getTablesNeedReload: 'tables/getTablesNeedReload',
        getTablesNeedRedraw: 'tables/getTablesNeedRedraw',
        getCurrentTable: 'tables/getCurrentTable',
        getTableById: 'tables/getTableById',

        getSelectedRowsForCurrentTable: 'tables/getSelectedRowsForCurrentTable',
        getCurrentTable: 'tables/getCurrentTable',
        getCurrentTableFieldsDataLength: 'tables/getCurrentTableFieldsDataLength',
        getCurrentTableFields: 'tables/getCurrentTableFields',
        getCurrentTableRowsLength: 'tables/getCurrentTableRowsLength',
        getCurrentTableRows: 'tables/getCurrentTableRows',
      }),
    },
    methods: {
      ...mapActions({
        toggleTablesNeedReload: 'tables/toggleTablesNeedReload',
        toggleTablesNeedRedraw: 'tables/toggleTablesNeedRedraw',
        appendColumnToCurrentTableFields: 'tables/appendColumnToCurrentTableFields',
        updateColumnInCurrentTableFields: 'tables/updateColumnInCurrentTableFields',
        deleteColumnInCurrentTableFields: 'tables/deleteColumnInCurrentTableFields',
        setSelectedRows: 'tables/setSelectedRows',
        updateCellValueInTableData: 'tables/updateCellValueInTableData',
        appendRowToCurrentTableData: 'tables/appendRowToCurrentTableData',
        updateRowInCurrentTableData: 'tables/updateRowInCurrentTableData',
        deleteRowInCurrentTableData: 'tables/deleteRowInCurrentTableData',
        updateColumnsOrderInTableData: 'tables/updateColumnsOrderInTableData',
        updateRowsOrderInTableData: 'tables/updateRowsOrderInTableData',
      }),
      resetDisplayedTables() {
        this.redrawHeaders()
        this.redrawRows()
        this.selectedRows = [ ...this.getSelectedRowsForCurrentTable ]
      },
      redrawHeaders() {
        this.tableHeaders = [ ...this.getCurrentTableFields ]
      },
      redrawRows() {
        let paginer = {
          start: (this.tableOptions.page - 1) * this.tableOptions.itemsPerPage,
          end: this.tableOptions.itemsPerPage
        }
        this.log && console.log(`\nC-DataPatchTable > redrawRows > this.getCurrentTable :`, this.getCurrentTable)
        // this.log && console.log(`\nC-DataPatchTable > redrawRows > this.getCurrentTableRows :`, this.getCurrentTableRows)
        let rows = this.getCurrentTable.table_data
        // this.tableRows = [ ...this.getCurrentTableRows ].splice(paginer.start, paginer.end)
        this.tableRows = [ ...rows ].splice(paginer.start, paginer.end)
        this.log && console.log(`C-DataPatchTable > redrawRows > this.tableRows :`, this.tableRows)
        this.toggleTablesNeedRedraw(false)
      },
      hoverResize(headerId) {
        this.headerResizingId = headerId
      },
      updateHeader(headerData) {
        // this.log && console.log(`\nC-DataPatchTable > updateHeader > headerData : `, headerData)
        this.updateColumnInCurrentTableFields(headerData)
      },
      tableMarginLeft () {
        let marginL = 0
        // this.log && console.log(`\nC-DataPatchTable > tableMarginLeft > this.tableHeaders : `, this.tableHeaders)
        // this.log && console.log(`\nC-DataPatchTable > tableMarginLeft > this.getCurrentTableFields : `, this.getCurrentTableFields)
        // for (const h of this.tableHeaders) {
        // for (const h of this.getCurrentTableFields) {
        //   this.log && console.log(`C-DataPatchTable > tableMarginLeft > h : `, h)
        //   if (h && h.fixed) {
        //     marginL += h.width
        //   }
        // }
        return marginL + 1
      },
      getHeaderLeft(header)  {
        let LeftPx = 0
        // this.log && console.log(`\nC-DataPatchTable > tableMarginLeft > this.getCurrentTableFields : `, this.getCurrentTableFields)
        // for ( const h of this.tableHeaders) {
        // for (const h of this.getCurrentTableFields) {
        //  if (h && h.value !== header.value ) {
        //     LeftPx += h.width
        //   }
        // }
        return LeftPx
      },
      updateColumnsOrder() {
        // this.log && console.log(`\nC-DataPatchTable > this.tableHeaders :`, this.tableHeaders)
        let filteredHeaders = this.tableHeaders.filter( h => !h.helpHeader  )
        // this.log && console.log(`C-DataPatchTable > filteredHeaders :`, filteredHeaders)
        this.updateColumnsOrderInTableData(filteredHeaders)
      },
      updateRowsOrder() {
        this.updateRowsOrderInTableData(this.tableRows)
      },
      addColumn(type='str') {
        // this.log && console.log(`\nC-DataPatchTable > addColumn ...`)
        let now = new Date(Date.now())
        let newHeader = new Field(
          this.userId,
          this.$t('fields.newField') + Math.floor(Math.random() * 1000) ,// defaultHeader.field,
          this.$t('fields.newFieldTitle'),// defaultHeader.title,
          type,// defaultHeader.field_type,
          undefined,// `${this.$t('dataPackage.description')} - ${defaultHeader.title}`,
          now.toISOString(),
          this.tableHeaders.length - 4 // add Id
        )
        newHeader.helpHeader = false
        // this.log && console.log(`C-DataPatchTable > addColumn > newHeader.data :`, newHeader.data)
        // this.tableHeaders.splice( this.tableHeaders.length - 1, 0, newHeader.data)
        // this.log && console.log(`C-DataPatchTable > addColumn > this.tableHeaders :`, this.tableHeaders)
        this.appendColumnToCurrentTableFields(newHeader)
        this.redrawHeaders()
        setTimeout(() => {
          this.triggerGetColSize *= -1
        }, 100)
      },
      deleteColumn(headerData) {
        // this.log && console.log(`\nC-DataPatchTable > deleteColumn : headerData`, headerData)
        this.deleteColumnInCurrentTableFields(headerData.id)
      },
      addRow() {
        // this.log && console.log(`\nC-DataPatchTable > addRow ...`)
        // this.log && console.log(`C-DataPatchTable > addRow > this.tableHeaders : `, this.tableHeaders)
        let newRow = {}
        if (!this.onlyLocalUpdate) {
          this.tableHeaders.forEach( h => { if (!h.helpHeader) { newRow[h.field_code] = null } } )
        } else {
          this.tableHeaders.forEach( h => { if (!h.helpHeader) { newRow[h.value] = '' } } )
        }
        this.log && console.log(`C-DataPatchTable > addRow > newRow :`, newRow)
        
        if (!this.onlyLocalUpdate) {
          const updatePayload = {
            update_type: 'row',
            tablemeta_id: this.tableId,
            table_data_uuid: this.getCurrentTable.table_data_uuid,
            table_data_row: newRow,
          }
          this.log && console.log(`C-DataPatchTable > addRow > updatePayload : `, updatePayload)
          this.$axios
            .put( `${this.api.tables}/${this.tableId}/data`, updatePayload, this.headerUser )
            .then( resp => {
              this.log && console.log('C-DataPatchTable > addRow > resp.data : ', resp.data)
              this.appendRowToCurrentTableData(resp.data)
            })
        } else {
          newRow.id = this.getCurrentTableRows.length + 1
          this.appendRowToCurrentTableData(newRow)
        }
      },
      toggleSelectRow(rowId) {
        if (!this.selectedRows.includes(rowId)) {
          this.selectedRows.push(rowId)
        } else {
          this.selectedRows = this.selectedRows.filter( r => r !== rowId)
        }
        this.setSelectedRows({ tableId: this.tableId, rowIds: this.selectedRows})
      },
      editRow(rowId) {
        // this.log && console.log(`\nC-DataPatchTable > editRow ...`)
        let rowToEdit = this.tableRows.find( r => r.id === rowId )
        this.rowDataToEdit = rowToEdit
        this.dialogEditRow += 1
      },
      updateCellValue(cellData) {
        this.log && console.log(`\nC-DataPatchTable > updateCellValue ...`)
        this.log && console.log(`C-DataPatchTable > updateCellValue > this.tableId : `, this.tableId)
        this.log && console.log(`C-DataPatchTable > updateCellValue > this.onlyLocalUpdate : `, this.onlyLocalUpdate)
        this.log && console.log(`C-DataPatchTable > updateCellValue > this.getCurrentTable : `, this.getCurrentTable)
        this.log && console.log(`C-DataPatchTable > updateCellValue > cellData : `, cellData)
        this.updateCellValueInTableData(cellData)
        if (!this.onlyLocalUpdate) {
          const updatePayload = {
            update_type: 'cell',
            tablemeta_id: this.tableId,
            table_data_uuid: this.getCurrentTable.table_data_uuid,
            table_data_cell: {
              row_id: cellData.rowId,
              column: cellData.headerCode,
              value: cellData.value,
            },
          }
          this.log && console.log(`C-DataPatchTable > updateCellValue > updatePayload : `, updatePayload)
          this.$axios
            .put( `${this.api.tables}/${this.tableId}/data`, updatePayload, this.headerUser )
            .then( resp => {
              this.log && console.log('C-DataPatchTable > updateCellValue > resp.data : ', resp.data)
            })
        }

      },
      saveItem(rowData) {
        this.log && console.log(`\nC-DataPatchTable > saveItem ...`)
        this.log && console.log(`C-DataPatchTable > saveItem > this.tableId : `, this.tableId)
        this.log && console.log(`C-DataPatchTable > saveItem > this.onlyLocalUpdate : `, this.onlyLocalUpdate)
        this.log && console.log(`C-DataPatchTable > saveItem > this.getCurrentTable : `, this.getCurrentTable)
        this.log && console.log(`C-DataPatchTable > saveItem > cellData : `, rowData)
        this.updateRowInCurrentTableData(rowData)
        if (!this.onlyLocalUpdate) {
          const updatePayload = {
            update_type: 'row',
            tablemeta_id: this.tableId,
            table_data_uuid: this.getCurrentTable.table_data_uuid,
            table_data_row_id: rowData.id,
            table_data_row: rowData,
          }
          this.log && console.log(`C-DataPatchTable > updateCellValue > updatePayload : `, updatePayload)
          this.$axios
            .put( `${this.api.tables}/${this.tableId}/data`, updatePayload, this.headerUser )
            .then( resp => {
              this.log && console.log('C-DataPatchTable > updateCellValue > resp.data : ', resp.data)
            })
        }
      },
      deleteRow(rowId) {
        this.log && console.log(`\nC-DataPatchTable > deleteRow ...`)
        if (!this.onlyLocalUpdate) {
          const deletePayload = {
            update_type: 'row',
            tablemeta_id: this.tableId,
            table_data_uuid: this.getCurrentTable.table_data_uuid,
            table_data_row_id: rowId,
          }
          this.log && console.log(`C-DataPatchTable > deleteRow > deletePayload : `, deletePayload)
          // this.log && console.log(`C-DataPatchTable > deleteRow > this.headerUser : `, this.headerUser)
          this.$axios
            .delete( `${this.api.tables}/${this.tableId}/data`, { data: deletePayload, ...this.headerUser } )
            .then( resp => {
              this.log && console.log('C-DataPatchTable > deleteRow > resp.data : ', resp.data)
              this.deleteRowInCurrentTableData(resp.data.id)
            })
        } else {
          this.deleteRowInCurrentTableData(rowId)
        }
      },
    }
  }

</script>
