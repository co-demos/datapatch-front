<style>
.ws-normal {
  border: thin solid white !important;
}
.ws-active {
  border: thin solid silver !important;
}
.new-item  {
  min-height: 70px;
}
</style>

<template>

  <v-card
    :class="`mb-12 px-3 pt-2 pb-3 workspace ${dragging ? 'ws-active' : 'ws-normal'}`"
    flat
    min-height="140"
    >
    <!-- @mouseover="hover = true"
    @mouseleave="hover = false" -->

    <!-- <v-row>
      <code><pre>{{ ws }}</pre></code>  
    </v-row> -->

    <!-- workspace / toolbar -->
    <v-toolbar
      class="mb-9 mx-n1"
      dense
      flat
      >
      
      <v-toolbar-title class="text-h6 px-0 font-weight-bold">
        <v-icon 
          v-if="ws.icon"
          :color="ws.color || 'black'"
          class="pb-1 mr-4"
          >
          {{ ws.icon}}
        </v-icon>
        <span :class="`${ws.color || 'black'}--text`">
          <!-- ws.id: {{ ws.id }} -  -->
          {{ ws.title }}
        </span>
      </v-toolbar-title>

      <v-menu
        v-for="btn in workspaceButtonsAfterTitle"
        :key="btn.icon"
        bottom
        open-on-hover
        >
        <template v-slot:activator="{ on: onMenu, attrs: attrsMenu }">
          <v-btn 
            icon
            x-small
            class="ml-4"
            v-bind="{...attrsMenu}"
            v-on="{...onMenu}"
            @click.stop="dialog += 1"
           >
            <v-icon small>
              {{ btn.icon}}
            </v-icon>
          </v-btn>
        </template>

        <!-- <MenuList
          :items="itemsSettings"
          :itemType="itemType"
          :apiUrl="apiUrl"
          :action="'update'"
        /> -->

        <v-list dense>
        
          <v-subheader class="pa-5">
            {{ $t('buttons.options') }}
          </v-subheader>

          <v-list-item
            @click.stop="dialog += 1"
            >
            <v-list-item-action>
              <v-icon small>
                icon-hash
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('workspaces.editWorkspace') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider/>

          <v-list-item
            disabled
            @click.stop="shareWorkspace()"
            >
            <v-list-item-action>
              <v-icon small>
                icon-user-plus
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('workspaces.inviteWorkspace') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider/>

          <v-list-item
            @click.stop="deleteWorkspace()"
            >
            <v-list-item-action>
              <v-icon small>
                icon-trash-2
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('workspaces.deleteWorkspace') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>

      </v-menu>


      <!-- DIALOG FOR WORKSPACE INFOS -->
      <ModalItem
        :item="ws"
        :noAvatar="true"
        :itemModel="itemModel"
        :parentDialog="dialog"
        :itemType="itemType"
        :apiUrl="apiUrl"
        :action="'update'"
      />

      <v-spacer/>

      <v-tooltip 
        v-for="btn in workspaceButtonsEnd"
        :key="btn.icon"
        :left="btn.left" 
        :bottom="btn.bottom" 
        :right="btn.right" 
        :top="btn.top" 
        >
        <template v-slot:activator="{ on, attrs }">
          <v-btn 
            icon
            small
            class="pl-2 pr-2 mr-n2"
            v-bind="attrs"
            v-on="on"
            >
            <v-icon small>
              {{ btn.icon}}
            </v-icon>
          </v-btn>
        </template>
        <span>{{ $t(btn.title) }}</span>
      </v-tooltip>

    </v-toolbar>

    <!-- DEBUGGING -->
    <v-row class="">
      datasets: <code>{{ datasets }}</code>
    </v-row>
    <v-row class="mb-8">
      ws.datasets: <code>{{ ws.datasets }}</code>
      <!-- <code>{{ hasDatasets }}</code> -->
    </v-row>
    
    <!-- existing datasets / draggable datasets -->
      
    <draggable
      v-model="datasets"
      v-bind="dragOptions"
      draggable=".dataset"
      group="datasets"
      class="row wrap align-center"
      @start="drag=true"
      @end="drag=false"
      >
      <v-col
        v-for="dsId in datasets"
        :key="`ds-${dsId}`"
        class="pt-0 dataset"
        cols="6"
        sm="12"
        md="6"
        lg="4"
        >
        <!-- <code>{{ dsId }}</code> -->
        <DatasetItem 
          :datasetId="dsId"
          :fromWorkspace="ws.id"
          :action="'update'"
        />
      </v-col>
      <v-col
        class="pt-0 pl-4 pb-2 new-item"
        cols="6"
        sm="12"
        md="6"
        lg="4"
        >
        <DatasetItem 
          :dataset="emptyDataset"
          :fromWorkspace="ws.id"
          :emptyItem="emptyDataset"
          :action="'create'"
          :isAlone="!hasDatasets"
        />
          <!-- :isAlone="true" -->
      </v-col>

    </draggable>

    <!-- create new dataset -->
    <!-- <v-row wrap align-center>
      <v-col
        class="pb-0 pt-2 new-item"
        cols="6"
        sm="12"
        md="6"
        lg="4"
        >
        <DatasetItem 
          :dataset="emptyDataset"
          :fromWorkspace="ws.id"
          :emptyItem="emptyDataset"
          :action="'create'"
          :isAlone="!hasDatasets"
        />
      </v-col> -->

    </v-row>

  </v-card>
</template>


<script>

import { mapState, mapGetters, mapActions } from 'vuex'
import { configHeaders } from '@/utils/utilsAxios'
import { Workspace } from '@/utils/utilsWorkspaces'
import { Dataset } from '@/utils/utilsDatasets'

export default {

  name: 'WorkspaceItem',
  components: {
    DatasetItem: () => import(/* webpackChunkName: "DatasetItem" */ '@/components/data/DatasetItem.vue'),
  },
  props: [
    'workspace',
    'apiUrl',
    'dragging'
  ],
  data () {
    return {
      dialog: 0,
      hover: false,
      drag: false,
      itemType: 'workspaces',

      itemModel:  undefined,
      ws: this.workspace,
      hasDatasets: false,
      datasets: [],

      workspaceButtonsAfterTitle: [
        { 
          title: 'workspaces.prefsWorkspace', 
          icon: 'icon-more-vertical', 
          menu: [] 
        },
      ],
      workspaceButtonsEnd: [
        { 
          title: 'workspaces.searchDataset', 
          icon: 'icon-search1', 
          left: true, menu: []
        },
      ],

      emptyDataset: undefined,
    }
  },
  watch: {
    workspace(next) {
      this.log && console.log("C-WorkspaceItem > watch > workspace ...")
      this.ws = { ...next }
      this.getDatasets(next)
    },
    datasets(next, prev) {
      this.log && console.log("C-WorkspaceItem > watch > datasets > next : ", next)
      this.log && console.log("C-WorkspaceItem > watch > datasets > prev : ", prev)
      this.ws.datasets = { ids: next }
      this.updateDatasetsPositions()
    }
  },
  beforeMount () {
    // this.log && console.log('C-WorkspaceItem > beforeMount > this.apiUrl :' , this.apiUrl)
    // this.log && console.log('C-WorkspaceItem > beforeMount > this.workspace :' , this.workspace)
    this.ws = { ...this.workspace }
    // this.log && console.log('\nC-WorkspaceItem > beforeMount > this.ws :' , this.ws)
    this.getDatasets(this.workspace)
    let emptyWorkspace = new Workspace()
    this.itemModel = {
      infos: emptyWorkspace.infos,
      auth: emptyWorkspace.auth,
      prefs: emptyWorkspace.prefs,
      meta: emptyWorkspace.meta
    }
    this.resetEmptyDataset()
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "datasets",
        disabled: false,
        ghostClass: "ghost"
      }
    },
    ...mapState({
      log: (state) => state.log,
      api: (state) => state.api,
    }),
    ...mapGetters({
      userId: 'user/userId',
      uxWorkspaces: 'workspaces/getUserUx',
      userDatasets: 'datasets/getUserItems',
      headerUser: 'user/headerUser'
    })
  },
  methods: {
    getDatasets(ws) {
      // this.log && console.log('C-WorkspaceItem > getDatasets > this.ws.datasets :' , this.ws.datasets)
      this.hasDatasets = Boolean(ws.datasets && ws.datasets.ids)
      // this.log && console.log('C-WorkspaceItem > getDatasets > this.hasDatasets :' , this.hasDatasets)
      let datasets = this.hasDatasets ? ws.datasets.ids : []
      // avoid duplicates
      datasets = [ ...new Set(datasets) ]
      this.log && console.log('\nC-WorkspaceItem > getDatasets > datasets :' , datasets)
      // check if exists 
      let existingDatasets = this.userDatasets.map(dsIn => dsIn.id)
      // this.log && console.log('C-WorkspaceItem > getDatasets > existingDatasets :' , existingDatasets)
      
      let datasetsIn = datasets.filter( dsId => existingDatasets.includes(dsId) )
      this.log && console.log('C-WorkspaceItem > getDatasets > datasetsIn :' , datasetsIn)

      this.datasets = [ ...new Set(datasetsIn) ]
    },
    resetEmptyDataset() {
      let emptyDataset = new Dataset(this.userId, this.$t('datasets.defaultTitle'), this.$t('datasets.defaultDescription'))
      this.emptyDataset = emptyDataset.data
    },
    shareWorkspace() {
      // TO DO
      this.log && console.log("C-WorkspaceItem > shareWorkspace > this.headerUser :", this.headerUser)
      this.log && console.log("C-WorkspaceItem > shareWorkspace > this.ws :", this.ws)
      // this.$axios
      //   .put(`${this.apiUrl}/${this.ws.id}/share`, this.ws, this.headerUser)
      //   .then(resp => {
      //     this.log && console.log('C-WorkspaceItem > updateUserLoc > resp.data : ', resp.data)
      //   })
    },
    updateDatasetsPositions() {
      // this.log && console.log("\nC-WorkspaceItem > updateDatasetsPositions > this.datasets : ", this.datasets)
      let payloadWs = { ...this.ws }
      payloadWs.datasets = {
        ids: [ ...new Set(this.datasets) ]
      }
      // this.log && console.log('C-WorkspaceItem > updateDatasetsPositions > payloadWs : ', payloadWs)
      this.$axios
        .put(`${this.api.workspaces}/${this.ws.id}`, payloadWs, this.headerUser)
        .then( resp => {
          this.log && console.log('C-WorkspaceItem > updateDatasetsPositions > resp.data : ', resp.data)
          // this.$store.dispatch(`workspaces/updateUserItem`, resp.data)
        })
    },
    deleteWorkspace() {
      // this.log && console.log("C-WorkspaceItem > deleteWorkspace > this.headerUser :", this.headerUser)
      this.$axios
        .delete(`${this.apiUrl}/${this.ws.id}`, this.headerUser)
        .then(resp => {
          // this.log && console.log('C-WorkspaceItem > deleteWorkspace > resp.data : ', resp.data)
          this.$store.dispatch(`${this.itemType}/removeUserItem`, resp.data)
          
          // delete workspace from user's ux preferences
          let payloadUser = {
            ux_workspaces: {
              workspaces_order: this.uxWorkspaces.workspaces_order.filter(dsId => dsId !== this.ws.id)
            }
          }
          this.$axios
            .put(`${this.api.users}/me/ux`, payloadUser, this.headerUser)
            .then(resp => {
              // this.log && console.log('C-WorkspaceItem > deleteWorkspace > resp.data : ', resp.data)
              this.$store.dispatch('workspaces/populateUserUX', resp.data.ux_workspaces)
            })
        })
    }
  }

}
</script>
