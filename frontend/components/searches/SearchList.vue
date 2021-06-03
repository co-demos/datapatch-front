<template>
  <v-row class="align-top justify-center">

    <!-- - hidden: <code>{{ hidden }}</code><br> -->
    <!-- - selected: <code>{{ selected }}</code> -->
    <!-- - filters: <code>{{ filters }}</code> -->

    <v-col cols="12" class="mb-1">
      <v-row class="ma-0 pl-2 pr-1 justify-center align-center">
        <v-col cols="1" class="pl-6">
          <v-tooltip 
            right
            >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                :outlined="!customColor"
                :class="`${btnActions ? (customColor ? 'white' : 'grey') : (customColor ? '' : 'white')}`"
                v-bind="attrs"
                v-on="on"
                @click.stop="btnActions = !btnActions "
                >
                <v-icon
                  small
                  :class="`${btnActions ? (customColor ? 'primary' : 'white') : (customColor ? 'white' : 'grey')}--text`"
                  >
                  icon-check-square
                </v-icon>
              </v-btn>
            </template>
            {{ $t('buttons.groupedActions')}}
          </v-tooltip>
        </v-col>
        <v-col cols="10" class="text-center">
          <span
            :class="`font-weight-bold ${customColor ? 'white' : 'grey'}--text`"
            >
            {{ $t('buttons.yourSelection') }}
          </span>
        </v-col>
        <v-col cols="1" class="text-right">
          <v-tooltip 
            left
            >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                small
                :outlined="!customColor"
                :class="`${btnFilters ? (customColor ? 'white' : 'grey') : (customColor ? '' : 'white')}`"
                v-bind="attrs"
                v-on="on"
                @click.stop="btnFilters = !btnFilters "
                >
                <v-icon
                  small
                  :class="`${btnFilters ? (customColor ? 'primary' : 'white') : (customColor ? 'white' : 'grey')}--text`"
                  >
                  icon-filter
                </v-icon>
              </v-btn>
            </template>
            {{ $t('buttons.selectionFilters')}}
          </v-tooltip>
        </v-col>
      </v-row>
    </v-col>

    <v-row class="ma-0">
      <v-expand-transition>
        <v-col 
          v-show="btnActions"
          cols="6"
          class="pt-0"
          >
          btnActions
        </v-col>
      </v-expand-transition>

      <v-expand-transition>
        <v-col 
          v-show="btnFilters"
          cols="6"
          class="pt-0"
          >
          btnFilters
        </v-col>
      </v-expand-transition>
    </v-row>

    <v-col cols="12" class="pt-0">
      <SearchListItem
        v-for="item in hidden.filter( i => i && !i.header )"
        :key="`${item.item_type}-${item.id}`"
        v-model="selected"
        :item="item"
        :itemTexts="itemTexts"
        :getItemInfos="getItemInfos"
        :buttons="buttons"
      />
    </v-col>
  </v-row>
</template>

<script>

  export default {
    name: 'SearchList',
    props: [
      'hidden',
      'itemTexts',
      'getItemInfos',
      'customColor',
      'filters',
      // 'actionBtns'
    ],
    components: {
      SearchListItem: () => import(/* webpackChunkName: "SearchListItem" */ '@/components/searches/SearchListItem.vue'),
    },
    model: {
      prop: 'hidden',
      event: 'blur'
    },
    data () {
      return {
        selected: [],
        btnActions: false,
        btnFilters: false,
        buttons: {
          link: {
            icon: 'icon-external-link',
            tooltip: 'buttons.link',
          },
          add: {
            icon: 'icon-plus',
            tooltip: 'buttons.add',
          },
          addToGroup: {
            icon: 'icon-user-plus',
            tooltip: 'buttons.addToGroup',
          },
          // share: {
          //   icon: 'icon-share',
          //   tooltip: 'buttons.share'
          // },
          join: {
            icon: 'icon-user-check',
            tooltip: 'buttons.join',
          },
          invite: {
            icon: 'icon-user-plus',
            tooltip: 'buttons.invite',
          },
          message: {
            icon: 'icon-mail',
            tooltip: 'buttons.message'
          },
          comment: {
            icon: 'icon-message-square',
            tooltip: 'buttons.comment'
          },
        }
      }
    },
    methods: {
      handleInput(val) {
        this.$emit('blur', val)
      },
      changeSelection(val) {
        this.log && console.log('\nC-SearchList > changeSelection > val :' , val)

      },
    }
  }

</script>
