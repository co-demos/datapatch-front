<style scoped>
  .no-decoration {
    text-decoration: none; 
  }
  .no-pointer {
    pointer-events: none !important;
  }
</style>

<template>
  <v-dialog
    v-model="dialog"
    overflowed
    max-width="1000"
    class="ModalItem"
    >
    <!-- MODAL TITLE -->
    <v-card class="pb-8">
      
      <!-- CLOSE MODAL -->
      <v-card-actions class="mr-5 pt-4 pb-0 mb-n2 px-0">
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

      <!-- MODAL ITEM TITLE ROW -->
      <v-card-title class="py-0 mb-0">

        <!-- AVATAR -->
        <v-row class="align-center">
          <v-col cols="4" class="headline text-center">
            <ItemAvatar
              :item="localItem"
              :itemType="itemType"
              :noAvatar="noAvatar"
              :hover="false"
              :heightAvatar="56"
            />
          </v-col>

          <!-- TITLE MODAL -->
          <v-col cols="8">

            <nuxt-link
              v-if="itemType !== 'fields'"
              :class="`text-none mr-2 no-decoration ${localItem.color || 'black'}--text ${noPointer ? 'no-pointer' : ''}`"
              :to="getItemLink"
              >
              <span class="mr-4">
                {{ localItem.title }}
              </span>
              <!-- {{ localItem }} -->
              <!-- <br> wsId: {{ fromWorkspace }} -->
            </nuxt-link>

            <span v-if="itemType === 'fields'"
              :class="`'black--text`"
              >
              {{ localItem.text }}
            </span>

            <!-- OPEN COMMENT -->
            <v-tooltip
              v-if="action !== 'create'"
              right
              >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  small
                  icon
                  :dark="isCurrentItemComments"
                  :class="`${isCurrentItemComments ? localItem.color || 'grey' : ''}`"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="openShow('showComments')"
                  >
                  <v-icon
                    small
                    :color="isCurrentItemComments ? 'white' : localItem.color || 'grey'"
                    >
                    icon-message-square
                  </v-icon>
                </v-btn>
              </template>
              {{ $t(`buttons.comment`) }}
            </v-tooltip>

            <!-- OPEN INVITATION -->
            <v-tooltip
              v-if="isAuthorizedForItem"
              right
              >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  :dark="showSearch"
                  :class="`${showSearch ? localItem.color || 'grey' : ''}`"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="openShow('showSearch')"
                  >
                  <v-icon
                    small
                    :color="showSearch ? 'white' : localItem.color || 'grey'"
                    >
                    icon-users
                  </v-icon>
                </v-btn>
              </template>
              {{ $t(`buttons.inviteUser${itemType === 'groups' ? '' : 'Group'}`) }}
            </v-tooltip>

            <!-- OPEN ASK JOIN -->
            <v-tooltip
              v-if="!isAuthorizedForItem"
              right
              >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  small
                  :dark="showAskJoin"
                  :class="`${showAskJoin ? localItem.color || 'grey' : ''}`"
                  v-bind="attrs"
                  v-on="on"
                  @click.stop="openShow('showAskJoin')"
                  >
                  <v-icon
                    small
                    :color="showAskJoin ? 'white' : localItem.color || 'grey'"
                    >
                    icon-user-plus
                  </v-icon>
                </v-btn>
              </template>
              {{ $t('buttons.join') }}
            </v-tooltip>

            <!-- SUBTITLE MODAL -->
            <span v-if="itemType === 'fields'" class="caption">
              <br> 
              {{ $t('dataPackage.fieldType')}} 
              {{ $t(fieldText(localItem.field_type)) }}
            </span>

            <p class="caption font-italic mt-1 mb-0">
              {{ $t(`dataPackage.${itemType.slice(0, -1)}`) }}
            </p>

          </v-col>
        </v-row>
      </v-card-title>

      <!-- INVITE SEARCH USER OR GROUP -->
      <v-expand-transition>
        <v-row
          v-show="showSearch"
          :class="`align-center px-12 pt-5 ma-0 mt-8 pb-8 ${localItem.color || 'grey'}`"
          dense
          >
          <v-col cols="11" class="offset-1 justify-left">
            <v-row class="ma-0">
              <p class="subtitle-2 white--text mb-0">
                {{ $t(`buttons.inviteUser${itemType === 'groups' ? '' : 'Group'}`) }}
              </p>
              <v-btn
                icon
                absolute
                small
                rounded
                dark
                right
                elevation="0"
                class="flex align-self-center"
                @click="closeAllShows()"
                >
                <v-icon medium>
                  icon-clear
                </v-icon>
              </v-btn>
            </v-row>
          </v-col>

          <!-- {{ itemType }} -->
          <v-col cols="12">
            <SearchAny
              :itemTypes="itemType === 'groups' ? ['users'] : ['users', 'groups']"
              :searchLabel="`buttons.searchUser${itemType === 'groups' ? '' : 'Group'}`"
              :searchPlaceholder="`buttons.queryUser${itemType === 'groups' ? '' : 'Group'}`"
              :flat="true"
              :solo="true"
              :light="true"
              :dense="false"
              :customClass="''"
              :customColor="'white'"
              :relatedSpace="`${itemType}_modal`"
              :relatedItem="localItem"
              @closeModal="dialog = false"
            />
          </v-col>
        </v-row>
      </v-expand-transition>

      <!-- INVITE SEARCH USER OR GROUP -->
      <v-expand-transition>
        <v-row
          v-show="showAskJoin"
          :class="`align-center px-12 pt-5 ma-0 mt-8 pb-8 ${localItem.color}`"
          dense
          >
          <v-col cols="11" class="offset-1 justify-left">
            <v-row class="ma-0">
              <p class="subtitle-2 white--text mb-0">
                {{ $t(`buttons.askToJoin`) }}
              </p>
              <v-btn
                icon
                absolute
                small
                rounded
                dark
                right
                elevation="0"
                class="flex align-self-center"
                @click="closeAllShows()"
                >
                <v-icon medium>
                  icon-clear
                </v-icon>
              </v-btn>
            </v-row>
          </v-col>

          <v-col cols="12">

          </v-col>
        </v-row>
      </v-expand-transition>

      <!-- DEBUGGING -->
      <v-row class="text-caption" v-if="false">
        <v-col cols="12">
          <h5>
            <hr> DEBUG FROM : ModalItem
          </h5>
        </v-col>
        <v-col cols="12">
          localItem.id : <code>{{ localItem && localItem.id }}</code><hr>
          <span v-if="itemType === 'workspaces'">
            localItem.datasets : <code>{{ localItem && localItem.datasets }}</code><hr>
          </span>
          userData : <code>{{ userData }}</code><hr>
          GetUserAuthOnItem : <code>{{ getUserAuths }}</code><hr>
          itemType : <code>{{ itemType }}</code><br>
          action : <code>{{ action }}</code><br>
          onlyLocalUpdate : <code>{{ onlyLocalUpdate }}</code><hr>
          <!-- localItem.title : <code>{{ localItem && localItem.title }}</code><hr> -->
          localItem.authorized_users : <code>{{ localItem && localItem.authorized_users }}</code><hr>
          <!-- itemModel : <code>{{ itemModel }}</code><hr> -->
          <!-- <span v-if="itemType === 'fields'">
            localItem.data : <code>{{ localItem.data }}</code><br>
          </span> -->
        </v-col>
      </v-row>

      <ModalTabs
        v-if="localItem && itemModel"
        :tabsSpaces="tabsSpaces"
        :localItem="localItem"
        :itemType="itemType"
        :itemModel="itemModel"
        :apiUrl="apiUrl"
        :action="action"
        :updateCurrentDataset="updateCurrentDataset"
        :onlyLocalUpdate="onlyLocalUpdate"
        :needUpdateStore="needUpdateStore"
      />

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

  import { mapState, mapGetters, mapActions } from 'vuex'
  import { FindFieldText } from '@/utils/utilsFields'
  import { GetUserAuthOnItem } from '@/utils/utilsAuths'

  export default {

    name: 'ModalItem',
    props: [
      'item',
      'fromWorkspace',
      'itemModel',
      'parentDialog',
      'parentComment',
      'parentShare',
      'parentAskJoin',
      'itemType',
      'action',
      'apiUrl',
      'noAvatar',
      'updateCurrentDataset',
      'onlyLocalUpdate',
      'noLink'
    ],
    components: {
      // ModalComment: () => import(/* webpackChunkName: "ModalComment" */ '@/components/dialogs/ModalComment.vue'),
    },
    watch: {
      item () {
        this.rebuildLocalItem()
      },
      parentDialog (next) {
        this.dialog = next
      },
      parentComment (next) {
        this.showAskJoin = false
        // this.showComment = true
        this.showSearch = false
      },
      parentShare (next) {
        // this.showComment = false
        this.showAskJoin = false
        this.showSearch = true
      },
      parentAskJoin (next) {
        this.showSearch = false
        // this.showComment = false
        this.showAskJoin = true
      },
    },
    data () {
      return {
        localItem: undefined,
        dialog: false,
        showSearch: false,
        // showComment: false,
        showAskJoin: false,
        tab: null,
        tabsSpaces: [],
        needUpdateStore: false,
        noPointer: false,
      }
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        userData: (state) => state.user.userData,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
        currentDataset: 'datasets/getCurrentItem',
        getShowCommentsBox: 'comments/getShowCommentsBox',
        getCurrentItemComments: 'comments/getCurrentItem',
      }),
      isAuthorizedForItem() {
        // this.log && console.log('\nC-ModalItem > isAuthorizedForItem > this.isAuthenticated :' , this.isAuthenticated)
        // this.log && console.log('C-ModalItem > isAuthorizedForItem > this.userData :' , this.userData)
        // this.log && console.log('C-ModalItem > isAuthorizedForItem > this.localItem :' , this.localItem)
        let basicAuth = !!this.isAuthenticated && !!this.userData.id
        // let isOwner = this.userData.id === this.localItem.owner_id
        // this.log && console.log('C-ModalItem > isAuthorizedForItem > isOwner :' , isOwner)
        return basicAuth
      },
      getItemLink() {
        let itemType = this.itemType
        let url = `/${itemType}/#${this.localItem.id}`
        if (itemType === 'datasets') {
          url = `/dataset/${this.localItem.id}`
        }
        return url
      },
      getUserAuths () {
        if ( this.localItem ) {
          return GetUserAuthOnItem( this.userData, this.localItem )
        }
      },
      isCurrentItemComments() {
        if ( this.localItem && this.getCurrentItemComments) {
          return this.getCurrentItemComments.id === this.localItem.id
        } else {
          return false
        } 
      },
    },
    beforeMount () {
      this.noPointer = this.fromCreate ? true : this.noLink
      this.rebuildLocalItem()
      this.tabsSpaces = Object.keys(this.itemModel)
    },
    methods: {
      ...mapActions({
        togggleShowCommentsBox: 'comments/togggleShowCommentsBox',
        populateCurrentItem: 'comments/populateCurrentItem',
      }),
      toggleComments(item) {
        if (this.isCurrentItemComments) {
          this.populateCurrentItem(undefined)
          this.togggleShowCommentsBox(false)
        } else {
          this.populateCurrentItem(item)
          this.togggleShowCommentsBox(true)
        }
      },
      openShow(showName)  {
        let shows = [ 'showSearch', 'showAskJoin' ]
        shows.forEach( show => { 
          this[show] = showName === show ? !this[showName] : false
        })
        if (showName === 'showComments') {
          this.toggleComments(this.localItem)
        } else {
          this.populateCurrentItem(undefined)
          this.togggleShowCommentsBox(false)
        }
      },
      closeAllShows()  {
        this.showSearch = false
        // this.showComment = false
        this.showAskJoin = false
      },
      rebuildLocalItem() {
        let updateInStore = ['fields', 'tables']
        this.needUpdateStore = updateInStore.includes(this.itemType)
        if (!this.onlyLocalUpdate || this.needUpdateStore) {
          this.localItem = { ...this.item }
        } else {
          this.localItem = this.item
        } 
      },
      createItem() {
        let itemPayload = this.localItem
        // this.tab = 0
        this.dialog = false
        this.$emit('createItem', itemPayload)
      },
      fieldText (type) {
        return FindFieldText(type)
      },
    }
  }

</script>
