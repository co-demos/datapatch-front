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


            <Alert 
              :dismissible="true"
            />

            <br/>

            <v-form v-if="!isSent" ref="form">

              <!-- email -->
              <v-text-field
                id="email"
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

            <v-container class="mt-4">
              <v-row>
                <v-col class="px-0">
                  <v-btn 
                    text
                    color="grey"
                    block
                    to="/login"
                    router
                    >
                  <span class="text-center text-none">
                    {{ $t('login.forgotpwdBack') }}
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

import { mapState, mapActions } from 'vuex'
import { rules } from '@/utils/utilsRules.js'

export default {

  data () {
    return {
      isSent: false,

      email: '',
      emailRules: rules.emailRules( this.$t('rules.emailRequired'), this.$t('rules.emailValid') ),

    }
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
    }),
    submit () {
      if ( this.$refs.form.validate() ) {
       let url = `${this.api.users}/password-recovery/${this.email}`
        this.$axios
          .post(url, {})
          .then(resp => {
            this.log && console.log('P-RecoverPwd > resp.data : ', resp.data)
            this.isSent = true
            // this.$router.push('/')
          })
      }
    }
  }
}

</script>
