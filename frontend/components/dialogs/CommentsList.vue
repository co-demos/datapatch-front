<template>

  <div class="CommentsList mt-2">

    <v-row 
      class="align-center justify-center py-0"
      @click="showComments = !showComments"
      >
      <!-- <v-col cols="2" class="text-center">
        <v-icon
          x-small
          color="grey lighten-1"
          >
          icon-message-square
        </v-icon>
      </v-col> -->
      <v-col cols="8" class="text-center offset-2">
        <v-icon
          x-small
          color="grey lighten-1"
          class="mr-2"
          >
          icon-message-square
        </v-icon>
        <span class="grey--text caption">
         {{ $t('comments.comments') }} ({{ comments.length }})
        </span>
      </v-col>
      <v-col cols="2" class="text-center">
        <v-btn
          icon
          small
          color="grey lighten-1"
          >
          <!-- @click="showComments = !showComments" -->
          <v-icon
            small
            >
            {{ `icon-keyboard_arrow_${ showComments ? 'up' : 'down'} ` }}
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- COMMENT -->
    <CommentItem
      v-show="showComments"
      v-for="(comment, index) in comments"
      :key="comment.id"
      :comment="comment"
      :hasDivider="index !== comments.length - 1"
    />

  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  // import { Comment } from '@/utils/utilsComments.js'

  export default {
    name: 'CommentsList',
    props: [
      'comments',
    ],
    components: {
      CommentItem: () => import(/* webpackChunkName: "CommentItem" */ '@/components/dialogs/CommentItem.vue'),
    },
    data () {
      return {
        isLoading: false,
        showComments: true,
      }
    },
    beforeMount() {
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        // api: (state) => state.api,
        user: (state) => state.user.userData,
      }),
      ...mapGetters({
        // headerUser: 'user/headerUser',
      }),
    },
    methods: {
      ...mapActions({
        togggleShowCommentsBox: 'comments/togggleShowCommentsBox',
      }),
      commentSentDate(comment) {
        let date = new Date(comment.created_date)
        let commentDate =  date.toLocaleDateString(this.$i18n.locale)
        let commentTime =  date.toLocaleTimeString(this.$i18n.locale)
        return { date: commentDate, time: commentTime }
      },
    }
  }

</script>
