<template>

  <v-container class="mb-12">

    <v-row
      class="justify-center align-top"
      >

      <v-col 
        cols="6"
        class="offset-1 align-top text-center pa-0 my-5"
        >
        
        <!-- <p class="font-weight-bold grey--text">
          {{ $t('groups.myGroups')}}
        </p> -->
        <SearchGroupUser/>

      </v-col>

      <!-- LEFT MENU -->
      <!-- <v-col 
        cols="2"
        class="align-top pa-0"
        >
        <v-list dense class="pt-0">
          <v-list-item
            v-for="menu in leftMenu"
            :key="menu.text"
            two-line
            class="pt-0"
            >
            <v-list-item-content class="pt-0">
              <v-list-item-title>
                {{ $t(menu.text) }}
                </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t(menu.textBis) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col> -->

      <!-- MY GROUPS -->
      <v-col 
        cols="10"
        class="offset-1 mt-2"
        >
        
        <!-- GROUPS / DRAGGABLE -->
        <draggable
          v-model="myGroups"
          v-bind="dragOptions"
          draggable=".group"
          group="groups"
          class="row wrap align-center"
          @start="drag=true"
          @end="drag=false; updateGroupPositions()"
          >
          <v-col
            v-for="grp in myGroups"
            :key="`grp-${grp.id}`"
            class="pt-0 pl-0 pb-6 group"
            cols="6"
            xs="6"
            sm="4"
            md="3"
            lg="3"
            xl="3"
            >
            <GroupItem
              :groupId="grp.id"
              :group="grp"
              :apiUrl="apiUrl"
              :action="'update'"
              :dragging="drag"
            />
            <!-- <div
              v-for="grp in myGroups"
              :key="grp.id"
              class="group mb-3"
            >
            <code>{{ grp }}</code>
            </div> -->
          </v-col>
        </draggable>

      </v-col>

      <!-- ADD GROUP -->
      <v-col 
        cols="12"
        class="text-center"
        >

        <v-card
          class="mb-5 pb-5"
          flat
          >

          <v-card-title v-if="!myGroups.length">
            {{ $t('groups.defaultHelp') }}
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
              {{ $t('groups.addGroup') }}
            </span>
          </v-btn>

          <!-- DIALOG FOR NEW GROUP INFOS -->
          <ModalItem
            :item="newGroup"
            :noAvatar="false"
            :itemModel="itemModelNew"
            :parentDialog="dialog"
            :itemType="itemType"
            :action="'create'"
            :apiUrl="apiUrl"
            @createItem="createGroup"
            @resetEmptyItem="resetEmptyGroup()"
          />

        </v-card>
      </v-col>

      <!-- SHARED GROUPS -->
      <!-- <v-col 
        cols="10"
        class="offset-2 align-top text-left pa-0 my-3"
        >
        <p class="font-weight-bold grey--text">
          {{ $t('groups.sharedGroups')}}
        </p>
      </v-col> -->

    </v-row>

  </v-container>

</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'
  import { Group } from '@/utils/utilsGroups'
  import { mapOrder } from '@/utils/utilsFunctions'

  export default {
    name: 'Groups',
    layout: 'layoutListings',
    components: {
      GroupItem: () => import(/* webpackChunkName: "GroupItem" */ '@/components/data/GroupItem.vue'),
    },
    head() {
      return {
        title: `${this.appTitle} - ${this.$t('pages.groups')}`,
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
            text: 'pages.groups',
            disabled: true,
            to: '/groups',
          }
        ],
        itemType: 'groups',
        apiUrl: undefined,
        newGroup: undefined,
        // emptyGroup: undefined,
        myGroups: [],
        leftMenu: [
          {
            text: 'groups.myGroups',
            textBis: 'groups.myGroups',
            anchor: '#myGroups'
          },
          {
            text: 'groups.sharedGroups',
            textBis: 'groups.sharedGroups',
            anchor: '#sharedGroups'
          }
        ]
      }
    },
    beforeMount () {
      this.updatePath(this.pathItems)
      this.orderGroups()
      this.resetEmptyGroup()
      this.apiUrl = this.api[this.itemType]
    },
    watch: {
      userGroups (next) {
        // this.log && console.log("P-Groups > watch > userGroups > next : ", next)
        this.orderGroups()
        // this.resetEmptyGroup()
        this.updateGroupPositions()
      }
    },
    computed: {
      dragOptions() {
        return {
          animation: 200,
          group: "groups",
          disabled: false,
          ghostClass: "ghost"
        }
      },
      ...mapState({
        log: (state) => state.log,
        appTitle: (state) => state.appTitle,
        api: (state) => state.api,
        itemModel: (state) => state.groups.itemModel,
        itemModelNew: (state) => state.groups.itemModelNew,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
        userId: 'user/userId',
        uxGroups: 'groups/getUserUx',
        userGroups: 'groups/getUserItems',
        sharedGroups: 'groups/getSharedItems',
        headerUser: 'user/headerUser'
      })
    },
    methods: {
      ...mapActions({
        updatePath: 'updateCrumbsPath',
      }),
      orderGroups() {
        // this.log && console.log("\nP-Groups > orderGroups > this.userGroups : ", this.userGroups)
        // this.log && console.log("P-Groups > orderGroups > this.uxGroups : ", this.uxGroups)
        if (this.uxGroups && this.uxGroups.groups_order) {
          const groups_order = this.uxGroups.groups_order
          this.myGroups = mapOrder( [...this.userGroups], groups_order, 'id')
        } else {
          this.myGroups = [...this.userGroups]
        }
      },
      resetEmptyGroup() {
        let emptyGroup = new Group(
          this.userId,
          this.$t('groups.defaultTitle'),
          this.$t('groups.defaultDescription'),
        )
        emptyGroup.randomBasics = true
        // this.emptyGroup = emptyGroup.data
        this.newGroup = emptyGroup.data
      },
      createGroup(itemPayload) {
        this.log && console.log("\nP-Groups > createGroup > itemPayload : ", itemPayload)
        this.$axios
          .post(`${this.api.groups}/`, itemPayload, this.headerUser)
          .then(resp => {
            this.$store.dispatch(`groups/appendUserItem`, resp.data)
            this.resetEmptyGroup()
          })
      },
      updateGroupPositions() {
        // this.log && console.log("\nP-Groups > updateGroupPositions > this.myGroups : ", this.myGroups)
        let grpIndexes = this.myGroups.map(grp => grp.id)
        let payloadUser = {
          ux_groups: {
            groups_order: grpIndexes
          }
        }
        // this.log && console.log("P-Groups > updateGroupPositions > grpIndexes : ", grpIndexes)
        this.$axios
          .put(`${this.api.users}/me/ux`, payloadUser, this.headerUser)
          .then(resp => {
            // this.log && console.log('P-Groups > updateGroupPositions > resp.data : ', resp.data)
            this.$store.dispatch('groups/populateUserUX', resp.data.ux_groups)
          })
      }
    }
  }

</script>
