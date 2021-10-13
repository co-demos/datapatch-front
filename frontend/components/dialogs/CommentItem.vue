<style scoped>

  .comment-text {
    border-radius: 20px;
  }

</style>

<template>
  <div class="CommentItem px-2 pt-1 pb-2">
    
    <v-row
      class="align-top justify-center"
      >

      <v-hover
        v-slot="{ hover }"
        >
        <v-col
          cols="8"
          class="text-left pr-0"
          >

          <!-- MESSAGE -->
          <v-sheet
            class="body-2 comment-text py-3 px-4"
            :color="`${ comment.owner_email === user.email ? 'primary' : 'grey'}`"
            >

            <p class="white--text mb-1">
              {{ comment.message }}
            </p>
            
            <p 
              v-if="comment.response_to_comment_id"
              class="white--text font-italic mb-1"
              >
              {{ $t('comments.responseTo') }} : 
              "{{ getParentCommentText(comment.response_to_comment_id) }}"
            </p>

          </v-sheet>

          <!-- COMMENT DETAILS -->
          <p 
            v-show="hover"
            class="caption grey--text mt-1 ml-5 mb-0"
            >
            <!-- SENDER -->
            <span >
              {{ $t('comments.from') }} :
              {{ comment.owner_email }}
              <br>
            </span>

            <!-- RESPONSE TO -->
            <span
              v-if="comment.response_to_comment_id"
              >
              {{ $t('comments.responseTo') }} :
              {{ getParentCommentOwner(comment.response_to_comment_id) }}
              <br>
            </span>

            <!-- DATE -->
            <span>
              {{ $t('comments.sent', commentSentDate(comment) ) }} :
            </span>
            
          </p>

        </v-col>
      </v-hover>

      <v-col
        cols="4"
        class="text-left align-top"
        >
        <v-btn
          :class="`${showInput ? '' : 'primary--text'}`"
          rounded
          :color="`${showInput ? 'primary' : 'white'}`"
          small
          :dark="showInput"
          block
          elevation="0"
          @click="toggleCommentId()"
          >
          <v-icon
            small
            class="mr-2"
            >
            icon-reply2
          </v-icon>
          <span class="text-none">
            {{ $t('comments.reply') }}
          </span>
        </v-btn>
      </v-col>

    </v-row>

    <v-sheet
      v-show="showInput"
      class="body-2 comment-text mt-3 mb-6 mx-0 py-1 px-1"
      :color="`grey lighten-4`"
      outlined
      >
      <CommentInput
        :parentComment="comment"
      />
        <!-- @closeComment="showInput = false" -->
    </v-sheet>

  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'CommentItem',
    props: [
      'comment',
      'hasDivider'
    ],
    components: {
      CommentInput: () => import(/* webpackChunkName: "CommentInput" */ '@/components/dialogs/CommentInput.vue'),
    },
    data () {
      return {
        // showInput: false,
        showDetails: false,
      }
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        user: (state) => state.user.userData,
      }),
      ...mapGetters({
        getCurrentItem: 'comments/getCurrentItem',
        getCommentById: 'comments/getCommentById',
        getActiveCommentId: 'comments/getActiveCommentId',
      }),
      showInput() {
        return this.getActiveCommentId === this.comment.id
      }
    },
    methods: {
      ...mapActions({
        populateActiveCommentId: 'comments/populateActiveCommentId',
      }),
      // getParentComment(id) {
      //   let parentComment = this.getCommentById(id)
      //   return parentComment
      // },
      toggleCommentId() {
        if (this.getActiveCommentId === this.comment.id) {
          this.log && console.log(`\nC-CommentItem > toggleCommentId > A > this.getActiveCommentId : `, this.getActiveCommentId )
          this.populateActiveCommentId(undefined) 
        } else {
          this.log && console.log(`\nC-CommentItem > toggleCommentId > B > this.getActiveCommentId : `, this.getActiveCommentId )
          this.populateActiveCommentId(this.comment.id) 
        }
      },
      getParentCommentText(id) {
        let parentComment = this.getCommentById(id)
        return parentComment.message
      },
      getParentCommentOwner(id) {
        let parentComment = this.getCommentById(id)
        return parentComment.owner_email
      },
      commentSentDate(comment) {
        let date = new Date(comment.created_date)
        let commentDate =  date.toLocaleDateString(this.$i18n.locale)
        let commentTime =  date.toLocaleTimeString(this.$i18n.locale)
        return { date: commentDate, time: commentTime }
      },
    }
  }

</script>
