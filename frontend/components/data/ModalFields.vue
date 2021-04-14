<template>

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
          <!-- custom items list -->
          <template 
            v-if="model.options.custom"
            v-slot:item="{ item: selectItem }"
            >
            <v-icon v-if="model.options.prependIcon" small class="mr-3">
              {{ selectItem }}
            </v-icon>

            <v-icon v-if="model.options.prependColor" small class="mr-3" :color="selectItem">
              icon-square1
            </v-icon>

            <span v-if="model.options.translateText">
              {{ $t(selectItem[model.options.text]) }}
            </span>
            <span v-if="!model.options.translateText">
              {{ selectItem }}
            </span>

          </template>

          <!-- custom selected item -->
          <template 
            v-if="model.options.custom"
            v-slot:selection="{ item: selectedItem }"
            >
            <v-icon v-if="model.options.prependIcon" small class="mr-3">
              {{ selectedItem }}
            </v-icon>

            <v-icon v-if="model.options.prependColor" small class="mr-3" :color="selectedItem">
              icon-square1
            </v-icon>

            <span v-if="model.options.translateText">
              {{ $t(selectedItem[model.options.text]) }}
            </span>
            <span v-if="!model.options.translateText">
              {{ selectedItem }}
            </span>

          </template>

        </v-select>
      </v-col>

    </v-row>
  </v-container>

</template>

<script>

  export default {
    name: 'ModalFields',
    props: [
      'item',
      'itemModel'
    ],
    data () {
      return {
        localItem: this.item,
        dialog: false,
        tab: null,
      }
    },
  }
</script>
