<style scoped>
  .table-tab {
    border-style: solid;
  }
</style>

<template>

  <div style="min-height: 40px">

  <!-- TABLE TAB -->
  <v-card
    :class="`mx-2 table-tab`"
    :style="`border-color: ${ fromCreate ? 'lightgrey' : 'white'} !important;`"
    :color="`${getTabBackgroundColor(table.id)}`"
    tile
    elevation="0"
    >
    <v-card-actions
      class="pa-0 justify-center"
      >
      
      <v-btn
        text
        tile
        elevation="0"
        class="pl-6 pr-1"
        :color="`${getTextColor(table.id)}`"
        @click="activateTable()"
        >
        <span
          :class="`px-1 text-none font-weight-bold`"
          >
          {{ table.title }}
        </span>
      </v-btn>

      <div
        ref="tableOptions"
      >
      <v-btn
        icon
        text
        x-small
        class="ml-1 mr-3 pa-0"
        :color="`${getTextColor(table.id)}`"
        @mouseover="show"
        @click.stop="dialog += 1"
        >
        <!-- @mouseleave="hover=false" -->
        <v-icon small class="">
          icon-more-vertical
        </v-icon>
      </v-btn>
      </div>

    </v-card-actions>

    <v-menu
      open-on-hover
      v-model="hover"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
      >

      <v-list dense>
      
        <v-subheader class="pa-5 text-uppercase">
          {{ $t('buttons.options') }}
        </v-subheader>

        <v-list-item
          @click.stop="dialog += 1"
          >
          <v-list-item-action>
            <v-icon small>
              icon-hash
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('tables.editTable') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider/>

        <v-list-item
          :disabled="!canDeleteTable"
          @click.stop="dialogDelete += 1"
          >
          <v-list-item-action>
            <v-icon small>
              icon-trash-2
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('tables.deleteTable') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-menu>

  </v-card>

  <!-- DIALOG FOR TABLE INFOS -->
  <ModalItem
    :parentDialog="dialog"
    :item="table"
    :itemModel="itemModel"
    :itemType="itemType"
    :action="'update'"
    :apiUrl="api.tables"
    :onlyLocalUpdate="fromCreate"
  />

  <!-- DIALOG FOR WORKSPACE DELETE -->
  <ModalDelete
    :parentDialog="dialogDelete"
    :confirmDeleteTitle="$t('tables.deleteTable')"
    :confirmDeleteMsg="$t('tables.deleteTableConfirm')"
    :itemToDelete="table"
    @confirmDelete="deleteTable()"
  />

  </div>

</template>


<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'TableItem',
    props: [
      'tab',
      'currentDataset',
      'tableId',
      'itemModel',
      'itemType',
      'fromCreate',
    ],
    data () {
      return {
        hover: false,
        x: 0,
        y: 0,
        dialog: 0,
        dialogDelete: 0,
        table: undefined,
      }
    },
    beforeMount () {
      // this.log && console.log(`\nC-TableItem > beforeMount > this.tableId : `, this.tableId )
      // this.log && console.log(`C-TableItem > beforeMount > this.getTableMetadataById(this.tableId) : `, this.getTableMetadataById(this.tableId) )
      this.table = this.getTableMetadataById(this.tableId)
    },
    computed: {
      getDatasetColor() {
        let color = this.fromCreate ? 'primary' : this.currentDataset.color
        return color
      },
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
        getTableMetadataById: 'tables/getTableMetadataById',
        getCurrentTables: 'tables/getCurrentTables',
      }),
      canDeleteTable() {
        return this.getCurrentTables.length > 1
      },
    },
    methods: {
      show (e) {
        e.preventDefault()
        this.hover = false
        let buttonBox = this.$refs.tableOptions.getBoundingClientRect()
        // this.log && console.log(`\nC-TableItem > show > buttonBox : `, buttonBox )
        this.x = buttonBox.x // + parseInt(buttonBox.width/2) //e.clientX
        this.y = buttonBox.y // + 5 //e.clientY
        this.$nextTick(() => {
          this.hover = true
        })
      },
      getTextColor(tableId) {
        let color = this.getDatasetColor
        let txtColor = this.tab !== tableId ? 'white' : color
        if (this.fromCreate) {
          txtColor = this.tab !== tableId ? color : 'white'
        }
        return txtColor
      },
      getTabBackgroundColor(tableId) {
        let color = this.getDatasetColor
        let bgColor = this.tab !== tableId ? color : 'white'
        if (this.fromCreate) {
          bgColor = this.tab !== tableId ? 'white' : color
        }
        return bgColor
      },
      activateTable() {
        this.$emit('changeTab', this.table.id)
      },
      deleteTable() {
        this.$emit('removeTable', this.table)
      }
    }

  }
</script>
