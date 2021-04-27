<style>

.hidden-scrollbar {
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
  scrollbar-width: none;  /* Firefox */
}
.hidden-scrollbar::-webkit-scrollbar { 
  display: none;  /* Safari and Chrome */
}

.fill-width {
  width: 100%;
  /* overflow-x: scroll; */
  flex-wrap: nowrap;
}

.hide-scroll {
  overflow-x: hidden;
}
.show-scroll {
  overflow-x: scroll;
}

.data-row {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  min-height: 35px;
}

.th-color {
  /* display: flex;
  flex-wrap: wrap;
  align-content: center;
  min-height: 35px; */
  border-top: thin solid lightGrey !important;
  border-bottom: thin solid lightGrey !important;
  background-color: ghostWhite !important;
}
.th-help {
  width: 40px !important;
}
.th-data {
  border-left: thin solid lightGrey !important;
}
.th-end {
  border-right: thin solid lightGrey !important;
}

</style>

<template>

  <div>

    <v-row
      class="ml-0 my-3 fill-width hide-scroll align-center"
      >

      <!-- FIXED COLUMNS -->
      <v-col
        v-for="(h, idx) in helpersHs"
        :key="`h-start-${idx}`"
        :class="`py-1 px-3 data-row th-color ${h.value === 'move' ? 'th-end': ''} th-help`"
        >
        <span class="text-center">
          <v-icon small color="grey">
            {{ h.icon }}
          </v-icon>
        </span>
      </v-col>

      <!-- UNFIXED COLUMNS -->
      <draggable
        :list="dataFields"
        v-bind="dragOptions"
        group="headers"
        tag="div"
        class="row fill-width show-scroll hidden-scrollbar ml-0"
        draggable=".th-drag"
        @start="drag=true"
        @end="drag=false"
        >

        <!-- FIELDS COLUMNS -->
        <v-col
          v-for="(h, idx) in dataFields"
          :key="`h-${idx}`"
          :class="`pa-0 data-row th-color th-data th-drag text-center align-center`"
          >

          <DataTableHeader
            :header="h"
            :itemModel="itemModel"
            @resizeHeader="updateHeaderWidth"
          />

        </v-col>

        <!-- ADD COLUMN -->
        <v-col
          v-for="(h, idx) in addColHs"
          :key="`h-end-${idx}`"
          :class="`py-1 data-row th-color px-2 text-center th-data th-end`"
          >

          <v-btn
            v-if="h.position === 'end'"
            dark
            x-small
            class="mt-1"
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

        </v-col>

      </draggable>

    </v-row>

  </div>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  import { Field } from '@/utils/utilsFields'

  export default {
    name: 'DataTableHeadersRow',
    props: [
      'dataFields',
      'helpersHs',
      'addColHs',
      'tableRows'
    ],
    data () {
      return {
        drag: false,
        hoverAddCol: false,
        itemModel: undefined,
      }
    },
    beforeMount () {
      let emptyField = new Field()
      this.itemModel = {
        infos: emptyField.infos,
        auth: emptyField.auth,
        meta: emptyField.meta,
      }
      // this.log && console.log(`C-DataTableHeadersRow > beforeMount > this.itemModel : `, this.itemModel)
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
      addColumn(type='str') {
        // this.log && console.log(`\nC-DataTableHeadersRow > addColumn ...`)
        let now = new Date(Date.now())
        let newHeader = new Field(
          this.userId,
          this.$t('fields.newField'),// defaultHeader.field,
          this.$t('fields.newFieldTitle'),// defaultHeader.title,
          type,// defaultHeader.type,
          undefined,// `${this.$t('dataPackage.description')} - ${defaultHeader.title}`,
          now.toISOString()
        )
        this.log && console.log(`\nC-DataTableHeadersRow > addColumn > newHeader.data :`, newHeader.data)
        this.tableHeaders.splice( this.tableHeaders.length - 1, 0, newHeader.data)
      },
      deleteColumn(headerData) {
        this.log && console.log(`\nC-DataTableHeadersRow > deleteColumn ...`)
        this.tableHeaders = this.tableHeaders && this.tableHeaders.filter(h => h !== headerData)
      },
      updateHeaderWidth(data) {
        // this.log && console.log(`\nC-DataTableHeadersRow > data : `, data)
        this.$emit('updateHeader', data)
      }

    }

  }
</script>
