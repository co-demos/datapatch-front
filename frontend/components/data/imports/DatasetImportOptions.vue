<template>
  <v-container class="mt-5">
    <!-- presetCreate: {{ presetCreate }}<br>
    selected: {{ selected }} -->
    <v-row class="align-top justify-left px-12">
      <v-col
        v-for="option in importOptions"
        :key="option.value"
        cols="12"
        xs="12"
        sm="12"
        md="6"
        lg="4"
        xl="4"
        class="px-5"
        >
        <v-btn
          block
          color="primary"
          large
          elevation="0"
          :outlined="selected !== option.value"
          :disabled="option.disabled"
          @click.stop="sendValue(option.value)"
          class="text-none"
          >
          <v-icon
            :class="`${ selected === option.value ? 'white' : 'primary' }--text mr-3`"
            >
            {{ option.icon }}
          </v-icon>
          <span 
            :class="`${ selected === option.value ? 'white' : ( option.disabled ? '' : 'primary') }--text font-weight-bold`"
            >
            {{ $t(option.title) }}
          </span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  import { importOptionsInfos } from '@/utils/utilsImports.js'

  export default {

    name: 'DatasetImportOptions',
    props: [
      'presetCreate'
    ],
    watch: {
      presetCreate(next) {
        this.selected = next
      }
    },
    beforeMount() {
      if (this.presetCreate) {
        this.selected = this.presetCreate
      }
    },
    data () {
      return {
        selected: undefined,
        importOptions: importOptionsInfos,
        // importOptions: [
        //   { title: 'imports.blank', icon: 'icon-file', value: 'blank' },
        //   { title: 'imports.copyPaste', icon: 'icon-copy', value: 'copyPaste' },
        //   { title: 'imports.csv', icon: 'icon-table2', value: 'csv' },
        //   { title: 'imports.excel', icon: 'icon-file-excel-o', value: 'excel' },
        //   { title: 'imports.json', icon: 'icon-file-code-o', value: 'json' },
        //   { title: 'imports.csvGithub', icon: 'icon-github', value: 'csvGithub' },
        //   { title: 'imports.gSheet', icon: 'icon-google', value: 'gSheet', disabled: true },
        // ]
      }
    },
    methods: {
      sendValue(val) {
        this.selected = val
        this.$emit('setImportFormat',val)
      }
    }
  }

</script>
