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

            <!-- <div>
              <code><pre>
                {{ api }}
              </pre></code>
            </div> -->

            <v-card-title class="justify-center mb-3">
              <v-icon>
                icon-edit-3
              </v-icon>
              <span class="ml-3">
                {{ $t('login.sign') }}
              </span>
            </v-card-title>


            <v-form>

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
                ></v-text-field>

              
              <!-- submit -->
              <v-btn
                color="primary"
                block
                large
                elevation="0"
                tile
                dark
                class="mr-4"
                @click="submit"
                >
                {{ $t('login.signBtn') }}
              </v-btn>

            </v-form>


            <v-container class="mt-4">
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

export default {

  data () {
    return {
      isLoading: false,
      showPwd: false,
      username: '',
      name: '',
      surname: '',
      email: '',
      password: '',
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

      let newUser = {
        username: this.username,
        name: this.name,
        surname: this.surname,
        email: this.email,
        locale: this.$i18n.locale,
        password: this.password,
      }
      this.log && console.log('C-sign > submit > newUser : ', newUser)

      axios
        .post(`${this.api.users}/`, newUser)
        .then(resp => {
          this.log && console.log('C-sign > submit > resp.data : ', resp.data)
          const userData = resp.data
          this.populateUser(userData)
          this.$router.push('/login')
        })
    }
  }
}

</script>
