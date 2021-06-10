<style scoped>
  h1 {
    font-size: 20px;
  }
  .white-btn {
    border: thin solid white !important; 
  }
</style>

<template>
  <!-- <v-app dark class="pa-0"> -->

    <div dark id="error-page">

      <v-row
        class="align-center justify-center"
        style="height: 80vh; width: 100vw;"
        >

        <v-col cols="10" class="pa-0 align-self-center text-center white--text">
    
          <h1
            v-if="error.statusCode === 404"
            v-html="$t('errors.pageNotFound')"
          />
          <div v-else>
            <h1
              v-html="$t('errors.otherError')"
            />
            <p>
              <!-- {{ error }} -->
              {{ $t('errors.errorCode', {code: error.statusCode} )}}
              <br>
              "{{ error.message }}"
            </p>
          </div>
          <br>
          
          <!-- LOGO -->
          <div class="text-center">
            <LogoAnimated
              :yoyo="true"
              :repeat="-1"
              :animated="true"
              :height="'200px'"
              :customTextBis="$t('errors.errorTxt')"
              :customColor="'warning'"
              :customColorBis="'white'"
            />
          </div>

          <v-btn
            outlined
            class="white-btn"
            to="/"
            >
            <v-icon small class="white--text mr-3">
              icon-home
            </v-icon>
            <span class="white--text text-none">
              {{ $t('errors.backHome')}}
            </span>
          </v-btn>

        </v-col>

      </v-row>
    </div>
  <!-- </v-app> -->
</template>

<script>
export default {
  layout: 'error_layout',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {}
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.$t('errors.pageNotFound') : this.$t('errors.otherError')
    return {
      title
    }
  }
}
</script>

