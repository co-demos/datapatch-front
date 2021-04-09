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
            class="pa-5">

            <v-card-title class="justify-center mb-3 px-0">
              <v-icon>
                icon-edit-3
              </v-icon>
              <span class="ml-3">
                {{ $t('login.sign') }}
              </span>
            </v-card-title>

            <v-card-text v-if="checkEmail">
              <p>
                {{ $t('login.emailSent') }}
              </p>
              <p>
                {{ $t('login.checkEmail') }}
              </p>
            </v-card-text>
            
            <v-alert
              v-model="alert"
              class="my-5"
              dense
              outlined
              icon="icon-alert-triangle"
              type="error"
              dismissible
             >
              <strong>error {{ errorCode }}</strong> - {{ errorMsg }}
            </v-alert>

            <br/>

            <v-form v-if="!checkEmail" ref="form">

              <!-- username -->
              <v-text-field
                id="username"
                v-model="username"
                outlined
                single-line
                clearable
                :disabled="isLoading"
                :readonly="isLoading"
                :loading="isLoading"
                :label="$t('login.formUsername')"
                :placeholder="$t('login.formUsername')"
                prepend-inner-icon="icon-user"
                :rules="valueRules"
                ></v-text-field>

              <!-- name -->
              <v-text-field
                id="name"
                v-model="name"
                outlined
                single-line
                clearable
                :disabled="isLoading"
                :readonly="isLoading"
                :loading="isLoading"
                :label="$t('login.formName')"
                :placeholder="$t('login.formName')"
                prepend-inner-icon="icon-user"
                :rules="valueRules"
                ></v-text-field>

              <!-- surname -->
              <v-text-field
                id="surname"
                v-model="surname"
                outlined
                single-line
                clearable
                :disabled="isLoading"
                :readonly="isLoading"
                :loading="isLoading"
                :label="$t('login.formSurname')"
                :placeholder="$t('login.formSurname')"
                prepend-inner-icon="icon-user"
                :rules="valueRules"
                ></v-text-field>

              <!-- email -->
              <v-text-field
                id="email"
                v-model="email"
                outlined
                single-line
                clearable
                :disabled="isLoading"
                :readonly="isLoading"
                :loading="isLoading"
                :label="$t('login.formEmailLabel')"
                :placeholder="$t('login.formEmail')"
                prepend-inner-icon="icon-mail"
                :rules="emailRules"
                ></v-text-field>

              <!-- password -->
              <v-text-field
                v-model="password"
                outlined
                single-line
                :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                :disabled="isLoading"
                :readonly="isLoading"
                :loading="isLoading"
                :type="showPwd ? 'text' : 'password'"
                @click:append="showPwd = !showPwd"
                :label="$t('login.formPwdLabel')"
                :placeholder="$t('login.formPwdChoose')"
                prepend-inner-icon="icon-lock"
                :rules="passwordRules"
                ></v-text-field>

              <v-checkbox
                class="mb-5"
                v-model="checkbox"
                :rules="checkboxRules"
                :label="$t('login.formCheckLabel')"
                required
              ></v-checkbox>
              
              <!-- submit -->
              <v-btn
                class="mt-3"
                color="primary"
                block
                large
                elevation="0"
                tile
                dark
                @click="submit"
                >
                {{ $t('login.signBtn') }}
              </v-btn>

            </v-form>

            <v-container v-if="!checkEmail" class="mt-4">
              <v-row>
                <v-col cols="12" class="px-0">
                  <v-btn 
                    text
                    color="grey"
                    block
                    to="/login"
                    router
                    >
                  <span class="text-center text-none">
                    {{ $t('login.isAccount') }}
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
import { mapState, mapGetters, mapActions } from 'vuex'
import { rules } from '@/utils/utilsRules.js'

export default {

  data () {
    return {
      isLoading: false,
      checkEmail: false,
      showPwd: false,
      alert: false,

      username: '',
      name: '',
      surname: '',
      email: '',
      password: '',
      checkbox: false,

      valueRules: rules.valueRules( this.$t('rules.valEnter') ),
      emailRules: rules.emailRules( this.$t('rules.emailRequired'), this.$t('rules.emailValid') ),
      passwordRules: rules.passwordRules( this.$t('rules.pwdType'), this.$t('rules.pwdChars') ),
      checkboxRules: rules.checkboxRules( this.$t('rules.checkAgree') ),

      hasFailed: false,
      errorMsg: undefined,
      errorCode: undefined,
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      api: (state) => state.api,
    })
  },
  methods: {
    ...mapActions({
      // authenticateUser: 'user/authenticateUser',
      populateUser: 'user/populateUser',
    }),
    submit () {

      if ( this.$refs.form.validate() ) {
        this.alert = false
        let newUser = {
          username: this.username,
          name: this.name,
          surname: this.surname,
          email: this.email,
          locale: this.$i18n.locale,
          password: this.password,
        }
        this.log && console.log('P-Sign > submit > newUser : ', newUser)
  
        axios
          .post(`${this.api.users}/`, newUser)
          .then(resp => {
            this.log && console.log('P-Sign > submit > resp.data : ', resp.data)
            const userData = resp.data
            this.populateUser(userData)
            // this.$router.push('/login')
            this.checkEmail = true
          })
          .catch(error => {
            this.alert = true
            this.hasFailed = true
            this.isLoading = false
            this.log && console.log('P-Sign > error.response : ', error.response)
            this.errorMsg = error.response.data.detail
            this.errorCode = error.response.status
          })
      }
      
    }
  }
}

</script>
