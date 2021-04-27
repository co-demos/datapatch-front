<style scoped>

</style>

<template>

  <div
    :class="`${fulllWidth ? 'px-0 ml-0 mr-0' : 'px-5'}`"
    >

    <DataTableTools
      v-if="!noToolbar"
    />


    <!-- CUSTOM TABLE FOR DATA PATCH -->
    <DataPatchTable
      :dataFields="dataFields"
      :dataRows="tableRows"
    />

    <v-divider/>

    <!-- <v-row class="text-caption">
      <v-col cols="3">
        dataFields: <br>
        <code><pre>{{ dataFields }}</pre></code>
      </v-col>
      <v-col cols="3">
        dataFields: <br>
        <code><pre>{{ dataFields }}</pre></code>
      </v-col>
      <v-col cols="3">
        tableRows: <br>
        <code><pre>{{ tableRows }}</pre></code>
      </v-col>
      <v-col cols="3">
        localItem: <br>
        <code><pre>{{ localItem }}</pre></code>
      </v-col>
    </v-row> -->

  </div>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  import { Field, helpHeadersFields, endHeadersFields, defaultHeaders } from '@/utils/utilsFields'

  export default {

    name: 'DataTable',
    props: [
      'localItem',
      'dataHeaders',
      'dataRows',
      'fulllWidth',
      'noToolbar',
      'table'
    ],
    components: {
      DataTableTools: () => import(/* webpackChunkName: "DataTableTools" */ '@/components/data/DataTableTools.vue'),
    },
    watch: {
    },
    data () {
      return {
        dataFields: [],

        tableRows: [
          {
            name: 'Elinor',                          // string example
            surname: 'Ostrom',                       // long string example
            bio: 'bblablabla',                       // long text example
            age: 42,                                 // int example
            ratio: 0.4,                              // float example
            birthDate: '',                           // date example
            jsonData : {},                           // json example
            tags : ['tag1', 'tag2'],                 // tags list example
            note : 5,                                // notation / star example
            important : true,                        // boolean example
            md: 'A _markdown_ example',              // markdown text example
            wikipediaPage: 'https://en.wikipedia.org/wiki/Elinor_Ostrom',   // url example
          },
          {
            name: 'Ghibli',                          // string example
            surname: 'Le chien',                     // long string example
            bio: 'waf waf waf',                      // long text example
            age: 10,                                 // int example
            ratio: 0.9,                              // float example
            birthDate: '',                           // date example
            jsonData : {},                           // json example
            tags : ['manger', 'dormir'],             // tags list example
            note : 5,                                // notation / star example
            important : true,                        // boolean example
            md: 'A _markdown_ example',              // markdown text example
            wikipediaPage: 'https://en.wikipedia.org/wiki/Elinor_Ostrom',   // url example
          },
          { name: 'test 2' },
          { name: 'test 3' },
          { name: 'test 4' },
          { name: 'test 5' },
          { name: 'test 6' },
          { name: 'test 7' },
          { name: 'test 8' },
          { name: 'test 9' },
          { name: 'test 10' },
          // { name: 'test 11' },
          // { name: 'test 12' },
          // { name: 'test 13' },
          // { name: 'test 14' },
          // { name: 'test 15' },
        ],
      }
    },
    beforeMount () {

      let dataHs = []
      for (let [i, defaultHeader] of defaultHeaders.entries()) {
        // this.log && console.log(`\nC-DataTable > beforeMount > defaultHeader : `, defaultHeader)
        let now = new Date(Date.now())
        let fieldClass = new Field(
          this.userId,
          defaultHeader.value,
          defaultHeader.text,
          defaultHeader.type,
          `${this.$t('dataPackage.description')} - ${defaultHeader.title}`,
          now.toISOString()
        )
        fieldClass.fixed = i === 0
        fieldClass.divider = true
        dataHs.push(fieldClass)
      }
      this.dataFields = dataHs
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
    },
  }

</script>
