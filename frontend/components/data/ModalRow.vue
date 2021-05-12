<template>
  <v-dialog
    v-model="dialog"
    overflowed
    max-width="700"
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

      <v-card-title class="py-0 mb-3">
        <v-row class="align-center">
          <!-- TITLE MODAL -->
          <v-col cols="12" class="text-center">
            {{ $t('row.edit') }}
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text class="my-4">

        onlyLocalUpdate : <code>{{ onlyLocalUpdate }}</code><br>
        <!-- localItem : <code><pre>{{ localItem }}</pre></code><br> -->
        <!-- itemModel : <code><pre>{{ itemModel.filter(h => !h.helpHeader) }}</pre></code><br> -->
        
        <ModalRowFields
          :item="localItem"
          :itemModel="itemModel.filter(h => !h.helpHeader)"
          :itemType="itemType"
          :apiUrl="api"
          :action="action"
          :onlyLocalUpdate="onlyLocalUpdate"
        />

      </v-card-text>

      <!-- BTNS -->
      <v-card-text>
        <v-row class="justify-center">
          <v-col cols="4" class="px-2">
            <v-btn
              color="grey darken-1"
              dark
              large
              block
              tile
              elevation="0"
              @click="dialog = false"
              >
              {{ $t('buttons.cancel') }}
            </v-btn>
          </v-col>
          <v-col cols="4" class="px-2">
            <v-btn
              color="primary darken-1"
              dark
              large
              block
              tile
              elevation="0"
              @click="saveItem()"
              >
              {{ $t(`buttons.${action}`) }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script>

import { mapState } from 'vuex'

export default {

  name: 'ModalRow',
  props: [
    'item',
    'itemModel',
    'itemType',
    'parentDialog',
    'action',
    'onlyLocalUpdate'
  ],
  watch: {
    item () {
      this.localItem = { ...this.item }
    },
    parentDialog () {
      this.dialog = true
    },
  },
  data () {
    return {
      localItem: undefined,
      dialog: false,
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
      api: (state) => state.api,
    }),
  },
  beforeMount () {
    this.localItem = { ...this.item }
  },
  methods: {
    saveItem() {
      let itemPayload = this.localItem
      this.dialog = false
      this.$emit('saveItem', itemPayload)
    },
  }
}

</script>
