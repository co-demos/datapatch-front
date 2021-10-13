<style scoped>

  .comment-text {
    border-radius: 20px;
    z-index: 301 !important;
  }

</style>

<template>

  <div class="CommentInputBox pt-2">

    <!-- TITLE -->
    <v-row
      class="align-center justify-center py-0"
      @click="populateActiveCommentId(undefined)"
      >
      <!-- @click="showInput = !showInput" -->
      <v-col cols="12" class="text-center">
        <v-icon
          x-small
          color="grey lighten-1"
          class="mr-2"
          >
          icon-message-square
        </v-icon>
        <span class="grey--text caption">
         {{ $t('comments.addComment') }}
        </span>
      </v-col>
      <!-- @click="showInput = !showInput" -->
      <!-- <v-col cols="2" class="text-center">
        <v-btn
          icon
          small
          color="grey lighten-1"
          >
          <v-icon
            small
            >
            {{ `icon-keyboard_arrow_${ showInput ? 'up' : 'down'} ` }}
          </v-icon>
        </v-btn>
      </v-col> -->
    </v-row>

    <!-- COMMENT INPUT -->
    <v-sheet
      v-show="!getActiveCommentId "
      class="body-2 comment-text mt-3 mb-6 mx-3 py-1 px-1"
      :color="`grey lighten-4`"
      outlined
      >
      <CommentInput
        :hideCancel="true"
      /> 
        <!-- @closeComment="showInput = false" -->
    </v-sheet>

  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'CommentInputBox',
    props: [],
    components: {
      CommentInput: () => import(/* webpackChunkName: "CommentInput" */ '@/components/dialogs/CommentInput.vue'),
    },
    data () {
      return {
        showInputForce: true,
      }
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
      }),
      ...mapGetters({
        getCurrentItem: 'comments/getCurrentItem',
        getActiveCommentId: 'comments/getActiveCommentId',
      }),
      showInput() {
        return !this.getActiveCommentId
      }
    },
    methods: {
      ...mapActions({
        populateActiveCommentId: 'comments/populateActiveCommentId',
      })
    }
  }

</script>
