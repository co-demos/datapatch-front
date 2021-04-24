<template>
  <span>

    <v-btn
      text
      plain
      small
      class="text-none black--text ma-0"
      @click="dialog += 1"
      >
      <v-icon x-small class="grey--text">
        {{ fieldIcon(header.type) }}
      </v-icon>
      <span class="mx-5 text-body-1 font-weight-bold">
        {{ header.text }}
      </span>
      <v-icon small class="grey--text">
        icon-more-vertical
      </v-icon>
    </v-btn>

    <ModalItem
      :parentDialog="dialog"
      :item="header"
      :itemModel="itemModel"
      :itemType="itemType"
      :action="'update'"
      :apiUrl="api.field"
      :noAvatar="true"
      :onlyLocalUpdate="true"
    />

  </span>
</template>

<script>

  import { mapState } from 'vuex'
  import { Field, FindFieldIcon } from '@/utils/utilsFields'
  import { configHeaders } from '@/utils/utilsAxios'

  export default {
    name: 'DataTableHeader',
    props: [
      'header',
      // 'hidden'
    ],
    // model: {
    //   prop: 'hidden',
    //   event: 'blur'
    // },
    data () {
      return {
        dialog: 0,
        itemType: 'fields',
        itemModel: undefined,
      }
    },
    beforeMount () {
      let emptyField = new Field()
      this.itemModel = {
        infos: emptyField.infos,
        auth: emptyField.auth,
        meta: emptyField.meta,
      }
      // this.log && console.log(`C-DataTableHeader > beforeMount > this.itemModel : `, this.itemModel)
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
      }),
    },
    methods: {
      // handleInput (value) {
      //   this.$emit('blur', value)
      // },
      fieldIcon (type) {
        return FindFieldIcon(type)
      },
    }
  }

</script>
