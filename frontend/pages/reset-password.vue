<template>
    <v-container 
      fill-height
      >

      <v-row
        fill-height
        class="justify-center align-center"
        >

        <v-col 
          cols="6"
          >
          
          <v-card 
            elevation="0"
            class="pa-5">

            <v-card-title class="justify-center mb-1 px-0">

              <v-icon>
                icon-lock
              </v-icon>
              <span class="ml-3">
                {{ $t('login.newpwd') }}
              </span>

            </v-card-title>

            <v-card-text
              class="text-center mb-3"
              >
              {{ $t('login.newpwdFor', { email: userEmail }) }}
            </v-card-text>

            <Alert 
              :dismissible="true"
            />

            <br/>

            <v-card-text v-if="pwdIsChanged">
              <p class="text-center">
                {{ $t('login.newpwdOk') }}
              </p>
            </v-card-text>

            <v-container v-if="pwdIsChanged" class="mt-4">
              <v-row>
                <v-col cols="12" class="px-0">
                  <v-btn 
                    color="primary"
                    block
                    tile
                    elevation="0"
                    dark
                    to="/login"
                    router
                    >
                    <span class="text-center">
                      {{ $t('login.in') }}
                    </span>
                  </v-btn>
                </v-col>

              </v-row>
            </v-container>

            <v-form ref="form" v-if="!pwdIsChanged">

              <!-- password -->
              <v-text-field
                v-model="password"
                :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPwd ? 'text' : 'password'"
                @click:append="showPwd = !showPwd"
                :disabled="isLoading"
                :readonly="isLoading"
                :loading="isLoading"
                outlined
                single-line
                :label="$t('login.formPwdLabel')"
                :placeholder="$t('login.formPwd')"
                prepend-inner-icon="icon-lock"
                :rules="passwordRules"
               ></v-text-field>

              <!-- password again -->
              <v-text-field
                v-model="confirmPassword"
                append-icon="mdi-eye-off"
                type="password"
                :disabled="isLoading"
                :readonly="isLoading"
                :loading="isLoading"
                outlined
                single-line
                :label="$t('login.formPwdLabel')"
                :placeholder="$t('login.formPwd')"
                prepend-inner-icon="icon-lock"
                :rules="confirmPasswordRules"
                ></v-text-field>

              <!-- submit -->
              <v-btn
                class="mt-4"
                :color="isLoading ? 'grey' : 'primary'"
                block
                large
                elevation="0"
                tile
                dark
                @click="submit"
                >
                {{ $t('login.newpwdSend') }}
              </v-btn>

            </v-form>

          </v-card>

        </v-col>

      </v-row>

    </v-container>

</template>

<script>

import { mapState, mapActions } from 'vuex'
// import { configHeaders } from '@/utils/utilsAxios'
import { rules } from '@/utils/utilsRules.js'

export default {

  name: 'ResetPassword',
  data () {
    return {
      pathItems: [
        { 
          text: 'login.resetpwd',
          disabled: true,
          to: '/reset-password',
        }
      ],
      showPwd: false,
      tokenToSend: undefined,
      pwdIsChanged: false,

      userEmail: '',
      password: '',

      confirmPassword: '',
      passwordRules: rules.passwordRules( this.$t('rules.pwdType'), this.$t('rules.pwdChars') ),
      confirmPasswordRules: [
        ...rules.confirmPasswordRules( this.$t('rules.pwdConfirmType') ),
        (value) => value === this.password || this.$t('rules.pwdConfirmMatch'),
      ],

    }
  },
  beforeMount () {
    this.updatePath(this.pathItems)
  },
  mounted () {
    let tokenFromUrl = this.$route.query
    this.log && console.log('P-ResetPwd > tokenFromUrl : ', tokenFromUrl)
    this.userEmail = tokenFromUrl.user
    this.tokenToSend = tokenFromUrl.token
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      api: (state) => state.api,
      isLoading: (state) => state.dialogs.isLoading,
    })
  },
  methods: {
    ...mapActions({
      updatePath: 'updateCrumbsPath',
    }),
    submit () {
      if ( this.$refs.form.validate() ) {
        this.alert = false
        let url = `${this.api.users}/reset-password/`
        if (this.password === this.confirmPassword) {
          let payload = { 
            token: this.tokenToSend,
            new_password: this.password
          }
          // let config = new configHeaders(this.tokenToSend)
          // this.log && console.log('P-ResetPwd > config.headers : ', config.headers)
          this.$axios
            // .post(url, payload, config.headers)
            .post(url, payload)
            .then(resp => {
              this.log && console.log('P-ResetPwd > resp : ', resp)
              this.pwdIsChanged = true
              // this.$router.push('/')
            })
        }
      }
    }
  }
}

</script>
