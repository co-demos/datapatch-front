<template>

  <v-row
    class="align-center justify-center"
    style="margin: 150px 0 170px 0;"
    >

    <v-col cols="12" class="text-center mb-0 px-0">
      <p class="text-h5">
        {{ $t('datapatch.testSearch') }}
      </p>
    </v-col>

    <!-- SEARCH BOX -->
    <v-col 
      cols="12"
      class="align-center justify-center pa-0"
      >
      <v-card 
        class="elevation-0 px-5 pb-5 pt-10"
        color="primary"
        >
        <!-- <v-card-title class="headline mb-4 justify-center">
          <span class="white--text">
            {{ $t('datapatch.testSearch') }}
          </span>
        </v-card-title> -->
        <v-card-text class="text-justify py-1 mb-5">
          <SearchAny
            :itemTypes="['users', 'groups', 'workspaces', 'datasets', 'tables']"
            :searchLabel="'buttons.searchText'"
            :searchPlaceholder="'buttons.queryText'"
            :flat="true"
            :solo="true"
            :light="true"
            :dense="false"
            :customClass="''"
            :customColor="'white'"
          />
        </v-card-text>
      </v-card>
    </v-col>

  </v-row>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'LandingHead',
    props: [],
    data () {
      return {

      }
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        userData: (state) =>  state.user.userData,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated'
      })
    },
  }

</script>
