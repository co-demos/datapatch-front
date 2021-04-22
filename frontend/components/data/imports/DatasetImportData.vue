<template>
  <v-container
    class="mt-5"
    >

    <!-- DatasetImportData<br> -->
    <br>- importType: <code>{{ importType }}</code>
    
    <v-row class="align-center justify-center mt-3">
      <v-col>
        <DataTable
          :localItem="localItem"
          :dataHeaders="dataHeaders"
          :dataRows="dataRows"
          :fulllWidth="false"
        />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>

  export default {

    name: 'DatasetImportData',
    props: [
      'localItem',
      'importType',
    ],
    data () {
      return {
        dataHeaders: undefined,
        dataRows: undefined,
      }
    },
    methods: {
      sendValue(val) {
        this.$emit('setDataImport',val)
      }
    }
  }

</script>
