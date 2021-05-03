<template>

  <v-row class="align-top my-12">

    <v-col cols="12" class="text-left mb-5">
      <p class="text-h5">
        {{ $t('features.featuresTitle') }}
      </p>
    </v-col>

    <v-col cols="4">
      <p>
        {{ $t('features.featuresHeader') }}
      </p>
      <ul>
        <li
          v-for="feat in features"
          :key="feat" 
          >
          {{ $t(feat) }}
        </li>
      </ul>
    </v-col>

    <v-col cols="8">
      <v-carousel
        hide-delimiter-background
        show-arrows-on-hover
        height="100%"
        >
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          eager
          >
          <v-sheet
            class="pt-2 px-5"
            color="secondary"
            style="height: 100%;"
            >
            <p class="h6 text-center font-weight-bold py-2 mb-1">
              {{ $t(item.title) }}
            </p>
            <v-card
              outlined
              tile
              color="white"
              class="mb-12"
              >
              <v-img
                contain
                :src="item.src"
              ></v-img>
            </v-card>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-col>

  </v-row>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'LandingCarousel',
    props: [],
    data () {
      return {
        items: [
          {
            title: 'features.editTables',
            src: '/screenshots/dataset-edit-01.png',
          },
          {
            title: 'features.importData',
            src: '/screenshots/imports-types-01.png',
          },
          {
            title: 'features.manageDatasets',
            src: '/screenshots/ws-01.png',
          },
          {
            title: 'features.dragDropDatasets',
            src: '/screenshots/ws-dragdrop-01.jpg',
          },
          {
            title: 'features.collaborate',
            src: '/screenshots/ws-dragdrop-01.jpg',
          },
        ],
        features: [
          'features.edit',
          'features.relationalDb',
          'features.oauth',
          'features.auths',
          'features.collaboration',
          'features.dragdrop',
          'features.emailing',
          'features.share',
          'features.publish',
          'features.api',
          'features.moderation',
          'features.imports',
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
