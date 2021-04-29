<style scoped>


.data-help {
  /* min-height: 35px!important; */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.data-cell {
  /* min-height: 35px!important; */
  position: relative;
  display: flex; 
  align-items: center;
  align-content: center;
  padding-left: 20px;
}

.clickable {
  cursor: pointer;
}

/* .dialog-cell {
  align-self: flex-end;
} */

.v-dialog__content { 
  position: absolute; 
}

</style>

<template>

  <!-- ROW >>> FIELDS -->
  <div
    ref="cell"
    :class="`px-${header.helpHeader || editMode ? 0 : 2} td-oneline`"
    :style="`min-width: ${header.width ? header.width + 'px' : 'auto'}!important;`"
    >

    <div
      v-if="header.helpHeader"
      :class="`data-help`"
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
          v-if="selectedRows.includes(rowId)"
          >
          icon-check-square
        </v-icon>
        <span v-else>
          {{ rowId }}
        </span>
      </v-btn>

      <v-btn
        v-if="header.value === 'edit'"
        plain
        icon
        small
        class="ma-0"
        color="black"
        @click="editRow()"
        >
        <v-icon small>
          icon-edit-3
        </v-icon>
      </v-btn>

      <v-icon
        v-if="header.value === 'move'"
        color="grey"
        x-small
        >
        icon-move
      </v-icon>
    </div>


    <!-- CELL VALUE -->
    <div
      v-if="!editMode && !header.helpHeader"
      v-click-outside="onClickOutside"
      :class="`data-cell clickable`"
      :style="`justify-content: ${ getJustify(header) }`"
      @click.stop="editCell"
      >

      <v-simple-checkbox
        v-if="header.type === 'bool'"
        v-model="localData"
        disabled
      />

      <span v-else-if="header.type === 'str'">
        {{ localData || '-' }}
      </span>

      <span v-else-if="header.type === 'tag'">
        <v-chip
          v-for="(val, i) in localData"
          :key="i"
          label
          small
          class="mr-1"
          >
          {{ val || '-' }}
        </v-chip>
      </span>

      <span v-else-if="header.type === 'rating'">
        <v-icon
          v-for="(v,i) in localData"
          :key="i"
          class=""
          small
          >
          icon-star
        </v-icon>
      </span>

      <span v-else>
        {{ localData || '-' }}
      </span>

    </div>

    <!-- EDIT CELL -->
    <v-card 
      v-if="editMode && !header.helpHeader"
      v-click-outside="onClickOutside"
      :class="`clickable text-center`"
      tile
      >
      <!-- <v-card-text class="pa-0 mb-2 justify-center text-headline">
        {{ header.text }}
      </v-card-text> -->
      <v-card-text class="pa-0">
        <v-checkbox
          v-if="header.type === 'bool'"
          v-model="localData"
          filled
          dense
          hide-details
          @change="updateValueInStore"
          />

        <v-textarea
          v-else-if="header.type === 'longStr'"
          v-model="localData"
          filled
          dense
          hide-details
          @change="updateValueInStore"
          />

        <v-combobox
          v-else-if="header.type === 'tag'"
          v-model="localData"
          multiple
          smalll-chips
          filled
          dense
          hide-details
          @change="updateValueInStore"
          />

        <v-text-field
          v-else-if="header.type === 'int' || header.type === 'float'"
          v-model="localData"
          type="number"
          filled
          dense
          hide-details
          @change="updateValueInStore"
          />

        <v-select
          v-else-if="header.type === 'rating'"
          v-model="localData"
          :items="[0,1,2,3,4,5]"
          filled
          dense
          hide-details
          @change="updateValueInStore"
          />

        <v-text-field
          v-else
          v-model="localData"
          filled
          dense
          hide-details
          @change="updateValueInStore"
        />

      </v-card-text>
    </v-card>

  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'DataPatchCell',
    props: [
      'tableId',
      'header',
      'cellData',
      'rowId',
      'selectedRows'
    ],
    watch: {
      tableId(next) {
        // this.log && console.log(`\nC-DataTableRow > watch > tableId > next : `, next)
        // this.log && console.log(`C-DataTableRow > watch > tableId > this.cellData : `, this.cellData)
        this.localData = this.cellData
      },
      cellData(next) {
        this.log && console.log(`\nC-DataTableRow > watch > cellData > this.tableId : `, this.tableId)
        this.log && console.log(`C-DataTableRow > watch > cellData > next : `, next)
        this.localData = next
      }
    },
    data () {
      return {
        editMode: false,
        localData: undefined,
        x: 0,
        y: 0,
      }
    },
    beforeMount () {
      this.localData = this.cellData
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
      ...mapActions({
        updateCellValueInTableData: 'tables/updateCellValueInTableData',
      }),
      getJustify(head) {
        // this.log && head.type === 'int' && console.log(`C-DataTableRow > cleanTableHeaders > head : `, head)
        let justify = 'start'
        let centers = ['bool', 'rating', 'date']
        let ends = ['float', 'int']
        justify = centers.includes(head.type) ? 'center' : ends.includes(head.type) ? 'end' : justify
        // this.log && head.type === 'int' && console.log(`C-DataTableRow > cleanTableHeaders > justify : `, justify)
        return justify
      },
      onClickOutside() {
        this.editMode = false
      },
      editCell(e) {
        this.log && console.log(`\C-DataTableRow > editCell > this.rowId : `, this.rowId)
        e.preventDefault()
        this.$nextTick(() => {
          this.editMode = true
        })
      },
      editRow() {
        // this.log && console.log(`C-DataTableRow > editRow > this.rowId : `, this.rowId)
        this.$emit('editRow', this.rowId)
      },
      updateValueInStore(e) {
        this.log && console.log(`C-DataTableRow > updateValueInStore > this.tableId : `, this.tableId)
        this.log && console.log(`C-DataTableRow > updateValueInStore > this.header.id : `, this.header.id)
        this.log && console.log(`C-DataTableRow > updateValueInStore > this.rowId : `, this.rowId)
        this.log && console.log(`C-DataTableRow > updateValueInStore > e : `, e)
        let cellData = {
          tableId : this.tableId,
          rowId : this.rowId,
          headerValue: this.header.value,
          value: e
        }
        this.updateCellValueInTableData(cellData)
      },
      selectRow() {
        // this.log && console.log(`\nC-DataTableRow > selectRow > this.rowId : `, this.rowId)
        this.$emit('selectRow', this.rowId)
      },
      deleteRow() {
        // this.log && console.log(`\nC-DataTableRow > deleteRow > this.rowId : `, this.rowId)
        this.$emit('deleteRow', this.rowId)
      },
    }
  }
</script>
