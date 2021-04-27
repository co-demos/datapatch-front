<style scoped>


.data-help {
  min-height: 35px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.data-cell {
  min-height: 35px;
  position: relative;
  display: flex; 
  align-items: center;
  padding-left: 20px;
}

</style>

<template>

  <!-- ROW >>> FIELDS -->
  <div
    :class="`px-${header.helpHeader ? 0 : 2} td-oneline`"
    :style="`min-width: ${header.width ? header.width + 'px' : 'auto'}!important;`"
    >

    <div
      v-if="header.helpHeader"
      :class="`data-help text-${ getJustify(header) }`"
      >
      <v-btn
        v-if="header.value === 'delete'"
        plain
        icon
        small
        class="ma-0"
        color="grey"
        @click="deleteRow()"
        >
        <v-icon small>
          icon-trash-2
        </v-icon>
      </v-btn>

      <v-btn
        v-if="header.value === 'select'"
        plain
        icon
        small
        class="ma-0"
        @click="selectRow()"
        >
        <!-- :color="selectedRows.includes(cellData) ? 'black' : 'grey'" -->
        <v-icon
          small
          v-if="selectedRows.includes(cellData)"
          >
          icon-check-square
        </v-icon>
        <span v-else>
          {{ rowIndex + 1 }}
        </span>
      </v-btn>

      <v-btn
        v-if="header.value === 'edit'"
        plain
        icon
        small
        class="ma-0"
        color="black"
        @click="editRow(cellData)"
        >
        <v-icon small>
          icon-edit-3
        </v-icon>
      </v-btn>

      <v-icon
        v-if="header.value === 'move'"
        color="grey"
        small
        >
        icon-more-vertical
      </v-icon>
    </div>


  <!-- CELL VALUE -->
  <!-- <td 
    v-for="(h, hIdx) in dataFields"
    :key="`data-${hIdx}`"
    :class="`td-drag td-oneline text-${ getJustify(h) }`"
    :style="`min-width: ${header.width ? header.width + 2 + 'px' : 'auto' }!important;`"
    > -->

    <!-- {{ h }} -->

    <div
      v-else
      :class="`data-cell text-${ getJustify(header) }`"
      >

      <v-simple-checkbox
        v-if="header.type === 'bool'"
        v-model="cellData"
        disabled
      />

      <span v-else-if="header.type === 'str'">
        {{ cellData }}
      </span>

      <span v-else-if="header.type === 'tag'">
        <v-chip
          v-for="(val, i) in cellData"
          :key="i"
          label
          small
          class=""
          >
          {{ val }}
        </v-chip>
      </span>

      <span v-else-if="header.type === 'rating'">
        <v-icon
          v-for="(v,i) in cellData"
          :key="i"
          class=""
          small
          >
          icon-star
        </v-icon>
      </span>

      <span v-else>
        {{ cellData }}
      </span>

    </div>

  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'DataPatchCell',
    props: [
      'header',
      'cellData',
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
        this.log && console.log(`C-DataTableRow > editRow > this.dataFields : `, this.dataFields)
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
