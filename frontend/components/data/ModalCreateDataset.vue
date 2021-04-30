<style scoped>

.force-flat {
  box-shadow: none !important;
}

.no-shadow {
  box-shadow: none !important;
}
.no-color {
  background-color: none !important;
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
    <v-card class="">
      
      <!-- CLOSE MODAL -->
      <v-card-actions class="mr-5 pt-5 pb-0 px-0">
        <v-spacer></v-spacer>
        <v-btn
          icon
          large
          rounded
          elevation="0"
          @click="dialog = false"
          >
          <v-icon>
            icon-clear
          </v-icon>
        </v-btn>
      </v-card-actions>

      <!-- TITLE MODAL -->
      <v-card-title class="headline justify-center pt-0 mb-2">
        {{ $t('datasets.newDataset') }}
      </v-card-title>

      <!-- DEBUGGING -->
      <v-row class="text-caption" v-if="false">
        <v-col cols="12">
          <h5>
            <hr> DEBUG FROM : ModalCreateDataset
          </h5>
        </v-col>
        <v-col cols="3">
          fromWorkspace: <code>{{ fromWorkspace }}</code><br>
          itemType: <code>{{ itemType }}</code><br>
          action: <code>{{ action }}</code><br>
          apiUrl: <code>{{ apiUrl }}</code><br>
          presetCreate: <code>{{ presetCreate }}</code><br>
        </v-col>
        <v-col cols="3">
          item (prop): <br>
          <code><pre>{{ item }}</pre></code>
        </v-col>
        <v-col cols="3">
          localItem (copy of item): <br>
          <code><pre>{{ localItem }}</pre></code>
        </v-col>
        <v-col cols="3">
          importType: <code>{{ importType }}</code><br>
          dataImport: <br>
          <code><pre>{{ 
            dataImport && dataImport.length > 0 && dataImport.map( d => {
              return {
                title: d.title,
                tableFieldsLlength: d.tableFields.length,
                tableDataLlength: d.tableData.length,
                // tableFields: d.tableFields.map( tf => { return { value : tf.value } } ),
                // tableData: d.tableData.map( td => { return { name : td.name } } ),
              }
            })
          }}
          </pre></code><br>
          datasetMeta: <code>{{ datasetMeta }}</code><br>
        </v-col>
      </v-row>
      <!-- <hr> -->


      <!-- STEPPER -->
      <v-container class="pa-0">

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
                error-icon="icon-alert-triangle"
                edit-complete="icon-check"
                :complete="e1 > index"
                :step="index"
                :rules="stepInfo.rules"
                editable
                @click="addToVisited(e1)"
                >
                <span
                  class="text-center"
                  >
                  {{ $t(stepInfo.title) }}
                </span>
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
              class="px-0"
              >

              <!-- REAL STEPPER CONTENTS -->
              <v-card
                fill-height
                class="mt-0 mb-4"
                color="white"
                min-height="200px"
                elevation="0"
                >

                <!-- SET IMPORT OPTION -->
                <div v-show="stepInfo.component === 'importType'">
                  <div class="mt-8 mb-8">
                    <DatasetImportOptions
                      :presetCreate="presetCreate"
                      @setImportFormat="setImportFormat"
                    />
                  </div>
                </div>

                <!-- SET IMPORT DATA -->
                <div v-show="stepInfo.component === 'dataImport'">
                  <div class="mt-5 mb-8">
                    <DatasetImportData
                      :datasetItem="localItem"
                      :importType="importType"
                      @setDataImport="setDataImport"
                    />
                  </div>
                </div>

                <!-- SET METADATA -->
                <div v-show="stepInfo.component === 'datasetMeta'">
                  <v-row class="mt-8 mx-5 justify-center">
                    <v-col cols="8">
                      <ModalTabs
                        :appendTitle="true"
                        :tabsSpaces="tabsSpaces"
                        :localItem="localItem"
                        :itemType="itemType"
                        :itemModel="itemModel"
                        :apiUrl="apiUrl"
                        :action="action"
                      />
                    </v-col>
                  </v-row>
                </div>

                <!-- SET IMPORT OPTION -->
                <div v-show="stepInfo.component === 'datasetCreate'">
                  <!-- {{ stepInfo.component }} <br> -->
                  <div class="mt-5 mb-8">
                    <DatasetImportResume
                      :importType="importType"
                      :localItem="localItem"
                      :dataImport="dataImport"
                    />
                  </div>
                </div>

              </v-card>

            </v-stepper-content>
          </v-stepper-items>

        </v-stepper>
      </v-container>

      <!-- NAVIGATION STICKING TO BOTTOM -->
      <v-bottom-navigation 
        fixed
        background-color="transparent"
        class="px-5 pb-5 mb-5 no-shadow no-color"
        elevation="0"
        >

        <v-btn
          color="grey darken-1"
          class="px-3 mb-5"
          width="200"
          large
          tile
          elevation="0"
          @click="e1 === 0 ? dialog = false : backStep(e1)"
          >
          <span class="white--text text-body-2 font-weight-bold text-uppercase" v-if="e1 !== 0">
            <v-icon
              medium
              class="mr-2 pb-1"
              >
              icon-chevron-left1
            </v-icon>
            {{ $t('buttons.back') }}
          </span>
          <span class="white--text text-body-2 font-weight-bold text-uppercase" v-else>
            <v-icon medium class="mr-2 pb-1">
              icon-x
            </v-icon>
            {{ $t('buttons.cancel') }}
          </span>
        </v-btn>
        <v-spacer/>
        <v-btn
          color="primary darken-1"
          class="px-3 white--text"
          width="200"
          large
          tile
          elevation="0"
          @click="e1 + 1 === stepsList.length ? createItem() : nextStep(e1)"
          >
          <span class="white--text text-body-2 font-weight-bold text-uppercase" v-if="e1+1!== stepsList.length">
            {{ $t('buttons.continue') }}
            <v-icon
              medium
              class="ml-2 pb-1"
              >
              icon-chevron-right1
            </v-icon>
          </span>
          <span class="white--text text-body-2 font-weight-bold text-uppercase" v-else>
            {{ $t('buttons.create') }}
            <v-icon medium class="ml-2 pb-1">
              icon-chevron-right1
            </v-icon>
            <v-icon medium class="ml-2 pb-1">
              icon-save
            </v-icon>
          </span>
        </v-btn>

      </v-bottom-navigation>

    </v-card>
  </v-dialog>

</template>


<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'ModalCreateDataset',
    components: {
      DatasetImportOptions: () => import(/* webpackChunkName: "DatasetImportOptions" */ '@/components/data/imports/DatasetImportOptions.vue'),
      DatasetImportData: () => import(/* webpackChunkName: "DatasetImportData" */ '@/components/data/imports/DatasetImportData.vue'),
      DatasetImportResume: () => import(/* webpackChunkName: "DatasetImportResume" */ '@/components/data/imports/DatasetImportResume.vue'),
    },
    props: [
      'item',
      'fromWorkspace',
      'itemModel',
      'parentDialog',
      'itemType',
      'action',
      'apiUrl',
      'presetCreate'
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
      presetCreate(next, prev) {
        if (next !== prev) {
          this.importType = next
          this.nextStep(0)
        }
      }
    },
    beforeMount () {
      this.localItem = { ...this.item }
      this.tabsSpaces = Object.keys(this.itemModel)
      if (this.presetCreate) {
        this.importType = this.presetCreate
        this.nextStep(0)
      }
    },
    data () {
      return {
        dialog: false,
        
        e1: 0,
        tabsSpaces: [],
        visited: [],

        localItem: undefined,
        importType: undefined,
        
        dataImport: [],
        datasetMeta: undefined,

        stepsList: [
          { 
            title: 'datasets.stepChoose', 
            component: 'importType',
            rules: [() => this.visited.includes(0) ? !!this.importType : true ]
          },
          { 
            title: 'datasets.stepImport', 
            component: 'dataImport',
            rules: [() => this.visited.includes(1) ? !!this.dataImport : true ]
          },
          { 
            title: 'datasets.stepMeta', 
            component: 'datasetMeta',
          },
          { 
            title: 'datasets.stepCreateEnd', 
            component: 'datasetCreate',
            rules: [() => this.visited.includes(2) ? !!this.importType && !!this.dataImport : true ]
          },
        ],
      }
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
      }),
      ...mapGetters({
        userId: 'user/userId',
        headerUser: 'user/headerUser',
        getCurrentTables: 'tables/getCurrentTables',
      })
    },
    methods: {
      ...mapActions({
        setCurrentTables: 'tables/setCurrentTables'
      }),
      addToVisited (n) {
        let inidicesvisited = [ ...this.visited, n]
        this.visited = [ ...new Set(inidicesvisited) ]
      },
      backStep (n) {
        this.addToVisited(n)
        this.e1 = n - 1
      },
      nextStep (n) {
        this.addToVisited(n)
        if ( n + 1 === this.stepsList.length) {
        } else {
          this.e1 = n + 1
        }
      },
      setImportFormat(value) {
        // this.log && console.log(`C-ModalCreateDataset > setImportFormat :`, value)
        this.importType = value
        this.e1 += 1
      },
      setDataImport(tables) {
        this.log && console.log(`C-ModalCreateDataset > @setDataImport > tables :`, tables)
        this.dataImport = tables
        this.setCurrentTables(tables)
        // this.e1 += 1
      },
      createItem() {
        this.log && console.log(`C-ModalCreateDataset > createDataset > this.localItem :`, this.localItem)
        this.dialog = false
        let datasetPayload = {
          dataset: this.localItem,
          tables: this.dataImport
        }
        this.log && console.log(`C-ModalCreateDataset > createDataset > datasetPayload :`, datasetPayload)
        this.$emit('createItem', this.localItem)
      },
    }
  }
</script>
