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
          
          <v-card 
            elevation="0"
            class="py-5">

            <v-card-title class="justify-center mb-3 px-0">

              <v-icon>
                icon-alert-triangle
              </v-icon>
              <span class="ml-3">
                {{ $t('login.forgotpwd') }}
              </span>

            </v-card-title>

            <v-card-text
              v-if="isSent"
              class="text-center"
              >
              {{ $t('login.newpwdSent') }}
            </v-card-text>

            <v-alert
              v-model="alert"
              class="my-5"
              v-if="hasFailed && errorMsg"
              dense
              outlined
              icon="icon-alert-triangle"
              type="error"
              dismissible
              >
              <strong>error {{ errorCode }}</strong> - {{ errorMsg }}
            </v-alert>

            <br/>

            <v-form v-if="!isSent" ref="form">

              <!-- email -->
              <v-text-field
                v-model="email"
                outlined
                single-line
                clearable
                :disabled="isLoading"
                :label="$t('login.formEmailLabel')"
                :placeholder="$t('login.formEmail')"
                prepend-inner-icon="icon-mail"
                :rules="emailRules"
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
                {{ $t('login.resetpwd') }}
              </v-btn>

            </v-form>

          </v-card>

        </v-col>

      </v-row>

    </v-container>

</template>

<script>

import axios from 'axios'
import { mapState, mapGetters } from 'vuex'
import { rules } from '@/utils/utilsRules.js'

export default {

  data () {
    return {
      isLoading: false,
      isSent: false,
      alert: false,

      email: '',
      emailRules: rules.emailRules( this.$t('rules.emailRequired'), this.$t('rules.emailValid') ),

      hasFailed: false,
      errorMsg: undefined,
      errorCode: undefined,
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      api: (state) => state.api
    })
  },
  methods: {
    submit () {
      if ( this.$refs.form.validate() ) {
       this.alert = false
       let url = `${this.api.users}/password-recovery/${this.email}`
        axios
          .post(url, {})
          .then(resp => {
            this.log && console.log('P-RecoverPwd > resp.data : ', resp.data)
            this.isLoading = false
            this.isSent = true
            // this.$router.push('/')
          })
          .catch(error => {
            this.alert = true
            this.hasFailed = true
            this.isLoading = false
            this.log && console.log('P-RecoverPwd > error.response : ', error.response)
            this.errorMsg = error.response.data.detail
            this.errorCode = error.response.status
          })
      }
    }
  }
}

</script>
