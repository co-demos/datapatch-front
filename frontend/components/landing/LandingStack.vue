<template>

  <div>
      
    <v-row class="LandingStack align-top justify-center my-12">

      <LandingTitle
        :title="'stack.title'"
        :current="'#LandingStack'"
        :up="'#LandingRoadmap'"
      />

      <v-col cols="6" class="justify-text mb-5">
        <p class="body-2 white--text">
          {{ $t('stack.stackText') }}
        </p>
      </v-col>

      <v-col cols="10" class="mb-12">
        <v-card class="pa-10">
          <!-- <v-row class="justify-center"> -->

          <draggable
            v-model="items"
            v-bind="dragOptions"
            draggable=".tech"
            group="techs"
            class="row align-center justify-center"
            @start="drag=true"
            @end="drag=false"
            >

            <v-col
              cols="3"
              class="pa-5 align-center text-center tech"
              v-for="item in items"
              :key='item.name'
              >
              <a 
                :href="item.href"
                target="_blank"
                >
                <v-img
                  contain
                  max-height="100"
                  :src="item.src"
                  />
                <!-- 
                <p class="mt-3">
                  {{ item.name }}
                </p> 
                -->
              </a>
            </v-col>

          </draggable>

          <!-- </v-row> -->
        </v-card>
      </v-col>
  
    </v-row>
  </div>
</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'LandingStack',
    props: [],
    data () {
      return {
        drag: false,
        items: [
          {
            name: 'Fast API',
            href: 'https://fastapi.tiangolo.com/',
            src: '/stack/fastapi.png'
          },
          {
            name: 'Python',
            href: 'https://www.python.org/',
            src: '/stack/python.png'
          },
          {
            name: 'Oauth2',
            href: 'https://oauth.net/2/',
            src: '/stack/oauth.png'
          },
          {
            name: 'PostgreSQL',
            href: 'https://www.postgresql.org/',
            src: '/stack/postgresql.png'
          },
          {
            name: 'Vue',
            href: 'https://vuejs.org/',
            src: '/stack/vue.png'
          },
          {
            name: 'Nuxt',
            href: 'https://nuxtjs.org/',
            src: '/stack/nuxt.png'
          },
          {
            name: 'Vuetify',
            href: 'https://vuetifyjs.com/en/',
            src: '/stack/vuetify.png'
          },
          {
            name: 'Socket IO',
            href: 'https://socket.io/',
            src: '/stack/socketio.png'
          },
          {
            name: 'Y.js',
            href: 'https://github.com/yjs/yjs',
            src: '/stack/yjs.png'
          },
          {
            name: 'Draggable',
            href: 'https://github.com/SortableJS/Vue.Draggable',
            src: '/stack/draggable.png'
          },
          {
            name: 'Green Sock',
            href: 'https://greensock.com/gsap/',
            src: '/stack/gsap.png'
          },
        ]
      }
    },
    computed: {
      dragOptions() {
        return {
          animation: 200,
          group: "techs",
          disabled: false,
          ghostClass: "ghost"
        }
      },
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
