<style scoped>

</style>

<template>

  <div
    :class="`${fulllWidth ? 'px-0 ml-0 mr-0' : 'px-5'}`"
    >

    <!-- CUSTOM TABLE TOOLS FOR DATA PATCH -->
    <DataPatchTools
      v-if="!noToolbar"
    />


    <!-- DEBUGGING -->
    <v-row class="text-caption mb-3 mx-2" v-if="false">
      <v-col cols="12">
        <h5>
          <hr> DEBUG FROM : DataTable
        </h5>
      </v-col>


      <v-col cols="4" v-if="false">
        getTableById(tab) (getter): <br>
        <code>{{ getCurrentTables && getCurrentTables.map( t => { return { id: t.id, title: t.title, tableFieldsLength: t.tableFields.length, tableDataLength: t.tableData.length } } ) }}</pre></code>
      </v-col>


      <v-col cols="2" v-if="true">
        getCurrentTableId (getter): <code>{{ getCurrentTableId }}</code>
      </v-col>
      <v-col cols="3" v-if="true">
        getTableById(1).tableData (getter): <br>
        <code>{{ getTableById(1).tableData[0] }}</code>
      </v-col>
      <v-col cols="3" v-if="true">
        getTableById(2).tableData (getter): <br>
        <code>{{ getTableById(2).tableData[0] }}</code>
      </v-col>
      <v-col cols="3" v-if="true">
        getTableById(3).tableData (getter): <br>
        <code>{{ getTableById(3) && getTableById(3).tableData[0] }}</code>
      </v-col>


      <v-col cols="4" v-if="false">
        getCurrentTable (local): <br>
        <code><pre>{{ getCurrentTable && { 
          id: getCurrentTable.id, 
          title: getCurrentTable.title, 
          tableDataLength: getCurrentTable.tableData.length, 
          tableFieldsLength: getCurrentTable.tableFields.length 
        } }}</pre></code>
      </v-col>

    </v-row>
    <!-- <hr> -->


    <!-- CUSTOM TABLE FOR DATA PATCH -->
    <DataPatchTable
      :tableId="tableId"
    />

  </div>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {

    name: 'DataTable',
    props: [

      'datasetItem',

      'tableId',

      'fulllWidth',
      'noToolbar',
      'fromCreate'
    ],

    data () {
      return {}
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
        userId: 'user/userId',
        headerUser: 'user/headerUser',

        getCurrentTableId: 'tables/getCurrentTableId',
        getCurrentTable: 'tables/getCurrentTable',
        getTableById: 'tables/getTableById',
        getCurrentTableFields: 'tables/getCurrentTableFields',
        getCurrentTableRows: 'tables/getCurrentTableRows',
      })
    },
  }

</script>
