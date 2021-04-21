<template>
  <v-container class="">
    <!-- presetCreate: {{ presetCreate }}<br>
    selected: {{ selected }} -->
    <v-row class="align-center justify-left px-12">
      <v-col
        v-for="option in importOptions"
        :key="option.value"
        cols="6"
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
            :class="`${ selected === option.value ? 'white' :'primary'}--text mr-3`"
            >
            {{ option.icon }}
          </v-icon>
          <span 
            :class="`${ selected === option.value ? 'white' :'primary'}--text font-weight-bold`"
            >
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
    props: [
      'presetCreate'
    ],
    beforeMount() {
      this.selected = this.presetCreate
    },
    watch: {
      presetCreate(next) {
        this.selected = next
      }
    },
    data () {
      return {
        selected: undefined,
        importOptions: [
          { title: 'imports.blank', icon: 'icon-file', value: 'blank'},
          { title: 'imports.copyPaste', icon: 'icon-copy', value: 'copyPaste'},
          { title: 'imports.csv', icon: 'icon-table2', value: 'csv'},
          { title: 'imports.excel', icon: 'icon-file-excel-o', value: 'excel'},
          { title: 'imports.json', icon: 'icon-file-code-o', value: 'json'},
          { title: 'imports.csvGithub', icon: 'icon-github', value: 'csvGithub'},
          { title: 'imports.gSheet', icon: 'icon-google', value: 'gSheet'},
        ]
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
