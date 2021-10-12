<template>
  <div class="CommentItem pa-2 mt-2">
    <v-row
      class="align-center justify-center"
      >

      <v-col
        cols="9"
        class="text-left"
        >

        <!-- DATE -->
        <p class="caption grey--text mb-1">
          {{ $t('comments.from') }} :
          {{ comment.owner_email }}
        </p>

        <!-- MESSAGE -->
        <p class="body-2 mb-2">
          {{ comment.message }}
        </p>

        <!-- DATE -->
        <p class="caption grey--text mb-1">
          {{ $t('comments.sent', commentSentDate(comment) ) }} :
        </p>

      </v-col>


      <v-col
        cols="3"
        class="text-left align-center"
        >
        <v-btn
          class=""
          rounded
          dark
          color="primary"
          small
          block
          elevation="0"
          @click="showInput = !showInput "
          >
          <span class="text-none">
            {{ $t('comments.reply') }}
          </span>
        </v-btn>
      </v-col>

    </v-row>

    <CommentInput
      v-show="showInput"
      :parentComment="comment"
    />

    <v-divider
      v-if="hasDivider"
      class="mt-4"
    />

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
      }
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
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
