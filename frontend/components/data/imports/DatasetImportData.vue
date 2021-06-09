<template>
  <v-container
    class="mt-5 pa-0"
    >

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
        - importType: <code>{{ importType }}</code><br>
        - copyPasteDataName: <code>{{ copyPasteDataName }}</code><br>
        - copyPasteSeparator: <code>{{ copyPasteSeparator }}</code><br>
        - csvSeparator: <code>{{ csvSeparator }}</code><br>
        - csvUrlSeparator: <code>{{ csvUrlSeparator }}</code><br>
      </v-col>

      <v-col cols="5" v-if="importType === 'blank' ">
        tablesBlank (local): <br>
        <code><pre>{{ tablesBlank && tablesBlank.map( t => { return { id: t.id, title: t.title, table_fieldsLength: t.table_fields.length, table_dataLength: t.table_data.length } } ) }}</pre></code>
      </v-col>
      <v-col cols="5" v-if="importType === 'csv' ">
        tablesCsvFiles (local): <br>
        <code><pre>{{ tablesCsvFiles }}</pre></code>
        <!-- <code><pre>{{ tablesCsvFiles && tablesCsvFiles.map( t => { return { id: t.id, title: t.title, table_fieldsLength: t.table_fields.length, table_dataLength: t.table_data.length } } ) }}</pre></code> -->
      </v-col>
      <v-col cols="5" v-if="importType === 'copyPaste' ">
        tablesCopyPaste (local): <br>
        <code><pre>{{ tablesCopyPaste && tablesCopyPaste.map( t => { return { id: t.id, title: t.title, table_fieldsLength: t.table_fields.length, table_dataLength: t.table_data.length } } ) }}</pre></code>
      </v-col>
      <v-col cols="5" v-if="importType === 'excel' ">
        tablesXlsFile (local): <br>
        <code><pre>{{ tablesXlsFile && tablesXlsFile.map( t => { return { id: t.id, title: t.title, table_fieldsLength: t.table_fields.length, table_dataLength: t.table_data.length } } ) }}</pre></code>
      </v-col>
      <v-col cols="5" v-if="importType === 'json' ">
        tablesJsonFile (local): <br>
        <code><pre>{{ tablesJsonFile && tablesJsonFile.map( t => { return { id: t.id, title: t.title, table_fieldsLength: t.table_fields.length, table_dataLength: t.table_data.length } } ) }}</pre></code>
      </v-col>
      <v-col cols="5" v-if="importType === 'csvGithub' ">
        tablesCsvGithub (local): <br>
        <code><pre>{{ tablesCsvGithub && tablesCsvGithub.map( t => { return { id: t.id, title: t.title, table_fieldsLength: t.table_fields.length, table_dataLength: t.table_data.length } } ) }}</pre></code>
      </v-col>
      <v-col cols="5" v-if="importType === 'gSheet' ">
        tablesGsheetUrl (local): <br>
        <code><pre>{{ tablesGsheetUrl && tablesGsheetUrl.map( t => { return { id: t.id, title: t.title, table_fieldsLength: t.table_fields.length, table_dataLength: t.table_data.length } } ) }}</pre></code>
      </v-col>

    </v-row>
    <!-- <hr> -->
    
    <!-- TITLE / HELPER -->
    <v-row class="mx-0">
      <v-col cols="12">
        <p class="text-h6 mb-5 text-center">
          {{ $t(getImportOptions(importType, 'title_full') ) }}
        </p>
      </v-col>
    </v-row>

    <!-- SELECTION IMPORTS -->

    <v-row class="mx-0 mb-0 align-top justify-center">
      <v-col cols="12" class="pa-0">

        <!-- BLANK -->
        <v-row 
          v-if="importType === 'blank'"
          class="align-top justify-center"
          >
          <v-col cols="12" class="align-center">
            <p class="text-center">
              <v-icon class="mr-4">
                icon-file
              </v-icon>
              <span v-html="$t('imports.blank_helper')" class="text-body-2"/>
            </p>
          </v-col>
        </v-row>

        <!-- COPY PASTE FILES -->
        <v-row 
          v-if="importType === 'copyPaste'"
          class="mx-0 align-top"
          >
          <v-col cols="4" class="pb-0">
            <p v-html="$t('imports.copyPaste_helper')" class="text-body-2" />
            <p v-html="$t('imports.copyPaste_helper_bis')" class="text-body-2" />
            <p v-html="$t('imports.sep_helper')" class="text-body-2" />
            <p class="text-caption">
              {{ $t('imports.example') }} :<br>
<pre>INDEX	SOURCE	CATEGORIE
carto1_	source 1	A
carto2_	source 1	B
carto3_	source 1	B-A
carto4_	source 2	B
carto5_	source 3	C</pre>
              </code>
            </p>
          </v-col>
          <v-col cols="8">
            <v-row class="justify-center">
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="copyPasteDataName"
                  :label="$t('tables.enterTitle')"
                  :hint="$t('tables.title')"
                  :placeholder="$t('tables.enterTitle')"
                  :disabled="loading"
                  :loading="loading"
                  dense
                  filled
                  single-line
                  clearable
                  prepend-inner-icon="icon-typography"
                  :rules="minCharRules"
                />
              </v-col>
              <v-col cols="12" class="py-0">
                <v-textarea
                  v-model="copyPasteData"
                  :disabled="loading"
                  :placeholder="$t('imports.copyPaste_placeholder')"
                  filled
                  hide-details
                  prepend-inner-icon="icon-copy"
                  background-color="grey lighten-3"
                  @change="readFromCopyPaste"
                />
              </v-col>
              <v-col cols="12" class="pb-0">
                <SelectSeparator
                  v-model="copyPasteSeparator"
                  :items="getImportOptions(importType, 'options').separators"
                />
              </v-col>
              <v-col cols="12" class="my-2">
                <v-btn
                  tile
                  outlined
                  :disabled="!copyPasteData || loading"
                  color="primary"
                  class="text-none font-weight-bold px-5"
                  @click="readFromCopyPaste"
                  >
                  {{ $t('imports.readData') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- CSV FILES -->
        <v-row
          v-if="importType === 'csv'"
          class="align-top"
          >
          <v-col cols="4" class="pb-0">
            <p v-html="$t('imports.csv_helper')" class="text-body-2" />
            <p v-html="$t('imports.sep_helper')" class="text-body-2" />
          </v-col>
          <v-col cols="8" class="pb-0">
            <v-row class="justify-center">
              <v-col cols="12" class="pb-0">
                <v-file-input
                  v-model="csvFiles"
                  :placeholder="$t('imports.csv_placeholder')"
                  :disabled="loading"
                  :loading="loading"
                  counter
                  filled
                  multiple
                  show-size
                  small-chips
                  truncate-length="15"
                  accept=".csv"
                  prepend-icon=""
                  prepend-inner-icon="icon-table2"
                  @change="readCsvFiles"
                />
              </v-col>
              <v-col cols="12" class="pb-0">
                <SelectSeparator
                  v-model="csvSeparator"
                  :items="getImportOptions(importType, 'options').separators"
                />
              </v-col>
              <v-col cols="12" class="my-2">
                <v-btn
                  tile
                  outlined
                  :disabled="!csvFiles || loading"
                  color="primary"
                  class="text-none font-weight-bold px-5"
                  @click="readCsvFiles"
                  >
                  {{ $t('imports.readData') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <!-- EXCEL FILES -->
        <v-row 
          v-if="importType === 'excel'"
          class="mx-0 align-top"
          >
          <v-col cols="4" class="pb-0">
            <p v-html="$t('imports.excel_helper')" class="text-body-2" />
          </v-col>
          <v-col cols="8" class="pb-0">
            <v-file-input
              v-model="xlsFile"
              :placeholder="$t('imports.excel_placeholder')"
              :disabled="loading"
              :loading="loading"
              counter
              filled
              show-size
              small-chips
              truncate-length="15"
              accept=".xls,.xlsx"
              prepend-icon=""
              prepend-inner-icon="icon-file-excel-o"
              @change="readExcelFile"
            />
          </v-col>
          <v-col cols="8" class="offset-4 pt-0 mb-2">
            <v-btn
              tile
              outlined
              :disabled="!xlsFile || loading"
              color="primary"
              class="text-none font-weight-bold px-5"
              @click="readExcelFile"
              >
              {{ $t('imports.readData') }}
            </v-btn>
          </v-col>
        </v-row>

        <!-- JSON FILES -->
        <v-row 
          v-if="importType === 'json'"
          class="mx-0 align-top"
          >
          <v-col cols="4" class="pb-0">
            <p v-html="$t('imports.json_helper')" class="text-body-2" />
          </v-col>
          <v-col cols="8" class="pb-0 mb-2">
            <v-file-input
              v-model="jsonFiles"
              :placeholder="$t('imports.json_placeholder')"
              :diasbled="laoding"
              :loading="loading"
              counter
              filled
              multiple
              show-size
              small-chips
              truncate-length="15"
              accept=".json"
              prepend-icon=""
              prepend-inner-icon="icon-file-code-o"
              @change="readJsonFiles"
            />
          </v-col>
          <v-col cols="8" class="offset-4 pt-0">
            <v-btn
              tile
              outlined
              :disabled="!jsonFiles || loading"
              color="primary"
              class="text-none font-weight-bold px-5"
              @click="readJsonFiles"
              >
              {{ $t('imports.readData') }}
            </v-btn>
          </v-col>
        </v-row>

        <!-- CSV URL RAW -->
        <v-row 
          v-if="importType === 'csvGithub'"
          class="mx-0 align-top"
          >
          <v-col cols="4" class="pb-0">
            <p v-html="$t('imports.csvGithub_helper')" class="text-body-2" />
            <p v-html="$t('imports.sep_helper')" class="text-body-2" />
            <p class="text-caption">
              {{ $t('imports.examples') }} :
              <ul>
                <li>
                  https://github.com/co-demos/datapatch-front/blob/master/test-files/csv/test-datapatch-PiNG-2021.csv
                </li>
                <li>
              https://raw.githubusercontent.com/co-demos/datapatch-front/master/test-files/csv/test-datapatch-PiNG-2021.csv
                </li>
              </ul>
            </p>
          </v-col>

          <v-col cols="8" class="pb-0">
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="csvGithubUrlName"
                  :label="$t('tables.enterTitle')"
                  :hint="$t('tables.title')"
                  :placeholder="$t('tables.enterTitle')"
                  :loading="loading"
                  dense
                  filled
                  single-line
                  clearable
                  prepend-inner-icon="icon-typography"
                  :rules="minCharRules"
                />
              </v-col>
              <v-col cols="12" class="py-0">
                <v-text-field
                  v-model="csvGithubUrl"
                  :placeholder="$t('imports.csvGithub_placeholder')"
                  :loading="loading"
                  filled
                  single-line
                  clearable
                  prepend-inner-icon="icon-github"
                  :rules="urlRules"
                  @input="readCsvFromUrl"
                />
              </v-col>
              <v-col cols="12" class="py-0">
                <SelectSeparator
                  v-model="csvUrlSeparator"
                  :items="getImportOptions(importType, 'options').separators"
                />
              </v-col>
              <v-col cols="12" class="my-2">
                <v-btn
                  tile
                  outlined
                  :disabled="!csvGithubUrl || loading"
                  color="primary"
                  class="text-none font-weight-bold px-5"
                  @click="readCsvFromUrl"
                  >
                  {{ $t('imports.readData') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

        </v-row>

        <!-- GSHEET URL RAW -->
        <v-row 
          v-if="importType === 'gSheet'"
          class="mx-0 align-top"
          >
          <v-col cols="4" class="pb-0">
            <p v-html="$t('imports.gSheet_helper')" class="text-body-2" />
            <p class="text-caption">
              {{ $t('imports.examples') }} :
              <ul>
                <li>
                  https://docs.google.com/spreadsheets/d/12Sq361P9QbOjqNLjE2TpDm1aa6ued8hUN10y6t6Bvc0/edit#gid=0
                </li>
              </ul>
            </p>
          </v-col>

          <v-col cols="8" class="pb-0">
            <v-row>
              <v-col cols="12" class="pb-0">
                <v-text-field
                  v-model="tableGsheetUrl"
                  :placeholder="$t('imports.gSheet_placeholder')"
                  :disabled="loading"
                  :loading="loading"
                  filled
                  single-line
                  clearable
                  prepend-inner-icon="icon-google"
                  :rules="urlRules"
                  @input="readGsheetUrl"
                />
              </v-col>
              <v-col cols="6" class="pt-0">
                <v-select
                  v-model="tableGsheetSheetNumbersSelection"
                  :items="tableGsheetSheetNumbers"
                  multiple
                  dense
                  filled
                  hide-details
                  >
                  <template v-slot:item="{ item, index }">
                    <span>
                      {{ $t('imports.gSheet_sheet') }} 
                      {{ item }}
                    </span>
                  </template>
                  <template v-slot:selection="{ item, index }">
                    <v-chip class="mb-1">
                      <span>
                        {{ $t('imports.gSheet_sheet') }} 
                        {{ item }}
                      </span>
                    </v-chip>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="6" class="pt-0">
                <v-btn
                  block
                  tile
                  elevation="0"
                  class="text-none"
                  @click.stop="addSheetNumber()"
                  >
                  <v-icon small class="mr-2">
                    icon-plus
                  </v-icon>
                  {{ $t('imports.gSheet_addSheet')}}
                </v-btn>
              </v-col>
              <v-col cols="12" class="pt-0 my-2">
                <v-btn
                  tile
                  outlined
                  :disabled="!tableGsheetUrl || loading"
                  large
                  color="primary"
                  class="text-none font-weight-bold px-5"
                  @click="readGsheetUrl"
                  >
                  {{ $t('imports.readData') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

      </v-col>
    </v-row>

  </v-container>
</template>

<script>

  /*
  test  for copy-paste

  INDEX	SOURCE	SOURCE_temp	SOURCE_codes	SOURCE_codes_temp
  pingcarto1_	CGET	France Tiers-Lieux	CGET	FTL
  pingcarto2_	CGET	France Tiers-Lieux	CGET	FTL
  pingcarto3_	CGET	France Tiers-Lieux	CGET	FTL
  pingcarto4_	CGET	France Tiers-Lieux	CGET	FTL
  pingcarto5_	CGET	France Tiers-Lieux	CGET	FTL
  pingcarto6_	CGET	France Tiers-Lieux	CGET	FTL
  pingcarto7_	CGET	France Tiers-Lieux	CGET	FTL
  pingcarto8_	CGET	France Tiers-Lieux	CGET	FTL
  pingcarto9_	CGET	France Tiers-Lieux	CGET	FTL
  */

  /*
  tests for urls - csv on github

  https://github.com/co-demos/datapatch-front/blob/master/test-files/csv/test-datapatch-PiNG-2021.csv
  --> https://raw.githubusercontent.com/co-demos/datapatch-front/master/test-files/csv/test-datapatch-PiNG-2021.csv

  https://github.com/co-demos/datapatch-front/blob/master/test-files/csv/test-datapatch-arbories-2021.csv
  https://github.com/co-demos/datapatch-front/blob/master/test-files/csv/test-datapatch-excel%20-%20Lieux.csv
  https://github.com/co-demos/datapatch-front/blob/master/test-files/csv/test-datapatch-excel%20-%20Lieux.tsv
  https://github.com/co-demos/datapatch-front/blob/master/test-files/csv/test-datapatch-excel%20-%20cat%C3%A9gories.csv
  https://github.com/co-demos/datapatch-front/blob/master/test-files/csv/test-datapatch-excel%20-%20cat%C3%A9gories.tsv

  */

  import { mapState, mapGetters, mapActions } from 'vuex'

  import { csvSeparators, importOptionsInfos, convertCSVToJSON, convertGithubUrlToRawUrl, loadGoogleSheet } from '@/utils/utilsImports.js'
  import { rules } from '@/utils/utilsRules.js'
  import { Field } from '@/utils/utilsFields'
  import { TableMetaData, CreateBlankTable } from '@/utils/utilsTables'
  import { processFile, convertXlsToJson } from '@/utils/utilsFiles'

  export default {

    name: 'DatasetImportData',
    components: {
      SelectSeparator: () => import(/* webpackChunkName: "SelectSeparator" */ '@/components/data/imports/SelectSeparator.vue'),
    },
    props: [
      'hidden',
      'datasetItem',
      'importType',
    ],
    model: {
      prop: 'hidden',
      event: 'blur'
    },
    watch: {
      loading(val) {
        this.handleInput(val)
      },
      importType(next) {
        this.log && console.log(`C-DatasetImportData > watch > importType > next :`, next)
        this.setImportData(false)
        this.resetCurrentTables()
        if ( next && next === 'blank') {
          // this.log && console.log(`C-DatasetImportData > watch > importType > next :`, next)
          // this.setCurrentTableId(1)
          setTimeout(() => {
            this.loading = true
            this.toggleTablesNeedReload(true)
            this.setCurrentTables({ tables: this.tablesBlank })
            this.setImportData(true)
            this.toggleTablesNeedRedraw(true)
            this.loading = false
          }, 200)

        } else {
          this.toggleTablesNeedReload(true)
        }
      },
    },
    data () {
      return {
        importOptions: importOptionsInfos,
        isActive: false,
        loading: false,

        urlRules: rules.urlRules( this.$t('rules.urlRequired'), this.$t('rules.urlValid') ),
        minCharRules: rules.minCharRules( this.$t('rules.valEnter'), this.$t('rules.minChars') ),

        tablesBlank: [],

        csvFiles: undefined,
        csvSeparator: undefined,

        copyPasteDataName: undefined,
        copyPasteData: undefined,
        copyPasteSeparator: undefined,

        xlsFile: undefined,
        
        jsonFiles: undefined,

        csvGithubUrlName: undefined,
        csvGithubUrl: undefined,
        csvUrlSeparator: undefined,

        tableGsheetUrl: undefined,
        tableGsheetSheets: 1,
        tableGsheetSheetNumbers: [1],
        tableGsheetSheetNumbersSelection: [1],

      }
    },
    beforeMount () {

      let commaSeparator = csvSeparators.find(sep => sep.value === 'comma' ).sep
      let tabSeparator = csvSeparators.find(sep => sep.value === 'tab' ).sep
      this.copyPasteSeparator = tabSeparator
      this.csvSeparator = commaSeparator
      this.csvUrlSeparator = commaSeparator

      let tablesBlank = CreateBlankTable(this.userId, this.$t('tables.defaultTitle'), this.$t('tables.defaultDescription'))
      this.tablesBlank = tablesBlank
      // this.log && console.log(`C-DatasetImportData > beforeMount > this.tablesBlank :`, this.tablesBlank)
      this.resetCurrentTables()
      if (this.importType && this.importType === 'blank') {
        // this.setCurrentTableId(1)
        this.setCurrentTables({ tables: this.tablesBlank })
        this.setImportData(true)
      } else {
        this.toggleTablesNeedReload(true)
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
        currentDataset: 'datasets/getCurrentItem',
      }),
    },
    methods: {
      ...mapActions({
        toggleTablesNeedReload: 'tables/toggleTablesNeedReload',
        toggleTablesNeedRedraw: 'tables/toggleTablesNeedRedraw',
        setCurrentTables: 'tables/setCurrentTables',
        // setCurrentTableId: 'tables/setCurrentTableId',
        resetCurrentTables: 'tables/resetCurrentTables',
      }),
      handleInput(val) {
        this.$emit('blur', val)
      },

      getImportOptions (type, targetField) {
        let importOptionType = this.importOptions.find(o => o.value === type)
        return importOptionType && importOptionType[targetField]
      },

      rawDataToFields(rawFields) {
        let newHeaders = []
        rawFields.forEach( (rf, rfIdx) => {
          let now = new Date(Date.now())
          let fieldClass = new Field(
            this.userId,
            rf.value || rf,
            rf.text || rf,
            rf.field_type || 'str',
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
        // this.log && console.log(`\nC-DatasetImportData > rawDataToTables > tableMetadata :`, tableMetadata)
        // this.log && console.log(`C-DatasetImportData > rawDataToTables > dataObj :`, dataObj)
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

      // === COPY PASTE DATA ===
      readFromCopyPaste() {
        if (this.copyPasteData) {
          // this.log && console.log(`C-DatasetImsportData > readFromCopyPaste > ...`)
          this.loading = true
          this.setImportData(false)
          this.resetCurrentTables()
          const data = this.copyPasteData
          const dataObj = convertCSVToJSON(data, this.copyPasteSeparator)
          // this.log && console.log(`C-DatasetImportData > readFromCopyPaste > data : `, data)
          // this.log && console.log(`C-DatasetImportData > readFromCopyPaste > dataObj : `, dataObj)
          let tableMetadata = {
            title: this.copyPasteDataName,
            importType: 'copyPaste',
            index: 1,
          }
          // this.log && console.log(`C-DatasetImportData > readFromCopyPaste > tableMetadata : `, tableMetadata)
          const tableCopyPaste = this.rawDataToTable(tableMetadata, dataObj)
          setTimeout(() => {
            // this.log && console.log(`C-DatasetImportData > readFromCopyPaste > tableCopyPaste : `, tableCopyPaste)
            this.toggleTablesNeedReload(true)
            this.setCurrentTables( { tables: [tableCopyPaste] } )
            this.setImportData(true)
            this.loading = false
          }, 200)
        }
      },

      // === CSV FILES ===
      async readCsvFilesAsync() {
        // this.log && console.log(`\nC-DatasetImportData > readCsvFilesAsync > e :`, e)
        let promisesArray = []
        // this.log && console.log(`\nC-DatasetImportData > readCsvFilesAsync > this.csvFiles :`, this.csvFiles)
        this.csvFiles.forEach( (file, i) => {
          // this.log && console.log(`C-DatasetImportData > readCsvFilesAsync > i :`, i)
          // this.log && console.log(`C-DatasetImportData > readCsvFilesAsync > file :`, file)
          let tableMetadata = {
            title: file.name,
            importType: 'csv',
            index: i + 1,
          }
          // this.log && console.log(`C-DatasetImportData > readCsvFilesAsync > tableMetadata :`, tableMetadata)
          
          const promise = processFile(file)
            .then( data => {
              // this.log && console.log(`C-DatasetImportData > readCsvFilesAsync > data :`, data)
              let dataObj = convertCSVToJSON(data, this.csvSeparator)
              const table = this.rawDataToTable(tableMetadata, dataObj)
              // this.log && console.log(`C-DatasetImportData > readCsvFilesAsync > table :`, table)
              return table
            })
          promisesArray.push(promise)
        })
        return Promise.all(promisesArray)
      },
      async readCsvFiles() {
        if ( this.csvFiles && this.csvFiles.length > 0 ) {
          this.loading = true
          this.setImportData(false)
          this.resetCurrentTables()
          // this.log && console.log(`C-DatasetImportData > readCsvFiles > ...`)
          try {
            const tablesCsv = await this.readCsvFilesAsync()
            // this.log && console.log(`C-DatasetImportData > readCsvFiles > tablesCsv :`, tablesCsv)
            this.toggleTablesNeedReload(true)
            this.setCurrentTables({tables: tablesCsv})
            this.setImportData(true)
            this.loading = false
          } catch (ex) {
            this.log && console.log(ex)
          }
        }
      },

      // === EXCEL FILE ===
      async readExcelFile() {
        if (this.xlsFile) {
          this.loading = true
          this.setImportData(false)
          this.resetCurrentTables()
          let tablesExcel = []
          try {
            const xlsData = await processFile(this.xlsFile, 'xls')
              .then( xlsData => {
                this.log && console.log(`C-DatasetImportData > readExcelFile > xlsData :`, xlsData)
                xlsData.SheetNames.forEach( (sheetName, dataIdx) => {
                  // this.log && console.log(`C-DatasetImportData > readExcelFile > table :`, table)
                  let tableMetadata = {
                    title: sheetName,
                    importType: 'excel',
                    index: dataIdx + 1,
                  }
                  let dataObj = convertXlsToJson(xlsData.Sheets[sheetName])
                  this.log && console.log(`C-DatasetImportData > readExcelFile > dataObj :`, dataObj)
                  const table = this.rawDataToTable(tableMetadata, dataObj)
                  this.log && console.log(`C-DatasetImportData > readExcelFile > table :`, table)
                  tablesExcel.push(table)
                }) 
              })
            this.log && console.log(`C-DatasetImportData > readExcelFile > tablesExcel :`, tablesExcel)
            this.toggleTablesNeedReload(true)
            this.setCurrentTables({ tables: tablesExcel })
            this.setImportData(true)
            this.loading = false
         } catch (ex) {
            this.log && console.log(ex)
          }
        }
      },

      // === JSON FILE ===
      readJsonFiles() {},

      // === CSV URL ===
      async readCsvFromUrlAsync(url) {
        // this.log && console.log(`C-DatasetImportData > readCsvFromUrlAsync > url : `, url)
        const header = {
          accept: '*/*',
        }
        let promisesArray = []
        const getCsvDataPromise = this.$axios.get(url, header)
          .then(resp => {
            // this.log && console.log(`C-DatasetImportData > readCsvFromUrlAsync > resp.data : `, resp.data)
            let dataObj = convertCSVToJSON(resp.data, this.csvUrlSeparator)
            // this.log && console.log(`C-DatasetImportData > readCsvFromUrlAsync > dataObj`, dataObj)
            return dataObj
          })
        promisesArray.push(getCsvDataPromise)
        return Promise.all(promisesArray)
      },
      async readCsvFromUrl() {
        // this.log && console.log(`C-DatasetImportData > readCsvFromUrl > ...`)
        if (this.csvGithubUrl && this.csvGithubUrl.startsWith('http')) {
          this.loading = true
          this.setImportData(false)
          let csvUrlData = convertGithubUrlToRawUrl(this.csvGithubUrl)
          // this.log && console.log(`C-DatasetImportData > readCsvFromUrl > csvUrlData : `, csvUrlData)
          let tableMetadata = {
            title: csvUrlData.filename,
            importType: 'csvGithub',
            index: 1,
          }
          tableMetadata.importData = csvUrlData
          // this.log && console.log(`C-DatasetImportData > readCsvFromUrl > tableMetadata : `, tableMetadata)
          try {
            let dataObj = await this.readCsvFromUrlAsync(csvUrlData.rawFileUrl)
            // this.log && console.log(`C-DatasetImportData > readCsvFromUrl > dataObj :`, dataObj)
            const tableCsvUrl = this.rawDataToTable(tableMetadata, dataObj[0])
            // this.log && console.log(`C-DatasetImportData > readCsvFromUrl > tableCsvUrl :`, tableCsvUrl)
            this.toggleTablesNeedReload(true)
            this.setCurrentTables({ tables: [tableCsvUrl] })
            this.setImportData(true)
            this.loading = false
          } catch (ex) {
            this.log && console.log(ex)
          }
        }
      },

      // === GSHEET DATA ===
      addSheetNumber() {
        this.tableGsheetSheets += 1
        this.tableGsheetSheetNumbers.push(this.tableGsheetSheets)
        this.tableGsheetSheetNumbersSelection.push(this.tableGsheetSheets)
      },
      async readGsheetUrl() {
        // this.log && console.log(`C-DatasetImportData > readGsheetUrl > ...`)
        if (this.tableGsheetUrl && this.tableGsheetUrl.startsWith('http')) {
          this.loading = true
          this.setImportData(false)
          // this.log && console.log(`C-DatasetImportData > readGsheetUrl > this.tableGsheetUrl :`, this.tableGsheetUrl)
          let gsheetUrlData = await loadGoogleSheet(this.tableGsheetUrl, this.tableGsheetSheetNumbersSelection)
          // this.log && console.log(`C-DatasetImportData > readGsheetUrl > gsheetUrlData :`, gsheetUrlData)
          let tablesGsheet = []
          gsheetUrlData.data.forEach( (gsData, gsIdx) => {
            let tableMetadata = {
              title: gsData.nameSheet,
              importType: 'gSheet',
              index: gsIdx + 1,
            }
            tableMetadata.importData = gsheetUrlData.GSheetConfig
            const table = this.rawDataToTable(tableMetadata, gsData)
            // this.log && console.log(`C-DatasetImportData > readCsvFromUrl > table :`, table)
            tablesGsheet.push(table)
          })
          this.toggleTablesNeedReload(true)
          this.setCurrentTables({ tables: tablesGsheet })
          this.setImportData(true)
          this.loading = false
        }

      },

      setImportData(bool) {
        // this.log && console.log(`C-DatasetImportData > setImportData > bool :`, bool)
        this.$emit('setDataImport', bool)
      }

    }
  }

</script>
