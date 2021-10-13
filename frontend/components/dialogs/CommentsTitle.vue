<template>

  <div class="CommentsTitle">

    <!-- CLOSE COMMENTS -->
    <v-row class="align-center justify-center mb-0">

      <!-- ITEM'S AVATAR -->
      <v-col cols="2" class="text-center pr-0">
        <ItemAvatar
          :item="item"
          :itemType="item.item_type"
          :heightAvatar="25"
        />
      </v-col>

      <v-col
        cols="8"
        class="text-center"
        >

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
  </div>
</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  // import { Comment } from '@/utils/utilsComments.js'

  export default {
    name: 'CommentsTitle',
    props: [
      'item',
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
        populateCurrentItem: 'comments/populateCurrentItem',
      }),
      closeCommentsBox() {
        this.togggleShowCommentsBox(false)
        this.populateCurrentItem(undefined)
      },
    }
  }

</script>
