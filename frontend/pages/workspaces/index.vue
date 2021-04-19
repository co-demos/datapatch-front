<template>

  <v-container class="mt-8 mb-12">

    <v-row
      fill-height
      class="justify-center align-center"
      >

      <v-col 
        cols="8"
        class="offset-2"
        >

        <!-- workspace / draggable datasets -->
        <draggable
          v-model="myWorkspaces"
          draggable=".workspace"
          group="workspace"
          @start="drag=true"
          @end="drag=false"
          >
          <WorkspaceItem
            v-for="ws in myWorkspaces"
            :key="ws.id"
            :workspace="ws"
            :apiUrl="apiUrl"
          />
        </draggable>

        <!-- ADD WORKSPACE -->
        <v-card
          class="mb-5 pb-5 pl-2"
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

          <!-- DIALOG FOR NEW WORKSPACE INFOS -->
          <ModalItem
            :item="newWorkspace"
            :emptyItem="emptyWorkspace"
            :noAvatar="true"
            :itemModel="itemModel"
            :parentDialog="dialog"
            :itemType="itemType"
            :action="'create'"
            :apiUrl="apiUrl"
          />

        </v-card>

      </v-col>
    </v-row>

  </v-container>

</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'
import { Workspace } from '@/utils/utilsWorkspaces'

export default {
  name: 'Workspaces',
  components: {
    WorkspaceItem: () => import(/* webpackChunkName: "WorkspaceItem" */ '@/components/data/WorkspaceItem.vue'),
  },
  head() {
    return {
      title: `${this.appTitle} - ${this.$t('pages.workspaces')}`,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
    }
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
      itemType: 'workspaces',
      itemModel: undefined,
      apiUrl: undefined,
      newWorkspace: undefined,
      emptyWorkspace: undefined,
      myWorkspaces: [],
      myWorkspacesDummies: [
        // {
        //   title: 'default workspace...',
        //   id: 'wp0',
        //   description : 'test WP 2',
        //   creationDate : '2021-04-13',
        //   icon: 'icon-apps',
        //   color: 'black',
        //   owner: 'userId1',
        //   read: 'owner-only',
        //   write: 'owner-only',
        //   manage: 'owner-only',
        //   datasets: []
        // },
        {
          title: 'Workspace without icon',
          id: 'wp1',
          description : 'test WP 1',
          creationDate : '2021-04-13',
          icon: undefined,
          owner: 1,
          datasets: [
            { title: 'Some dataset', icon: false, color: 'secondary', id: 1, url: 'https://datapatch.io/datasets/ds1', creationDate : '2021-04-13', owner_id: 1, description: 'descr...' },
            { title: 'Another dataset', icon: false, color: 'primary', id: 2, url: 'https://datapatch.io/datasets/ds2', creationDate : '2021-04-13', owner_id: 1, description: 'descr...' },
            { title: 'Important data for me and a very long text...', icon: 'icon-star', color: 'info', id: 3, url: 'https://datapatch.io/datasets/ds3', creationDate : '2021-04-13', owner_id: 1, description: 'descr...' },
            { title: 'work in progress', icon: false, color: 'primary', id: 4, url: 'https://datapatch.io/datasets/ds4', creationDate : '2021-04-13', owner_id: 1, description: 'descr...' },
          ]
        },
        {
          title: 'another workspace...',
          id: 'wp2',
          description : 'test WP 2',
          creationDate : '2021-04-13',
          icon: 'icon-settings',
          color: 'primary',
          owner: 1,
          datasets: [
            { title: 'dataset for test', icon: false, color: 'primary', id: 5, url: 'https://datapatch.io/datasets/ds5', creationDate : '2021-04-13', owner_id: 1, description: 'descr...' },
          ]
        },
      ],
    }
  },
  beforeMount () {
    this.updatePath(this.pathItems)
    this.myWorkspaces =[ ...this.userWorkspaces, ...this.myWorkspacesDummies ]
    this.log && console.log("P-Workspaces > beforeMount > this.userId : ", this.userId)
    this.log && console.log("P-Workspaces > beforeMount > this.userWorkspaces : ", this.userWorkspaces)
    // this.myWorkspaces = [ ...this.userWorkspaces , ...this.myWorkspacesDummies]
    this.resetEmptyWorkspace()
    this.apiUrl = this.api[this.itemType]
  },
  watch: {
    userWorkspaces (next) {
      this.log && console.log("P-Workspaces > watch > userWorkspaces ...")
      this.myWorkspaces =[ ...this.userWorkspaces, ...this.myWorkspacesDummies ]
      this.resetEmptyWorkspace()
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      appTitle: (state) => state.appTitle,
      api: (state) => state.api,
    }),
    ...mapGetters({
      isAuthenticated: 'user/isAuthenticated',
      userId: 'user/userId',
      userWorkspaces: 'workspaces/getUserItems',
      sharedWorkspaces: 'workspaces/getSharedItems',
    })
  },
  methods: {
    ...mapActions({
      updatePath: 'updateCrumbsPath',
    }),
    resetEmptyWorkspace() {
      let emptyWorkspace = new Workspace(this.userId, this.$t('workspaces.defaultTitle'), this.$t('workspaces.defaultDescription'))
      this.emptyWorkspace = emptyWorkspace.data
      this.newWorkspace = emptyWorkspace.data
      this.itemModel = {
        infos: emptyWorkspace.infos,
        auth: emptyWorkspace.auth,
        prefs: emptyWorkspace.prefs,
        // meta: emptyWorkspace.meta
      }
    }
  }
}

</script>
