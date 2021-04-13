<template>

  <v-container class="mt-5">

    <v-row
      fill-height
      class="justify-center align-center"
      >

      <v-col 
        cols="10"
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

            <v-tooltip right v-for="btn in workspaceButtonsAfterTitle" :key="btn.icon">
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
              <span>{{ $t(btn.textCode) }}</span>
            </v-tooltip>

            <v-spacer></v-spacer>

            <v-tooltip bottom v-for="btn in workspaceButtonsEnd" :key="btn.icon">
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
              <span>{{ $t(btn.textCode) }}</span>
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
      singleExpand: false,
      workspaceButtonsAfterTitle: [
        { textCode: 'workspaces.prefsWorkspace', icon: 'icon-more-vertical', menu: [] },
      ],
      workspaceButtonsEnd: [
        { textCode: 'workspaces.addDataset', icon: 'icon-plus', menu: [] },
        { textCode: 'workspaces.searchDataset', icon: 'icon-search1', menu: [] },
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
            { name: 'dataset 2', color: 'primary', id: 'ds2', creationDate : '2021-04-13', owner: 'userId1', description: 'descr...' },
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
    })
  }
}

</script>
