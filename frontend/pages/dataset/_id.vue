<template>

  <v-container class="my-5">

    dataset page for <code>{{ dsId }}</code>

  </v-container>

</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'
import { configHeaders } from '@/utils/utilsAxios'

export default {
  name: 'Dataset',
  layout: 'dataset',
  components: {
  },
  data () {
    return {
      dialog: 0,
      dsId: this.$route.params.id,
      pathItems: [
        { 
          text: 'pages.workspaces',
          disabled: false,
          to: '/workspaces',
        },
        { 
          text: 'pages.dataset',
          disabled: true,
          to: '/dataset',
        },
        { 
          text: `${this.$route.params.id}`,
          noTranslate: true,
          disabled: true,
          to: `/dataset/${this.$route.params.id}`,
        }
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
    }),
    ...mapGetters({
      isAuthenticated: 'user/isAuthenticated'
    })
  },
  methods: {
    ...mapActions({
      updatePath: 'updateCrumbsPath',
    }),
  }

}

</script>
