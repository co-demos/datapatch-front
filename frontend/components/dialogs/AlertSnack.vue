<template>
  <div>
    <!-- alert : {{ alert }} <br> -->
    <!-- isAxiosResponse : {{ isAxiosResponse }} <br> -->
    <!-- axiosResponse: <code><pre>{{ axiosResponse }}</pre></code> -->
    
    <v-snackbar
      app
      v-model="alert"
      multi-line
      rounded
      :timeout="timeout"
      :color="axiosResponse.type"
      :class="`${position} ma-5`"
      >

      <strong>
        error {{ axiosResponse.status }}
      </strong>
      <br> {{ axiosResponse.statusText }}
      <br> {{ axiosResponse.msg }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          icon
          v-bind="attrs"
          @click="alert = false"
          >
          <!-- {{ $t('buttons.close') }} -->
          <v-icon>
            icon-clear
          </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'
export default {

  name: 'AlertSnack',
  props: [
    'onlyErrors',
    'position'
  ],
  data () {
    return {
      alert: false,
      timeout: 3000,
      icons: {
        success: 'icon-check-square',
        info: 'icon-info-1',
        warning: 'icon-alert-circle',
        error: 'icon-alert-triangle',
      }
    }
  },
  watch: {
    axiosResponse (next) {
      if (this.isAxiosResponse) {
        this.alert = this.onlyErrors ? next.type === 'error' : true
      }
    }
  },
  beforeMount() {
    this.alert = this.isAxiosResponse
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      axiosResponse: (state) => state.dialogs.axiosResponse
    }),
    ...mapGetters({
      isAxiosResponse: 'dialogs/isAxiosResponse',
    })
  },
  methods: {
    getIcon () {
      return this.icons[ this.msgType ]
    },
  }
}
</script>
