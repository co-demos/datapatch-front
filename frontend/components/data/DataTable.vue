<style scoped>
.th-custom {
  border-left: thin solid lightGrey !important;
  min-width: 150px !important;
  min-height: 70px !important;
  height: none !important;
}
.th-color {
  border-top: thin solid lightGrey !important;
  border-bottom: thin solid lightGrey !important;
  background-color: ghostWhite !important;
}
/* .theader {
  height: none !important;
  min-height: 50px;
} */
.td-custom {
  border-left: thin solid rgba(0, 0, 0, 0.12) !important;
}
.add-col {
  min-width: 80px !important;
}
.add-cell {
  min-width: 150px !important;
}
.cell-ghost {
  background-color: lightGrey !important;
}
.cell-ghost-on {
  background-color: grey !important;
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

        <v-data-table
          :headers="tableHeaders"
          :items="tableRows"
          :search="search"
          :options="tableOptions"
          item-key="name"
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
                >
                <th class="th-color">
                  <!-- move column -->
                </th>
                <th class="th-color">
                  <!-- edit column -->
                </th>
                <th class="th-color">
                  <!-- delete column -->
                </th>
                <th class="th-color">
                  <!-- index column -->
                </th>

                <!-- FIELDS -->
                <th
                  v-for="(h, idx) in headers"
                  :key="idx"
                  class="th-color th-custom th-drag"
                  >
                  <DataTableHeader
                    :header="h"
                  />
                </th>

                <!-- ADD COLUMN -->
                <th 
                  :class="`text-center px-0 th-custom ${hoverAddCol ? 'cell-ghost-on' : 'th-color' }`"
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
              >
              <tr
                v-for="(rowData, index) in props.items"
                :key="index"
                >
                <td class="text-center td-custom pl-4 pr-2">
                  <v-icon
                    color="grey"
                    small
                    >
                    icon-move
                  </v-icon>
                </td>
                <td class="text-center px-2">
                  <v-btn
                    icon
                    small
                    color="black"
                    elevation="0"
                    class="px-1"
                    @click="editRow(rowData, props)"
                    >
                    <v-icon small>
                      icon-edit-3
                    </v-icon>
                  </v-btn>
                </td>
                <td class="text-center px-2">
                  <v-btn
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
                </td>
                <td class="text-center pl-2 pr-4">
                  <v-btn
                    icon
                    small
                    :color="selectedRows.includes(rowData) ? 'black' : 'grey'"
                    elevation="0"
                    class="px-1"
                    @click="selectRow(rowData), props.sele"
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
                </td>

                <!-- ROW - FIELDS -->
                <td 
                  v-for="(head, index) in props.headers"
                  :key="index"
                  :class="`td-custom ${ getJustify(head) }`"
                  >
                  <v-simple-checkbox
                    v-if="head.type === 'bool'"
                    v-model="rowData[ head.field ]"
                    disabled
                  />
                  <span v-else-if="head.type === 'str'">
                    {{ rowData[ head.field ] }}
                  </span>
                  <span v-else-if="head.type === 'tag'">
                    <v-chip
                      v-for="(v,i) in rowData[ head.field ]"
                      :key="i"
                      label
                      class="ma-1 py-0"
                      >
                      {{ v }}
                    </v-chip>
                  </span>
                  <span v-else-if="head.type === 'rating'">
                    <v-icon
                      v-for="(v,i) in rowData[ head.field ]"
                      :key="i"
                      class="ma-1 py-0"
                      small
                      >
                      icon-star
                    </v-icon>
                  </span>
                  <span v-else>
                    {{ rowData[ head.field ] }}
                  </span>
                </td>

                <!-- add column -->
                <td 
                  :class="`add-col cell-ghost${ hoverAddCol ? '-on' : ''}`"
                  >
                </td>
              </tr>

              <!-- add row (ghost cells) -->
              <tr>
                <td :class="`td-custom ${ hoverAddRow ? 'cell-ghost-on' : ''}`"/>
                <td :class="`${ hoverAddRow ? 'cell-ghost-on' : ''}`"/>
                <td :class="`${ hoverAddRow ? 'cell-ghost-on' : ''}`"/>
                <td 
                  :class="`text-center pa-3 ${ hoverAddRow ? 'cell-ghost-on' : ''}`"
                  >
                  <v-btn
                    small
                    :color="`${ hoverAddRow ? 'primary' : 'grey lighten-1'}`"
                    dark
                    elevation="0"
                    class="px-1"
                    @mouseover="hoverAddRow = true"
                    @mouseleave="hoverAddRow = false"
                    @click="addRow()"
                    >
                    <v-icon
                      small
                      >
                      icon-plus
                    </v-icon>
                  </v-btn>
                </td>
                <td 
                  v-for="(head, index) in props.headers"
                  :key="`ghost-${index}`"
                  :class="`add-cell td-custom cell-ghost${hoverAddRow ? '-on' : '' }`"
                  >
                  <!-- ghost row -->
                </td>
              </tr>

            </draggable>
          </template> 

        </v-data-table>

      </v-col>

      <v-col cols="3">
        - tableHeaders (value):<br>
        <code><pre>{{ tableHeaders.map(h => h.value) }}</pre></code>
      </v-col>

      <v-col cols="3">
        - tableRows (name):<br>
        <code><pre>{{ tableRows.map(r => r.name) }}</pre></code>
      </v-col>

      <v-col cols="6">
        - localItem:<br>
        <code><pre>{{ localItem }}</pre></code>
      </v-col>

    </v-row>
  </div>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  import { Field, helpHeaders, defaultHeaders } from '@/utils/utilsFields'

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
    data () {
      return {
        drag:  false,
        hoverAddCol: false,
        hoverAddRow: false,

        search: '',
        tableOptions: {
          page: 1,
          itemsPerPage: -1,
        },
        selectedRows: [],

        tableDefaultHeaders: helpHeaders,
        tableHeaders: defaultHeaders,
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
          { name: 'test 11' },
          { name: 'test 12' },
          { name: 'test 13' },
          { name: 'test 14' },
          { name: 'test 15' },
        ]
      }
    },
    beforeMount () {
      let defaultHs = []
      let now = new Date(Date.now())
      for (let defaultHeader of defaultHeaders) {
        this.log && console.log(`\nC-DataTable > beforeMount > defaultHeader : `, defaultHeader)
        let fieldClass = new Field(
          this.userId,
          defaultHeader.field,
          defaultHeader.title,
          defaultHeader.type,
          `${this.$t('dataPackage.description')} - ${defaultHeader.title}`,
          now.toISOString()
        )
        defaultHs.push(fieldClass)
      }
      this.tableHeaders = defaultHs
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
      }),
    ...mapGetters({
      userId: 'user/userId',
      headerUser: 'user/headerUser'
    }),
    },
    methods: {
      getJustify(head) {
        let justify = 'text-left'
        let center = ['bool', 'rating', 'date']
        let right = ['float', 'int']
        justify = center.includes(head.type) ? 'text-center' : justify
        justify = right.includes(head.type) ? 'text-right' : justify
        return justify
      },
      addRow() {
        this.log && console.log(`\nC-DataTable > addRow ...`)
        let newRow = this.tableHeaders.reduce((obj, item) => (obj[item.key] = item.value, obj) ,{})
        this.log && console.log(`C-DataTable > addRow > newRow :`, newRow)
        this.tableRows.push(newRow)
      },
      editRow(rowData, props) {
        this.log && console.log(`\nC-DataTable > editRow > rowData : `, rowData)
        this.log && console.log(`C-DataTable > editRow > props : `, props)
        // this.tableRows = this.tableRows.filter(r => r !== rowData )
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
      addColumn() {
        this.log && console.log(`\nC-DataTable > addColumn ...`)
        let newHeader = {
          value: 'newfield',
          text: 'new field',
          align: 'start',
          type: 'str',
          fixed: false,
        }
        this.tableHeaders.push(newHeader)
      },
      deleteColumn(headerData) {
        this.log && console.log(`\nC-DataTable > deleteColumn ...`)
        this.tableHeaders = this.tableHeaders.filter(h => h !== headerData)
      }
    },
  }

</script>
