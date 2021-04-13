<template>

  <v-container class="mt-5">

    <v-row
      fill-height
      class="justify-center align-center"
      >

      <v-col 
        cols="8"
        >

        <v-card
          class="mb-5 pb-5"
          v-for="ws in myWorkspaces"
          :key="ws.id"
          flat
          >

          <!-- my workspaces / toolbar -->
          <v-toolbar
            class="mb-5"
            dense
            flat
            >

            <v-toolbar-title class="text-h6 pl-0 font-weight-bold">
              {{ ws.name }}
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

          <!-- my workspaces / data -->
          <draggable
            v-model="ws.datasets"
            draggable=".dataset"
            class="row wrap"
            group="dataset"
            @start="drag=true"
            @end="drag=false"
            >
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
              />
            </v-col>
            <v-col
              class="mb-3"
              cols="4"
              sm="4"
              md="3"
              lg="2"
              >
              <DatasetItem 
                :item="newDataset"
              />
            </v-col>
          </draggable>

          <v-divider class="mt-5"/>
  
        </v-card>


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
import { Workspace } from '@/utils/utilsWorkspaces'
import { Dataset } from '@/utils/utilsDatasets'

export default {
  name: 'Workspaces',
  components: {
    DatasetItem: () => import(/* webpackChunkName: "DatasetItem" */ '@/components/data/DatasetItem.vue'),
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
      workspaceButtonsAfterTitle: [
        { title: 'workspaces.prefsWorkspace', icon: 'icon-settings', menu: [] },
      ],
      workspaceButtonsEnd: [
        // { title: 'workspaces.addDataset', icon: 'icon-plus', left: true, menu: [] },
        { title: 'workspaces.searchDataset', icon: 'icon-search1', left: true, menu: [] },
      ],
      itemsSettings: [
        { title: 'workspaces.renameWorkspace', icon: 'icon-edit-3', function: 'editWorkspace' },
        { title: 'workspaces.editWorkspace', icon: 'icon-hash', function: 'editWorkspace' },
      ],
      itemsShare: [
        { title: 'workspaces.inviteWorkspace', icon: 'icon-user-plus', menu: [] },
      ],
      itemsDelete: [
        { title: 'workspaces.deleteWorkspace', icon: 'icon-trash-2', function: 'deleteWorkspace' },
      ],
      myWorkspaces: [
        {
          name: 'Workspace number 1',
          id: 'wp1',
          description : 'test WP 1',
          creationDate : '2021-04-13',
          icon: 'icon-database',
          owner: 'userId1',
          datasets: [
            { name: 'some dataset', color: 'secondary', id: 'ds1', creationDate : '2021-04-13', owner: 'userId1', description: 'descr...' },
            { name: 'another dataset', color: 'primary', id: 'ds2', creationDate : '2021-04-13', owner: 'userId1', description: 'descr...' },
            { name: 'important data for me', color: 'info', id: 'ds3', creationDate : '2021-04-13', owner: 'userId1', description: 'descr...' },
            { name: 'work in progress', color: 'primary', id: 'ds4', creationDate : '2021-04-13', owner: 'userId1', description: 'descr...' },
          ]
        },
        {
          name: 'another workspace...',
          id: 'wp2',
          description : 'test WP 2',
          creationDate : '2021-04-13',
          icon: 'icon-database',
          owner: 'userId1',
          datasets: [
            { name: 'dataset for test', color: 'primary', id: 'ds5', creationDate : '2021-04-13', owner: 'userId1', description: 'descr...' },
          ]
        },
      ],
      newDataset: {
        addBtn: true,
        owner: undefined,
        name: 'datasets.newDataset',
        id: 'new',
        description: 'new dataset description',
        creationDate: undefined,
        icon: 'icon-database',
        tables: []
      },
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
