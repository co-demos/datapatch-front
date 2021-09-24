<template>

  <div>

    <v-row class="LandingRoadmap align-top justify-center mt-12">
  
      <LandingTitle
        :title="'roadmap.title'"
        :current="'#LandingRoadmap'"
        :up="'#LandingUsecases'"
        :down="'#LandingStack'"
      />

      <v-col cols="8" class="justify-text">
        <v-card class="pa-10">
          <v-row class="justify-center">

            <v-col cols="6" class="justify-text">
              <p class="body-2 font-weight-bold"
                v-html="$t('roadmap.roadmapTxt')"
              />
            </v-col>

            <v-col cols="6" class="justify-text">
              <p class="body-2"
                v-html="$t('roadmap.roadmapTxt_bis')"
                />
            </v-col>

          </v-row>
        </v-card>
      </v-col>

      <v-col cols="8" class="justify-text my-5">
        <p class="body-2 white--text px-2"
          v-html="$t('roadmap.roadmapTxt_ter')"
        />
      </v-col>

    </v-row>

    <v-row class="align-top justify-center mb-12">
      <v-col cols="8" class="">
        <v-card class="pa-10"> 

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
                    <span
                      v-if="step.isNew"
                      >
                      <v-chip
                        dark
                        x-small
                        color="red"
                        class="mx-3"
                        >
                        <span class="font-weight-bold">
                          {{ $t('roadmap.new') }}
                        </span>
                      </v-chip>
                      <br>
                    </span>
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
        </v-card>

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
            date: '04/2021-06/2021',
            tags: ['core', 'tech'],
          },
          {
            isNew: true,
            color: 'primary',
            version: 'v.dev.0.2',
            status: 'roadmap.inDev',
            title: 'roadmap.authFunctions',
            text: 'roadmap.authFunctionsTxt',
            date: '09/2021',
            tags: ['core'],
          },
          {
            isNew: true,
            color: 'primary',
            version: 'v.dev.0.3',
            status: 'roadmap.inDev',
            title: 'roadmap.collaboration',
            text: 'roadmap.collaborationTxt',
            date: '09/2021',
            tags: ['core', 'collaboration'],
          },
          {
            color: 'grey',
            version: 'v.dev.0.4',
            status: 'roadmap.inDev',
            title: 'roadmap.moderation',
            text: 'roadmap.moderationTxt',
            date: '10/2021',
            tags: ['core', 'collaboration'],
          },
          {
            color: 'grey',
            version: 'v.dev.1.1',
            status: 'roadmap.inDev',
            title: 'roadmap.schemas',
            text: 'roadmap.schemasTxt',
            date: '11/2021',
            tags: ['core', 'data'],
          },
          {
            color: 'grey',
            version: 'v.beta.1.0',
            status: 'roadmap.inRoadmap',
            title: 'roadmap.tutos',
            text: 'roadmap.tutosTxt',
            date: '12/2021',
            tags: ['ux'],
          },
          {
            color: 'grey',
            version: 'v.beta.1.1',
            status: 'roadmap.inRoadmap',
            title: 'roadmap.unitTests',
            text: 'roadmap.unitTestsTxt',
            date: '01/2022',
            tags: ['dev', 'tech'],
          },
          {
            color: 'secondary',
            version: 'v.beta.1.2',
            status: 'roadmap.inRoadmap',
            title: 'roadmap.betaVersion',
            text: 'roadmap.betaVersionTxt',
            date: '01/2022',
            tags: ['prod'],
          },
          {
            color: 'grey',
            version: 'v.beta.2.0',
            status: 'roadmap.inRoadmap',
            title: 'roadmap.feedbacks',
            text: 'roadmap.feedbacksTxt',
            date: '2021-2022',
            tags: ['prod', 'ux'],
          },
          {
            color: 'secondary',
            version: 'v.1.0',
            status: 'roadmap.inRoadmap',
            title: 'roadmap.v1Version',
            text: 'roadmap.v1VersionTxt',
            date: '2022',
            tags: ['prod', 'ux'],
          },
          {
            color: 'grey',
            version: 'v.1.1',
            status: 'roadmap.inLongRun',
            title: 'roadmap.docSite',
            text: 'roadmap.docSiteTxt',
            date: '2022',
            tags: ['tech'],
          },
          {
            color: 'warning',
            version: 'v.2.0',
            status: 'roadmap.inLongRun',
            title: 'roadmap.versionning',
            text: 'roadmap.versionningTxt',
            date: '2022',
            tags: ['data', 'tech', 'versionning'],
          },
          {
            color: 'warning',
            version: 'v.3.0',
            status: 'roadmap.inLongRun',
            title: 'roadmap.decentralized',
            text: 'roadmap.decentralizedTxt',
            date: '2022',
            tags: ['data', 'tech'],
          },
          {
            color: 'warning',
            version: 'v.4.0',
            status: 'roadmap.inLongRun',
            title: 'roadmap.templates',
            text: 'roadmap.templatesTxt',
            date: '2022',
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
