<template>

  <v-container class="mt-5">

    <v-row
      fill-height
      class="justify-center align-center"
      >

      <v-col 
        cols="8"
        >

        <WorkspaceItem
          v-for="ws in myWorkspaces"
          :key="ws.id"
          :ws="ws"
        />

        <!-- ADD WORKSPACE -->
        <v-card
          class="mb-5 pb-5"
          flat
          >
          <v-btn 
            text
            rounded
            large 
            class="text-none pl-2 pr-4 text-h6 font-weight-bold" 
            color="grey"
            @click="createNewWorkspace()"
            >
            <span>
              <v-icon class="pb-1 mr-2">
                icon-plus-circle
              </v-icon>
              {{ $t('workspaces.addWorkspace') }}
            </span>
          </v-btn>
        </v-card>

      </v-col>
    </v-row>

  </v-container>

</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'
import { configHeaders } from '@/utils/utilsAxios'
// import { Workspace } from '@/utils/utilsWorkspaces'
// import { Dataset } from '@/utils/utilsDatasets'

export default {
  name: 'Workspaces',
  components: {
    WorkspaceItem: () => import(/* webpackChunkName: "WorkspaceItem" */ '@/components/data/WorkspaceItem.vue'),
  },
  data () {
    return {
      pathItems: [
        { 
          text: 'pages.workspaces',
          disabled: true,
          to: '/workspaces',
        }
      ],
      myWorkspaces: [
        {
          name: 'Workspace number 1',
          id: 'wp1',
          description : 'test WP 1',
          creationDate : '2021-04-13',
          // icon: 'icon-database',
          owner: 'userId1',
          datasets: [
            { name: 'some dataset', icon: false, color: 'secondary', id: 'ds1', creationDate : '2021-04-13', owner: 'userId1', description: 'descr...' },
            { name: 'another dataset', icon: false, color: 'primary', id: 'ds2', creationDate : '2021-04-13', owner: 'userId1', description: 'descr...' },
            { name: 'important data for me', icon: false, color: 'info', id: 'ds3', creationDate : '2021-04-13', owner: 'userId1', description: 'descr...' },
            { name: 'work in progress', icon: false, color: 'primary', id: 'ds4', creationDate : '2021-04-13', owner: 'userId1', description: 'descr...' },
          ]
        },
        {
          name: 'another workspace...',
          id: 'wp2',
          description : 'test WP 2',
          creationDate : '2021-04-13',
          // icon: 'icon-database',
          owner: 'userId1',
          datasets: [
            { name: 'dataset for test', icon: false, color: 'primary', id: 'ds5', creationDate : '2021-04-13', owner: 'userId1', description: 'descr...' },
          ]
        },
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
    createNewWorkspace() {
      this.log && console.log("P-Workspaces > createNewWorkspace ...")
    }
  }
}

</script>
