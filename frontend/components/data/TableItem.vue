<style scoped>
  .table-tab {
    border-style: solid;
  }
</style>

<template>

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

      <v-btn
        icon
        text
        x-small
        class="ml-1 mr-3 pa-0"
        :color="`${getTextColor(table.id)}`"
        @click="dialog += 1"
        >
        <v-icon small class="">
          icon-more-vertical
        </v-icon>
      </v-btn>
    </v-card-actions>

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

  </v-card>

</template>


<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'TableItem',
    props: [
      'tab',
      'currentDataset',
      'table',
      'itemModel',
      'itemType',
      'fromCreate',
    ],
    data () {
      return {
        dialog: 0,
      }
    },
    computed: {
      getDatasetColor() {
        let color = this.fromCreate ? 'grey darken-1' : this.currentDataset.color
        return color
      },
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
      })
    },
    methods: {
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
      }
    }

  }
</script>
