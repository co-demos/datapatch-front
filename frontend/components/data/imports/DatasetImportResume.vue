<template>
  <v-container class="my-8 mx-0">


    <!-- RESUME DATASET -->
    <v-row class="justify-center mx-0">
      <v-col cols="12" class="text-center text-h6 font-weight-bold ">
        {{ $t('imports.resume') }}
      </v-col>
    </v-row>

    <v-divider class="my-5"/>

    <!-- RESUME DATASET -->
    <v-row class="justify-left mx-0">

      <v-col cols="3" class="pa-1 text-body-2 font-weight-bold ">
        {{ $t('dataPackage.dataset') }} :
      </v-col>
      <v-col cols="9" class="pa-1 ">
        {{datasetItem.title }}
      </v-col>

      <v-col cols="3" class="pa-1 text-body-2 font-weight-bold ">
        {{ $t('dataPackage.description') }} :
      </v-col>
      <v-col cols="9" class="pa-1 ">
        {{datasetItem.description }}
      </v-col>
  
      <v-col cols="3" class="pa-1 text-body-2 font-weight-bold ">
        {{ $t('dataPackage.licence') }} :
      </v-col>
      <v-col cols="9" class="pa-1 ">
        {{datasetItem.licence }}
      </v-col>
    </v-row>

    <v-divider class="my-5"/>

    <!-- RESUME TABLES -->
    <v-row class="justify-left mx-0">

      <v-col
        cols="3"
        class="pa-1 text-body-2 font-weight-bold "
        >
        {{ $t('dataPackage.tables') }} 
        ({{ dataImport && getCurrentTables &&  getCurrentTables.length }}) :
      </v-col>

      <v-col
        cols="9"
        class="pa-1 "
        v-if="dataImport && getCurrentTables &&  getCurrentTables.length"
        >
        <v-list-item
          v-for="table in getCurrentTables"
          :key="table.id"
          two-line
          class="pl-0"
          >
          <v-list-item-content class="pt-0">
            <v-list-item-title>
              {{ table.title }}
            </v-list-item-title>
            <v-list-item-subtitle v-if="table.tableFields">
              {{ table.tableFields.length }}
              {{ $t('dataPackage.fields').toLowerCase() }} 
              - 
              {{ table.tableData.length }}
              {{ $t('dataPackage.rows').toLowerCase() }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>

    <v-divider class="my-5"/>


    <!-- PREVIEW TABLES -->
    <v-lazy
      v-model="isActive"
      :options="{ threshold: .5}"
      min-height="200"
      transition="fade-transition"
      >
      <v-row class="justify-center mx-0" v-if="dataImport && getCurrentTables && getCurrentTables.length">
        <v-col cols="12" class="text-body-2 font-weight-bold">
          {{ $t('datasets.preview') }} 
        </v-col>
        <v-col cols="12" class="px-0">
        <DataTables
          :currentDataset="datasetItem"
          :fromCreate="true"
          :noToolbar="true"
        />
        </v-col>
      </v-row class="justify-center mx-5">
    </v-lazy>

    <!-- DEBUGGING -->
    <v-row class="text-caption">
      <v-col cols="12">
        <h5>
          <hr> DEBUG FROM : DatasetImportResume
        </h5>
      </v-col>
      <v-col cols="2">
        importType: <code>{{ importType }}</code><br>
        dataImport: <code>{{ dataImport }}</code><br>
      </v-col>
      <v-col cols="4">
        datasetItem (copy of item): <br>
        <code><pre>{{ datasetItem }}</pre></code>
      </v-col>
      <v-col cols="4">
        getCurrentTables: 
        <code><pre>{{ 
          dataImport && getCurrentTables && getCurrentTables.map( d => {
            return {
              id: d.id,
              title: d.title,
              tableFieldsLlength: d.tableFields.length,
              tableDataLlength: d.tableData.length,
              tableFields: d.tableFields.map( tf => tf.value ),
              // tableData: d.tableData.map( td => { return { name : td.name } } ),
            }
          })
        }}</pre></code><br>
      </v-col>
    </v-row>
    <hr>

  </v-container>
</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {

    name: 'DatasetImportResume',
    props: [
      'importType',
      'dataImport',
      'datasetItem',
    ],
    watch: {
    },
    beforeMount() {
    },
    data () {
      return {
        isActive: false,
      }
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
      }),
      ...mapGetters({
        userId: 'user/userId',
        headerUser: 'user/headerUser',
        getCurrentTables: 'tables/getCurrentTables',
      }),
    },
    methods: {
    }
  }

</script>
