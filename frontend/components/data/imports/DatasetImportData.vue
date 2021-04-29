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
        <v-row class="text-caption" v-if="false">
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
            <code><pre>{{ tablesBlank && tablesBlank.map( t => { return { id: t.id, title: t.title, tableFieldsLength: t.tableFields.length, tableDataLength: t.tableData.length } } ) }}</pre></code>
          </v-col>
          <v-col cols="5" v-if="importType === 'csv' ">
            tablesCsvFiles (local): <br>
            <code><pre>{{ tablesCsvFiles }}</pre></code>
            <!-- <code><pre>{{ tablesCsvFiles && tablesCsvFiles.map( t => { return { id: t.id, title: t.title, tableFieldsLength: t.tableFields.length, tableDataLength: t.tableData.length } } ) }}</pre></code> -->
          </v-col>
          <v-col cols="5" v-if="importType === 'copyPaste' ">
            tablesCopyPaste (local): <br>
            <code><pre>{{ tablesCopyPaste && tablesCopyPaste.map( t => { return { id: t.id, title: t.title, tableFieldsLength: t.tableFields.length, tableDataLength: t.tableData.length } } ) }}</pre></code>
          </v-col>
          <v-col cols="5" v-if="importType === 'excel' ">
            tablesXlsFile (local): <br>
            <code><pre>{{ tablesXlsFile && tablesXlsFile.map( t => { return { id: t.id, title: t.title, tableFieldsLength: t.tableFields.length, tableDataLength: t.tableData.length } } ) }}</pre></code>
          </v-col>
          <v-col cols="5" v-if="importType === 'json' ">
            tablesJsonFile (local): <br>
            <code><pre>{{ tablesJsonFile && tablesJsonFile.map( t => { return { id: t.id, title: t.title, tableFieldsLength: t.tableFields.length, tableDataLength: t.tableData.length } } ) }}</pre></code>
          </v-col>
          <v-col cols="5" v-if="importType === 'csvGithub' ">
            tablesCsvGithub (local): <br>
            <code><pre>{{ tablesCsvGithub && tablesCsvGithub.map( t => { return { id: t.id, title: t.title, tableFieldsLength: t.tableFields.length, tableDataLength: t.tableData.length } } ) }}</pre></code>
          </v-col>
          <v-col cols="5" v-if="importType === 'gSheet' ">
            tablesGsheetUrl (local): <br>
            <code><pre>{{ tablesGsheetUrl && tablesGsheetUrl.map( t => { return { id: t.id, title: t.title, tableFieldsLength: t.tableFields.length, tableDataLength: t.tableData.length } } ) }}</pre></code>
          </v-col>

        </v-row>
        <!-- <hr> -->

        <p class="text-h5 mb-5">
          {{ $t(getImportOptions(importType) ) }}
        </p>

        <!-- BLANK -->
        <div v-if="importType === 'blank'">
        </div>

        <!-- CSV FILES -->
        <div v-if="importType === 'csv'">
          <v-row>
            <v-btn @click="readCsvFiles">
              Read Files
            </v-btn>
          </v-row>
          <v-spacer/>
          <!-- help text -->
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
        </div>
            <!-- :currrentDatasetTables="currentDataset" -->

        <!-- COPY PASTE FILES -->
        <div v-if="importType === 'copyPaste'">
          <!-- help text -->
          <v-textarea
            v-model="copyPasteData"
            background-color="grey lighten-3"
            outlined
          />
          <v-spacer/>
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
        </div>

        <DataTables
          :currentDataset="datasetItem"
          :fromCreate="true"
          :noToolbar="true"
        />

      </div>
    </v-lazy>
  </v-container>
</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

  import { importOptionsInfos, convertCSVToJSON } from '@/utils/utilsImports.js'
  import { rules } from '@/utils/utilsRules.js'
  import { Field } from '@/utils/utilsFields'
  import { TableMetaData, CreateBlankTable } from '@/utils/utilsTables'
  import { processFile } from '@/utils/utilsFiles'

  export default {

    name: 'DatasetImportData',
    props: [
      'datasetItem',
      'importType',
      'dataImport'
    ],
    watch: {
      importType(next) {
        this.log && console.log(`C-DatasetImportData > watch > importType > next :`, next)
        this.resetCurrentTables()
        if ( next && next === 'blank') {
          this.log && console.log(`C-DatasetImportData > watch > importType > next :`, next)
          this.setCurrentTables(this.tablesBlank)
        }
        this.toggleTablesNeedReload(true)
      },
    },
    data () {
      return {
        importOptions: importOptionsInfos,
        isActive: false,
        urlRules: rules.urlRules( this.$t('rules.urlRequired'), this.$t('rules.urlValid') ),

        canSaveTables: false,

        tablesBlank: [],

        csvFiles: undefined,
        copyPasteData: undefined,
        xlsFile: undefined,
        jsonFile: undefined,
        csvGithubUrl: undefined,
        tableGsheetUrl: undefined,

      }
    },
    beforeMount () {
      let tablesBlank = CreateBlankTable(this.userId, this.$t('tables.defaultTitle'), this.$t('tables.defaultDescription'))
      this.tablesBlank = tablesBlank
      this.log && console.log(`C-DatasetImportData > beforeMount > this.tablesBlank :`, this.tablesBlank)
      this.resetCurrentTables()
      if (this.importType && this.importType === 'blank') {
        this.setCurrentTables(this.tablesBlank)
        // this.sendTables(this.tablesBlank)
      }
      this.toggleTablesNeedReload(true)
    },
    created () {
      this.log && console.log(`\nC-DatasetImportData > created > this.importType :`, this.importType)
      this.log && console.log(`C-DatasetImportData > created > this.tablesBlank :`, this.tablesBlank)
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
      }),
      ...mapGetters({
        userId: 'user/userId',
        headerUser: 'user/headerUser',
        currentDataset: 'datasets/getCurrentItem',
      }),
    },
    methods: {
      ...mapActions({
        toggleTablesNeedReload: 'tables/toggleTablesNeedReload',
        setCurrentTables: 'tables/setCurrentTables',
        resetCurrentTables: 'tables/resetCurrentTables',
      }),
      getImportOptions (type) {
        let importOptionType = this.importOptions.find(o => o.value === type)
        return importOptionType && importOptionType.type
      },
      rawDataToFields(rawFields) {
        let newHeaders = []
        rawFields.forEach( (rf, rfIdx) => {
          let now = new Date(Date.now())
          let fieldClass = new Field(
            this.userId,
            rf.value || rf,
            rf.text || rf,
            rf.type || 'str',
            rf.title || rf,
            now.toISOString(),
            rfIdx + 1, 
          )
          // fieldClass.fixed = i === 0
          fieldClass.divider = true
          newHeaders.push(fieldClass)
        })
        return newHeaders
      },
      rawDataToTable(tableMetadata, dataObj) {
        // read data and convert to table data
        this.log && console.log(`\nC-DatasetImportData > rawDataToTables > tableMetadata :`, tableMetadata)
        this.log && console.log(`C-DatasetImportData > rawDataToTables > dataObj :`, dataObj)
        const rawFields = dataObj.headers
        const rawRows = dataObj.values.map( (r,i) => { return {id: i + 1, ...r}} )

        // convert rawFields to Field objects
        const tableHeaders = this.rawDataToFields(rawFields)

        // convert all infos to a Table object
        let now = new Date(Date.now())
        let newTable = new TableMetaData(
          this.userId,
          tableMetadata.title,
          tableMetadata.description || '',
          tableMetadata.index || 1,
          now.toISOString(),
          tableHeaders,
          rawRows
        )
        const table = newTable.data
        return table
      },
      async readCsvFiles() {
        this.resetCurrentTables()
        this.log && console.log(`C-DatasetImportData > readCsvFiles > ...`)
        try {
          const tables = await this.readCsvFilesAsync()
          this.log && console.log(`C-DatasetImportData > readCsvFiles > tables :`, tables)
          // this.tablesCsvFiles = tables
          // this.sendTables(tables)
          this.setCurrentTables(tables)
          this.toggleTablesNeedReload(true)
        } catch (ex) {
          this.log && console.log(ex)
        }
      },
      async readCsvFilesAsync() {
        // this.log && console.log(`\nC-DatasetImportData > readCsvFilesAsync > e :`, e)
        let promisesArray = []
        this.log && console.log(`\nC-DatasetImportData > readCsvFilesAsync > this.csvFiles :`, this.csvFiles)
        if ( this.csvFiles && this.csvFiles.length > 0 ) {
          this.csvFiles.forEach( (file, i) => {
            this.log && console.log(`C-DatasetImportData > readCsvFilesAsync > i :`, i)
            this.log && console.log(`C-DatasetImportData > readCsvFilesAsync > file :`, file)
            let tableMetadata = {
              title: file.name,
              importType: 'csv',
              index: i + 1,
            }
            this.log && console.log(`C-DatasetImportData > readCsvFilesAsync > tableMetadata :`, tableMetadata)
            
            const promise = processFile(file)
              .then( data => {
                // this.log && console.log(`C-DatasetImportData > readCsvFilesAsync > data :`, data)
                let dataObj = convertCSVToJSON(data)
                const table = this.rawDataToTable(tableMetadata, dataObj)
                this.log && console.log(`C-DatasetImportData > readCsvFilesAsync > table :`, table)
                return table
              })
            promisesArray.push(promise)
          })
          return Promise.all(promisesArray)
        }
      },
      readCsvFromUrl() {

      },
      readFromCopyPaste() {

      },

      sendTables(tables) {
        // let tables = undefined
        // switch (this.importType) {
        //   case 'blank' :
        //     tables = this.tablesBlank
        //     break
        //   case 'copyPaste' :
        //     tables = this.tablesCopyPaste
        //     break
        //   case 'csv' :
        //     tables = this.tablesCsvFiles
        //     break
        //   case 'excel' :
        //     tables = this.tablesXlsFile
        //     break
        //   case 'json' :
        //     tables = this.tablesJsonFile
        //     break
        //   case 'csvGithub' :
        //     tables = this.tablesCsvGithub
        //     break
        //   case 'gSheet' :
        //     tables = this.tablesGsheetUrl
        //     break
        // }
        this.log && console.log(`C-DatasetImportData > sendValue > tables :`, tables)
        this.$emit('setDataImport', tables)
      }
    }
  }

</script>
