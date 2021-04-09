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
                icon-log-out
              </v-icon>
              <span class="ml-3">
              {{ $t('login.out') }}
              </span>
            </v-card-title>

            <!-- submit -->
            <v-btn
              color="warning"
              block
              large
              elevation="0"
              tile
              dark
              class="mr-4"
              @click="submit"
              >

              <span v-if="!isLoading">
                {{ $t('login.out') }}
              </span>
              <span v-else>
                {{ $t('login.outMsg') }}
              </span>

            </v-btn>

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
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      // api: (state) => state.api
    })
  },
  methods: {
    ...mapActions({
      resetUser: 'user/resetUser',
    }),
    submit () {
      // this.log && console.log('C-login > submit > this.scopes : ', this.scopes)
      this.isLoading = true
      this.resetUser()
      this.isLoading = false
      this.$router.push('/')
    }
  }
}

</script>
