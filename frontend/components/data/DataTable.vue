<style scoped>
.th-min-width {
  border-left: thin solid lightGrey !important;
}
.th-custom {
  min-width: 150px !important;
  min-height: 70px !important;
  height: none !important;
}
.th-color {
  border-top: thin solid lightGrey !important;
  border-bottom: thin solid lightGrey !important;
  background-color: ghostWhite !important;
}
.td-custom {
  border-left: thin solid rgba(0, 0, 0, 0.12) !important;
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

    <!-- <v-card-title class="mb-3">
      {{ localItem.title }} -->
      <!-- <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="icon-search1"
        label="Search"
        single-line
        hide-details
      ></v-text-field> -->
    <!-- </v-card-title> -->

    <DataTableTools
      v-if="!noToolbar"
    />

    <v-row>
      <v-col
        cols="12"
        class="mr-2"
        >

          <!-- v-if="tableHeaders" -->
          <!-- :headers="[ ...tableHelpHeaders, ...tableHeaders, ...tableAddColHeaders]" -->
        <v-data-table
          :headers="tableHeaders"
          :items="tableRows"
          :search="search"
          :options="tableOptions"
          item-key="field"
          hide-default-header
          :items-per-page="5"
          class="elevation-0"
          v-model="selectedRows"
          >

          <!-- HEADERS -->
          <template v-slot:header="{ props: { headers } }">
            <thead>
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
                  :class="`th-color ${ h.helpHeader ? '' : 'th-custom th-drag' } ${ h.position === 'start' ? '' : 'th-min-width' } th-color`"
                  >

                  <DataTableHeader
                    v-if="!h.helpHeader"
                    :header="h"
                  />

                  <!-- ADD COLUMN -->
                  <span
                    v-if="h.helpHeader && h.position === 'end'"
                    class="text-center"
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
              <tr
                v-for="(rowData, index) in props.items"
                :key="index"
                >

                <!-- ROW >>> FIELDS -->
                <td 
                  v-for="(h, hIdx) in tableHeaders"
                  :key="hIdx"
                  :fixed="h.fixed"
                  :class="`${ h.position === 'start' ? '' : 'td-custom' } ${ h.helpHeader ? '' : 'td-oneline'} text-${ getJustify(h) } ${ h.position === 'end' ? 'cell-ghost'+(hoverAddCol ? '-on' : '') :  ''}`"
                  >

                  <v-icon
                    v-if="h.helpHeader && h.field === 'move'"
                    color="grey"
                    small
                    >
                    icon-more-vertical
                  </v-icon>

                  <v-btn
                    v-if="h.helpHeader && h.field === 'edit'"
                    icon
                    small
                    color="black"
                    elevation="0"
                    class="px-1"
                    @click="editRow(rowData)"
                    >
                    <v-icon small>
                      icon-edit-3
                    </v-icon>
                  </v-btn>

                  <v-btn
                    v-if="h.helpHeader && h.field === 'delete'"
                    icon
                    small
                    color="grey"
                    elevation="0"
                    class="px-1"
                    @click="deleteRow(rowData)"
                    >
                    <v-icon small>
                      icon-trash-2
                    </v-icon>
                  </v-btn>

                  <v-btn
                    v-if="h.helpHeader && h.field === 'select'"
                    icon
                    small
                    :color="selectedRows.includes(rowData) ? 'black' : 'grey'"
                    elevation="0"
                    class="px-1"
                    @click="selectRow(rowData)"
                    >
                    <v-icon
                      small
                      v-if="selectedRows.includes(rowData)"
                      >
                      icon-check-square
                    </v-icon>
                    <span v-else>
                      {{ index + 1 }}
                    </span>
                  </v-btn>

                  <!-- CELL VALUE -->
                  <div v-if="!h.helpHeader">

                    <v-simple-checkbox
                      v-if="h.type === 'bool'"
                      v-model="rowData[ h.field ]"
                      disabled
                    />
                    <span v-else-if="h.type === 'str'">
                      {{ rowData[ h.field ] }}
                    </span>
                    <span v-else-if="h.type === 'tag'">
                      <v-chip
                        v-for="(val, i) in rowData[ h.field ]"
                        :key="i"
                        label
                        class="ma-1 py-0"
                        >
                        {{ val }}
                      </v-chip>
                    </span>
                    <span v-else-if="h.type === 'rating'">
                      <v-icon
                        v-for="(v,i) in rowData[ h.field ]"
                        :key="i"
                        class="ma-1 py-0"
                        small
                        >
                        icon-star
                      </v-icon>
                    </span>
                    <span v-else>
                      {{ rowData[ h.field ] }}
                    </span>

                  </div>

                </td>
              </tr>

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
                    v-if="h.helpHeader && h.field === 'select'"
                    class="text-center"
                    >
                    <v-btn
                      dark
                      small
                      :color="`${ hoverAddRow  ? 'primary' : 'grey lighten-1'}`"
                      elevation="0"
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

    <ModalRow
      :item="rowToEdit"
      :itemModel="tableHeaders"
      :itemType="'row'"
      :parentDialog="dialogEditRow"
      :action="'update'"
      :onlyLocalUpdate="true"
    />

  </div>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  import { Field, helpHeaders, addColHeaders, defaultHeaders } from '@/utils/utilsFields'

  export default {

    name: 'DataTable',
    props: [
      'localItem',
      'dataHeaders',
      'dataRows',
      'fulllWidth',
      'noToolbar'
    ],
    components: {
      DataTableTools: () => import(/* webpackChunkName: "DataTableTools" */ '@/components/data/DataTableTools.vue'),
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

        tableHelpHeaders: helpHeaders,
        tableAddColHeaders: addColHeaders,

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
        ]
      }
    },
    beforeMount () {
      let defaultHs = [ ]
      let now = new Date(Date.now())
      for (let defaultHeader of defaultHeaders) {
        // this.log && console.log(`\nC-DataTable > beforeMount > defaultHeader : `, defaultHeader)
        let fieldClass = new Field(
          this.userId,
          defaultHeader.field,
          defaultHeader.title,
          defaultHeader.type,
          `${this.$t('dataPackage.description')} - ${defaultHeader.title}`,
          now.toISOString()
        )
        defaultHs.push(fieldClass.data)
      }
      this.tableHeaders = [...helpHeaders, ...defaultHs, ...addColHeaders]
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
      getJustify(head) {
        // this.log && head.type === 'int' && console.log(`C-DataTable > cleanTableHeaders > head : `, head)
        let justify = head.helpHeader ? 'center px-0' : 'left'
        let centers = ['bool', 'rating', 'date']
        let rights = ['float', 'int']
        justify = centers.includes(head.type) ? 'center' : rights.includes(head.type) ? 'right' : justify
        // this.log && head.type === 'int' && console.log(`C-DataTable > cleanTableHeaders > justify : `, justify)
        return justify
      },
      addRow() {
        this.log && console.log(`\nC-DataTable > addRow ...`)
        this.log && console.log(`C-DataTable > addRow > this.tableHeaders : `, this.tableHeaders)
        let newRow = this.tableHeaders.reduce((obj, item) => (obj[item.field] = undefined, obj) ,{})
        this.log && console.log(`C-DataTable > addRow > newRow :`, newRow)
        this.tableRows.push(newRow)
      },
      editRow(rowData) {
        this.log && console.log(`\nC-DataTable > editRow > rowData : `, rowData)
        this.log && console.log(`C-DataTable > editRow > this.tableHeaders : `, this.tableHeaders)
        this.rowToEdit = rowData
        this.dialogEditRow += 1
      },
      selectRow(rowData) {
        this.log && console.log(`\nC-DataTable > selectRow > rowData : `, rowData)
        if (this.selectedRows.includes(rowData) ) {
          this.selectedRows = this.selectedRows.filter( r => r !== rowData)
        } else {
          this.selectedRows.push(rowData)
        }
        this.log && console.log(`C-DataTable > selectRow : this.selectedRows :`, this.selectedRows)
      },
      deleteRow(rowData) {
        this.log && console.log(`\nC-DataTable > deleteRow > rowData : `, rowData)
        // this.tableRows = this.tableRows.filter(r => r !== rowData )
      },
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
