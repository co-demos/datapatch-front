<template>
  <v-container class="mt-12">
    <v-row class="justify-left align-center px-12">
      <v-col cols="11" class="offset-1 px-12">

        <v-tabs
          v-model="tab"
          centered
          color="grey"
          background-color="transparent"
          grow
          dense
          class="ml-9"
          icons-and-text
          >
          <v-tabs-slider></v-tabs-slider>

          <v-tab
            v-for="space in items"
            :key="space.title"
            :to="space.to"
            >
            <span class="text-none">
              {{ $t(space.title) }}
            </span>
            <v-icon small class="mb-2">
              {{ space.icon }}
            </v-icon>
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
            icon: 'icon-apps',
            title: 'pages.workspaces',
            to: '/workspaces'
          },
          {
            icon: 'icon-users',
            title: `pages.groups`,
            to: '/groups'
          },
          {
            icon: 'icon-user-plus',
            title: `pages.invitations`,
            to: '/invitations'
          },
          {
            icon: 'icon-mail',
            title: `pages.messages`,
            to: '/messages'
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
