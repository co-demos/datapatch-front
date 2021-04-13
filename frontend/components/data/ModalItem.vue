<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    >
    <v-card>
      <v-card-title class="headline pt-5 mb-3">
        <v-row class="align-center">
          <v-col cols="4" class="text-center">
            <v-avatar
              v-if="!noAvatar"
              :color="localItem.color || 'primary'"
              rounded
              size="56"
              >
              <v-icon dark v-if="localItem.icon" class="mx-3">
                {{ localItem.icon }}
              </v-icon>
              <span v-else class="white--text">
                {{ getInitials(localItem.name) }}
              </span>
            </v-avatar>
          </v-col>
          <v-col cols="8">
            <span>
              {{ localItem.name }}
            </span>
            <v-spacer/>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text class="py-0 mb-5">
        <v-container fluid pb-0>
          <!-- <pre>{{ itemModel }}</pre> -->
          <v-row
            v-for="model in itemModel"
            :key="model.name"
            v-if="model.inModal"
            dense
            class="align-top"
            >

            <v-col cols="4">
              <v-subheader>
                {{ $t(model.label) }} :
              </v-subheader>
            </v-col>
          
            <v-col cols="8">
              <v-text-field
                filled
                hide-details="auto"
                :disabled="model.readonly"
                v-if="model.field === 'text'"
                v-model="localItem[model.name]"
                dense
              />
              <v-textarea
                filled
                rows="3"
                class="mb-2"
                hide-details="auto"
                :disabled="model.readonly"
                v-if="model.field === 'textarea'"
                v-model="localItem[model.name]"
                dense
              />
              <v-select
                filled
                hide-details="auto"
                :disabled="model.readonly"
                clearable
                v-if="model.field === 'select'"
                v-model="localItem[model.name]"
                :items="model.options.items"
                :item-text="model.options.text"
                :item-value="model.options.value"
                dense
                >
                <template 
                  v-if="model.options.prependIcon || model.options.prependColor"
                  v-slot:item="{ item: selectItem }"
                  >
                  <v-icon v-if="model.options.prependIcon" small class="mr-3">
                    {{ selectItem }}
                  </v-icon>
                  <v-icon v-if="model.options.prependColor" small class="mr-3" :color="selectItem">
                    icon-square1
                  </v-icon>
                  <span>
                    {{ selectItem }}
                  </span>
                </template>
  
                <template 
                  v-if="model.options.prependIcon || model.options.prependColor"
                  v-slot:selection="{ item: selectedItem }"
                  >
                  <v-icon v-if="model.options.prependIcon" small class="mr-3">
                    {{ selectedItem }}
                  </v-icon>
                  <v-icon v-if="model.options.prependColor" small class="mr-3" :color="selectedItem">
                    icon-square1
                  </v-icon>
                  <span>
                    {{ selectedItem }}
                  </span>
                </template>

              </v-select>
            </v-col>

          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="mr-5 pb-5">
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
          @click="dialog = false"
          >
          {{ $t('buttons.save') }}
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>

import { initialsFromString } from '@/utils/utilsDatasets'

export default {

  name: 'ModalItem',
  props: [
    'item',
    'itemModel',
    'parentDialog',
    'noAvatar'
  ],
  watch: {
    parentDialog () {
      this.dialog = true
    }
  },
  data () {
    return {
      localItem: this.item,
      dialog: false
    }
  },
  methods: {
    getInitials(itemName) {
      return initialsFromString(itemName)
    },
  }
}

</script>
