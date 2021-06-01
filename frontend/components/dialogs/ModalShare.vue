<template>
  <v-dialog
    v-model="dialog"
    overflowed
    max-width="800"
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

            <span v-if="itemType !== 'fields'"
              :class="`${localItem.color || 'black'}--text`"
              >
              {{ localItem.title }}
              <!-- <br> wsId: {{ fromWorkspace }} -->
            </span>
            <span v-if="itemType === 'fields'"
              :class="`'black--text`"
              >
              {{ localItem.text }}
            </span>

            <!-- SUBTITLE MODAL -->
            <span v-if="itemType === 'fields'" class="caption">
              <br> 
              {{ $t('dataPackage.fieldType')}} 
              {{ $t(fieldText(localItem.field_type)) }}
            </span>

            <p class="caption font-italic mt-1 mb-0">
              {{ $t(`dataPackage.${itemType.slice(0, -1)}`) }}
              - {{ $t(`share.invitePrefs`) }}
            </p>

          </v-col>
        </v-row>
      </v-card-title>
      
      <!-- SEARCH USER OR GROUP -->
      <v-divider class="mt-8"/>
      <v-row
        class="align-center px-12 pt-5 ma-0 pb-8"
        dense
        >
        <v-col cols="8" class="offset-4 justify-left">
          <p class="subtitle-2">
            {{ $t('buttons.inviteUserGroup') }}
          </p>
        </v-col>
        <v-col cols="12">
          <SearchAny
            :itemTypes="['users', 'groups']"
            :searchLabel="'buttons.searchUserGroup'"
            :searchPlaceholder="'buttons.queryUserGroup'"          />
        </v-col>
      </v-row>
      <v-divider/>

      <!-- DEBUGGING -->
      <v-row class="text-caption" v-if="false">
        <v-col cols="12">
          <h5>
            <hr> DEBUG FROM : ModalItem
          </h5>
        </v-col>
        <v-col cols="12">
          itemType : <code>{{ itemType }}</code><br>
          action : <code>{{ action }}</code><br>
          onlyLocalUpdate : <code>{{ onlyLocalUpdate }}</code><hr>
          localItem.title : <code>{{ localItem && localItem.title }}</code><hr>
          itemModel : <code>{{ itemModel }}</code><hr>
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
      <!-- <v-card-actions v-if="action === 'create'" class="mr-5 pb-5">
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
      </v-card-actions> -->

    </v-card>
  </v-dialog>
</template>

<script>

  import { mapState } from 'vuex'
  import { FindFieldText } from '@/utils/utilsFields'

  export default {

    name: 'ModalItem',
    props: [
      'item',
      'fromWorkspace',
      'itemModel',
      'parentDialog',
      'itemType',
      'action',
      'apiUrl',
      'noAvatar',
      'updateCurrentDataset',
      'onlyLocalUpdate',
    ],
    watch: {
      item () {
        this.rebuildLocalItem()
      },
      parentDialog (next) {
        this.dialog = next
      },
    },
    data () {
      return {
        localItem: undefined,
        dialog: false,
        tab: null,
        tabsSpaces: [],
        needUpdateStore: false,

        // descriptionLimit: 60,
        // entries: [],
        // isLoading: false,
        // model: null,
        // search: null,
      }
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
      }),
    },
    beforeMount () {
      this.rebuildLocalItem()
      this.tabsSpaces = Object.keys(this.itemModel)
    },
    methods: {
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
