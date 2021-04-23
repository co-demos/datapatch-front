<template>
  <div>

    <v-row
      class="align-center"
      >

      <v-col cols="2" class="pa-0 text-left">
        <v-icon x-small class="ml-1">
          {{ fieldIcon(header.type) }}
        </v-icon>
      </v-col>

      <v-col cols="8" class="pa-0 text-center">
        <v-btn
          text
          plain
          small
          class="text-none black--text"
          @click="dialog += 1"
          >
          <span class="text-body-1 font-weight-bold">
            {{ header.title }}
          </span>
        </v-btn>
      </v-col>

      <v-col cols="1" class="pa-0 text-right">
          <v-icon small class="grey--text">
            icon-more-vertical
          </v-icon>
      </v-col>

    </v-row>

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

  </div>
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
