<style scoped>
.table {
  /* min-width: 100%; */
  /* table-layout: fixed; */
  overflow-x: auto;
  /* border-collapse: collapse; */
}
/* th, td {
  min-width: 75px;
} */
th {
  min-width: 75px;
}
.th-min-width {
  /* border-left: thin solid lightGrey !important; */
}
.th-custom {
  /* overflow: hidden; 
  white-space: nowrap; */
  /* min-width: 150px !important; */
  /* min-height: 70px !important; */
  /* width: 100%; */
  height: none !important;
}
.th-color {
  border-top: thin solid lightGrey !important;
  border-bottom: thin solid lightGrey !important;
  background-color: ghostWhite !important;
}
.td-custom {
  /* border-left: thin solid rgba(0, 0, 0, 0.12) !important; */
  /* min-width: 150px !important; */
}
.td-oneline {
  overflow: hidden; 
  white-space: nowrap;
}
.add-col {
  min-width: 80px !important;
}
.add-cell {
  /* min-width: 150px !important; */
}
.cell-ghost {
  background-color: transparent !important;
}
.cell-ghost-on {
  background-color: lightGrey !important;
}
</style>
<template>

  <div
    :class="`${fulllWidth ? 'px-0 ml-0 mr-0' : 'px-5'}`"
    >
    <!-- :outlined="!fulllWidth" -->
    <!-- :flat="fulllWidth" -->

    <DataTableTools
      v-if="!noToolbar"
    />

    <!-- <v-container> -->
      <!-- v-if="false" -->
    <v-row
      >
      <v-col
        cols="12"
        class="mr-2"
        >
          <!-- v-if="tableHeaders" -->
          <!-- :headers="[ ...tableHelpHeaders, ...tableHeaders, ...tableAddColHeaders]" -->
        <v-data-table
          v-table-resizable
          :headers="tableHeaders"
          :items="tableRows"
          :search="search"
          :options="tableOptions"
          hide-default-header
          :items-per-page="5"
          class="elevation-0"
          v-model="selectedRows"
          >

          <!-- HEADERS -->
          <template v-slot:header="{ props: { headers } }">
            <thead
              >
              <!-- border="1" -->
              <draggable
                v-model="tableHeaders"
                v-bind="dragOptions"
                draggable=".th-drag"
                tag="tr"
                group="columns"
                @start="drag=true"
                @end="drag=false"
                >
                <!-- FIELDS -->
                <th
                  v-for="(h, idx) in tableHeaders"
                  :key="idx"
                  role="columnheader"
                  scope="col"
                  :class="`th-color ${ h.helpHeader ? '' : 'th-drag' } text-center`"
                  >

                  <DataTableHeader
                    v-if="!h.helpHeader"
                    :header="h"
                  />

                  <!-- ADD COLUMN -->
                  <span
                    v-if="h.helpHeader && h.position === 'end'"
                    >
                    <v-btn
                      dark
                      small
                      :color="`${ hoverAddCol  ? 'primary' : 'grey lighten-1'}`"
                      elevation="0"
                      @mouseover="hoverAddCol = true"
                      @mouseleave="hoverAddCol = false"
                      @click="addColumn()"
                      >
                      <v-icon small>
                        icon-plus
                      </v-icon>
                    </v-btn>
                  </span>

                </th>
              </draggable>
            </thead>
          </template>

          <!-- ROWS -->
          <template v-slot:body="props">
            <draggable
              v-model="tableRows"
              v-bind="dragOptions"
              tag="tbody"
              group="rows"
              @start="drag=true"
              @end="drag=false"
              >
              <DataTableRow
                v-for="(rowData, index) in props.items"
                :key="index"
                :rowIndex="index"
                :rowData="rowData"
                :tableHeaders="tableHeaders"
                :selectedRows="selectedRows"
              />


              <!-- ghost row -->
              <!-- add last row (ghost cells) -->
              <tr>
                <td 
                  v-for="(h, hIdx) in tableHeaders"
                  :key="`ghost-${hIdx}`"
                  :class="`${ h.position === 'start' ? '' : 'td-custom' } cell-ghost${hoverAddRow ? '-on' : '' }`"
                  >
                  <!-- ADD ROW -->
                  <span
                    v-if="h.helpHeader && h.field === 'edit'"
                    class="text-center"
                    >
                    <v-btn
                      dark
                      small
                      :color="`${ hoverAddRow  ? 'primary' : 'grey lighten-1'}`"
                      elevation="0"
                      class="px-0"
                      @mouseover="hoverAddRow = true"
                      @mouseleave="hoverAddRow = false"
                      @click="addRow()"
                      >
                      <v-icon small>
                        icon-plus
                      </v-icon>
                    </v-btn>
                  </span>
                </td>
              </tr>

            </draggable>
          </template> 

        </v-data-table>

      </v-col>
    </v-row>
    <!-- </v-container> -->

    <!-- DEBUGGIING -->
    <v-divider/>
    <!-- <v-row>
      <v-col> -->
        <v-data-table
          v-table-resizable
          :headers="tableHeaders"
          :items="tableRows"
          :options="tableOptions"
          class="elevation-0 table-resize"
          v-model="selectedRows"
          >
        </v-data-table>
      <!-- </v-col>
    </v-row> -->


    <v-row>
      <v-col cols="3">
        dataFields: <br>
        <code><pre>{{ dataFields }}</pre></code>
      </v-col>
      <v-col cols="3">
        tableHeaders: <br>
        <code><pre>{{ tableHeaders }}</pre></code>
      </v-col>
      <v-col cols="3">
        tableRows: <br>
        <code><pre>{{ tableRows }}</pre></code>
      </v-col>
      <v-col cols="3">
        localItem: <br>
        <code><pre>{{ localItem }}</pre></code>
      </v-col>
    </v-row>

  </div>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  import { Field, helpHeadersFields, endHeadersFields, defaultHeaders } from '@/utils/utilsFields'

  export default {

    name: 'DataTable',
    props: [
      'localItem',
      'dataHeaders',
      'dataRows',
      'fulllWidth',
      'noToolbar',
      'table'
    ],
    components: {
      DataTableTools: () => import(/* webpackChunkName: "DataTableTools" */ '@/components/data/DataTableTools.vue'),
      DataTableRow: () => import(/* webpackChunkName: "DataTableRow" */ '@/components/data/DataTableRow.vue'),
    },
    watch: {
    },
    data () {
      return {
        drag: false,
        hoverAddCol: false,
        hoverAddRow: false,

        search: '',
        tableOptions: {
          page: 1,
          itemsPerPage: -1,
        },
        selectedRows: [],

        helpersHs: helpHeadersFields.map( h => h.data ),
        addColHs: endHeadersFields.map( h => h.data ),

        dataFields: [],
        tableHeaders: [],

        dialogEditRow: 0,
        rowToEdit: undefined,

        tableRows: [
          {
            name: 'Elinor',                          // string example
            surname: 'Ostrom',                       // long string example
            bio: 'bblablabla',                       // long text example
            age: 42,                                 // int example
            ratio: 0.4,                              // float example
            birthDate: '',                           // date example
            jsonData : {},                           // json example
            tags : ['tag1', 'tag2'],                 // tags list example
            note : 5,                                // notation / star example
            important : true,                        // boolean example
            md: 'A _markdown_ example',              // markdown text example
            wikipediaPage: 'https://en.wikipedia.org/wiki/Elinor_Ostrom',   // url example
          },
          {
            name: 'Ghibli',                          // string example
            surname: 'Le chien',                     // long string example
            bio: 'waf waf waf',                      // long text example
            age: 10,                                 // int example
            ratio: 0.9,                              // float example
            birthDate: '',                           // date example
            jsonData : {},                           // json example
            tags : ['manger', 'dormir'],             // tags list example
            note : 5,                                // notation / star example
            important : true,                        // boolean example
            md: 'A _markdown_ example',              // markdown text example
            wikipediaPage: 'https://en.wikipedia.org/wiki/Elinor_Ostrom',   // url example
          },
          { name: 'test 2' },
          { name: 'test 3' },
          { name: 'test 4' },
          { name: 'test 5' },
          { name: 'test 6' },
          { name: 'test 7' },
          { name: 'test 8' },
          { name: 'test 9' },
          { name: 'test 10' },
          // { name: 'test 11' },
          // { name: 'test 12' },
          // { name: 'test 13' },
          // { name: 'test 14' },
          // { name: 'test 15' },
        ],
      }
    },
    beforeMount () {

      let dataHs = []
      // for (let defaultHeader of defaultHeaders) {
      for (let defaultHeader of defaultHeaders.filter((h,idx) => idx < 4)) {
        this.log && console.log(`\nC-DataTable > beforeMount > defaultHeader : `, defaultHeader)
        let now = new Date(Date.now())
        let fieldClass = new Field(
          this.userId,
          defaultHeader.value,
          defaultHeader.text,
          defaultHeader.type,
          `${this.$t('dataPackage.description')} - ${defaultHeader.title}`,
          now.toISOString()
        )
        fieldClass.divider = true
        dataHs.push(fieldClass)
      }
      this.dataFields = dataHs
      this.tableHeaders = [...this.helpersHs, ...dataHs.map(h => h.data), ...this.addColHs]
      // this.log && console.log(`\nC-DataTable > beforeMount > this.tableHeaders : `, this.tableHeaders)
    },
    computed: {
      dragOptions() {
        return {
          animation: 200,
          group: "datasets",
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

      addRow() {
        this.log && console.log(`\nC-DataTable > addRow ...`)
        this.log && console.log(`C-DataTable > addRow > this.tableHeaders : `, this.tableHeaders)
        let newRow = this.tableHeaders.reduce((obj, item) => (obj[item.field] = undefined, obj) ,{})
        this.log && console.log(`C-DataTable > addRow > newRow :`, newRow)
        this.tableRows.push(newRow)
      },

      // selectRow(rowData) {
      //   this.log && console.log(`\nC-DataTable > selectRow > rowData : `, rowData)
      //   if (this.selectedRows.includes(rowData) ) {
      //     this.selectedRows = this.selectedRows.filter( r => r !== rowData)
      //   } else {
      //     this.selectedRows.push(rowData)
      //   }
      //   this.log && console.log(`C-DataTable > selectRow : this.selectedRows :`, this.selectedRows)
      // },

      addColumn(type='str') {
        // this.log && console.log(`\nC-DataTable > addColumn ...`)
        let now = new Date(Date.now())
        let newHeader = new Field(
          this.userId,
          this.$t('fields.newField'),// defaultHeader.field,
          this.$t('fields.newFieldTitle'),// defaultHeader.title,
          type,// defaultHeader.type,
          undefined,// `${this.$t('dataPackage.description')} - ${defaultHeader.title}`,
          now.toISOString()
        )
        this.log && console.log(`\nC-DataTable > addColumn > newHeader.data :`, newHeader.data)
        this.tableHeaders.splice( this.tableHeaders.length - 1, 0, newHeader.data)
      },
      deleteColumn(headerData) {
        this.log && console.log(`\nC-DataTable > deleteColumn ...`)
        this.tableHeaders = this.tableHeaders && this.tableHeaders.filter(h => h !== headerData)
      }
    },
  }

</script>
