<style scoped>
  .no-decoration {
    text-decoration: none !important;
  }

  .add-border {
    border: thin solid lightGrey !important;
  }

  .btn-group-title {
    white-space: normal !important;
  }

</style>

<template>
  <div>

    <v-row
      v-if="grp"
      v-show="!currentLoadingState"
      class="align-center justify-left mr-2 mb-2"
      >
      <!-- GROUP AVATAR -->
      <!-- <v-col 
        cols="2"
        class="pa-0 text-center"
        >
        <ItemAvatar
          :item="grp"
          :hover="hover"
          :heightAvatar="heightAvatar"
          :customClass="'border-white'"
        />
      </v-col> -->

      <!-- GROUP CARD -->
      <v-col
        v-if="action === 'update'"
        cols="11"
        class="pr-0"
        >
        <v-badge
          bordered
          :color="grp.color"
          :icon="grp.icon"
          overlap
          left
          tile
          style="width: 100% !important;"
          >
        <a
          @click.stop="dialog += 1"
          class="ml-0 no-decoration text-none"
          >
        <!-- <nuxt-link
          :to="`/groups/${grp.id}`" 
          class="ml-0 no-decoration text-none"
          >-->
          <v-card 
            flat
            outlined
            :class="`text-none pa-2 ${hover ? 'add-border' : ''}`"
            :color="`${hover ? 'white' : grp.color}`"
            @mouseover="hover = true"
            @mouseleave="hover = false"
            >
            <!-- :color="`${hover ? 'white' : 'grey lighten-4'}`" -->
            <v-card-actions class="pa-0">

              <v-row
                class="align-center wrap justify-left flex-grow-1"
                >
                
                <!-- GROUP TTTLE -->
                <v-col 
                  cols="12"
                  :class="`px-2 pt-3 pb-0 ma-0 ${hover ? grp.color : 'white' }--text`"
                  >
                  <p
                    :class="`text-center text-body-2 font-weight-bold mb-0`"
                    >
                    {{ grp.title }} 
                  </p>
                </v-col>

                <!-- GROUP SUBTITLE -->
                <v-col
                  cols="12" 
                  :class="`align-center text-center px-3 pt-2 pb-4 ${hover ? 'black' : 'white' }--text`"
                  >
                  <v-divider 
                    :class="`mb-3 ${hover ? grp.color : 'white'}`"
                  />
                  <p class="caption pa-0 ma-0 text-lowercase font-italic">
                    {{ grp.users.length }} {{ $tc('groups.member', grp.users.length) }}
                  </p>
                  <p class="caption pa-0 ma-0 text-lowercase font-italic">
                    {{ grp.users_pending.length }} {{ $tc('groups.memberPending', grp.users_pending.length) }}
                  </p>
                </v-col>

              </v-row>

            </v-card-actions>
            
          </v-card>
        </a>
        </v-badge>
      </v-col>

      <!-- GROUP BTNS -->
      <v-col 
        v-if="action === 'update'"
        cols="1"
        class="ma-0 pa-0"
        >
        <v-menu
          bottom
          open-on-hover
          >
          <template v-slot:activator="{ on: onMenu, attrs: attrsMenu }">
            <v-btn
              x-small
              icon
              class="pl-0 tex-none"
              v-bind="{...attrsMenu}"
              v-on="{...onMenu}"
              @click.stop="dialog += 1"
              >
              <v-icon small>
                icon-more-vertical
                <!-- icon-chevron-down1 -->
              </v-icon>
            </v-btn>
          </template>

          <v-list dense>
          
            <v-subheader class="pa-5 text-uppercase">
              {{ $t('groups.prefsGroup') }}
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
                  {{ $t('groups.editGroup') }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider/>

            <v-list-item
              @click.stop="dialogShare += 1"
              >
              <v-list-item-action>
                <v-icon small>
                  icon-user-plus
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t('groups.inviteGroup') }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              @click.stop="dialogShare += 1"
              >
              <v-list-item-action>
                <v-icon small>
                  icon-user-check
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t('groups.askJoinGroup') }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider/>

            <v-list-item
              @click.stop="dialogDelete += 1"
              >
              <!-- @click.stop="deleteGroup()" -->
              <v-list-item-action>
                <v-icon small>
                  icon-trash-2
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ $t('groups.deleteGroup') }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list>

        </v-menu>
      </v-col>
      
      <!-- DIALOG FOR GROUP INFOS -->
      <ModalItem
        v-if="grp"
        :parentDialog="dialog"
        :item="group"
        :fromWorkspace="fromWorkspace"
        :itemModel="itemModelMeta"
        :itemType="itemType"
        :action="action"
        :apiUrl="apiUrl"
      />

      <!-- DIALOG FOR GROUP INFOS -->
      <ModalShare
        v-if="grp"
        :parentDialog="dialogShare"
        :item="group"
        :fromWorkspace="fromWorkspace"
        :itemModel="itemModelShare"
        :itemType="itemType"
        :action="action"
        :apiUrl="apiUrl"
      />

      <!-- DIALOG FOR GROUP DELETE -->
      <ModalDelete
        v-if="grp"
        :parentDialog="dialogDelete"
        :confirmDeleteTitle="$t('groups.deleteGroup')"
        :confirmDeleteMsg="$t('groups.deleteGroupConfirm')"
        :itemToDelete="group"
        @confirmDelete="deleteGroup()"
      />

    </v-row>

    <v-row
      v-show="currentLoadingState"
      class="ma-0 align-center"
      >
      <v-col cols="12" class="pa-0 ma-0 ml-2">
        <v-skeleton-loader
          type="image"
          max-height="50px"
        />
      </v-col>
    </v-row>

  </div>
</template>


<script>

  import { mapState, mapGetters } from 'vuex'
  import { Group } from '@/utils/utilsGroups'

  import { importOptionsInfos } from '@/utils/utilsImports.js'

  export default {

    name: 'GroupItem',
    props: [
      'groupId',
      'group',
      'fromWorkspace',
      'action',
      'isAlone'
    ],
    data () {
      return {
        dialog: 0,
        dialogCreate: 0,
        dialogShare: 0,
        dialogDelete: 0,

        isLoading: false,

        presetCreate: undefined,
        importOptions: importOptionsInfos,

        heightAvatar: 36,
        hover: false,
        
        itemType: 'groups',
        grp: undefined,
        apiUrl: undefined,

      }
    },
    watch: {
      groupId(next) {
        // this.log && console.log("C-GroupItem > watch > groupId > next :", next)
        this.grp = next && { ...this.getUserGroupById(next) }
      },
      currentGroup(next) {
        // this.log && console.log("C-GroupItem > watch > currentGroup ...")
        // this.log && console.log("C-GroupItem > watch > currentGroup > next : ", next)
        if (next) {
          // this.log && console.log("C-GroupItem > watch > currentGroup > next.id : ", next.id)
          this.grp = { ...next }
        }
      }
    },
    beforeMount () {
      this.isLoading = true
    },
    mounted () {
      // this.log && console.log(`\nC-GroupItem > ${this.action} > mounted > this.groupId :`, this.groupId)
      // this.log && console.log(`C-GroupItem > ${this.action} > mounted > this.group :`, this.group)

      if (this.action === 'update') {
        // this.log && console.log(`C-GroupItem > ${this.action} > mounted > this.groupId :`, this.groupId)
        setTimeout(() => {
          this.grp = this.getUserGroupById(this.groupId)
          // this.log && console.log(`C-GroupItem > ${this.action} > mounted > this.grp :`, this.grp)
          this.isLoading = false
        }, 200)
      }
      this.apiUrl =  this.api[this.itemType]
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
        itemModel: (state) => state.groups.itemModel,
        itemModelMeta: (state) => state.groups.itemModelMeta,
        itemModelShare: (state) => state.groups.itemModelShare,
        loadingItem: (state) => state.groups.loadingItem,
      }),
      ...mapGetters({
        userId: 'user/userId',
        getUserGroupById: 'groups/getUserItemById',
        // getLoading: 'groups/getLoadingById',
        headerUser: 'user/headerUser'
      }),
      currentGroup() {
        return this.getUserGroupById(this.groupId)
      },
      currentLoadingState() {
        return this.action === 'update' && this.loadingItem === this.groupId
      },
    },
    methods: {
      // currentLoadingState() {
      //   return this.loadingItem === this.groupId
      // },
      openCreateWithPreset (preset) {
        this.log && console.log("C-GroupItem > openCreateWithPreset > preset :", preset)
        this.presetCreate = preset
        this.dialogCreate += 1
      },
      shareGroup() {
        // TO DO
        this.log && console.log("C-GroupItem > shareGroup > this.headerUser :", this.headerUser)
        // this.log && console.log("C-GroupItem > shareGroup > this.ws :", this.ws)
        // this.$axios
        //   .put(`${this.api.groups}/share`, this.ws, this.headerUser)
        //   .then(resp => {
        //     this.log && console.log('C-GroupItem > shareGroup > resp.data : ', resp.data)
        //   })
      },
      deleteGroup() {
        // this.log && console.log("C-GroupItem > deleteGroup > this.headerUser :", this.headerUser)
        // this.log && console.log(`\nC-GroupItem > deleteGroup > grp ${this.grp.id} > this.fromWorkspace :`, this.fromWorkspace)
        this.$axios
          .delete(`${this.apiUrl}/${this.group.id}`, this.headerUser)
          .then(resp => {
            // this.log && console.log(`C-GroupItem > deleteGroup > grp ${this.grp.id} > resp.data : `, resp.data)
            this.$store.dispatch(`${this.itemType}/removeUserItem`, resp.data)
          })
      },
    }

  }
</script>
