<template>
  <v-container
    class="mt-5 pa-0"
    >

    <v-lazy
      v-model="isActive"
      :options="{ threshold: .5}"
      min-height="200"
      transition="fade-transition"
      >

      <div>

        <!-- DEBUGGING -->
        <!-- <v-row class="text-caption">
          <v-col cols="12">
            <h5>
              <hr> DEBUG FROM : DatasetImportData
            </h5>
          </v-col>
          <v-col cols="5">
            datasetItem (prop): <br>
            <code><pre>{{ datasetItem }}</pre></code>
          </v-col>

          <v-col cols="2">
            importType: <code>{{ importType }}</code><br>
          </v-col>

          <v-col cols="5" v-if="importType === 'blank' ">
            tablesBlank (local): <br>
            <code><pre>{{ tablesBlank.map( t => { return { id: t.id, title: t.title, tableFieldsLength: t.tableFields.length, tableDataLength: t.tableData.length } } ) }}</pre></code>
          </v-col>
          <v-col cols="5" v-if="importType === 'copyPaste' ">
            tablesCopyPaste (local): <br>
            <code><pre>{{ tablesCopyPaste.map( t => { return { id: t.id, title: t.title, tableFieldsLength: t.tableFields.length, tableDataLength: t.tableData.length } } ) }}</pre></code>
          </v-col>
          <v-col cols="5" v-if="importType === 'csv' ">
            tablesCsvFiles (local): <br>
            <code><pre>{{ tablesCsvFiles.map( t => { return { id: t.id, title: t.title, tableFieldsLength: t.tableFields.length, tableDataLength: t.tableData.length } } ) }}</pre></code>
          </v-col>
          <v-col cols="5" v-if="importType === 'excel' ">
            tablesXlsFile (local): <br>
            <code><pre>{{ tablesXlsFile.map( t => { return { id: t.id, title: t.title, tableFieldsLength: t.tableFields.length, tableDataLength: t.tableData.length } } ) }}</pre></code>
          </v-col>
          <v-col cols="5" v-if="importType === 'json' ">
            tablesJsonFile (local): <br>
            <code><pre>{{ tablesJsonFile.map( t => { return { id: t.id, title: t.title, tableFieldsLength: t.tableFields.length, tableDataLength: t.tableData.length } } ) }}</pre></code>
          </v-col>
          <v-col cols="5" v-if="importType === 'csvGithub' ">
            tablesCsvGithub (local): <br>
            <code><pre>{{ tablesCsvGithub.map( t => { return { id: t.id, title: t.title, tableFieldsLength: t.tableFields.length, tableDataLength: t.tableData.length } } ) }}</pre></code>
          </v-col>
          <v-col cols="5" v-if="importType === 'gSheet' ">
            tablesGsheetUrl (local): <br>
            <code><pre>{{ tablesGsheetUrl.map( t => { return { id: t.id, title: t.title, tableFieldsLength: t.tableFields.length, tableDataLength: t.tableData.length } } ) }}</pre></code>
          </v-col>

        </v-row>
        <hr> -->

        <p class="text-h5 mb-5">
          {{ $t(getImportOptions(importType) ) }}
        </p>

        <!-- BLANK -->
        <div v-if="importType === 'blank'">
          <DataTables
            :currentDataset="datasetItem"
            :currrentDatasetTables="tablesBlank" 
            :fromCreate="true"
            :noToolbar="true"
          />
        </div>

        <!-- COPY PASTE FILES -->
        <div v-if="importType === 'copyPaste'">
          <v-textarea
            v-model="copyPasteData"
            background-color="grey lighten-3"
            outlined
          />
          <v-spacer/>
          <DataTables
            v-if="tablesCopyPaste.length"
            :currentDataset="datasetItem"
            :currrentDatasetTables="tablesCopyPaste"
            :fromCreate="true"
            :noToolbar="true"
          />
        </div>

        <!-- CSV FILES -->
        <div v-if="importType === 'csv'">
          <v-file-input
            v-model="csvFiles"
            counter
            multiple
            show-size
            small-chips
            truncate-length="15"
            accept=".csv"
            @change="readCsvFiles"
          />
          <v-spacer/>
          <v-row>
            <v-btn @click="readCsvFiles">
              Read Files
            </v-btn>
          </v-row>
          <v-spacer/>
          <DataTables
            v-if="tablesCsvFiles.length"
            :currentDataset="datasetItem"
            :currrentDatasetTables="tablesCsvFiles"
            :fromCreate="true"
            :noToolbar="true"
          />
        </div>

        <!-- EXCEL FILES -->
        <div v-if="importType === 'excel'">
            <!-- multiple -->
          <v-file-input
            v-model="xlsFiles"
            counter
            show-size
            small-chips
            truncate-length="15"
            accept=".xls,.xlsx"
            @change="onFileChange"
          />
          <v-spacer/>
          <!-- <DataTables
            v-if="xlsFiles"
            :currentDataset="datasetItem"
            :currrentDatasetTables="tablesXlsFiles"
            :fromCreate="true"
            :noToolbar="true"
          /> -->
        </div>

        <!-- JSON FILES -->
        <div v-if="importType === 'json'">
          <v-file-input
            counter
            multiple
            show-size
            small-chips
            truncate-length="15"
            accept=".json"
            @change="onFileChange"
          />
          <v-spacer/>
          <!-- <DataTables
            v-if="jsonFiles"
            :currentDataset="datasetItem"
            :currrentDatasetTables="tablesJsonFile"
            :fromCreate="true"
            :noToolbar="true"
          /> -->
        </div>

        <!-- CSV URL RAW -->
        <div v-if="importType === 'csvGithub'">
          <v-text-field
            id="csvRaw"
            v-model="csvGithubUrl"
            outlined
            single-line
            dense
            clearable
            prepend-inner-icon="icon-link"
            :rules="urlRules"
          />
          <v-spacer/>
          <!-- <DataTables
            v-if="csvGithubUrl"
            :currentDataset="datasetItem"
            :currrentDatasetTables="tablesCsvGithub"
            :fromCreate="true"
            :noToolbar="true"
          /> -->
        </div>

        <!-- GSHEET URL RAW -->
        <div v-if="importType === 'gSheet'">
          <v-text-field
            id="gsheet"
            v-model="tableGsheetUrl"
            outlined
            single-line
            dense
            clearable
            prepend-inner-icon="icon-link"
            :rules="urlRules"
          />
          <v-spacer/>
          <!-- <DataTables
            v-if="tableGsheetUrl"
            :currentDataset="datasetItem"
            :currrentDatasetTables="tablesGsheetUrl"
            :fromCreate="true"
            :noToolbar="true"
          /> -->
        </div>

      </div>
    </v-lazy>
  </v-container>
</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  import { importOptionsInfos, convertCSVToJSON } from '@/utils/utilsImports.js'
  import { rules } from '@/utils/utilsRules.js'
  import { Field, defaultHeaders } from '@/utils/utilsFields'
  import { TableMetaData, defaultTableData, CreateBlankTable } from '@/utils/utilsTables'

  export default {

    name: 'DatasetImportData',
    props: [
      'datasetItem',
      'importType',
      'dataImport'
    ],
    watch: {
      importType(next) {
        this.sendTables()
      },
      canSaveTables(next) {
        if (next) {
          this.sendTables()
        }
      }
    },
    data () {
      return {
        importOptions: importOptionsInfos,
        isActive: false,
        urlRules: rules.urlRules( this.$t('rules.urlRequired'), this.$t('rules.urlValid') ),

        canSaveTables: false,

        tablesBlank: [],

        copyPasteData: undefined,
        tablesCopyPaste: [],

        csvFiles: undefined,
        tablesCsvFiles: [],

        xlsFile: undefined,
        tablesXlsFile: [],

        jsonFile: undefined,
        tablesJsonFile: [],

        csvGithubUrl: undefined,
        tablesCsvGithub: [],

        tableGsheetUrl: undefined,
        tablesGsheetUrl: [],

      }
    },
    beforeMount () {

      this.tablesBlank = CreateBlankTable(this.userId, this.$t('tables.defaultTitle'), this.$t('tables.defaultDescription'))

    },
    created () {
      this.log && console.log(`\nC-DatasetImportData > created > this.importType :`, this.importType)
      if (this.importType && this.importType === 'blank') {
        this.sendTables()
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
      getImportOptions (type) {
        let importOptionType = this.importOptions.find(o => o.value === type)
        return importOptionType && importOptionType.type
      },
      readCsvFiles() {
        // this.log && console.log(`\nC-DatasetImportData > readFiles > e :`, e)
        this.log && console.log(`\nC-DatasetImportData > readFiles > this.csvFiles :`, this.csvFiles)
        if ( this.csvFiles && this.csvFiles.length > 0 ) {
          this.csvFiles.forEach( (file, f) => {
            this.log && console.log(`C-DatasetImportData > readFiles > f :`, f)
            this.log && console.log(`C-DatasetImportData > readFiles > file :`, file)
            let reader = new FileReader()
            reader.readAsText(file)
            this.log && console.log(`C-DatasetImportData > readFiles > reader :`, reader)
            reader.onload = () => {
              let data = reader.result
              // this.log && console.log(`C-DatasetImportData > readFiles > data :`, data)
              let dataObj = convertCSVToJSON(data)
              this.log && console.log(`C-DatasetImportData > readFiles > dataObj :`, dataObj)
            }
          })
        }
      },
      rawDataToFields() {

      },
      rawDataToRows() {

      },
      sendTables() {
        let tables = undefined
        switch (this.importType) {
          case 'blank' :
            tables = this.tablesBlank
            break
          case 'copyPaste' :
            tables = this.tablesCopyPaste
            break
          case 'csv' :
            tables = this.tablesCsvFiles
            break
          case 'excel' :
            tables = this.tablesXlsFile
            break
          case 'json' :
            tables = this.tablesJsonFile
            break
          case 'csvGithub' :
            tables = this.tablesCsvGithub
            break
          case 'gSheet' :
            tables = this.tablesGsheetUrl
            break
        }
        this.log && console.log(`C-DatasetImportData > sendValue > tables :`, tables)
        this.$emit('setDataImport', tables)
      }
    }
  }

</script>
