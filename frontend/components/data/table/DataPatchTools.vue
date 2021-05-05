<template>

  <v-toolbar
    dense
    flat
    color="white"
    >

    <v-btn
      v-for="btn in buttonsLeft"
      :key="btn.icon"
      text
      small
      >
      <v-icon small color="black">
        {{ btn.icon }}
      </v-icon>
    </v-btn>
    <v-spacer/>
    <v-btn
      v-for="btn in buttonsRight"
      :key="btn.icon"
      text
      small
      >
      <v-icon small color="black">
        {{ btn.icon }}
      </v-icon>
    </v-btn>

  </v-toolbar>

</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {

    name: 'DataPatchTools',
    props: [
      'tableId',
    ],
    data () {
      return {
        buttonsLeft: [
          {
            icon: 'icon-sidebar'
          },
          {
            icon: 'icon-settings'
          },
          {
            icon: 'icon-filter'
          },
          {
            icon: 'icon-users'
          },
          {
            icon: 'icon-download'
          },
          {
            icon: 'icon-link'
          },
        ],
        buttonsRight: [
          {
            icon: 'icon-trash-2'
          },
        ],
      }

    }
  }

</script>
