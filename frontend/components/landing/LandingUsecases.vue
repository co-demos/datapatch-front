<template>

  <div>
      
    <v-row class="align-top justify-center my-12">

      <v-col cols="12" class="text-center mb-0">
        <p class="text-h5">
          {{ $t('usecases.title') }}
        </p>
      </v-col>

      <v-col cols="5" class="justify-text">
        <p class="body-2">
          {{ $t('usecases.text') }}
        </p>
        <p class="body-2">
          {{ $t('usecases.text_bis') }}
        </p>
        <p class="body-2">
          {{ $t('usecases.text_ter') }}
        </p>
      </v-col>

      <v-col cols="6" class="offset-1 justify-text">
        <v-list
          class="body-2 pt-0"
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
