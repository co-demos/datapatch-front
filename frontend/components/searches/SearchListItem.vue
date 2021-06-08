<style scoped>
  .list-item {
    min-height: 48px;
    display: flex;
    align-items: center;
  }
  .side-btn {
    pointer-events: none !important;
    right: -30px;
  }
</style>

<template>

  <v-card
    outlined
    light
    elevation="0"
    class="mb-2 list-item"
    >
    <v-container fluid class="pa-0">
      <v-row class="child-flex ma-0 pa-1">

        <!-- CHECKBOX -->
        <v-col cols="1" class="align-self-center justify-center text-center pl-5 pr-0 py-0">
          <v-checkbox
            class="text-center ma-0 pa-0"
            v-model="selected"
            dense
            :value="item"
            color="grey"
            hide-details
            on-icon="icon-check-square"
            off-icon="icon-square"
            @change="handleInput"
          />
        </v-col>

        <!-- ITEM TYPE -->
        <v-col cols="1" class="text-center align-self-center pa-0">
          <p class="caption grey--text font-italic mb-0">
            {{ $t(`dataPackage.${item.item_type}`) }}
          </p>
        </v-col>

        <!-- ITEM AVATAR -->
        <v-col cols="1" class="text-center align-self-center pa-0">
          <v-avatar size="22">
            <v-icon
              dark
              x-small
              :class="item.color || 'black'"
              >
              {{ item.icon || itemTexts[item.item_type].defaultIcon }}
            </v-icon>
          </v-avatar>
        </v-col>

        <!-- ITEM TITLE -->
        <v-col cols="3" class="text-left align-self-center pa-0">
          <p
            :class="`mb-0 mr-1 body-2 font-weight-medium ${item.color}--text`"
            >
            {{ getItemInfos(item, 'txt') }}
          </p>
        </v-col>

        <!-- ITEM INFOS -->
        <v-col cols="3" class="text-left align-self-center px-1 py-0">
          <p class="caption ma-0 grey--text">
            <span v-if="item.item_type === 'user'" class="font-weight-bold">
              {{ item.name }} {{ item.surname }}<br>
            </span>
            {{ getItemInfos(item, 'txtBis') }}<br>
          </p>
        </v-col>
        
        <!-- ACTION BUTTONS -->
        <v-col cols="3" class="text-center align-self-center px-1 py-0">
          <SearchAction
            v-for="(value, name) in buttons"
            v-if="canShowButton(name)"
            :key="name"
            :action="value"
            :disabled="isDisabled(name)"
            @itemAction="handleAction(name)"
          />
        </v-col>

        <!-- CUTTER WITH THIS... YOLO -->
        <v-btn
          fab
          absolute
          icon
          text
          right
          x-small
          elevation="0"
          class="flex align-self-center side-btn"
          >
          <v-icon
            small
            :class="`${customColor ? 'white' : 'grey'}--text`"
            >
            icon-more-vertical
          </v-icon>
        </v-btn>

      </v-row>

    </v-container>

    <!-- <v-speed-dial
      v-if="false"
      v-model="fabActivated"
      open-on-hover
      absolute
      right
      top
      direction="left"
      transition="slide-x-reverse-transition"
      >
      <template v-slot:activator>
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-model="fabActivated"
              color="info"
              elevation="0"
              class="pa-1"
              dark
              small
              icon
              v-bind="attrs"
              v-on="on"
              >
              <v-icon
                small
                v-if="fabActivated"
                >
                icon-clear
              </v-icon>
              <v-icon
                small
                v-else
                >
                icon-more-vertical
              </v-icon>
            </v-btn>
          </template>
          <span>
            {{ $t('buttons.selectedOptions')}}
          </span>
        </v-tooltip>
      </template>
      <SearchAction
        v-for="(value, name) in buttons"
        v-if="itemTexts[item.item_type].actions.includes(name)"
        :key="name"
        :action="value"
      />
    </v-speed-dial> -->
  </v-card>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'SearchListItem',
    props: [
      'item',
      'hidden',
      'itemTexts',
      'getItemInfos',
      // 'actionBtns',
      'buttons',
      'customColor',
      'relatedSpace',
      'relatedItem',
    ],
    model: {
      prop: 'hidden',
      event: 'blur'
    },
    components: {
      SearchAction: () => import(/* webpackChunkName: "SearchAction" */ '@/components/searches/SearchAction.vue'),
    },
    watch: {
      hidden(val, prev) {
        // this.log && console.log('\nC-SearchListItem > watch > hidden > this.hidden :' , this.hidden)
        this.selected = this.hidden
      },
    },
    data () {
      return {
        fabActivated: false,
        selected: undefined,
      }
    },
    beforeMount () {
      // this.log && console.log('\nC-SearchListItem > beforeMount > this.hidden :' , this.hidden)
      this.selected = this.hidden
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
        user: (state) => state.user.userData,
      }),
      ...mapGetters({
        headerUser: 'user/headerUser',
      }),
    },
    methods: {
      handleInput(val) {
        // this.log && console.log('\nC-SearchListItem > changeSelection > val :' , val)
        // this.log && console.log('C-SearchListItem > changeSelection > this.selected :' , this.selected)
        this.$emit('blur', val)
      },
      canShowButton(name) {
        // this.log && console.log('\nC-SearchListItem > canShowButton > name :' , name)
        const btnItemTexts = this.itemTexts[this.item.item_type]
        // this.log && console.log('C-SearchListItem > canShowButton > btnItemTexts :' , btnItemTexts)
        const includes = btnItemTexts.actions.includes(name)
        
        const btnDef = this.buttons[name]
        const ignore = this.relatedSpace && btnDef.ignoreForSpaces && btnDef.ignoreForSpaces.includes(this.relatedSpace)

        let canShowRules = true
        let showRules = btnDef.showRules
        // this.log && console.log('C-SearchListItem > canShowButton > showRules :' , showRules)
        if ( !ignore && showRules ) {
          // this.log && console.log('C-SearchListItem > canShowButton > btnDef :' , btnDef)
          let bools = showRules.map( rule => {
            // this.log && console.log('C-SearchListItem > canShowButton > rule :' , rule)
            let item = name === 'invite' ? this.relatedItem : this.item
            let user = name === 'invite' ? this.item : this.user
            // this.log && console.log('C-SearchListItem > canShowButton > item :' , item)
            // this.log && console.log('C-SearchListItem > canShowButton > user :' , user)
            return rule(item, user)
          })
          // this.log && console.log('C-SearchListItem > canShowButton > bools :' , bools)
          canShowRules = bools.every(Boolean)
        }
        return includes && !ignore && canShowRules
      },
      isDisabled(name) {
        const btnDef = this.buttons[name]
        // this.log && console.log('C-SearchListItem > isDisabled > btnDef :' , btnDef)
        return btnDef.disabled
      },
      handleAction(val) {
        this.log && console.log('\nC-SearchListItem > handleAction > val :' , val)
        this.log && console.log('C-SearchListItem > handleAction > this.item :' , this.item)
        this.log && console.log('C-SearchListItem > handleAction > this.relatedSpace :' , this.relatedSpace)
        this.log && console.log('C-SearchListItem > handleAction > this.relatedItem :' , this.relatedItem)
        this.log && console.log('C-SearchListItem > handleAction > this.user :' , this.user)
        
        let itemType = this.item.item_type
        // let basicAction = {
        //   action: val,
        //   related_space: this.relatedSpace,
        //   invitation_to_item_type: this.relatedItem && this.relatedItem.item_type,
        //   invitation_to_item_id: this.relatedItem && this.relatedItem.id,
        //   item_id: this.item.id,
        //   item_type: this.item.item_type
        // }
        // this.log && console.log('C-SearchListItem > handleAction > basicAction :' , basicAction)
        
        let targetType = this.relatedItem.item_type
        let payload = {
          message: '...',
          invitation_to_item_type: this.relatedItem.item_type,
          invitation_to_item_id: this.relatedItem.id,
          invitor_id: this.user.id,
          invitees: [ 
            { 
              invitee_type: this.item.item_type,
              invitee_id: this.item.id,
              invitee_email: this.item.email,
            }
          ]
        }
        this.log && console.log('C-SearchListItem > handleAction > addToGroup > payload :' , payload)
        let url = `${this.api[targetType + 's']}/${this.relatedItem.id}/invite`

        switch (val) {
          // case 'addToGroup' :
          //   this.log && console.log('C-SearchListItem > handleAction > addToGroup > url :' , url)
          //   this.$axios.post( url, payload, this.headerUser)
          //     .then(resp => {
          //       this.log && console.log('C-SearchListItem > handleAction > resp.data : ', resp.data)
          //     })
          //   break
          case 'invite' :
            this.log && console.log('C-SearchListItem > handleAction > invite > url :' , url)
            this.$axios.post( url, payload, this.headerUser)
              .then(resp => {
                this.log && console.log('C-SearchListItem > handleAction > resp.data : ', resp.data)
              })
            break
          case 'message' :
            break
          case 'add' :
            break
          case 'join' :
            break
          case 'comment' :
            break
          case 'link' :
            const specificPageFor = ['dataset', 'table']
            let to
            if (specificPageFor.includes(itemType)) {
              let addOn = itemType === 'table' ? `dataset/${this.item.dataset_id}/table/${this.item.id}` : `dataset/${this.item.id}`
              to = `/${addOn}`
            } else {
              to = `/${itemType}s#${this.item.id}`
            }
            this.log && console.log('C-SearchListItem > handleAction > link > to :' , to)
            this.$router.push(to)
            this.$emit('closeModal')
            break
        }
      }
    }
  }

</script>
