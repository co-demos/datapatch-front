<style scoped>

</style>

<template>

  <div
    :class="`${fulllWidth ? 'px-0 ml-0 mr-0' : 'px-5'}`"
    >

    <!-- CUSTOM TABLE TOOLS FOR DATA PATCH -->
    <DataPatchTools
      v-if="!noToolbar"
    />

    <!-- CUSTOM TABLE FOR DATA PATCH -->
    <DataPatchTable
      :tableId="tableId"
    />

  </div>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {

    name: 'DataTable',
    props: [

      'datasetItem',

      'tableId',

      'fulllWidth',
      'noToolbar',
      'fromCreate'
    ],

    data () {
      return {}
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
        userId: 'user/userId',
        headerUser: 'user/headerUser',
      })
    },
  }

</script>
