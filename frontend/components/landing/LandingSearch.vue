<template>
  <div
    style="height: 100vh;"
    class="LandingSearch"
    >
    <v-row
      class="align-top justify-center mt-12"
      >
      <!-- style="margin: 150px 0 170px 0;" -->

      <LandingTitle
        :title="'datapatch.testSearch'"
        :current="'#LandingSearch'"
        :up="'#topLanding'"
        :down="'#LandingCarousel'"
      />

      <!-- SEARCH BOX -->
      <v-col 
        cols="12"
        class="align-top justify-center pa-0"
        >
        <v-card 
          class="elevation-0 pl-5 pr-6 pb-5 pt-10"
          color="primary"
          >
          <v-card-text class="text-justify py-1 mb-5">
            <SearchAny
              :itemTypes="['users', 'groups', 'workspaces', 'datasets', 'tables']"
              :searchLabel="'buttons.searchText'"
              :searchPlaceholder="'buttons.queryText'"
              :flat="true"
              :solo="true"
              :light="true"
              :dense="false"
              :customColor="'white'"
              :relatedSpace="'landing'"
            />
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
  </div>

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
