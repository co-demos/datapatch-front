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
  background-color: gainsboro !important;
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
            :list="tableHeaders"
            v-bind="dragOptionsHeaders"
            tag="tr"
            draggable=".th-drag"
            @start="drag=true"
            @end="drag=false"
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
                :header="h"
                :itemModel="itemModel"
                @resizeHeader="updateHeader"
                @addColumn="addColumn"
              />
            </th>
          </draggable>
        </thead>

        <!-- VALUES / ROWS -->
        <draggable
          :list="tableRows"
          v-bind="dragOptionsRows"
          tag="tbody"
          @start="drag=true"
          @end="drag=false"
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
              `"
              :style="`
                min-width: ${h.width ? h.width + 'px' : 'auto'}; 
                ${h.fixed ? 'left:' + getHeaderLeft(h) + 'px' : ''}
              `"
              >
              <!-- {{ rowData[ h.value ] }} -->
              <DataPatchCell
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
              :class="`${h.fixed ? 'fixed-column' : ''} justify-center`"
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
      :itemModel="dataFields"
      :itemType="'row'"
      :parentDialog="dialogEditRow"
      :action="'update'"
      :onlyLocalUpdate="true"
      @saveItem="saveItem"
    />


    <!-- DEBUGGING -->
    <v-row class="text-caption">
      <v-col cols="12">
        <h5>
          <hr> DEBUG FROM : DataPatchTable
        </h5>
      </v-col>
      <v-col cols="4">
        tableHeaders: <br>
        <code><pre>{{ tableHeaders }}</pre></code>
      </v-col>
      <v-col cols="3">
        dataFields: <br>
        <code><pre>{{ dataFields }}</pre></code>
      </v-col>
      <v-col cols="4">
        tableRows: <br>
        <code><pre>{{ tableRows }}</pre></code>
      </v-col>
    </v-row>
    <hr>

  </div>
</template>


<script>

  import { mapState, mapGetters } from 'vuex'
  import { Field, helpHeadersFields, endHeadersFields } from '@/utils/utilsFields'

  export default {
    name: 'DataPatchTable',
    props: [
      'dataFields',
      'dataRows',
    ],
    data () {
      return {

        drag: false,
        dialogEditRow: 0,

        itemModel: undefined,

        helpersHs: helpHeadersFields.map( h => h.dataHelper ),
        addColHs: endHeadersFields.map( h => h.dataHelper ),
        tableHeaders: [],

        tableRows: [],
        rowDataToEdit: undefined,

        search: '',
        tableOptions: {
          page: 1,
          itemsPerPage: -1,
        },
        selectedRows: [],

      }
    },
    beforeMount () {
      let dataFields = this.dataFields.map( h => h.data )
      this.tableHeaders = [...this.helpersHs, ...dataFields, ...this.addColHs]
      let emptyField = new Field()
      this.itemModel = {
        infos: emptyField.infos,
        auth: emptyField.auth,
        meta: emptyField.meta,
      }
      this.tableRows = [...this.dataRows]
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
        headerUser: 'user/headerUser'
      }),
    },
    methods: {
      updateHeader(data) {
        // this.log && console.log(`\nC-DataPatchTable > data : `, data)
        this.tableHeaders = [ ...this.tableHeaders.map(obj => obj.value !== data.value ? obj : {...obj, ...data} ) ]
        // this.tableHeaders = [...this.helpersHs, ...updatedFields, ...this.addColHs]
      },
      tableMarginLeft () {
        let marginL = 0
        for (const h of this.tableHeaders) {
          // this.log && console.log(`C-DataPatchTable > h : `, h)
          if (h.fixed) {
            marginL += h.width
          }
        }
        return marginL + 1
      },
      getHeaderLeft(header)  {
        let LeftPx = 0
        for ( const h of this.tableHeaders) {
          if (h.value !== header.value ) {
            LeftPx += h.width
          } else {
            return LeftPx
          }
        }
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
        this.tableHeaders.splice( this.tableHeaders.length - 1, 0, newHeader.data)
        // this.log && console.log(`C-DataPatchTable > addColumn > this.tableHeaders :`, this.tableHeaders)
      },
      deleteColumn(headerData) {
        // this.log && console.log(`\nC-DataPatchTable > deleteColumn ...`)
        this.tableHeaders = this.tableHeaders && this.tableHeaders.filter(h => h !== headerData)
      },
      addRow() {
        // this.log && console.log(`\nC-DataPatchTable > addRow ...`)
        // this.log && console.log(`C-DataPatchTable > addRow > this.tableHeaders : `, this.tableHeaders)
        let newRow = {}
        this.tableHeaders.forEach( h => {if( !h.helpHeader) {newRow[h.value] = ''}} )
        newRow.id = this.tableRows.length + 1
        // this.log && console.log(`C-DataPatchTable > addRow > newRow :`, newRow)
        this.tableRows.push(newRow)
      },
      toggleSelectRow(rowId) {
        if (!this.selectedRows.includes(rowId)) {
          this.selectedRows.push(rowId)
        } else {
          this.selectedRows = this.selectedRows.filter( r => r !== rowId)
        }
      },
      editRow(rowId) {
        // this.log && console.log(`\nC-DataPatchTable > editRow ...`)
        let rowToEdit = this.tableRows.find( r => r.id === rowId )
        this.rowDataToEdit = rowToEdit
        this.dialogEditRow += 1
      },
      saveItem(rowData) {
        this.tableRows = this.tableRows.map( r => r.id === rowData.id ? rowData : r )
      },
      deleteRow(rowId) {
        // this.log && console.log(`\nC-DataPatchTable > deleteRow ...`)
        this.tableRows = this.tableRows && this.tableRows.filter(r => r.id !== rowId)
      },
    }
  }

</script>
