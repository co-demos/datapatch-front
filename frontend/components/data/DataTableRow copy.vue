<template>

  <tr>

    <!-- ROW >>> FIELDS -->
    <td 
      v-for="(h, hIdx) in tableHeaders"
      :key="hIdx"
      :class="`${ h.helpHeader && h.value === 'move' ? 'td-drag' : '' } ${ h.helpHeader ? '' : 'td-oneline'} text-${ getJustify(h) } ${ h.position === 'end' ? 'cell-ghost'+(hoverAddCol ? '-on' : '') :  ''}`"
      >

      <v-icon
        v-if="h.helpHeader && h.value === 'move'"
        color="grey"
        small
        >
        icon-more-vertical
      </v-icon>

      <v-btn
        v-if="h.helpHeader && h.value === 'delete'"
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
        v-if="h.helpHeader && h.value === 'edit'"
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
        v-if="h.helpHeader && h.value === 'select'"
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
          {{ rowIndex + 1 }}
        </span>
      </v-btn>

      <!-- CELL VALUE -->
      <div v-if="!h.helpHeader">

        <v-simple-checkbox
          v-if="h.type === 'bool'"
          v-model="rowData[ h.value ]"
          disabled
        />
        <span v-else-if="h.type === 'str'">
          {{ rowData[ h.value ] }}
        </span>
        <span v-else-if="h.type === 'tag'">
          <v-chip
            v-for="(val, i) in rowData[ h.value ]"
            :key="i"
            label
            class="ma-1 py-0"
            >
            {{ val }}
          </v-chip>
        </span>
        <span v-else-if="h.type === 'rating'">
          <v-icon
            v-for="(v,i) in rowData[ h.value ]"
            :key="i"
            class="ma-1 py-0"
            small
            >
            icon-star
          </v-icon>
        </span>
        <span v-else>
          {{ rowData[ h.value ] }}
        </span>

      </div>
    </td>
    <ModalRow
      :item="rowData"
      :itemModel="tableHeaders"
      :itemType="'row'"
      :parentDialog="dialogEditRow"
      :action="'update'"
      :onlyLocalUpdate="true"
    />
  </tr>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'DataTableRow',
    props: [
      'tableHeaders',
      'rowData',
      'rowIndex',
      'selectedRows'
    ],
    data () {
      return {
        dialogEditRow: 0,
        rowToEdit: undefined,
      }
    },
    computed: {
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
        // this.log && head.type === 'int' && console.log(`C-DataTableRow > cleanTableHeaders > head : `, head)
        let justify = head.helpHeader ? 'center px-0' : 'left'
        let centers = ['bool', 'rating', 'date']
        let rights = ['float', 'int']
        justify = centers.includes(head.type) ? 'center' : rights.includes(head.type) ? 'right' : justify
        // this.log && head.type === 'int' && console.log(`C-DataTableRow > cleanTableHeaders > justify : `, justify)
        return justify
      },
      editRow(rowData) {
        this.log && console.log(`\nC-DataTableRow > editRow > rowData : `, rowData)
        this.log && console.log(`C-DataTableRow > editRow > this.tableHeaders : `, this.tableHeaders)
        // this.rowToEdit = rowData
        this.dialogEditRow += 1
      },
      selectRow(rowData) {
        this.log && console.log(`\nC-DataTableRow > selectRow > rowData : `, rowData)
        if (this.selectedRows.includes(rowData) ) {
          // this.selectedRows = this.selectedRows.filter( r => r !== rowData)
        } else {
          // this.selectedRows.push(rowData)
        }
        this.log && console.log(`C-DataTableRow > selectRow : this.selectedRows :`, this.selectedRows)
      },
      deleteRow(rowData) {
        this.log && console.log(`\nC-DataTableRow > deleteRow > rowData : `, rowData)
        // this.tableRows = this.tableRows.filter(r => r !== rowData )
      },
    }
  }
</script>
