<template>

  <v-card
    outlined
    light
    :elevation="elevation || 0"
    class="CommentInputBox pa-3"
    :style="`width: 100%; border-radius: ${roundRadius}px;`"
    >

    <!-- TITLE -->
    <v-row class="align-center justify-center py-0">
      <v-col cols="2" class="text-center">
        <v-icon
          x-small
          color="grey lighten-1"
          >
          icon-message-square
        </v-icon>
      </v-col>
      <v-col cols="8" class="text-center">
        <span class="grey--text caption">
         {{ $t('comments.addComment') }}
        </span>
      </v-col>
      <v-col cols="2" class="text-center">
        <v-btn
          icon
          small
          color="grey lighten-1"
          @click="showiInput = !showiInput"
          >
          <v-icon
            small
            >
            {{ `icon-keyboard_arrow_${ showiInput ? 'up' : 'down'} ` }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <CommentInput
      v-show="showiInput"
    />    

  </v-card>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'CommentInputBox',
    props: [
      'elevation',
      'roundRadius'
    ],
    components: {
      CommentInput: () => import(/* webpackChunkName: "CommentInput" */ '@/components/dialogs/CommentInput.vue'),
    },
    data () {
      return {
        showiInput: true,
      }
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
      }),
      ...mapGetters({
        getCurrentItem: 'comments/getCurrentItem',
      })
    },
  }

</script>
