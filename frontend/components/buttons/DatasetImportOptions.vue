<template>
  <v-container class="">
    <v-row class="align-center justify-left">
      <v-col
        v-for="option in importOptions"
        :key="option.value"
        cols="6"
        >
        <v-btn
          block
          color="primary"
          large
          outlined
          @click="sendValue(option.value)"
          class="text-none"
          >
          <v-icon class="mr-3">
            {{ option.icon }}
          </v-icon>
          <span>
            {{ $t(option.title) }}
          </span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  export default {

    name: 'DatasetImportOptions',
    props: [],
    data () {
      return {
        importOptions: [
          { title: 'imports.copyPaste', icon: 'icon-copy', value: 'copyPaste'},
          { title: 'imports.csv', icon: 'icon-table2', value: 'csv'},
          { title: 'imports.excel', icon: 'icon-file-excel-o', value: 'excel'},
          { title: 'imports.json', icon: 'icon-file-code-o', value: 'json'},
          { title: 'imports.csvGithub', icon: 'icon-github', value: 'csvGithub'},
        ]
      }
    },
    methods: {
      sendValue(val) {
        this.$emit('setImportFormat',val)
      }
    }
  }

</script>
