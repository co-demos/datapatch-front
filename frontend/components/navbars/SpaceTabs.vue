<template>
  <v-container class="mt-8">
    <v-row class="justify-center align-center">
      <v-col cols="9" class="offset-1">

        <v-tabs
          v-model="tab"
          centered
          color="grey"
          background-color="transparent"
          grow
          dense
          >
          <!-- icons-and-text -->
          <v-tabs-slider></v-tabs-slider>

          <v-tab
            v-for="space in items"
            :key="space.title"
            :to="space.to"
            >
            <span class="py-2 text-none">
              <v-icon small class="mr-3">
                {{ space.icon }}
              </v-icon>
              {{ $t(space.title) }}
            </span>
          </v-tab>

        </v-tabs>

        <!-- <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="i in 3"
            :key="i"
            :value="'tab-' + i"
            >
            <v-card flat>
              <v-card-text>{{ text }}</v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items> -->

      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  
  import { mapState, mapGetters } from 'vuex'

  export default {
    props: [
      'noTitle',
    ],
    watch: {
      isAuthenticated(next) {
        this.drawer = next ? true : false
      },
    },
    data () {
      return {
        tab: null,
        items: [
          {
            icon: 'icon-users',
            title: `pages.groups`,
            to: '/groups'
          },
          {
            icon: 'icon-apps',
            title: 'pages.workspaces',
            to: '/workspaces'
          },
          {
            icon: 'icon-user-plus',
            title: `pages.invitations`,
            to: '/invitations'
          },
        ],
      }
    },
    computed: {

      ...mapState({
        log: (state) =>  state.log
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
        currentDataset: 'datasets/getCurrentItem',
      })
    }
  }

</script>
