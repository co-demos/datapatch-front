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

              <v-text-field
                v-model="name"
                outlined
                single-line
                clearable
                :label="$t('login.formName')"
                :placeholder="$t('login.formName')"
                prepend-inner-icon="icon-user"
                ></v-text-field>

              <v-text-field
                v-model="surname"
                outlined
                single-line
                clearable
                :label="$t('login.formSurname')"
                :placeholder="$t('login.formSurname')"
                prepend-inner-icon="icon-user"
                ></v-text-field>

              <!-- email -->
              <v-text-field
                v-model="email"
                outlined
                single-line
                clearable
                :label="$t('login.formEmailLabel')"
                :placeholder="$t('login.formEmail')"
                prepend-inner-icon="icon-mail"
                ></v-text-field>

              <!-- password -->
              <v-text-field
                v-model="password"
                outlined
                single-line
                clearable
                type="password"
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
                {{ $t('login.in') }}
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

import { mapState, mapGetters } from 'vuex'
import 'axios'

export default {

  data () {
    return {
      password: '',
      name: '',
      surname: '',
      email: '',
    }
  },
  computed: {
    ...mapState({
      api: (state) => state.api
    })
  },
  methods: {
    submit () {

    }
  }
}

</script>
