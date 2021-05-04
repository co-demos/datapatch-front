<template>

  <div>

    <v-row class="align-top justify-center mt-12">
      
      <v-col cols="12" class="text-center">
        <p class="text-h5">
          {{ $t('roadmap.title') }}
        </p>
      </v-col>

      <v-col cols="4" class="justify-text">
        <p class="body-2">
          {{ $t('roadmap.roadmapTxt') }}
        </p>
      </v-col>
      <v-col cols="4" class="justify-text">
        <p class="body-2">
          {{ $t('roadmap.roadmapTxt_bis') }}
        </p>
      </v-col>
      <v-col cols="8" class="justify-text">
        <p class="body-2">
          {{ $t('roadmap.roadmapTxt_ter') }}
        </p>
      </v-col>

    </v-row>

    <v-row class="align-top justify-center mb-12">
      <v-col cols="8" class="">

        <v-timeline
          align-top
          dense
          >
          <!-- :dense="$vuetify.breakpoint.smAndDown" -->

          <v-timeline-item
            v-for="(step, i) in roadmapSteps"
            :key="i"
            :color="step.color"
            small
            >
            <v-row>

              <v-col cols="4" class="text-body-2 text-center">
                <p class="text-caption">
                  <strong
                    :class="`font-weigth-bold ${step.color}--text`"
                    >
                    {{ step.version}}
                  </strong><br>
                  <span>
                    {{ step.date }}
                  </span><br>
                  <span class="grey--text">
                    {{ $t(step.status) }}
                  </span>
                </p>
              </v-col>

              <v-col cols="8">
                <h5 :class="`font-weight-bold ${step.color}--text mb-1`">
                  {{ $t(step.title) }}
                </h5>
                <p class="caption py-1 mb-0">
                  <v-chip
                    v-for="tag in step.tags"
                    :key="tag"
                    x-small
                    dark
                    :color="step.color"
                    class="mb-1 mr-1"
                    v-html="tag"
                  />
                </p>
                <p class="caption pt-1">
                  {{ $t(step.text) }}
                </p>
              </v-col>

            </v-row>
          </v-timeline-item>
        </v-timeline>

      </v-col>
    </v-row>

  </div>
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
            version: 'v.dev.0.1',
            status: 'roadmap.inDev',
            title: 'roadmap.coreFunctions',
            text: 'roadmap.coreFunctionsTxt',
            date: '04/2021-05/2021',
            tags: ['core', 'tech'],
          },
          {
            color: 'grey',
            version: 'v.dev.0.2',
            status: 'roadmap.inDev',
            title: 'roadmap.authFunctions',
            text: 'roadmap.authFunctionsTxt',
            date: '05/2021',
            tags: ['core'],
          },
          {
            color: 'grey',
            version: 'v.dev.0.3',
            status: 'roadmap.inDev',
            title: 'roadmap.moderation',
            text: 'roadmap.moderationTxt',
            date: '06/2021',
            tags: ['core', 'collaboration'],
          },
          {
            color: 'grey',
            version: 'v.dev.1.0',
            status: 'roadmap.inDev',
            title: 'roadmap.collaboration',
            text: 'roadmap.collaborationTxt',
            date: '06/2021',
            tags: ['core', 'collaboration'],
          },
          {
            color: 'grey',
            version: 'v.dev.1.1',
            status: 'roadmap.inDev',
            title: 'roadmap.schemas',
            text: 'roadmap.schemasTxt',
            date: '06/2021',
            tags: ['core', 'data'],
          },
          {
            color: 'grey',
            version: 'v.beta.1.0',
            status: 'roadmap.inRoadmap',
            title: 'roadmap.tutos',
            text: 'roadmap.tutosTxt',
            date: '07/2021',
            tags: ['ux'],
          },
          {
            color: 'grey',
            version: 'v.beta.1.1',
            status: 'roadmap.inRoadmap',
            title: 'roadmap.unitTests',
            text: 'roadmap.unitTestsTxt',
            date: '07/2021',
            tags: ['dev', 'tech'],
          },
          {
            color: 'secondary',
            version: 'v.beta.1.2',
            status: 'roadmap.inRoadmap',
            title: 'roadmap.betaVersion',
            text: 'roadmap.betaVersionTxt',
            date: '07/2021',
            tags: ['prod'],
          },
          {
            color: 'grey',
            version: 'v.beta.2.0',
            status: 'roadmap.inRoadmap',
            title: 'roadmap.feedbacks',
            text: 'roadmap.feedbacksTxt',
            date: '08/2021',
            tags: ['prod', 'ux'],
          },
          {
            color: 'secondary',
            version: 'v.1.0',
            status: 'roadmap.inRoadmap',
            title: 'roadmap.v1Version',
            text: 'roadmap.v1VersionTxt',
            date: '08/2021',
            tags: ['prod', 'ux'],
          },
          {
            color: 'grey',
            version: 'v.1.1',
            status: 'roadmap.inLongRun',
            title: 'roadmap.docSite',
            text: 'roadmap.docSiteTxt',
            date: '09/2021',
            tags: ['tech'],
          },
          {
            color: 'warning',
            version: 'v.2.0',
            status: 'roadmap.inLongRun',
            title: 'roadmap.versionning',
            text: 'roadmap.versionningTxt',
            date: '2021-2022',
            tags: ['data', 'tech', 'versionning'],
          },
          {
            color: 'warning',
            version: 'v.3.0',
            status: 'roadmap.inLongRun',
            title: 'roadmap.decentralized',
            text: 'roadmap.decentralizedTxt',
            date: '2021-2022',
            tags: ['data', 'tech'],
          },
          {
            color: 'warning',
            version: 'v.4.0',
            status: 'roadmap.inLongRun',
            title: 'roadmap.templates',
            text: 'roadmap.templatesTxt',
            date: '2021-2022',
            tags: ['data', 'dataviz'],
          },
          {
            color: 'warning',
            version: 'v.5.0',
            status: 'roadmap.inLongRun',
            title: 'roadmap.admin',
            text: 'roadmap.adminTxt',
            date: '2022',
            tags: ['admin', 'ux'],
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
