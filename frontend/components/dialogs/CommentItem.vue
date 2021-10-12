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
            <!-- @click="showDetails  = !showDetails" -->
            <span class="white--text">
              {{ comment.message }}
            </span>
          </v-sheet>

          <!-- SENDER -->
          <p 
            v-show="hover"
            class="caption grey--text mt-1 ml-5 mb-0"
            >
            {{ $t('comments.from') }} :
            {{ comment.owner_email }}
          </p>

          <!-- DATE -->
          <p 
            v-show="hover"
            class="caption grey--text mb-1 ml-5"
            >
            {{ $t('comments.sent', commentSentDate(comment) ) }} :
          </p>

        </v-col>
      </v-hover>

      <v-col
        cols="4"
        class="text-left align-top"
        >
        <v-btn
          class=""
          rounded
          color="primary"
          small
          text
          block
          elevation="0"
          @click="showInput = !showInput "
          >
          <v-icon
            small
            color="primary"
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
      class="body-2 comment-text mt-3 mb-4 mx-0 py-1 px-1"
      :color="`grey lighten-4`"
      outlined
      >
      <CommentInput
        :parentComment="comment"
      />
    </v-sheet>

    <!-- <v-divider
      v-if="hasDivider"
      class="mt-4"
    /> -->

  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

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
        showInput: false,
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
      }),
    },
    methods: {
      commentSentDate(comment) {
        let date = new Date(comment.created_date)
        let commentDate =  date.toLocaleDateString(this.$i18n.locale)
        let commentTime =  date.toLocaleTimeString(this.$i18n.locale)
        return { date: commentDate, time: commentTime }
      },
    }
  }

</script>
