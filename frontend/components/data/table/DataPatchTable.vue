<style>
table {
  border-collapse: collapse;
}
tr, td {
  border-bottom: thin solid lightGrey !important;
}

.table-root {
  position: relative;
}
.table-overflow {
  overflow-x: auto;
  overflow-y: hidden;
}
.fixed-columns {
  border-spacing: 0;
  table-layout: fixed;
}
.fixed-column {
  position: absolute;
  display: flex;
  align-items: center;
}

.th {
  /* border-top: thin solid lightGrey !important; */
  /* border-bottom: thin solid lightGrey !important; */
  /* min-height: 40px!important; */
}
.th-color {
  background-color: ghostWhite !important;
}
.th-help {
  /* width: 40px !important; */
}
.th-data {
  border-right: thin solid lightGrey !important;
}
.th-end {
  border-right: thin solid lightGrey !important;
}

.td {
  /* border-bottom: thin solid lightGrey !important; */
  min-height: 35px!important;
}
.td-oneline {
  overflow: hidden; 
  white-space: nowrap;
  padding-left: 20px;
}

.td-drag {
  border-right: thin solid lightGrey !important;
}

.th-help {
  width: 40px !important;
}

</style>

<template>

  <div class="table-root">

    <div
      class="table-overflow" 
      :style="`margin-left: ${tableMarginLeft()}px`"
      >

      <table
        class="fixed-columns mb-4"
        >

        <!-- HEADERS -->
        <thead
          class="py-1"
          >

          <!-- UNFIXED COLUMNS -->
          <draggable
            v-model="tableHeaders"
            v-bind="dragOptions"
            group="headers"
            tag="tr"
            draggable=".th-drag"
            @start="drag=true"
            @end="drag=false"
            >
            <th
              v-for="(h, hIdx) in tableHeaders"
              :key="`h-${hIdx}`"
              :class="`th th-color ${h.helpHeader || h.fixed ? '' : 'th-data th-drag'} ${h.fixed ? 'fixed-column' : ''}`"
              :style="`min-width: ${h.width ? h.width + 'px' : 'auto'}; ${h.fixed ? 'left:' + getHeaderLeft(h) + 'px' : ''}`"
              >
              <!-- {{ h.value }} - {{ h.fixed }} - {{ h.width }} -->
              <DataPatchHeader
                :header="h"
                :itemModel="itemModel"
                @resizeHeader="updateHeader"
              />
            </th>
          </draggable>
        </thead>

        <!-- VALUES / ROWS -->
        <draggable
          v-model="tableRows"
          v-bind="dragOptions"
          group="rows"
          tag="tbody"
          @start="drag=true"
          @end="drag=false"
          >
          <tr
            v-for="(rowData, rIdx) in tableRows"
            :key="`r-${rIdx}`"
            >
            <td
              v-for="(h, hIdx) in tableHeaders"
              :key="`r-h-${hIdx}`"
              :class="`td ${!h.helpHeader || h.divider? 'td-drag' : 'td-help'} ${h.fixed ? 'fixed-column' : ''}`"
              :style="`min-width: ${h.width ? h.width + 'px' : 'auto'}; ${h.fixed ? 'left:' + getHeaderLeft(h) + 'px' : ''}`"
              >
              <DataPatchCell
                :cellData="rowData[ h.value ]"
                :header="h"
                :rowIndex="rIdx"
                :selectedRows="selectedRows"
              />
            </td>
          </tr>
        </draggable>

      </table>

    </div>

    <v-row class="text-caption">
      <v-col cols="4">
        tableHeaders: <br>
        <code><pre>{{ tableHeaders }}</pre></code>
      </v-col>
      <!-- <v-col cols="3">
        dataFields: <br>
        <code><pre>{{ dataFields }}</pre></code>
      </v-col> -->
      <!-- <v-col cols="4">
        tableRows: <br>
        <code><pre>{{ tableRows }}</pre></code>
      </v-col> -->
    </v-row>

  </div>
</template>


<script>

  import { mapState, mapGetters } from 'vuex'
  import { Field, helpHeadersFields, endHeadersFields, defaultHeaders } from '@/utils/utilsFields'

  export default {
    name: 'DataPatchTable',
    props: [
      'dataFields',
      'dataRows',
    ],
    data () {
      return {

        drag: false,

        helpersHs: helpHeadersFields.map( h => h.dataHelper ),
        addColHs: endHeadersFields.map( h => h.dataHelper ),
        tableHeaders: [],
        itemModel: undefined,

        tableRows: [],

        search: '',
        tableOptions: {
          page: 1,
          itemsPerPage: -1,
        },
        selectedRows: [],

      }
    },
    beforeMount () {
      let dataFields = this.dataFields.map( h => h.data )
      this.tableHeaders = [...this.helpersHs, ...dataFields, ...this.addColHs]
      let emptyField = new Field()
      this.itemModel = {
        infos: emptyField.infos,
        auth: emptyField.auth,
        meta: emptyField.meta,
      }
      this.tableRows = this.dataRows
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
      updateHeader(data) {
        // this.log && console.log(`\nC-DataPatchTable > data : `, data)
        this.tableHeaders = [ ...this.tableHeaders.map(obj => obj.value !== data.value ? obj : {...obj, ...data} ) ]
        // this.tableHeaders = [...this.helpersHs, ...updatedFields, ...this.addColHs]
      },
      tableMarginLeft () {
        let marginL = 0
        for (const h of this.tableHeaders) {
          // this.log && console.log(`C-DataPatchTable > h : `, h)
          if (h.fixed) {
            marginL += h.width
          }
        }
        return marginL + 1
      },
      getHeaderLeft(header)  {
        let LeftPx = 0
        for ( const h of this.tableHeaders) {
          if (h.value !== header.value ) {
            LeftPx += h.width
          } else {
            return LeftPx
          }
        }
      }
    }
  }

</script>
