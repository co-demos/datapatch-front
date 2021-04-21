<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    overflowed
    >
    <!-- MODAL TITLE -->
    <v-card>
      
      <!-- CLOSE MODAL -->
      <v-card-actions class="mr-5 pt-3 pb-0 px-0">
        <v-spacer></v-spacer>
        <v-btn
          icon
          small
          rounded
          elevation="0"
          @click="dialog = false"
          >
          <v-icon>icon-clear</v-icon>
        </v-btn>
      </v-card-actions>

      <!-- TITLE MODAL -->
      <v-card-title class="headline pt-0 mb-2">
        <v-row class="align-center">
          <v-col cols="4" class="text-center">

            <ItemAvatar
              :item="localItem"
              :noAvatar="noAvatar"
              :hover="false"
              :heightAvatar="56"
            />

          </v-col>
          <v-col cols="7">
            <span
              :class="`${localItem.color || 'black'}--text`"
              >
              {{ localItem.title }}
              <!-- <br> wsId: {{ fromWorkspace }} -->
            </span>
            <v-spacer/>
          </v-col>
        </v-row>
      </v-card-title>

      <!-- TABS -->
      <v-toolbar
        flat dense
        class="mb-4"
        >
        <v-tabs
          v-model="tab"
          dense
          centered
          color="grey"
          center-active
          icons-and-text
          >
          <v-tabs-slider></v-tabs-slider>

          <v-tab
            v-for="tabname in tabsSpaces"
            :key="tabname"
            :href="`#modal-tab-${tabname}`"
            >
            {{ $t(`tabs.${tabname}`) }}
          </v-tab>
        </v-tabs>
      </v-toolbar>

      <!-- TABS ITEMS -->
      <v-tabs-items v-model="tab" 
        :class="`${action === 'create' ? 'py-0 mb-5' : 'pt-0 pb-5'}`">

        <v-tab-item 
          v-for="tabname in tabsSpaces"
          :key="tabname"
          :value="`modal-tab-${tabname}`"
          >
          <v-card-text>
            <ModalFields
              :item="localItem"
              :itemModel="itemModel[tabname]"
              :itemType="itemType"
              :apiUrl="apiUrl"
              :action="action"
            />
          </v-card-text>
        </v-tab-item>

      </v-tabs-items>


      <!-- BTNS -->
      <v-card-actions v-if="action === 'create'" class="mr-5 pb-5">
        <v-spacer></v-spacer>
        <v-btn
          color="grey darken-1"
          class="px-3"
          dark
          large
          tile
          elevation="0"
          @click="dialog = false"
          >
          {{ $t('buttons.cancel') }}
        </v-btn>
        <v-btn
          color="primary darken-1"
          class="px-3"
          dark
          large
          tile
          elevation="0"
          @click="createItem()"
          >
          {{ $t(`buttons.${action}`) }}
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {

  name: 'ModalItem',
  props: [
    'item',
    'fromWorkspace',
    'emptyItem',
    'itemModel',
    'parentDialog',
    'itemType',
    'action',
    'apiUrl',
    'noAvatar'
  ],
  watch: {
    item () {
      this.localItem = { ...this.item }
    },
    parentDialog () {
      this.dialog = true
    },
  },
  data () {
    return {
      localItem: undefined,
      dialog: false,
      tab: null,
      tabsSpaces: []
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      api: (state) => state.api,
    }),
    ...mapGetters({
      userId: 'user/userId',
      getUserWorkspaceById: 'workspaces/getUserItemById',
      headerUser: 'user/headerUser'
    })
  },
  beforeMount () {
    this.localItem = { ...this.item }
    this.tabsSpaces = Object.keys(this.itemModel)
  },
  methods: {
    createItem() {
      // this.log && console.log('C-ModalItem > createItem > this.itemType :' , this.itemType)
      // this.log && console.log('C-ModalItem > createItem > this.apiUrl :' , this.apiUrl)
      let itemPayload = this.localItem
      itemPayload.owner_id = this.userId
      // itemPayload.from_workspace_id = this.fromWorkspace
      // this.log && console.log('C-ModalItem > createItem > itemPayload :' , itemPayload)
      this.$axios
        .post(`${this.apiUrl}/`, itemPayload, this.headerUser)
        .then(resp => {
          // this.log && console.log('C-ModalItem > createItem > resp.data : ', resp.data)
          this.$store.dispatch(`${this.itemType}/appendUserItem`, resp.data)
          // this.log && console.log('C-ModalItem > createItem > this.localItem : ', this.localItem)
          // this.log && console.log('C-ModalItem > createItem > this.emptyItem : ', this.emptyItem)
          this.localItem  = this.emptyItem
          this.tab = 0
          this.dialog = false
          this.$emit('resetEmptyItem')

          // if action from workspace append dataset to workspace.datasets
          if (this.fromWorkspace) {
            let currentWs = this.getUserWorkspaceById(this.fromWorkspace)
            // this.log && console.log('C-ModalItem > createItem > currentWs : ', currentWs)
            let wsPreviousDatasets = currentWs.datasets && currentWs.datasets.ids || []
            let payloadWs = { ...currentWs }
            payloadWs.datasets = {
              ids: [ ...wsPreviousDatasets, resp.data.id ]
            }
            // this.log && console.log('C-ModalItem > createItem > payloadWs : ', payloadWs)
            this.$axios
              .put(`${this.api.workspaces}/${this.fromWorkspace}`, payloadWs, this.headerUser)
              .then( resp => {
                this.$store.dispatch(`workspaces/updateUserItem`, resp.data)
              })
          }

        })
    },
  }
}

</script>
