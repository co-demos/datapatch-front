<template>

  <v-card
    class="mb-5 pb-5 workspace"
    flat
    >

    <!-- <v-row>
      <code><pre>{{ ws }}</pre></code>  
    </v-row> -->

    <!-- workspace / toolbar -->
    <v-toolbar
      class="mb-5"
      dense
      flat
      >
      
      <v-toolbar-title class="text-h6 pl-0 font-weight-bold">
        <v-icon 
          v-if="ws.icon"
          :color="ws.color || 'black'"
          class="pb-1 mr-4"
          >
          {{ ws.icon}}
        </v-icon>
        <span :class="`${ws.color || 'black'}--text`">
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

      <v-spacer></v-spacer>

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
            class="ml-2"
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

    <br/>

    <!-- DEBUGGING -->
    <!-- 
    <v-row>
      <code>{{ ws.datasets.map( ds => ds.id ) }}</code>
    </v-row>
    -->

    <!-- workspace / draggable datasets -->
    <draggable
      v-model="ws.datasets"
      draggable=".dataset"
      class="row wrap"
      group="dataset"
      @start="drag=true"
      @end="drag=false"
      >

      <!-- existing datasets -->
      <v-col
        v-for="item in ws.datasets"
        :key="item.id"
        class=" dataset"
        cols="6"
        sm="12"
        md="6"
        lg="4"
        >
        <DatasetItem 
          :dataset="item"
          :action="'update'"
        />
      </v-col>

      <!-- create new dataset -->
      <v-col
        class=""
        cols="6"
        sm="12"
        md="6"
        lg="4"
        >
        <DatasetItem 
          :dataset="emptyDataset"
          :emptyItem="emptyDataset"
          :action="'create'"
          :isAlone="!ws.datasets.length"
        />
      </v-col>
    </draggable>

    <br/>

    <v-divider class="mt-5"/>

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
    'apiUrl'
  ],
  data () {
    return {
      dialog: 0,
      itemType: 'workspaces',

      itemModel:  undefined,
      ws: this.workspace,

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
    }
  },
  beforeMount () {
    // this.log && console.log('C-WorkspaceItem > beforeMount > this.apiUrl :' , this.apiUrl)
    // this.log && console.log('C-WorkspaceItem > beforeMount > this.workspace :' , this.workspace)
    this.ws = { ...this.workspace }
    // this.ws = this.workspace
    // this.log && console.log('C-WorkspaceItem > beforeMount > this.ws :' , this.ws)
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
    ...mapState({
      log: (state) => state.log,
      api: (state) => state.api,
    }),
    ...mapGetters({
      userId: 'user/userId',
      headerUser: 'user/headerUser'
    })
  },
  methods: {
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
    deleteWorkspace() {
      this.log && console.log("C-WorkspaceItem > deleteWorkspace > this.headerUser :", this.headerUser)
      this.$axios
        .delete(`${this.apiUrl}/${this.ws.id}`, this.headerUser)
        .then(resp => {
          this.log && console.log('C-WorkspaceItem > deleteWorkspace > resp.data : ', resp.data)
          this.$store.dispatch(`${this.itemType}/removeUserItem`, resp.data)
        })
    },
  }

}
</script>
