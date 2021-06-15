<template>
  <v-container class="pb-0 mx-0">

    <!-- RESUME DATASET -->
    <v-row class="justify-center mx-0 mb-3">
      <v-col cols="12" class="text-center text-h6 font-weight-bold ">
        {{ $t('imports.resume') }}
      </v-col>
    </v-row>

    <!-- <v-divider class="my-5"/> -->

    <!-- RESUME DATASET -->
    <v-row class="justify-left mx-0">

      <v-col cols="6">
        <v-row>

          <v-col cols="4" class="pa-1 text-body-2 font-weight-bold ">
            {{ $t('dataPackage.dataset') }} :
          </v-col>
          <v-col cols="8" class="pa-1 ">
            {{datasetItem.title }}
          </v-col>

          <v-col cols="4" class="pa-1 text-body-2 font-weight-bold ">
            {{ $t('dataPackage.description') }} :
          </v-col>
          <v-col cols="8" class="pa-1 ">
            {{datasetItem.description }}
          </v-col>
      
          <v-col cols="4" class="pa-1 text-body-2 font-weight-bold ">
            {{ $t('dataPackage.licence') }} :
          </v-col>
          <v-col cols="8" class="pa-1 ">
            {{datasetItem.licence }}
          </v-col>

        </v-row>
      </v-col>

      <v-divider vertical/>

      <!-- RESUME TABLES -->
      <!-- <v-row class="justify-left mx-0"> -->
      <v-col
        v-if="getCurrentTables"
        cols="6" class="pl-5"
        >
        <v-row>

          <v-col
            cols="4"
            class="pl-3 py-1 text-body-2 font-weight-bold "
            >
            {{ $t('dataPackage.tables') }} 
            ({{ dataImport && getCurrentTables &&  getCurrentTables.length }}) :
          </v-col>

          <v-col
            cols="8"
            class="pa-1 "
            v-if="dataImport && getCurrentTables &&  getCurrentTables.length > 0"
            >
            <v-list-item
              v-for="table in getCurrentTables"
              :key="table.id"
              v-if="table"
              class="pl-0"
              >
              <v-list-item-content class="pt-0">
                <v-list-item-title>
                  {{ table.title }}
                </v-list-item-title>
                <v-list-item-subtitle v-if="table && table.table_fields && table.table_data">
                  {{ table.table_fields.length }}
                  {{ $t('dataPackage.fields').toLowerCase() }} 
                  - 
                  {{ table.table_data.length }}
                  {{ $t('dataPackage.rows').toLowerCase() }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>

        </v-row>
      </v-col>

    </v-row>

    <!-- DEBUGGING -->
    <v-row class="text-caption" v-if="false">
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
              table_fieldsLlength: d.table_fields.length,
              table_dataLlength: d.table_data.length,
              table_fields: d.table_fields.map( tf => tf.value ),
              // table_data: d.table_data.map( td => { return { name : td.name } } ),
            }
          })
        }}</pre></code><br>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {

    name: 'DatasetImportResume',
    props: [
      'importType',
      'dataImport',
      'datasetItem',
    ],
    watch: {},
    beforeMount() {},
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
        // getCurrentTables: 'tables/getTempTables',
      }),
    },
    methods: {
    }
  }

</script>
