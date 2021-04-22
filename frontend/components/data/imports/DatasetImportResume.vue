<template>
  <v-container class="mt-5">
      DatasetImportResume<br>
      <br>- importType: <code>{{ importType }}</code>
      <br>- dataImport: <code>{{dataImport }}</code>
      <br>- localItem: <code><pre>{{localItem}}</pre></code>
    <v-row class="align-center justify-left px-12">
    </v-row>
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
        
      }
    },
    methods: {
    }
  }

</script>
