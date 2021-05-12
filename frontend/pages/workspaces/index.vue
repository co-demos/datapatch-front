<template>

  <v-container class="mt-8 mb-12">

    <AlertSnack
      :position="'bottom'"
      :onlyErrors="true"
    />

    <v-row
      fill-height
      class="justify-center align-top"
      >

      <!-- <v-col cols="2" class=""> -->
        <!-- uxWorkspaces : <code><pre>{{ uxWorkspaces }}</pre></code><hr> -->
        <!-- myWorkspaces : <code><pre>{{ myWorkspaces }}</pre></code><hr> -->
        <!-- userDatasets.map : <code><pre>{{ userDatasets.map(ds => ds.id) }}</pre></code><hr> -->
      <!-- </v-col> -->

      <!-- existing datasets -->
      <!-- <v-col 
        cols="10"
        class="mb-5 px-7"
        >
        <v-row wrap align-center>
          <v-col
            v-for="ds in userDatasets"
            :key="ds.id"
            class="pt-0 dataset"
            cols="6"
            sm="12"
            md="6"
            lg="4"
            >
            <DatasetItem 
              :datasetId="ds.id"
              :action="'update'"
            />
          </v-col>
        </v-row>
      </v-col> -->

      <v-col 
        cols="10"
        class="offset-1"
        >

        <!-- workspace / draggable datasets -->
        <draggable
          v-model="myWorkspaces"
          v-bind="dragOptions"
          draggable=".workspace"
          group="workspaces"
          @start="drag=true"
          @end="drag=false; updateWorkspacePositions()"
          >
          <!-- <transition-group type="transition" :name="!drag ? 'flip-list' : null"> -->
          <WorkspaceItem
            v-for="ws in myWorkspaces"
            :key="ws.id"
            :workspace="ws"
            :apiUrl="apiUrl"
            :dragging="drag"
          />
          <!-- </transition-group> -->
        </draggable>
        
        <!-- ADD WORKSPACE -->
        <v-card
          class="mb-5 pb-5 pl-2"
          flat
          >

          <v-card-title v-if="! myWorkspaces.length">
            {{ $t('workspaces.defaultHelp') }}
          </v-card-title>

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
            :noAvatar="true"
            :itemModel="itemModel"
            :parentDialog="dialog"
            :itemType="itemType"
            :action="'create'"
            :apiUrl="apiUrl"
            @createItem="createWorkspace"
            @resetEmptyItem="resetEmptyWorkspace()"
          />
            <!-- :emptyItem="emptyWorkspace" -->

        </v-card>

      </v-col>
    </v-row>

  </v-container>

</template>

<script>

import { mapState, mapGetters, mapActions } from 'vuex'
import { Workspace } from '@/utils/utilsWorkspaces'
import { mapOrder } from '@/utils/utilsFunctions'

export default {
  name: 'Workspaces',
  components: {
    WorkspaceItem: () => import(/* webpackChunkName: "WorkspaceItem" */ '@/components/data/WorkspaceItem.vue'),
    DatasetItem: () => import(/* webpackChunkName: "DatasetItem" */ '@/components/data/DatasetItem.vue'),
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
      drag: false,
      pathItems: [
        { 
          text: 'pages.workspaces',
          disabled: true,
          to: '/workspaces',
        }
      ],
      itemType: 'workspaces',
      apiUrl: undefined,
      newWorkspace: undefined,
      emptyWorkspace: undefined,
      myWorkspaces: [],
    }
  },
  beforeMount () {
    this.updatePath(this.pathItems)
    this.orderWorkspaces()
    this.resetEmptyWorkspace()
    this.apiUrl = this.api[this.itemType]
  },
  watch: {
    userWorkspaces (next) {
      // this.log && console.log("P-Workspaces > watch > userWorkspaces > next : ", next)
      this.orderWorkspaces()
      // this.resetEmptyWorkspace()
      this.updateWorkspacePositions()
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "workspaces",
        disabled: false,
        ghostClass: "ghost"
      }
    },
    ...mapState({
      log: (state) => state.log,
      appTitle: (state) => state.appTitle,
      api: (state) => state.api,
      itemModel: (state) => state.workspaces.itemModel,
    }),
    ...mapGetters({
      isAuthenticated: 'user/isAuthenticated',
      userId: 'user/userId',
      uxWorkspaces: 'workspaces/getUserUx',
      userWorkspaces: 'workspaces/getUserItems',
      sharedWorkspaces: 'workspaces/getSharedItems',
      userDatasets: 'datasets/getUserItems',
      sharedDatasets: 'datasets/getSharedItems',
      headerUser: 'user/headerUser'
    })
  },
  methods: {
    ...mapActions({
      updatePath: 'updateCrumbsPath',
    }),
    orderWorkspaces() {
      if (this.uxWorkspaces && this.uxWorkspaces.workspaces_order) {
        const workspaces_order = this.uxWorkspaces.workspaces_order
        this.myWorkspaces = mapOrder( [...this.userWorkspaces], workspaces_order, 'id')
      } else {
      // this.myWorkspaces =[ ...this.userWorkspaces, ...this.myWorkspacesDummies ]
        this.myWorkspaces = [...this.userWorkspaces]
      }
    },
    resetEmptyWorkspace() {
      let emptyWorkspace = new Workspace(
        this.userId,
        this.$t('workspaces.defaultTitle'),
        this.$t('workspaces.defaultDescription'),
      )
      // emptyWorkspace.randomBasics = true
      this.emptyWorkspace = emptyWorkspace.data
      this.newWorkspace = emptyWorkspace.data
    },
    createWorkspace(itemPayload) {
      // this.log && console.log("\nP-Workspaces > createWorkspace > itemPayload : ", itemPayload)
      // let now = new Date(Date.now())
      this.$axios
        .post(`${this.api.workspaces}/`, itemPayload, this.headerUser)
        .then(resp => {
          this.$store.dispatch(`workspaces/appendUserItem`, resp.data)
          this.resetEmptyWorkspace()
        })
    },
    updateWorkspacePositions() {
      // this.log && console.log("\nP-Workspaces > updateWorkspacePositions > this.myWorkspaces : ", this.myWorkspaces)
      let wsIndexes = this.myWorkspaces.map(ws => ws.id)
      let payloadUser = {
        ux_workspaces: {
          workspaces_order: wsIndexes
        }
      }
      // this.log && console.log("P-Workspaces > updateWorkspacePositions > wsIndexes : ", wsIndexes)
      this.$axios
        .put(`${this.api.users}/me/ux`, payloadUser, this.headerUser)
        .then(resp => {
          // this.log && console.log('P-Workspaces > updateWorkspacePositions > resp.data : ', resp.data)
          this.$store.dispatch('workspaces/populateUserUX', resp.data.ux_workspaces)
        })
    }
  }
}

</script>
