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

      <v-col cols="3" class="text-body-2 font-weight-bold ">
        {{ $t('dataPackage.dataset') }} :
      </v-col>
      <v-col cols="9" class="">
        {{ localItem.title }}
      </v-col>

      <v-col cols="3" class="text-body-2 font-weight-bold ">
        {{ $t('dataPackage.description') }} :
      </v-col>
      <v-col cols="9" class="">
        {{ localItem.description }}
      </v-col>
  
      <v-col cols="3" class="text-body-2 font-weight-bold ">
        {{ $t('dataPackage.licence') }} :
      </v-col>
      <v-col cols="9" class="">
        {{ localItem.licence }}
      </v-col>
    </v-row>

    <v-divider class="my-5"/>

    <!-- RESUME TABLES -->
    <v-row class="justify-left mx-0">
      <v-col cols="3" class="text-body-2 font-weight-bold ">
        {{ $t('dataPackage.tables') }} 
        ({{ dataImport.length }}) :
      </v-col>
      <v-col cols="9" class="">
        <v-list-item
          v-for="table in dataImport"
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
      <v-row class="justify-center mx-0" v-if="dataImport && dataImport.length">
        <v-col cols="12" class="text-body-2 font-weight-bold">
          {{ $t('datasets.preview') }} 
        </v-col>
        <v-col cols="12" class="px-0">
        <DataTables
          :currentDataset="localItem"
          :currrentDatasetTables="dataImport"
          :fromCreate="true"
          :noToolbar="true"
        />
        </v-col>
      </v-row class="justify-center mx-5">
    </v-lazy>

    <!-- DEBUGGING -->
    <!-- <v-row class="text-caption">
      <v-col cols="12">
        <h5>
          <hr> DEBUG FROM : DatasetImportResume
        </h5>
      </v-col>
      <v-col cols="2">
        importType: <code>{{ importType }}</code><br>
      </v-col>
      <v-col cols="4">
        localItem (copy of item): <br>
        <code><pre>{{ localItem }}</pre></code>
      </v-col>
      <v-col cols="4">
        dataImport: <br>
        <code><pre>{{ 
          dataImport && dataImport.length > 0 && dataImport.map( d => {
            return {
              title: d.title,
              tableFieldsLlength: d.tableFields.length,
              tableDataLlength: d.tableData.length,
              // tableFields: d.tableFields.map( tf => { return { value : tf.value } } ),
              // tableData: d.tableData.map( td => { return { name : td.name } } ),
            }
          })
        }}
        </pre></code><br>
      </v-col>
    </v-row>
    <hr> -->

  </v-container>
</template>

<script>

  export default {

    name: 'DatasetImportResume',
    props: [
      'importType',
      'dataImport',
      'localItem'
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
    methods: {
    }
  }

</script>
