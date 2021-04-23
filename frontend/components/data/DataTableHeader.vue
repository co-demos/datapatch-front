<template>
  <v-row
    class="pl-3 pr-1 align-center"
    >

    <v-col class="pa-0">
      <span class="text-body-1 font-weight-bold">
      {{ header.title }}
      </span>
    </v-col>
    <v-spacer/>
    <v-col class="pa-0 text-right">
      <v-btn
        icon
        text
        small
        @click="dialog += 1"
        >
        <v-icon small class="grey--text">
          icon-more-vertical
        </v-icon>
      </v-btn>
    </v-col>

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

  </v-row>
</template>

<script>

  import { mapState } from 'vuex'
  import { Field } from '@/utils/utilsFields'
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
      this.log && console.log(`C-DataTableHeader > beforeMount > this.itemModel : `, this.itemModel)
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
      // }
    }
  }

</script>
