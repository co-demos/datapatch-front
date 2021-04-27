<template>
  <v-container
    class="mt-5 pa-0"
    >

    <!-- DatasetImportData<br> -->
    <!-- <br>- importType: <code>{{ importType }}</code> -->

    <v-lazy
      v-model="isActive"
      :options="{ threshold: .5}"
      min-height="200"
      transition="fade-transition"
      >

      <!-- BLANK -->
      <div v-if="importType === 'blank'">
        <p class="text-h5">
          {{ $t(getImportOptions('blank') ) }}
        </p>
        <DataTable
          :datasetItem="datasetItem"
          :tableItem="tableItem"
          :dataHeaders="dataHeadersBlank"
          :dataRows="dataRowsBlank"
          :fulllWidth="true"
          :noToolbar="true"
        />
      </div>

      <div v-if="importType === 'copyPaste'">
        <p class="text-h5">
          {{ $t(getImportOptions('copyPaste') ) }}
        </p>
        <v-textarea
          v-model="copyPasteData"
          background-color="grey lighten-3"
          outlined
        />
        <v-spacer/>
        <DataTable
          v-if="copyPasteData"
          :datasetItem="datasetItem"
          :tableItem="tableItem"
          :dataHeaders="dataHeadersCopyPaste"
          :dataRows="dataRowsCopyPaste"
          :fulllWidth="true"
          :noToolbar="true"
        />
      </div>

      <!-- CSV FILES -->
      <div v-if="importType === 'csv'">
        <p class="text-h5">
          {{ $t(getImportOptions('csv') ) }}
        </p>
        <v-file-input
          v-model="csvFiles"
          counter
          multiple
          show-size
          small-chips
          truncate-length="15"
          accept=".csv"
        />
        <v-spacer/>
        {{ csvFiles }}
        <!-- <DataTable
          v-if="csvFiles"
          :datasetItem="datasetItem"
          :tableItem="tableItem"
          :dataHeaders="dataHeadersCsv"
          :dataRows="dataRowsCsv"
          :fulllWidth="true"
          :noToolbar="true"
        /> -->
      </div>

      <!-- EXCEL FILES -->
      <div v-if="importType === 'excel'">
        <p class="text-h5">
          {{ $t(getImportOptions('excel') ) }}
        </p>
        <v-file-input
          counter
          multiple
          show-size
          small-chips
          truncate-length="15"
          accept=".xls,.xlsx"
       />
        <v-spacer/>
        <DataTable
          v-if="xlsFiles"
          :datasetItem="datasetItem"
          :tableItem="tableItem"
          :dataHeaders="dataHeadersXls"
          :dataRows="dataRowsXls"
          :fulllWidth="true"
          :noToolbar="true"
        />
      </div>

      <!-- JSON FILES -->
      <div v-if="importType === 'json'">
        <p class="text-h5">
          {{ $t(getImportOptions('json') ) }}
        </p>
        <v-file-input
          counter
          multiple
          show-size
          small-chips
          truncate-length="15"
          accept=".json"
        />
        <v-spacer/>
        <DataTable
          v-if="jsonFiles"
          :datasetItem="datasetItem"
          :tableItem="tableItem"
          :dataHeaders="dataHeadersJson"
          :dataRows="dataRowsJson"
          :fulllWidth="true"
          :noToolbar="true"
        />
      </div>

      <!-- CSV URL RAW -->
      <div v-if="importType === 'csvGithub'">
        <p class="text-h5">
          {{ $t(getImportOptions('csvGithub') ) }}
        </p>
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
        <DataTable
          v-if="csvGithubUrl"
          :datasetItem="datasetItem"
          :tableItem="tableItem"
          :dataHeaders="dataHeadersCsvGithub"
          :dataRows="dataRowsCsvGithub"
          :fulllWidth="true"
          :noToolbar="true"
        />
      </div>

      <!-- GSHEET URL RAW -->
      <div v-if="importType === 'gSheet'">
        <p class="text-h5">
          {{ $t(getImportOptions('gSheet') ) }}
        </p>
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
        <DataTable
          v-if="tableGsheetUrl"
          :datasetItem="datasetItem"
          :tableItem="tableItem"
          :dataHeaders="dataHeadersGsheet"
          :dataRows="dataRowsGsheet"
          :fulllWidth="true"
          :noToolbar="true"
        />
      </div>

    </v-lazy>
  </v-container>
</template>

<script>

  import { importOptionsInfos } from '@/utils/utilsImports.js'
  import { rules } from '@/utils/utilsRules.js'
  import { Field, helpHeadersFields, endHeadersFields, defaultHeaders } from '@/utils/utilsFields'
  import { TableMetaData, defaultTableData } from '@/utils/utilsTables'

  export default {

    name: 'DatasetImportData',
    props: [
      'datasetItem',
      'importType',
    ],
    data () {
      return {
        importOptions: importOptionsInfos,
        isActive: false,
        urlRules: rules.urlRules( this.$t('rules.urlRequired'), this.$t('rules.urlValid') ),

        tableItem: undefined,

        dataHeadersBlank: undefined,
        dataRowsBlank: undefined,

        copyPasteData: undefined,
        dataHeadersCopyPaste: undefined,
        dataRowsCopyPaste: undefined,

        csvFiles: undefined,
        dataHeadersCsv: undefined,
        dataRowsCsv: undefined,

        xlsFiles: undefined,
        dataHeadersXls: undefined,
        dataRowsXls: undefined,

        jsonFiles: undefined,
        dataHeadersJson: undefined,
        dataRowsJson: undefined,

        csvGithubUrl: undefined,
        dataHeadersCsvGithub: undefined,
        dataRowsCsvGithub: undefined,

        tableGsheetUrl: undefined,
        dataHeadersGsheet: undefined,
        dataRowsGsheet: undefined,

      }
    },
    beforeMount () {

      // SET TABLE FOR BLANK
      let tableItem = new TableMetaData()
      this.log && console.log(`\nC-DatasetImportData > beforeMount > tableItem : `, tableItem)
      this.tableItem = tableItem

      // SET HEADERS FOR BLANK
      let dataHs = []
      for (let [i, defaultHeader] of defaultHeaders.entries()) {
        // this.log && console.log(`\nC-DatasetImportData > beforeMount > defaultHeader : `, defaultHeader)
        let now = new Date(Date.now())
        let fieldClass = new Field(
          this.userId,
          defaultHeader.value,
          defaultHeader.text,
          defaultHeader.type,
          `${this.$t('dataPackage.description')} - ${defaultHeader.title}`,
          now.toISOString()
        )
        // fieldClass.fixed = i === 0
        fieldClass.divider = true
        dataHs.push(fieldClass)
      }
      this.dataHeadersBlank = dataHs

      // SET ROWS FOR BLANK
      this.dataRowsBlank = defaultTableData
      
    },
    methods: {
      getImportOptions (type) {
        return this.importOptions.find(o => o.value === type).title
      },
      sendValue(val) {
        this.$emit('setDataImport', val)
      }
    }
  }

</script>
