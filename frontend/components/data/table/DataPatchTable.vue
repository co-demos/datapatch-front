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
  overflow: hidden; 
  white-space: nowrap;
  padding-left: 20px;
}
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

</style>

<template>

  <div class="table-root">

    <div
      class="table-overflow" 
      :style="`margin-left: ${tableMarginLeft()}px`"
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
            @end="drag=false; updateColumnsOrder()"
            >
            <th
              v-for="(h, hIdx) in tableHeaders"
              :key="`h-${hIdx}`"
              :class="`
                ${h.helpHeader || h.fixed ? 'th-color-fixed' : 'th-color th-data th-drag'} 
                ${h.fixed ? 'fixed-column' : ''} 
                ${h.fixed && !h.helpHeader ? 'fixed-field' : ''}
              `"
              :style="`min-width: ${h.width ? h.width + 'px' : 'auto'}; ${h.fixed ? 'left:' + getHeaderLeft(h) + 'px' : ''}`"
              >
              <!-- {{ h.value }} - {{ h.fixed }} - {{ h.width }} -->
              <DataPatchHeader
                :tableId="tableId"
                :header="h"
                :itemModel="fieldModel"
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
              :class="`td 
                ${!h.helpHeader || h.divider ? 'td-drag' : 'td-help'} 
                ${h.fixed ? 'fixed-column' : ''} 
                ${selectedRows.includes(rowData.id) ? 'row-selected' : ''}
                ${!h.helpHeader && headerResizingId === h.id ? 'row-resizing' : ''}
              `"
              :style="`
                min-width: ${h.width ? h.width + 'px' : 'auto'}; 
                ${h.fixed ? 'left:' + getHeaderLeft(h) + 'px' : ''}
              `"
              >
              <!-- {{ rowData[ h.value ] }} -->
              <DataPatchCell
                :tableId="tableId"
                :cellData="rowData[ h.value ]"
                :header="h"
                :rowId="rowData.id"
                :selectedRows="selectedRows"
                @editRow="editRow"
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
              :class="`justify-center 
                ${h.fixed ? 'fixed-column' : ''} 
              `"
              :style="`
                min-width: ${h.width ? h.width + 'px' : 'auto'}; 
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
      :onlyLocalUpdate="true"
      @saveItem="saveItem"
    />


    <!-- DEBUGGING -->
    <v-row class="text-caption" v-if="false">
      <v-col cols="12">
        <h5>
          <hr> DEBUG FROM : DataPatchTable
        </h5>
      </v-col>
      <v-col cols="4">
        tableId: <code>{{ tableId }}</code>
      </v-col>
      <v-col cols="4">
        tableHeaders: <br>
        <code><pre>{{ tableHeaders }}</pre></code>
      </v-col>
      <v-col cols="4">
        tableRows: <br>
        <code><pre>{{ tableRows }}</pre></code>
      </v-col>
    </v-row>
    <!-- <hr> -->

  </div>
</template>


<script>

  import { mapState, mapGetters, mapActions } from 'vuex'
  import { Field } from '@/utils/utilsFields'

  export default {
    name: 'DataPatchTable',
    props: [
      'tableId',
    ],
    watch: {
      tableId(next) {
        // this.log && console.log(`\nC-DataPatchTable > watch > tableId > next : `, next)

        this.tableHeaders = [ ...this.getCurrentTableFields ]

        // this.log && console.log(`C-DataPatchTable > watch > tableId > this.tableRows - 1 : `, this.tableRows)
        this.tableRows = [ ...this.getCurrentTableRows ]
        // this.log && console.log(`C-DataPatchTable > watch > tableId > this.tableRows - 2 : `, this.tableRows)

        this.selectedRows = [ ...this.getSelectedRowsForCurrentTable ]

      }
    },
    data () {
      return {
        drag: false,
        dialogEditRow: 0,
        headerResizingId: undefined,

        // field models
        fieldModel: undefined,

        // headers - fields
        tableHeaders: [],

        // rows
        tableRows: [],
        rowDataToEdit: undefined,

        // ux - pagination - search
        search: '',
        tableOptions: {
          page: 1,
          itemsPerPage: -1,
        },
        selectedRows: [],

      }
    },
    beforeMount () {

      let emptyField = new Field()
      this.fieldModel = {
        infos: emptyField.infos,
        auth: emptyField.auth,
        meta: emptyField.meta,
      }

      this.tableHeaders = [...this.getCurrentTableFields]
      this.tableRows = [...this.getCurrentTableRows]
      this.selectedRows = [ ...this.getSelectedRowsForCurrentTable ]
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
      }),
      ...mapGetters({
        userId: 'user/userId',
        headerUser: 'user/headerUser',

        getCurrentTable: 'tables/getCurrentTable',
        getTableById: 'tables/getTableById',

        getSelectedRowsForCurrentTable: 'tables/getSelectedRowsForCurrentTable',
        getCurrentTableFieldsDataLength: 'tables/getCurrentTableFieldsDataLength',
        getCurrentTableFields: 'tables/getCurrentTableFields',
        getCurrentTableRowsLength: 'tables/getCurrentTableRowsLength',
        getCurrentTableRows: 'tables/getCurrentTableRows',
      }),
    },
    methods: {
      ...mapActions({
        appendColumnToCurrentTableFields: 'tables/appendColumnToCurrentTableFields',
        updateColumnInCurrentTableFields: 'tables/updateColumnInCurrentTableFields',
        deleteColumnInCurrentTableFields: 'tables/deleteColumnInCurrentTableFields',
        setSelectedRows: 'tables/setSelectedRows',
        appendRowToCurrentTableData: 'tables/appendRowToCurrentTableData',
        updateRowInCurrentTableData: 'tables/updateRowInCurrentTableData',
        deleteRowInCurrentTableData: 'tables/deleteRowInCurrentTableData',
        updateColumnsOrderInTableData: 'tables/updateColumnsOrderInTableData',
        updateRowsOrderInTableData: 'tables/updateRowsOrderInTableData',
      }),
      hoverResize(headerId) {
        this.headerResizingId = headerId
      },
      updateHeader(headerData) {
        // this.log && console.log(`\nC-DataPatchTable > updateHeader > headerData : `, headerData)
        // this.tableHeaders = [ ...this.tableHeaders.map(obj => obj.value !== headerData.value ? obj : {...obj, ...headerData} ) ]
        this.updateColumnInCurrentTableFields(headerData)
        this.tableHeaders = this.getCurrentTableFields
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
          type,// defaultHeader.type,
          undefined,// `${this.$t('dataPackage.description')} - ${defaultHeader.title}`,
          now.toISOString()
        )
        newHeader.helpHeader = false
        // this.log && console.log(`C-DataPatchTable > addColumn > newHeader.data :`, newHeader.data)
        // this.tableHeaders.splice( this.tableHeaders.length - 1, 0, newHeader.data)
        // this.log && console.log(`C-DataPatchTable > addColumn > this.tableHeaders :`, this.tableHeaders)
        this.appendColumnToCurrentTableFields(newHeader)
        this.tableHeaders = [...this.getCurrentTableFields]
      },
      deleteColumn(headerData) {
        this.log && console.log(`\nC-DataPatchTable > deleteColumn : headerData`, headerData)
        this.deleteColumnInCurrentTableFields(headerData.id)
      },
      addRow() {
        // this.log && console.log(`\nC-DataPatchTable > addRow ...`)
        // this.log && console.log(`C-DataPatchTable > addRow > this.tableHeaders : `, this.tableHeaders)
        let newRow = {}
        this.tableHeaders.forEach( h => {if( !h.helpHeader) { newRow[h.value] = '' }} )
        newRow.id = this.tableRows.length + 1
        // this.log && console.log(`C-DataPatchTable > addRow > newRow :`, newRow)
        this.appendRowToCurrentTableData(newRow)
        this.tableRows = [...this.getCurrentTableRows]
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
        this.log && console.log(`\nC-DataPatchTable > editRow ...`)
        let rowToEdit = this.tableRows.find( r => r.id === rowId )
        this.rowDataToEdit = rowToEdit
        this.dialogEditRow += 1
      },
      saveItem(rowData) {
        this.log && console.log(`\nC-DataPatchTable > saveItem ...`)
        this.updateRowInCurrentTableData(rowData)
        this.tableRows = [...this.getCurrentTableRows]
      },
      deleteRow(rowId) {
        this.log && console.log(`\nC-DataPatchTable > deleteRow ...`)
        this.deleteRowInCurrentTableData(rowId)
        this.tableRows = [...this.getCurrentTableRows]
      },
    }
  }

</script>
