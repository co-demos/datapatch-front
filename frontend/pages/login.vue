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
            class="pa-5"
            >

            <!-- <div>
              <code><pre>
                {{ api }}
              </pre></code>
            </div> -->

            <v-card-title class="justify-center mb-3">
              <v-icon>
                icon-log-in
              </v-icon>
              <span class="ml-3">
              {{ $t('login.in') }}
              </span>
            </v-card-title>


            <v-form>

              <!-- email -->
              <v-text-field
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
                ></v-text-field>

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
                ></v-text-field>

              <!-- submit -->
              <v-btn
                :color="isLoading ? 'grey' : 'primary'"
                block
                large
                elevation="0"
                :depressed="isLoading"
                tile
                dark
                class="mr-4"
                @click="submit"
                >
                <span v-if="!isLoading">
                  {{ $t('login.in') }}
                </span>
                <span v-else>
                  {{ $t('login.inMsg') }}
                </span>
              </v-btn>

            </v-form>


            <v-container class="mt-4">
              <v-row>
                <v-col cols="6" class="px-0">
                  <v-btn 
                    text
                    color="grey"
                    block
                    to="/sign"
                    router
                    >
                  <span class="text-center text-none">
                    {{ $t('login.sign') }}
                  </span>
                  </v-btn>
                </v-col>

                <v-col cols="6" class="px-0">
                  <v-btn 
                    text
                    color="grey"
                    block
                    to="/reset-password"
                    route
                    >
                  <span class="text-center text-none">
                    {{ $t('login.forgotpwd') }}
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
      isLoading: false,
      showPwd: false,
      password: '',
      email: '',
      scopes: [
        'me',
        'items'
      ]
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      api: (state) => state.api
    }),
  },
  methods: {
    ...mapActions({
      authenticateUser: 'user/authenticateUser',
      populateUser: 'user/populateUser',
    }),
    submit () {
      // this.log && console.log('C-login > submit > this.scopes : ', this.scopes)
      this.isLoading = true
      const formData = new FormData()
      formData.append('username', this.email)
      formData.append('password', this.password)

      // cf : https://fastapi.tiangolo.com/tutorial/security/simple-oauth2/#scope
      formData.append('scope', this.scopes.join(' ') )
      
      // this.log && console.log('C-login > submit > formData.getAll("scope") : ', formData.getAll('scope'))
      axios
        .post(`${this.api.users}/token`, formData)
        .then(resp => {
          // this.log && console.log('C-login > submit > resp.data : ', resp.data)
          const token = resp.data
          this.authenticateUser(token)

          let config = new configHeaders(token.access_token, token.token_type)
          // this.log && console.log('C-login > submit > config.headers : ', config.headers)

          axios
            .get(`${this.api.users}/me/`, config.headers)
            .then(resp => {
              this.log && console.log('C-login > me > resp.data : ', resp.data)
              const userData = resp.data
              this.populateUser(userData)
              this.$i18n.setLocale(userData.locale)
              this.isLoading = false
              this.$router.push('/')
            })
            .catch(error => {
              this.log && console.log('C-login > me > error : ', error)
            })

        })
    }
  }
}

</script>
