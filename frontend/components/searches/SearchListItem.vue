<style scoped>
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
    class="mb-2 selection"
    >
    <v-container fluid class="pa-0">
      <v-row class="child-flex ma-0 pa-1">

        <!-- CHECKBOX -->
        <v-col cols="1" class="align-self-center justify-center text-center pl-5 pr-0 py-0">
          <v-checkbox
            class="text-center ma-0"
            v-model="selected"
            :value="item"
            color="grey"
            hide-details
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
            <span v-if="item.item_type === 'user'">
              {{ item.name }} {{ item.surname }}<br>
            </span>
            {{ getItemInfos(item, 'txtBis') }}<br>
          </p>
        </v-col>

        <v-col cols="3" class="text-center align-self-center px-1 py-0">
          <SearchAction
            v-for="(value, name) in buttons"
            v-if="itemTexts[item.item_type].actions.includes(name)"
            :key="name"
            :action="value"
            @itemAction="handleAction(name)"
          />
        </v-col>

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
      'customColor'
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
      handleAction(val) {
        this.log && console.log('\nC-SearchListItem > handleAction > val :' , val)
        this.log && console.log('C-SearchListItem > handleAction > this.item :' , this.item)
      }
    }
  }

</script>
