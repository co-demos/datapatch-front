<template>

  <v-toolbar
    dense
    flat
    color="white"
    >

    <!-- TABLE ACTIONS -->
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
          { icon: 'icon-sidebar' },
          { icon: 'icon-settings' },
          { icon: 'icon-filter' },
          { icon: 'icon-users' },
          { icon: 'icon-download' },
          { icon: 'icon-link' },
        ],
        buttonsRight: [
          { icon: 'icon-trash-2' },
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
