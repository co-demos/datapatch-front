<template>

  <v-toolbar
    dense
    flat
    color="white"
    >

    <!-- TABLE ACTIONS -->
    <v-tooltip 
      right
      v-for="btn in buttonsLeft"
      :key="btn.icon"
      >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          small
          v-bind="attrs"
          v-on="on"
          >
          <v-icon small color="black">
            {{ btn.icon }}
          </v-icon>
        </v-btn>
      </template>
      {{ $t(btn.tooltip) }}
    </v-tooltip>

    <v-spacer/>

    <!-- {{ hidden }} -->

    <!-- PAGINATION -->
    <v-btn
      icon
      x-small
      :disabled="hidden.page === 1"
      @click.stop="hidden.page -= 1"
      >
      <v-icon small color="black">
        icon-chevron-left1
      </v-icon>
    </v-btn>

    <span class="caption mx-2">
      <!-- {{ hidden.page }} -->
      {{ $t('pagination.page', { page: hidden.page, pages: hidden.pagesTotal }) }}
    </span>

    <v-btn
      icon
      x-small
      :disabled="hidden.page === hidden.pagesTotal"
      @click.stop="hidden.page += 1"
      >
      <v-icon small color="black">
        icon-chevron-right1
      </v-icon>
    </v-btn>

    <v-spacer/>
    
    <!-- TEXT SEARCH -->
    <v-text-field
      v-model="hidden.search"
      :placeholder="$t('pagination.searchPlaceholder')"
      hide-details
      dense
      clearable
      :height="'30px'"
      color="grey"
      class="py-1 mr-3"
      >
      <template v-slot:prepend>
        <v-icon color="grey" class="pt-1" small>
          icon-search1
        </v-icon>
      </template>
    </v-text-field>

    <!-- DELETE TABLE -->
    <v-tooltip
      left
      v-for="btn in buttonsRight"
      :key="btn.icon"
      >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          text
          small
          >
          <v-icon small color="black">
            {{ btn.icon }}
          </v-icon>
        </v-btn>
      </template>
      {{ $t(btn.tooltip) }}
    </v-tooltip>

  </v-toolbar>

</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {

    name: 'DataPatchTools',
    props: [
      'hidden', // use hidden for pagination / sort_by
      'tableId',
    ],
    model: {
      prop: 'hidden',
      event: 'blur'
    },
    data () {
      return {
        buttonsLeft: [
          { 
            icon: 'icon-sidebar',
            tooltip: 'tables.btnSidebar'
          },
          { 
            icon: 'icon-settings',
            tooltip: 'tables.btnSettings'
          },
          { 
            icon: 'icon-filter',
            tooltip: 'tables.btnFilter'
          },
          { 
            icon: 'icon-users',
            tooltip: 'tables.btnUsers'
          },
          { 
            icon: 'icon-download',
            tooltip: 'tables.btnDownload'
          },
          { 
            icon: 'icon-link',
            tooltip: 'tables.btnTablelink'
          },
        ],
        buttonsRight: [
          { 
            icon: 'icon-trash-2',
            tooltip: 'tables.btnTrash'
          },
        ],
      }

    },
    methods: {
      handleInput(val) {
        this.$emit('blur', val)
      }
    }
  }

</script>
