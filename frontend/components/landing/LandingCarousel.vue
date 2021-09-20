<template>

  <v-row class="LandingCarousel align-top justify-center my-12">

    <LandingTitle
      :title="'features.featuresTitle'"
      :current="'#LandingCarousel'"
      :up="'#LandingSearch'"
      :down="'#LandingUsecases'"
    />

    <v-col cols="10" class="mb-3">
      <v-carousel
        cycle
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
            color="primary"
            rounded
            style="height: 100%;"
            >
            <p class="h6 text-center font-weight-bold py-2 mb-1">
              <v-icon small class="mr-2 pb-1">
                {{  item.icon }}
              </v-icon>
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

    <v-col cols="10" class="text-center mb-0 pb-0">
      <p class="white--text">
        {{ $t('features.featuresHeader') }}
      </p>
    </v-col>

    <v-col cols="5" class="text-caption py-0">
      <v-card class="pa-3">
      <v-list disabled dense class="">
        <v-list-item
          v-for="feat in featuresLeft"
          :key="feat.text" 
          class="mb-1"
          >
          <v-list-item-icon class="">
            <v-avatar color="secondary" size="28">
              <v-icon small v-text="feat.icon" dark />
            </v-avatar>
          </v-list-item-icon>

          <v-list-item-content class="py-0">
            {{ $t(feat.text) }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
      </v-card>
    </v-col>

    <v-col cols="5" class="text-caption py-0">
      <v-card class="pa-3">
      <v-list disabled dense class="">
        <v-list-item
          v-for="feat in featuresRight"
          :key="feat.text" 
          class="mb-1"
          >
          <v-list-item-icon class="">
            <v-avatar color="secondary" size="28">
              <v-icon small v-text="feat.icon" dark />
            </v-avatar>
          </v-list-item-icon>
          <v-list-item-content class="py-0">
            {{ $t(feat.text) }}
          </v-list-item-content>
        </v-list-item>
      </v-list>
      </v-card>
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
            icon: 'icon-edit-3',
            src: '/screenshots/dataset-edit-01.png',
          },
          {
            title: 'features.importData',
            icon: 'icon-download',
            src: '/screenshots/imports-types-01.png',
          },
          {
            title: 'features.manageDatasets',
            icon: 'icon-database',
            src: '/screenshots/ws-01.png',
          },
          {
            title: 'features.dragDropDatasets',
            icon: 'icon-mouse-pointer',
            src: '/screenshots/ws-dragdrop-01.jpg',
          },
          {
            title: 'features.collaborate',
            icon: 'icon-share-2',
            src: '/screenshots/ws-dragdrop-01.jpg',
          },
        ],
        featuresLeft: [
          { text: 'features.edit', icon: 'icon-edit-3' },
          { text: 'features.relationalDb', icon: 'icon-database' },
          { text: 'features.oauth', icon: 'icon-lock' },
          { text: 'features.auths', icon: 'icon-users' },
          { text: 'features.share', icon: 'icon-share' },
          { text: 'features.collaboration', icon: 'icon-edit' },
          { text: 'features.dragdrop', icon: 'icon-mouse-pointer' },
        ],
        featuresRight: [
          { text: 'features.emailing', icon: 'icon-bell' },
          { text: 'features.publish', icon: 'icon-share-2' },
          { text: 'features.api', icon: 'icon-code' },
          { text: 'features.moderation', icon: 'icon-check-square' },
          { text: 'features.imports', icon: 'icon-download' },
          { text: 'features.sovereign', icon: 'icon-hard-drive' },
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
