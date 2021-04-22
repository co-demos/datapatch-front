<style scoped>
.th-custom {
  border-left: thin solid white !important;
  min-width: 150px !important;
  height: none !important;
  background-color: grey !important;
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
          >

          <!-- HEADERS -->
          <template v-slot:header="{ props: { headers } }">
            <thead>
              <draggable
                v-model="tableHeaders"
                v-bind="dragOptions"
                tag="tr"
                group="columns"
                >
                <th class="cell-ghost-on">
                  <!-- move column -->
                </th>
                <th class="cell-ghost-on">
                  <!-- edit column -->
                </th>
                <th class="cell-ghost-on">
                  <!-- delete column -->
                </th>
                <th
                  v-for="(h, idx) in headers"
                  :key="idx"
                  class="th-custom"
                  >
                  <v-row
                    class="pl-3 pr-1 align-center"
                    >
                    <v-col class="pa-0">
                      <span class="white--text text-body-1 font-weight-bold">
                      {{ h.value }}
                      </span>
                    </v-col>
                    <v-spacer/>
                    <v-col class="pa-0 text-right">
                      <v-btn
                        icon
                        text
                        small
                        >
                        <v-icon small class="white--text">
                          icon-more-vertical
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </th>
                <th 
                  :class="`text-center px-0 ${hoverAddCol ? 'cell-ghost-on' : '' }`"
                  >
                  <v-btn
                    dark
                    small
                    :color="`${ hoverAddCol  ? 'primary' : 'grey lighten-1'}`"
                    elevation="0"
                    @mouseover="hoverAddCol = true"
                    @mouseleave="hoverAddCol = false"
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
                    color="grey"
                    elevation="0"
                    class="px-1"
                    >
                    <v-icon small>
                      icon-edit
                    </v-icon>
                  </v-btn>
                </td>
                <td class="text-center pl-2 pr-4">
                  <v-btn
                    icon
                    small
                    color="grey"
                    elevation="0"
                    class="px-1"
                    >
                    <v-icon small>
                      icon-trash-2
                    </v-icon>
                  </v-btn>
                </td>
                <td 
                  v-for="(head, index) in props.headers"
                  :key="index"
                  class="td-custom"
                  >
                  {{ rowData[ head.value ] }}
                </td>
                <td 
                  :class="`add-col cell-ghost${ hoverAddCol ? '-on' : ''}`"
                  >
                  <!-- add column -->
                </td>
              </tr>

              <!-- add row -->
              <tr>
                <td 
                  :class="`td-custom ${ hoverAddRow ? 'cell-ghost-on' : ''}`"
                />
                <td 
                  :class="`text-center pa-0 ${ hoverAddRow ? 'cell-ghost-on' : ''}`"
                  >
                  <v-btn
                    small
                    :color="`${ hoverAddRow ? 'primary' : 'grey lighten-1'}`"
                    dark
                    elevation="0"
                    class="px-1"
                    @mouseover="hoverAddRow = true"
                    @mouseleave="hoverAddRow = false"
                    >
                    <v-icon
                      small
                      >
                      icon-plus
                    </v-icon>
                  </v-btn>
                </td>
                <td 
                  :class="`${ hoverAddRow ? 'cell-ghost-on' : ''}`"
                />
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
        tableDefaultHeaders: [
          {
            text: 'move',
            icon: 'icon-move',
            fixed: true,
          },
          {
            text: 'edit',
            icon: 'icon-edit',
            fixed: true,
          },
          {
            text: 'delete',
            icon: 'icon-trash-2',
            fixed: true,
          },
        ],
        tableHeaders: [
          {
            value: 'name',
            text: 'name',
            align: 'start',
            type: 'str',
            fixed: true,
          },
          {
            value: 'surname',
            text: 'surname',
            type: 'str',
          },
          {
            value: 'bio',
            text: 'biography',
            type: 'longStr',
          },
          {
            value: 'age',
            text: 'age',
            type: 'int',
          },
          {
            value: 'ratio',
            text: 'ratio',
            type: 'float',
          },
          {
            value: 'birthDate',
            text: 'birthDate',
            type: 'date',
          },
          {
            value: 'jsonData',
            text: 'json data',
            type: 'json',
          },
          {
            value: 'tags',
            text: 'tags',
            type: 'tag',
          },
          {
            value: 'note',
            text: 'note',
            type: 'note',
          },
          {
            value: 'important',
            text: 'important',
            type: 'bool',
          },
          {
            value: 'md',
            text: 'markdown',
            type: 'md',
          },
          {
            value: 'wikipediaPage',
            text: 'wikipedia page',
            type: 'url',
          },
        ],
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
    computed: {
      dragOptions() {
        return {
          animation: 200,
          group: "datasets",
          disabled: false,
          ghostClass: "ghost"
        }
      },
    },
  }

</script>
