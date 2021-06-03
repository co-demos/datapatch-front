<template>
  <div
    style="height: 100vh;"
    >
    <v-row
      class="align-top justify-center mt-12"
      >
      <!-- style="margin: 150px 0 170px 0;" -->

      <LandingTitle
        :top="'#LandingHead'"
        :title="'datapatch.testSearch'"
        :current="'#LandingSearch'"
        :up="'#LandingHead'"
        :down="'#LandingCarousel'"
      />

      <!-- SEARCH BOX -->
      <v-col 
        cols="12"
        class="align-top justify-center pa-0"
        >
        <v-card 
          class="elevation-0 px-5 pb-5 pt-10"
          color="secondary"
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
