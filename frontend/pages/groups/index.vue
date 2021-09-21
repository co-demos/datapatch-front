<template>

  <v-container class="mb-12">

    <v-row
      class="justify-center align-top"
      >

      <v-col 
        cols="8"
        class="align-top text-center pa-0 mt-6 mb-10"
        >
        <!-- <p class="font-weight-bold grey--text">
          {{ $t('groups.myGroups')}}
        </p> -->
        <SearchAny
          :itemTypes="['users', 'groups']"
          :searchLabel="'buttons.searchUserGroup'"
          :searchPlaceholder="'buttons.queryUserGroup'"
          :relatedSpace="'groups_list'"
        />
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
    
    </v-row>

      
    <v-row
      class="justify-left align-top"
      >

      <!-- DEBUGGING -->
      <v-col cols="12" class="mb-4" v-if="false">
        filters : <code>{{ filters }}</code>
      </v-col>

      <v-col 
        cols="2"
        class="mt-6 pa-0"
        >
        <ItemsFilters
          v-model="filters"
          :itemsType="itemType"
        />
      </v-col>

      <!-- GROUPS / DRAGGABLE -->
      <v-col 
        cols="8"
        class="mt-6 pa-0 ml-5"
        >
        
        <!-- MY GROUPS -->
        <v-expand-transition>
          <div v-show="filters.userItems">
            <draggable
              v-model="myGroups"
              v-bind="dragOptions"
              draggable=".group"
              group="groups"
              class="row wrap align-center justify-center"
              @start="drag=true"
              @end="drag=false; updateGroupPositions()"
              >
              <v-col
                v-for="grp in myGroups"
                :key="`grp-${grp.id}`"
                class="pt-0 pl-0 pr-auto pb-6 group"
                cols="6"
                xs="6"
                sm="4"
                md="4"
                lg="3"
                xl="3"
                >
                <GroupItem
                  :groupId="grp.id"
                  :group="grp"
                  :apiUrl="apiUrl"
                  :action="'update'"
                  :dragging="drag"
                  :isShared="false"
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
          </div>
        </v-expand-transition>


        <!-- SHARED GROUPS -->
        <v-expand-transition>
          <div v-show="filters.sharedItems">
            <draggable
              v-model="openGroups"
              v-bind="dragOptions"
              draggable=".group"
              group="groups"
              class="row wrap align-center justify-center"
              @start="drag=true"
              @end="drag=false; updateGroupPositions()"
              >
              <v-col
                v-for="grp in openGroups"
                :key="grp.id"
                class="pt-0 pl-0 pr-auto pb-6 group"
                cols="6"
                xs="6"
                sm="4"
                md="4"
                lg="3"
                xl="3"
                >
                <GroupItem
                  :groupId="grp.id"
                  :group="grp"
                  :apiUrl="apiUrl"
                  :action="'update'"
                  :dragging="drag"
                  :isShared="true"
                />
                <!-- <div
                  v-for="grp in openGroups"
                  :key="grp.id"
                  class="group mb-3"
                >
                <code>{{ grp }}</code>
                </div> -->
              </v-col>
            </draggable>
          </div>
        </v-expand-transition>

        <!-- ADD GROUP -->
        <v-row class="justify-center mt-6">
          <v-card
            class="mb-5 pb-5"
            flat
            >

            <v-card-title v-if="!myGroups.length" class="justify-center">
              {{ $t('groups.defaultHelp') }}
            </v-card-title>

            <v-btn 
              text
              rounded
              large
              class="text-none pl-2 pr-4 text-h6 font-weight-bold" 
              @click="dialog += 1"
              >
              <span class="grey--text">
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
              :noLink="true"
            />

          </v-card>
        </v-row>

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
    layout: 'layout_listings',
    components: {
      ItemsFilters: () => import(/* webpackChunkName: "ItemsFilters" */ '@/components/data/ItemsFilters.vue'),
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
        openGroups: [],
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
        ],
        filters: {
          userItems: true,
          sharedItems: true,
          sortType: 'date',
          sortOrder: 'desc',
          search: null,
        },
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
        this.openGroups = [...this.sharedGroups]
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
