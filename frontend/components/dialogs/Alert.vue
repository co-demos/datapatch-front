<template>
  
  <div>

    <!-- alert : {{ alert }} <br> -->
    <!-- isAxiosResponse : {{ isAxiosResponse }} <br> -->
    <!-- axiosResponse: <code><pre>{{ axiosResponse }}</pre></code> -->

    <v-alert
      v-if="alert"
      v-model="alert"
      class="my-5"
      dense
      outlined
      :icon="getIcon()"
      :type="axiosResponse.type"
      :dismissible="dismissible"
      >
      <strong>
        error {{ axiosResponse.status }}
      </strong>
      - {{ axiosResponse.statusText }}
      <br>
      {{ axiosResponse.msg }}
    </v-alert>
  </div>


</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {

  name: 'Alert',
  props: [
    // 'alert',
    // 'msgType',
    // 'msgCode',
    // 'msg',
    'dismissible'
  ],
  watch: {
    isAxiosResponse(next, prev) {
      // this.log && console.log('C-Alert > w > isAxiosResponse > next : ', next)
      this.alert = next
    }
  },
  data () {
    return {
      alert: false,
      icons: {
        success: 'icon-check-square',
        info: 'icon-info-1',
        warning: 'icon-alert-circle',
        error: 'icon-alert-triangle',
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
      return this.icons[ this.msgTType ]
    },
  }

}
</script>
