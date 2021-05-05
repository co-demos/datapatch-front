<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600"
      >

      <v-card
        color="warning"
        dark
        >

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

        <!-- TITLE MODAL -->
        <v-card-title class="headline justify-center pt-0 mx-3 mb-6">
          {{ confirmDeleteTitle }}
        </v-card-title>

        <!-- MSG TEXT -->
        <v-card-text class="text-center">
          {{ confirmDeleteMsg }}
        </v-card-text>

        <!-- ITEM TO DELETE TEXT -->
        <v-card-text class="mt-2 mb-5 px-12">
          <v-alert
            class="mx-8"
            color="white"
            >
            <v-row
              class="align-center wrap flex-grow-1"
              >
              <v-col cols="3" class="text-center">
                <ItemAvatar
                  :item="itemToDelete"
                  :hover="false"
                  :heightAvatar="50"
                />
              </v-col>
              <v-col cols="8" class="ml-2 text-left">
                <span class="text-h5 black--text font-weight-bold">
                {{ itemToDelete.title }}
                </span>
              </v-col>
            </v-row>
          </v-alert>
        </v-card-text>

        <v-card-actions class="mx-5 pb-5">
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
          <v-spacer></v-spacer>
          <v-btn
            color="white"
            class="px-3 warning--text"
            large
            tile
            elevation="0"
            @click="dialog = false, $emit('confirmDelete')"
            >
            {{ $t('buttons.deleteConfirm') }}
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-row>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'ModalDelete',
  props: [
    'parentDialog',
    'confirmDeleteTitle',
    'confirmDeleteMsg',
    'itemToDelete'
  ],
  watch: {
    parentDialog () {
      this.dialog = true
    },
  },
  data () {
    return {
      dialog: false,
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
    }),
  },
}
</script>
