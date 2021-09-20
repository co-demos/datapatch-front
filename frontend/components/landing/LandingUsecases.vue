<template>

  <div>
      
    <v-row class="LandingUseCases align-top justify-left my-12">

      <LandingTitle
        :title="'usecases.title'"
        :current="'#LandingUsecases'"
        :up="'#LandingCarousel'"
        :down="'#LandingRoadmap'"
      />

      <v-col cols="4" class="offset-2 justify-text">
        <v-card class="pa-5">
          <v-list
            class="body-2"
            disabled
            >
            <v-list-item
              v-for="usecase in usecases"
              :key="usecase.text"
              >
              <v-list-item-icon class="mt-0">
                <v-icon v-text="usecase.icon" color="primary"/>
              </v-list-item-icon>
              <v-list-item-content class="pt-0">
                {{ $t(usecase.text) }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="4" class="justify-text">
          <p class="body-2 white--text">
            {{ $t('usecases.text') }}
          </p>
          <p class="body-2 white--text">
            {{ $t('usecases.text_bis') }}
          </p>
          <p class="body-2 white--text">
            {{ $t('usecases.text_ter') }}
          </p>
      </v-col>

    </v-row>

  </div>
</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'LandinguUsecases',
    props: [],
    data () {
      return {
        usecases: [
          { text: 'usecases.edit', icon: 'icon-edit-3' },
          { text: 'usecases.contribute', icon: 'icon-share-2' },
          { text: 'usecases.publish', icon: 'icon-database' },
          { text: 'usecases.catalog', icon: 'icon-files-o' },
        ]
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
