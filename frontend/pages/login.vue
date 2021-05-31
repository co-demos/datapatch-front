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
            class="pa-5"
            >

            <!-- <div>
              <code><pre>
                {{ api }}
              </pre></code>
            </div> -->

            <v-card-title class="justify-center mb-3 px-0">
              <v-icon>
                icon-log-in
              </v-icon>
              <span v-if="isLoading || isConnected" class="ml-3">
                {{ $t('login.inMsg') }}
              </span>
              <span v-else class="ml-3">
                {{ $t('login.in') }}
              </span>
            </v-card-title>

            <Alert 
              :dismissible="true"
            />

            <br/>

            <v-form v-show="!isConnected" ref="form">

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
              />

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
                :rules="passwordLoginRules"
              />

              <!-- submit -->
              <v-btn
                class="mt-3"
                :color="isLoading ? 'grey' : 'primary'"
                block
                large
                elevation="0"
                :depressed="isLoading"
                tile
                dark
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


            <v-container v-if="!isConnected" class="mt-4">
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
                    to="/recover-password"
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

  import { mapState, mapActions } from 'vuex'
  import { configHeaders } from '@/utils/utilsAxios'
  import { rules } from '@/utils/utilsRules.js'

  export default {

    name: 'Login',
    data () {
      return {
        pathItems: [
          { 
            text: 'login.in',
            disabled: true,
            to: '/login',
          }
        ],

        isConnected: false,
        showPwd: false,

        email: '',
        password: '',
        emailRules: rules.emailRules( this.$t('rules.emailRequired'), this.$t('rules.emailValid') ),
        passwordLoginRules: rules.passwordLoginRules( this.$t('rules.pwdType') ),

        scopes: [
          'me',
          'shared',
          'items'
        ],

      }
    },
    beforeMount () {
      this.updatePath(this.pathItems)
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
        authenticateUser: 'user/authenticateUser',
        populateUser: 'user/populateUser',
        populateUser: 'user/populateUser',
      }),
      submit () {
        if ( this.$refs.form.validate() ) {
          // this.log && console.log('P-Login > submit > this.scopes : ', this.scopes)
          // this.alert = false
          // this.isLoading = true
          const formData = new FormData()
          formData.append('username', this.email)
          formData.append('password', this.password)
    
          // cf : https://fastapi.tiangolo.com/tutorial/security/simple-oauth2/#scope
          formData.append('scope', this.scopes.join(' ') )
          
          // this.log && console.log('P-Login > submit > formData.getAll("scope") : ', formData.getAll('scope'))
          this.$axios
            .post(`${this.api.users}/token`, formData)
            .then(resp => {
              // this.log && console.log('P-Login > submit > A > resp.data : ', resp.data)
              this.isConnected = true
              const token = resp.data
              // this.log && console.log('P-Login > submit > A > token : ', token)

              this.authenticateUser(token)
              this.$cookies.set('access_token', token.access_token)
              this.$cookies.set('refresh_token', token.refresh_token)
    
              let config = new configHeaders(token.access_token, token.token_type)
              // this.log && console.log('P-Login > submit > config.headers : ', config.headers)
    
              this.$axios
                .get(`${this.api.users}/me/`, config.headers)
                .then(resp => {
                  // this.log && console.log('P-Login > B > me > resp.data : ', resp.data)
                  const userData = resp.data
                  this.populateUser(userData)
                  this.$i18n.setLocale(userData.locale)
                  // this.$router.push('/')
                  this.$router.push('/workspaces')
                })
            })
        }
      }
    }
  }

</script>
