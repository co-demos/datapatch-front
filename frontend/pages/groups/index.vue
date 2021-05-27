<template>

  <v-container class="mb-12">

    <v-row
      fill-height
      class="justify-center align-top"
      >

      <v-col 
        cols="10"
        class="offset-1"
        >

        <!-- GROUPS / DRAGGABLE -->
        <draggable
          v-model="myGroups"
          v-bind="dragOptions"
          draggable=".group"
          group="groups"
          @start="drag=true"
          @end="drag=false; updateGroupPositions()"
          >
          <!-- <GroupItem
            v-for="grp in myGroups"
            :key="grp.id"
            :group="grp"
            :apiUrl="apiUrl"
            :dragging="drag"
          /> -->
        </draggable>
        
        <!-- ADD GROUP -->
        <v-card
          class="mb-5 pb-5 pl-2"
          flat
          >

          <v-card-title v-if="! myGroups.length">
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
            :noAvatar="true"
            :itemModel="itemModel"
            :parentDialog="dialog"
            :itemType="itemType"
            :action="'create'"
            :apiUrl="apiUrl"
            @createItem="createGroup"
            @resetEmptyItem="resetEmptyGroup()"
          />

        </v-card>

      </v-col>
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
      // GroupItem: () => import(/* webpackChunkName: "GroupItem" */ '@/components/data/GroupItem.vue'),
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
        emptyGroup: undefined,
        myGroups: [],
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
        if (this.uxGroups && this.uxGroups.groups_order) {
          const groups_order = this.uxGroups.groups_order
          this.myGroups = mapOrder( [...this.userGroups], groups_order, 'id')
        } else {
        // this.myGroups =[ ...this.userGroups, ...this.myGroupsDummies ]
          this.myGroups = [...this.userGroups]
        }
      },
      resetEmptyGroup() {
        let emptyGroup = new Group(
          this.userId,
          this.$t('groups.defaultTitle'),
          this.$t('groups.defaultDescription'),
        )
        // emptyGroup.randomBasics = true
        this.emptyGroup = emptyGroup.data
        this.newGroup = emptyGroup.data
      },
      createGroup(itemPayload) {
        // this.log && console.log("\nP-Groups > createGroup > itemPayload : ", itemPayload)
        // let now = new Date(Date.now())
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
