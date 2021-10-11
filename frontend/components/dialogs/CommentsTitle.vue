<style scoped>
  .comment {
    border-radius: 40px !important;
  }

</style>

<template>

  <v-card
    outlined
    light
    :elevation="elevation || 0"
    class="CommentsTitle mb-3 pa-1 comment"
    :style="'width: 100%'"
    >

    <!-- CLOSE COMMENTS -->
    <v-row class="align-center justify-center">

      <!-- ITEM'S AVATAR -->
      <v-col cols="2" class="text-center pr-0">
        <ItemAvatar
          :item="item"
          :itemType="item.item_type"
          :heightAvatar="30"
        />
      </v-col>

      <v-col
        cols="8"
        class="text-center"
        >

        <!-- REPEAT COMMENT TEXT -->
        <span class="caption">
          <v-icon
            x-small
            class="mr-2"
            color="grey lighten-1"
            >
            icon-message-square
          </v-icon>
          <span class="grey--text">
            {{ $t(`buttons.comment`) }} 
          </span>
          <br>
        </span>

        <!-- ITEM'S TITLE -->
        <span 
          class="subtitle-2"
          >
          <span 
            :class="`${item.color}--text`">
            {{ item.title }}
          </span>
        </span>
      </v-col>

      <v-col cols="2" class="text-center">
        <v-btn
          icon
          small
          rounded
          elevation="0"
          @click="closeCommentsBox()"
          >
          <v-icon>
            icon-clear
          </v-icon>
        </v-btn>
      </v-col>

    </v-row>
  </v-card>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  // import { Comment } from '@/utils/utilsComments.js'

  export default {
    name: 'CommentsTitle',
    props: [
      'item',
      'elevation',
    ],
    data () {
      return {
        isLoading: false,
        heightAvatar: 15,
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
      parentCommentId() {
        let parentCommentId = this.parentComment ? this.parentComment.id : undefined
        return parentCommentId
      },
    },
    methods: {
      ...mapActions({
        togggleShowCommentsBox: 'comments/togggleShowCommentsBox',
        // populateCurrentItem: 'comments/populateCurrentItem',
      }),
      closeCommentsBox() {
        this.togggleShowCommentsBox(false)
        // this.$emit('closeComment')
      },
    }
  }

</script>
