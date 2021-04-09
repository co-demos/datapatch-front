<template>
    <v-container 
      fill-height
      style="height: 60vh;"
      >

      <v-row
        fill-height
        class="justify-center align-center"
        >

        <v-col 
          cols="6"
          >

          <div class="text-center mt-5">
            <LogoAnimated
              :yoyo="true"
              :repeat="isLoading ? -1 : 0"
              :animated="true"
              :height="'300px'"
            />
          </div>

          <v-card 
            elevation="0"
            class="pa-1">

            <v-card-title class="justify-center mb-3 px-0">
              <v-icon>
                icon-log-search1
              </v-icon>

              <span class="ml-3 text-center">
                <span v-if="!hasFailed && !isVerified">
                  {{ $t('login.verifyEmail') }}
                </span>
                <span v-if="!hasFailed && isVerified">
                  {{ $t('login.verifyOk') }}
                  <br>
                  {{ $t('login.verifyOk2') }}
                </span>
                <span v-if="hasFailed && !isVerified">
                  {{ $t('login.failVerify') }}
                </span>
              </span>

              <v-alert
                class="mt-5"
                v-if="hasFailed && errorMsg"
                dense
                outlined
                icon="icon-alert-triangle"
                type="error"
                >
                <strong>error {{ errorCode }}</strong> - {{ errorMsg }}
              </v-alert>

            </v-card-title>


            <v-container v-if="isVerified || hasFailed" class="mt-4">
              <v-row>
                <v-col cols="12" class="px-0">
                  <v-btn 
                    color="primary"
                    block
                    tile
                    elevation="0"
                    dark
                    :to="`/${isVerified ? 'login' : ''}`"
                    router
                    >
                  <span v-if="isVerified" class="text-center">
                    {{ $t('login.in') }}
                  </span>
                  <span v-else class="text-center">
                    {{ $t('pages.home') }}
                  </span>
                  </v-btn>
                </v-col>

              </v-row>
            </v-container>


          </v-card>

        </v-col>

      </v-row>

    </v-container>

</template>

<script>

import axios from 'axios'
import { configHeaders } from '@/utils/utilsAxios'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {

  data () {
    return {
      isLoading: true,
      hasFailed: false,
      isVerified: false,
      tokenToCheck: undefined,
      errorMsg: undefined,
      errorCode: undefined,
    }
  },
  watch: {
    tokenToCheck(next) {
      if (next) {
        this.verifyEmail(next)
      }
    }
  },
  mounted () {
    let tokenFromUrl = this.$route.query
    // this.log && console.log('P-VerifyEmail > tokenFromUrl : ', tokenFromUrl)
    this.tokenToCheck = tokenFromUrl.token
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      api: (state) => state.api
    })
  },
  methods: {
    verifyEmail(token) {
      this.log && console.log('P-VerifyEmail > token : ', token)
      let url = `${this.api.users}/verify-email/?token=${token}`
      this.log && console.log('P-VerifyEmail > url : ', url)
      axios
        .get(url)
        .then(resp => {
          this.log && console.log('P-VerifyEmail > resp : ', resp)
          this.isLoading = false
          this.isVerified = true
          // this.$router.push('/')
        })
        .catch(error => {
          this.hasFailed = true
          this.isLoading = false
          this.log && console.log('P-VerifyEmail > error.response : ', error.response)
          this.errorMsg = error.response.data.detail
          this.errorCode = error.response.status
        })
    }
  }
}

</script>
