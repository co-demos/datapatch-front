<style scoped>

.force-flat {
  box-shadow: none !important;
}

</style>


<template>

  <v-dialog
    v-model="dialog"
    max-width="800"
    overflowed
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    >
    <!-- MODAL TITLE -->
    <v-card class="mb-n8">
      
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
      <!-- <v-card-title class="headline pt-0 mb-2">
        <v-row class="align-center">
          <v-col cols="4" class="text-center">

            <ItemAvatar
              :item="localItem"
              :noAvatar="noAvatar"
              :hover="false"
              :heightAvatar="56"
            />

          </v-col>
          <v-col cols="7">
            <span
              :class="`${localItem.color || 'black'}--text`"
              >
              {{ localItem.title }}
            </span>
            <v-spacer/>
          </v-col>
        </v-row>
      </v-card-title> -->
      <v-card-title class="headline justify-center pt-0 mb-2">
        {{ $t('datasets.newDataset') }}
      </v-card-title>

      <!-- STEPPER -->
      <v-container>

        <v-stepper
          non-linear
          alt-labels
          v-model="e1"
          class="pb-0 force-flat"
          >

          <!-- STEPPER HEADERS -->
          <v-stepper-header 
            class="force-flat"
            >
            <template 
              v-for="(stepInfo, index) in stepsList"
              >
              <v-stepper-step
                :key="`${index}-step`"
                edit-icon="icon-check"
                edit-complete="icon-check"
                :complete="e1 > index"
                :step="index"
                editable
                >
                {{ $t(stepInfo.title) }}
              </v-stepper-step>
              <v-divider
                v-if="index + 1 !== stepsList.length"
                :key="index"
              />
            </template>
          </v-stepper-header>

          <v-divider/>

          <!-- STEPPER ITEMS -->
          <v-stepper-items class="force-flat">

            <v-stepper-content
              v-for="(stepInfo, index) in stepsList"
              :key="`${index}-content`"
              :step="index"
              >

              <!-- REAL STEPPER CONTENTS -->
              <v-card
                fill-height
                class="mt-0 mb-4"
                color="white"
                min-height="200px"
                elevation="0"
                >

                <template v-if="stepInfo.component === 'importType'">
                  <div class="mt-5 mb-8">
                    <DatasetImportOptions
                      @setImportFormat="setImportFormat"
                    />
                  </div>
                </template>

                <template v-if="stepInfo.component === 'fileImport'">
                  {{ stepInfo.component }} - importType : {{ importType }}
                </template>

                <template v-if="stepInfo.component === 'datasetMeta'">
                  <ModalTabs
                    :appendTitle="true"
                    :tabsSpaces="tabsSpaces"
                    :localItem="localItem"
                    :itemType="itemType"
                    :itemModel="itemModel"
                    :apiUrl="apiUrl"
                    :action="action"
                  />
                </template>

                <template v-if="stepInfo.component === 'datasetCreate'">
                  {{ stepInfo.component }}
                </template>

              </v-card>

              <!-- BUTTONS BACK AND FORWARD -->
              <v-footer color="white" tile>
                <v-row>
                  <v-col>
                    <v-btn
                      color="grey darken-1"
                      class="px-3"
                      dark
                      block
                      large
                      tile
                      elevation="0"
                      @click="index === 0 ? dialog=false : backStep(index)"
                      >
                      <span v-if="index !== 0">
                        <v-icon medium class="mr-2 pb-1">
                          icon-chevron-left1
                        </v-icon>
                        {{ $t('buttons.back') }}
                      </span>
                      <span v-else>
                        <v-icon medium class="mr-2 pb-1">
                          icon-x
                        </v-icon>
                        {{ $t('buttons.cancel') }}
                      </span>
                    </v-btn>
                  </v-col>
                  <v-spacer/>
                  <v-col>
                    <v-btn
                      color="primary darken-1"
                      class="px-3"
                      dark
                      block
                      large
                      tile
                      elevation="0"
                      @click="index+1 === stepsList.length ? createItem() : nextStep(index)"
                      >
                      <span v-if="index+1 !== stepsList.length">
                        {{ $t('buttons.continue') }}
                        <v-icon medium class="ml-2 pb-1">
                          icon-chevron-right1
                        </v-icon>
                      </span>
                      <span v-else>
                        <v-icon medium class="mr-2 pb-1">
                          icon-check-square
                        </v-icon>
                        {{ $t('buttons.create') }}
                      </span>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-footer>
            </v-stepper-content>



          </v-stepper-items>
        </v-stepper>

      </v-container>

    </v-card>

    <v-footer inset color="blue">
      test
    </v-footer>

  </v-dialog>

</template>


<script>

import { mapState } from 'vuex'

export default {
  name: 'ModalCreateDataset',
  components: {
    DatasetImportOptions: () => import(/* webpackChunkName: "DatasetImportOptions" */ '@/components/buttons/DatasetImportOptions.vue'),
  },
  props: [
    'item',
    'fromWorkspace',
    'itemModel',
    'parentDialog',
    'itemType',
    'action',
    'apiUrl',
    'noAvatar'
  ],
  watch: {
    item () {
      this.localItem = { ...this.item }
    },
    steps (val) {
      if (this.e1 > val) {
        this.e1 = val
      }
    },
    parentDialog () {
      this.dialog = true
    },
  },
  data () {
    return {
      localItem: undefined,
      dialog: false,
      e1: 0,
      tabsSpaces: [],
      stepsList: [
        { title: 'datasets.stepChoose', component: 'importType' },
        { title: 'datasets.stepImport', component: 'fileImport' },
        { title: 'datasets.stepMeta', component: 'datasetMeta' },
        { title: 'datasets.stepCreateEnd', component: 'datasetCreate' },
      ],
      importType: undefined,
    }
  },
  computed: {
    ...mapState({
      log: (state) => state.log,
    }),
  },
  beforeMount () {
    this.localItem = { ...this.item }
    this.tabsSpaces = Object.keys(this.itemModel)
  },
  methods: {
    backStep (n) {
      this.e1 = n - 1
    },
    nextStep (n) {
      if (n === this.stepsList.length) {
        this.e1 = 1
      } else {
        this.e1 = n + 1
      }
    },
    setImportFormat(value) {
      this.log && console.log(`C-ModalCreateDataset > setImportFormat :`, value)
      this.importType = value
      this.e1 += 1
    },
    createItem() {
      this.log && console.log(`C-ModalCreateDataset > createDataset > this.localItem :`, this.localItem)
      this.dialog = false
      this.$emit('createItem', this.localItem)
    },
  }
}
</script>
