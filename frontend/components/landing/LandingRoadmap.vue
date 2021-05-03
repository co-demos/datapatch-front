<template>

  <v-row class="align-top my-12">
    
    <v-col cols="12" class="text-center mb-5">
      <p class="text-h5">
        {{ $t('roadmap.title') }}
      </p>
    </v-col>

    <v-col cols="12" class="">

      <v-timeline>
        <v-timeline-item
          v-for="(step, i) in roadmapSteps"
          :key="i"
          :color="step.color"
          small
          >
          <template v-slot:opposite>
            <p
              :class="`h6 font-weight-bold ${step.color}--text mb-1`"
              >
              <span
                v-text="step.date"
              ></span>
              -
              <span
                v-text="step.version"
              ></span>
            </p>
            <p
              :class="`body-2 font-weight-bold grey--text`"
              >
              <span>
                {{ step.status }}
              </span>
            </p>
          </template>

          <div class="py-4">
            <h2 :class="`headline font-weight-light mb-4 ${step.color}--text`">
              {{ step.title }}
            </h2>
            <div>
              {{ step.text }}
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>

    </v-col>

  </v-row>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'LandingRoadmap',
    props: [],
    data () {
      return {
        roadmapSteps: [
          {
            color: 'primary',
            version: 'v.beta.01',
            status: 'roadmap.inDev',
            title: 'roadmap.coreFunctions',
            text: 'roadmap.coreFunctionsTxt',
            date: '05/2021',
          },
          {
            color: 'grey',
            version: 'v.beta.02',
            status: 'roadmap.inDev',
            title: 'roadmap.collaboration',
            text: 'roadmap.collaborationTxtt',
            date: '06/2021',
          },
          {
            color: 'grey',
            version: 'v.beta.03',
            status: 'roadmap.inRoadmap',
            title: 'roadmap.betaVersion',
            text: 'roadmap.betaVersionTxt',
            date: '07/2021',
          },
        ],
      }
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        userData: (state) =>  state.user.userData,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated'
      })
    },
  }

</script>
