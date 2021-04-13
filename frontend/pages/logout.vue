<template>
    <v-container 
      fill-height
      class="mt-5"
      >

      <v-row
        fill-height
        class="justify-center align-center mt-5"
        >

        <v-col 
          cols="4"
          class="mt-5"
          >
          
          <v-card 
            elevation="0"
            class="pa-5">

            <v-card-title class="justify-center mb-3 px-0">
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
              rounded
              large
              elevation="0"
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

import { mapState, mapActions } from 'vuex'

export default {

  name: 'Logout',
  data () {
    return {
      pathItems: [
        { 
          text: 'login.out',
          disabled: true,
        }
      ],
      isLoading: false,
      showPwd: false,
    }
  },
  beforeMount () {
    this.updatePath(this.pathItems)
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
    })
  },
  methods: {
    ...mapActions({
      updatePath: 'updateCrumbsPath',
      resetUser: 'user/resetUser',
    }),
    submit () {
      // this.log && console.log('P-Logout > submit > this.scopes : ', this.scopes)
      this.isLoading = true
      this.resetUser()
      this.$cookies.remove('access_token')
      this.$cookies.remove('refresh_token')
      this.isLoading = false
      this.$router.push('/')
    }
  }
}

</script>
