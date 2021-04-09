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
                icon-alert-triangle
              </v-icon>
              <span class="ml-3">
              {{ $t('login.forgotpwd') }}
              </span>
            </v-card-title>


            <v-form>

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

export default {

  data () {
    return {
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
