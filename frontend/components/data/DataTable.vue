<style scoped>
th {
  border: thin solid lightGrey !important;
  min-width: 150px !important;
  height: none !important;
}
/* .theader {
  height: none !important;
  min-height: 50px;
} */
td {
  border: thin solid lightGrey !important;
}
</style>
<template>

  <v-card
    :outlined="!fulllWidth"
    :flat="fulllWidth"
    :class="`${fulllWidth ? 'px-0' : 'px-5'}`"
    >

    <v-card-title class="mb-3">
      {{ localItem.title }}
      <!-- <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="icon-search1"
        label="Search"
        single-line
        hide-details
      ></v-text-field> -->
    </v-card-title>


    <v-row>

      <v-col
        cols="12"
        >

        <v-data-table
          :headers="tableHeaders"
          :items="tableRows"
          :search="search"
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
                <th
                  v-for="(h, idx) in headers"
                  :key="idx"
                  class="theader"
                  >
                  <v-row
                    align-center
                    class="px-1"
                    >
                    <v-col>
                      <span class="primary--text">
                      {{ h.value }}
                      </span>
                    </v-col>
                    <v-spacer/>
                    <v-col>
                    <v-btn
                      icon
                      text
                      small
                      >
                      <v-icon small>
                        icon-more-vertical
                      </v-icon>
                    </v-btn>
                    </v-col>
                  </v-row>
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
                <td 
                  v-for="(head, index) in props.headers"
                  :key="index"
                  >
                  {{ rowData[ head.value ] }}
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
  </v-card>

</template>

<script>

  export default {

    name: 'DataTable',
    props: [
      'localItem',
      'dataHeaders',
      'dataRows',
      'fulllWidth'
    ],
    data () {
      return {
        drag:  false,

        search: '',
        tableHeaders: [
          {
            value: 'name',
            text: 'name',
            align: 'start',
            type: 'str',
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
