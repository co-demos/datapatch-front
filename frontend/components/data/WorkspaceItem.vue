<template>

  <v-card
    class="mb-5 pb-5"
    flat
    >

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
          {{ ws.name }}
        </span>
      </v-toolbar-title>

      <v-menu
        v-for="btn in workspaceButtonsAfterTitle"
        :key="btn.icon"
        right
        offset-x
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
            <v-icon>{{ btn.icon}}</v-icon>
          </v-btn>
        </template>
        <MenuList
          :items="itemsSettings"
        />
        <v-divider class="bg-white"/>
        <MenuList
          :items="itemsShare"
        />
        <v-divider class="bg-white"/>
        <MenuList
          :items="itemsDelete"
        />
      </v-menu>

      <!-- DIALOG FOR WORKSPACE INFOS -->
      <ModalItem
        :item="ws"
        :noAvatar="true"
        :itemModel="itemModel"
        :parentDialog="dialog"
        :itemType="'workspace'"
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
            <v-icon>{{ btn.icon}}</v-icon>
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
        class="mb-3 dataset"
        cols="4"
        sm="4"
        md="3"
        lg="2"
        >
        <DatasetItem 
          :item="item"
          :action="'update'"
        />
      </v-col>

      <!-- create new dataset -->
      <v-col
        class="mb-3"
        cols="4"
        sm="4"
        md="3"
        lg="2"
        >
        <DatasetItem 
          :item="emptyDataset"
          :action="'create'"
        />
      </v-col>
    </draggable>

    <v-divider class="mt-5"/>

  </v-card>
</template>


<script>

import { mapState } from 'vuex'
import { Workspace } from '@/utils/utilsWorkspaces'
import { Dataset } from '@/utils/utilsDatasets'

export default {

  name: 'WorkspaceItem',
  components: {
    DatasetItem: () => import(/* webpackChunkName: "DatasetItem" */ '@/components/data/DatasetItem.vue'),
  },
  props: [
    'ws',
  ],
  data () {
    return {
      dialog: 0,
      itemModel:  undefined,
      workspaceButtonsAfterTitle: [
        { title: 'workspaces.prefsWorkspace', icon: 'icon-more-vertical', menu: [] },
      ],
      workspaceButtonsEnd: [
        { title: 'workspaces.searchDataset', icon: 'icon-search1', left: true, menu: [] },
      ],
      itemsSettings: [
        // { title: 'workspaces.renameWorkspace', icon: 'icon-edit-3', function: 'editWorkspace' },
        { title: 'workspaces.editWorkspace', icon: 'icon-hash', function: 'editWorkspace' },
      ],
      itemsShare: [
        { title: 'workspaces.inviteWorkspace', icon: 'icon-user-plus', menu: [] },
      ],
      itemsDelete: [
        { title: 'workspaces.deleteWorkspace', icon: 'icon-trash-2', function: 'deleteWorkspace' },
      ],
      emptyDataset: undefined,
      // newDataset: {
      //   addBtn: true,
      //   owner: undefined,
      //   name: 'datasets.newDataset',
      //   id: 'new',
      //   description: 'new dataset description',
      //   creationDate: undefined,
      //   icon: 'icon-database',
      //   tables: []
      // },
    }
  },
  beforeMount () {
    let emptyWorkspace = new Workspace()
    this.itemModel = {
      infos: emptyWorkspace.infos,
      auth: emptyWorkspace.auth,
      prefs: emptyWorkspace.prefs,
      meta: emptyWorkspace.meta
    }
    let emptyDataset = new Dataset()
    this.emptyDataset = emptyDataset.data
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      api: (state) => state.api,
    })
  },
  methods: {
  }

}
</script>
