<template>
  <div>
    <!-- - hidden: <code>{{ hidden }}</code><br> -->
    <!-- - selected: <code>{{ selected }}</code> -->
    <SearchListItem
      v-for="item in hidden.filter( i => i && !i.header )"
      :key="`${item.item_type}-${item.id}`"
      v-model="selected"
      :item="item"
      :itemTexts="itemTexts"
      :getItemInfos="getItemInfos"
      :buttons="buttons"
    />
  </div>
</template>

<script>

  export default {
    name: 'SearchList',
    props: [
      'hidden',
      'itemTexts',
      'getItemInfos',
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
        buttons: {
          link: {
            icon: 'icon-external-link',
            tooltip: 'buttons.link',
          },
          add: {
            icon: 'icon-plus',
            tooltip: 'buttons.add',
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
