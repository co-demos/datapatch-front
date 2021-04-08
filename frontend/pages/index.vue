<template>
  <v-layout
    column
    justify-center
    align-center
    >
    <v-flex
      xs12
      sm8
      md6
      >

      <div class="text-center mt-5">
        <LogoAnimated
          :yoyo="true"
          :repeat="-1"
          :animated="true"
          :height="'300px'"
        />
      </div>

      <v-card 
        class="elevation-0"
        >
        <v-card-title class="headline justify-center">
          {{ $t('datapatch.intro') }}
        </v-card-title>

        <v-card-text class="mt-4">
          <p>
            {{ $t('datapatch.pitch') }}
          </p>
          <p>
            {{ $t('datapatch.infos') }}
            <a
              href="https://github.com/co-demos/fastapi-boilerplate"
              target="_blank"
              >
              {{ $t('datapatch.repo') }}
            </a>.
          </p>
        </v-card-text>

        <v-card-actions class="justify-center">
          <!-- <v-spacer /> -->
          <v-btn
            dark
            tile
            elevation="0"
            color="primary"
            nuxt
            large
            to="/login"
            >
            {{ $t('buttons.continue') }}
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-flex>
  </v-layout>
</template>

<script>

// import { mapState, mapGetters } from 'vuex'

export default {
  components: {
  }
}
</script>
