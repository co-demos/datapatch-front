<template>

  <v-container class="my-5">

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
            @click="dialog += 1"
            >
            <span>
              <v-icon class="pb-1 mr-2">
                icon-plus-circle
              </v-icon>
              {{ $t('workspaces.addWorkspace') }}
            </span>
          </v-btn>

          <!-- DIALOG FOR WORKSPACE INFOS -->
          <ModalItem
            :item="newWorkspace"
            :noAvatar="true"
            :itemModel="itemModel"
            :parentDialog="dialog"
            :itemType="'workspace'"
            :action="'create'"
          />

        </v-card>

      </v-col>
    </v-row>

  </v-container>

</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'
import { configHeaders } from '@/utils/utilsAxios'
import { Workspace } from '@/utils/utilsWorkspaces'

export default {
  name: 'Workspaces',
  components: {
    WorkspaceItem: () => import(/* webpackChunkName: "WorkspaceItem" */ '@/components/data/WorkspaceItem.vue'),
  },
  data () {
    return {
      dialog: 0,
      pathItems: [
        { 
          text: 'pages.workspaces',
          disabled: true,
          to: '/workspaces',
        }
      ],
      itemModel:  undefined,
      newWorkspace: undefined,
      myWorkspaces: [
        {
          name: 'default workspace...',
          id: 'wp0',
          description : 'test WP 2',
          creationDate : '2021-04-13',
          icon: 'icon-apps',
          color: 'black',
          owner: 'userId1',
          read: 'owner-only',
          write: 'owner-only',
          manage: 'owner-only',
          datasets: []
        },
        {
          name: 'Workspace without icon',
          id: 'wp1',
          description : 'test WP 1',
          creationDate : '2021-04-13',
          icon: undefined,
          owner: 'userId1',
          datasets: [
            { name: 'some dataset', icon: false, color: 'secondary', id: 'ds1', url: 'https://datapatch.io/datasets/ds1', creationDate : '2021-04-13', owner: 'userId1', description: 'descr...' },
            { name: 'another dataset', icon: false, color: 'primary', id: 'ds2', url: 'https://datapatch.io/datasets/ds2', creationDate : '2021-04-13', owner: 'userId1', description: 'descr...' },
            { name: 'important data for me', icon: false, color: 'info', id: 'ds3', url: 'https://datapatch.io/datasets/ds3', creationDate : '2021-04-13', owner: 'userId1', description: 'descr...' },
            { name: 'work in progress', icon: false, color: 'primary', id: 'ds4', url: 'https://datapatch.io/datasets/ds4', creationDate : '2021-04-13', owner: 'userId1', description: 'descr...' },
          ]
        },
        {
          name: 'another workspace...',
          id: 'wp2',
          description : 'test WP 2',
          creationDate : '2021-04-13',
          icon: 'icon-settings',
          color: 'primary',
          owner: 'userId1',
          datasets: [
            { name: 'dataset for test', icon: false, color: 'primary', id: 'ds5', url: 'https://datapatch.io/datasets/ds5', creationDate : '2021-04-13', owner: 'userId1', description: 'descr...' },
          ]
        },
      ],
    }
  },
  beforeMount () {
    this.updatePath(this.pathItems)
    let emptyWorkspace = new Workspace()
    this.newWorkspace = emptyWorkspace.data
    this.itemModel = {
      infos: emptyWorkspace.infos,
      auth: emptyWorkspace.auth,
      prefs: emptyWorkspace.prefs,
      // meta: emptyWorkspace.meta
    }
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
