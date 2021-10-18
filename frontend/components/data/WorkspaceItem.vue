<style scoped>
  .workspace {
    border-radius: 10px !important;
  }
  .ws-normal {
    border: thin solid white !important;
  }
  .ws-active {
    border: thin solid silver !important;
  }
  .new-item  {
    /* min-height: 70px; */
  }
</style>

<template>

  <v-scale-transition>
    <v-card
      :class="`WorkspaceItem workspace mb-8 pl-3 pr-6 pt-2 pb-6 white ${dragging ? 'ws-active' : 'ws-normal'} elevation-1`"
      flat
      min-height="140"
      v-show="canShow"
      >
      <!-- @mouseover="hover = true"
      @mouseleave="hover = false" -->

      <!-- DEBUGGING -->
      <v-row v-if="false">
        <v-col cols="2">
          id : <code>{{ ws.id }}</code>
        </v-col>
        <v-col cols="3">
          datasets : <pre><code>{{ ws.datasets }}</code></pre>
        </v-col>
        <v-col cols="3">
          authorized_users : <pre><code>{{ ws.authorized_users }}</code></pre>
        </v-col>
        <v-divider/>
      </v-row>

      <!-- workspace / toolbar -->
      <v-toolbar
        class="mb-5 mx-n1"
        dense
        flat
        >
        
        <v-toolbar-title class="text-h6 px-0 font-weight-black">

          <v-icon 
            v-if="ws.icon"
            :color="ws.color || 'black'"
            class="pb-1 mr-4 ml-4"
            >
            {{ ws.icon}}
          </v-icon>

          <v-btn
            text
            class="text-none"
            @click.stop="dialog += 1"
            >

            <v-chip
              v-if="isShared"
              class="mr-3"
              small
              label
              color="success"
              outlined
              style="background-color: white!important"
              >
              <v-icon x-small class="mr-2">
                icon-users
              </v-icon>
              {{ $t('share.shared') }}
            </v-chip>

            <!-- ws.id: {{ ws.id }} -  -->
            <span :class="`${ws.color || 'black'}--text`">
              {{ ws.title }}
            </span>

          </v-btn>

        </v-toolbar-title>

        <v-menu
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
                icon-more-vertical
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
          
            <v-subheader class="pa-5 text-uppercase">
              {{ $t('workspaces.prefsWorkspace') }}
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

            <v-divider></v-divider>

                <!-- dialogComment += 1; dialog += 1;  -->
            <v-list-item
              @click.stop="openComments(ws)"
              >
              <v-list-item-action>
                <v-icon small>
                  icon-message-square
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t('workspaces.commentWorkspace') }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item
              @click.stop="dialogShare += 1; dialog += 1"
              >
              <!-- @click.stop="shareWorkspace()" -->
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

            <v-divider></v-divider>

            <v-list-item
              @click.stop="dialogDelete += 1"
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


        <!-- DIALOG FOR WORKSPACE INFOS UPDATE -->
        <ModalItem
          :item="ws"
          :noAvatar="true"
          :itemModel="itemModel"
          :parentDialog="dialog"
          :parentComment="dialogComment"
          :parentShare="dialogShare"
          :itemType="itemType"
          :apiUrl="apiUrl"
          :action="'update'"
        />

        <!-- DIALOG FOR WORKSPACE INFOS -->
        <!-- <ModalShare
          v-if="ws"
          :parentDialog="dialogShare"
          :item="ws"
          :itemModel="itemModelShare"
          :itemType="itemType"
          :action="'update'"
          :apiUrl="apiUrl"
        /> -->

        <!-- DIALOG FOR WORKSPACE DELETE -->
        <ModalDelete
          :parentDialog="dialogDelete"
          :confirmDeleteTitle="$t('workspaces.deleteWorkspace')"
          :confirmDeleteMsg="$t('workspaces.deleteWorkspaceConfirm')"
          :itemToDelete="ws"
          @confirmDelete="deleteWorkspace()"
        />

        <!-- <v-spacer/>

        <v-tooltip 
          left
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
                icon-search1
              </v-icon>
            </v-btn>
          </template>
          <span>
            {{ $t('workspaces.searchDataset') }}
          </span>
        </v-tooltip> -->

      </v-toolbar>

      <!-- DEBUGGING -->
      <!-- <v-row class="pl-5 mb-8">
        <v-col>
          datasets: <code>{{ datasets }}</code>
        </v-col>
        <v-col>
          ws.datasets: <code>{{ ws.datasets }}</code>
        </v-col>
      </v-row> -->
      
      <draggable
        v-model="datasets"
        v-bind="dragOptions"
        draggable=".dataset"
        group="datasets"
        class="row wrap align-center"
        @start="drag=true"
        @end="drag=false"
        >

        <!-- existing datasets / draggable datasets -->
        <v-col
          v-for="dsId in datasets"
          :key="`ds-${dsId}`"
          class="pt-0 dataset"
          cols="12"
          xs="12"
          sm="6"
          md="6"
          lg="4"
          xl="4"
          >
          <!-- <code>{{ dsId }}</code> -->
          <DatasetItem
            v-show="!isWorkspacesLoading"
            :datasetId="dsId"
            :fromWorkspace="ws.id"
            :action="'update'"
          />
          
          <v-skeleton-loader
            v-show="isWorkspacesLoading"
            class="ml-2 mr-0 my-3"
            max-width="300"
            type="text"
          />

        </v-col>
        
        <!-- add new dataset -->
        <v-col
          class="pt-0 pl-4 new-item align-center"
          cols="12"
          xs="12"
          sm="6"
          md="6"
          lg="4"
          xl="3"
          >
          <DatasetItem
            v-show="!isWorkspacesLoading"
            :fromWorkspace="ws.id"
            :action="'create'"
            :isAlone="!Boolean(datasets.length)"
          />
        </v-col>

      </draggable>

    </v-card>
  </v-scale-transition>

</template>


<script>

  import { mapState, mapGetters, mapActions } from 'vuex'
  // import { configHeaders } from '@/utils/utilsAxios'
  // import { Workspace } from '@/utils/utilsWorkspaces'
  // import { Dataset } from '@/utils/utilsDatasets'

  export default {

    name: 'WorkspaceItem',
    components: {
      DatasetItem: () => import(/* webpackChunkName: "DatasetItem" */ '@/components/data/DatasetItem.vue'),
    },
    props: [
      'workspace',
      'apiUrl',
      'dragging',
      'isShared',
      'canShow'
    ],
    data () {
      return {
        dialog: 0,
        dialogShare: 0,
        dialogComment: 0,
        dialogDelete: 0,
        hover: false,
        drag: false,
        itemType: 'workspaces',

        // itemModel:  undefined,
        ws: this.workspace,
        datasets: [],

      }
    },
    watch: {
      workspace(next) {
        // this.log && console.log(`C-WorkspaceItem > ws ${this.ws.id} > watch > workspace ...`)
        this.ws = { ...next }
        this.getDatasets(next)
      },
      datasets(next, prev) {
        this.log && console.log(`C-WorkspaceItem > ws ${this.ws.id} > watch > datasets > next : `, next)
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
    },

    mounted() {
      this.socket = this.$nuxtSocket({
        name: 'main',
        path: '/ws/socket.io',
        transport: ['websocket'],
      })
      this.socket.on('handshake', (data) => {
        this.log && console.log(`\nC-WorkspaceItem > ws ${this.ws.id} > mounted > this.socket - handshake > data : `, data)
        this.socket.emit('join_item_room', {
          sid: data.sid,
          item_type: 'workspace',
          item_id: this.workspace.id
        })
      })
      this.socket.on('item_room', (data) => {
        this.log && console.log(`\nC-WorkspaceItem > ws ${this.ws.id} > mounted > this.socket - item_room > data : `, data)
      })
      this.socket.on('action_message', (data) => {
        this.log && console.log(`\nC-WorkspaceItem > ws ${this.ws.id} > mounted > this.socket - action_message > data : `, data)
        
        if (data.callback.item_type === 'comment' && data.callback.method === 'get' && data.callback.get_list ) {
          this.log && console.log(`\nC-WorkspaceItem > ws ${this.ws.id} > mounted > this.socket - action_message > data.callback : `, data.callback)
          this.togggleCommentsNeedReload(true)
        }
        if (data.callback.item_type === 'workspace' && data.callback.method === 'get' ) {
          this.log && console.log(`\nC-WorkspaceItem > ws ${this.ws.id} > mounted > this.socket - action_message > data.callback : `, data.callback)
          // this.togggleCommentsNeedReload(true)
        }
      //   if (data.callback.method === 'get' && !data.callback.get_list ) {
      //     this.getItem(data)
      //   }
      //   if (data.callback.method === 'get' && data.callback.get_list ) {
      //     this.getItems(data)
      //   }
      })
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
        itemModel: (state) => state.workspaces.itemModel,
        itemModelShare: (state) => state.workspaces.itemModelShare,
        isWorkspacesLoading: (state) => state.workspaces.isLoading
      }),
      ...mapGetters({
        userId: 'user/userId',
        uxWorkspaces: 'workspaces/getUserUx',
        getLoading: 'workspaces/getLoadingById',
        userDatasets: 'datasets/getUserItems',
        sharedDatasets: 'datasets/getSharedItems',
        headerUser: 'user/headerUser',
      })
    },
    methods: {
      ...mapActions({
        togggleShowCommentsBox: 'comments/togggleShowCommentsBox',
        populateCurrentItem: 'comments/populateCurrentItem',
        togggleCommentsNeedReload: 'comments/togggleNeedReload',
      }),
      openComments(item) {
        this.populateCurrentItem(item)
        this.togggleShowCommentsBox(true)
      },
      getDatasets(ws) {
        this.log && console.log(`C-WorkspaceItem > ws ${this.ws.id} > getDatasets > this.ws.datasets :` , this.ws.datasets)
        let hasDatasets = Boolean(ws.datasets && ws.datasets.ids)
        this.log && console.log(`C-WorkspaceItem > ws ${this.ws.id} > getDatasets > hasDatasets :`, hasDatasets)
        let datasetsIds = hasDatasets ? ws.datasets.ids : []
        
        // avoid duplicates
        datasetsIds = [ ...new Set(datasetsIds) ]
        this.log && console.log(`\nC-WorkspaceItem > ws ${this.ws.id} > getDatasets > datasetsIds :` , datasetsIds)
        
        // check if exists 
        // let existingDatasets = this.userDatasets.map(dsIn => dsIn.id)
        // this.log && console.log(`C-WorkspaceItem > ws ${this.ws.id} > getDatasets > existingDatasets :` , existingDatasets)
        
        // this.log && console.log(`C-WorkspaceItem > ws ${this.ws.id} > getDatasets > existingSharedDatasets :` , existingSharedDatasets)
        // let existingSharedDatasets = this.sharedDatasets.map(dsIn => dsIn.id)
        // this.log && console.log(`C-WorkspaceItem > ws ${this.ws.id} > getDatasets > existingSharedDatasets :` , existingSharedDatasets)

        // let datasetsIn = datasetsIds.filter( dsId => existingDatasets.includes(dsId) )
        // this.log && console.log(`C-WorkspaceItem > ws ${this.ws.id} > getDatasets > datasetsIn :` , datasetsIn)

        // this.datasets = [ ...new Set(datasetsIn) ]
        this.datasets = datasetsIds
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
        this.log && console.log(`\nC-WorkspaceItem > ws ${this.ws.id} > updateDatasetsPositions > this.datasets : `, this.datasets)
        let payloadWs = { ...this.ws }
        payloadWs.datasets = {
          ids: [ ...new Set(this.datasets) ]
        }
        this.log && console.log('C-WorkspaceItem > updateDatasetsPositions > payloadWs : ', payloadWs)
        this.$axios
          .put(`${this.api.workspaces}/${this.ws.id}`, payloadWs, this.headerUser)
          // .then( resp => {
          //   this.log && console.log('C-WorkspaceItem > updateDatasetsPositions > resp.data : ', resp.data)
          // })
      },
      deleteWorkspace() {
        // this.log && console.log("C-WorkspaceItem > deleteWorkspace > this.headerUser :", this.headerUser)
        this.$axios
          .delete(`${this.apiUrl}/${this.ws.id}`, this.headerUser)
          .then(resp => {
            // this.log && console.log('C-WorkspaceItem > deleteWorkspace > resp.data : ', resp.data)
            this.$store.dispatch(`${this.itemType}/removeUserItem`, resp.data)
            
            // delete every dataset in workspace
            for (let dsId of this.datasets) {
              this.$axios
                .delete(`${this.api.datasets}/${dsId}`, this.headerUser)
                .then(resp => {
                  // this.log && console.log(`C-WorkspaceItem > deleteWorkspace > ds ${dsId} > resp.data : `, resp.data)
                  this.$store.dispatch(`datasets/removeUserItem`, resp.data)
                })
            }

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
