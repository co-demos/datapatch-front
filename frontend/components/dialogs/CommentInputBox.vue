<style scoped>

  .comment-text {
    border-radius: 20px;
  }

</style>

<template>

  <v-card
    outlined
    light
    :elevation="elevation || 0"
    class="CommentInputBox pa-3"
    :style="`width: 100%; border-radius: ${roundRadius}px;`"
    >

    <!-- TITLE -->
    <v-row
      class="align-center justify-center py-0"
      @click="showInput = !showInput"
      >
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
          >
          <!-- @click="showInput = !showInput" -->
          <v-icon
            small
            >
            {{ `icon-keyboard_arrow_${ showInput ? 'up' : 'down'} ` }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- COMMENT INPUT -->
    <!-- <v-row
      class="py-0"
      > -->
      <v-sheet
        v-show="showInput"
        class="body-2 comment-text mt-3 mb-4 mx-3 py-1 px-1"
        :color="`grey lighten-4`"
        outlined
        >
        <CommentInput/> 
      </v-sheet>
    <!-- </v-row> -->

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
        showInput: true,
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
