<style scoped>

  .comments-box {
    width: 400px;
    position: fixed;
    z-index: 300 !important;
    right: 20px;
    top: 100px;
  }

</style>

<template>

  <div
    v-show="showCommentsBox"
    class="comments-box"
    >
    <v-card
      outlined
      light
      :elevation="elevation || 0"
      class="FloatingCommentsBox mb-3 pa-3"
      :style="`
        width: 100%;
        border-radius: ${roundRadius}px;
        max-height: 800px;
        `"
      >
      <CommentsTitle
        v-if="getCurrentItem"
        :item="getCurrentItem"
      />
      
      <div
        :style="`
          height:100%;
          max-height: 740px;
          overflow-y: scroll;
          overflow-x: hidden;
        `"
        >
        <CommentInputBox
          v-if="getCurrentItem"
        />
        <CommentsList
          v-if="getCurrentItem"
          :comments="getCommentsSortedByDate"
        />
      </div>

    </v-card>
  </div>

</template>

<script>

  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'FloatingCommentsBox',
    props: [],
    components: {
      CommentsTitle: () => import(/* webpackChunkName: "CommentsTitle" */ '@/components/dialogs/CommentsTitle.vue'),
      CommentsList: () => import(/* webpackChunkName: "CommentsList" */ '@/components/dialogs/CommentsList.vue'),
      CommentInputBox: () => import(/* webpackChunkName: "CommentInputBox" */ '@/components/dialogs/CommentInputBox.vue'),
    },
    data () {
      return {
        elevation: 20,
        roundRadius: 20,
        isLoading: false,
      }
    },
    beforeMount() {
      if (this.getCurrentItem) {
        this.getRelatedComments()
      }
    },
    watch: {
      getCurrentItem(next, prev) {
        if (next) {
          // this.log && console.log('C-FloatingCommentsBox > watch > getCurrentItem > next : ', next)
          this.populateActiveCommentId(undefined)
          this.getRelatedComments()
        }
      },
      getNeedReload(next) {
        if (next) {
          this.getRelatedComments()
        }
      }
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
        user: (state) => state.user.userData,
      }),
      ...mapGetters({
        headerUser: 'user/headerUser',
        getNeedReload: 'comments/getNeedReload',
        showCommentsBox: 'comments/getShowCommentsBox',
        getCurrentItem: 'comments/getCurrentItem',
        getCommentsSortedByDate: 'comments/getCommentsSortedByDate',
        // getActiveCommentId: 'comments/getActiveCommentId',
      }),
    },
    methods: {
      ...mapActions({
        togggleNeedReload: 'comments/togggleNeedReload',
        populateComments: 'comments/populateComments',
        populateActiveCommentId: 'comments/populateActiveCommentId'
      }),
      getRelatedComments() {
        let url = `${this.api[this.getCurrentItem.item_type + 's']}/${this.getCurrentItem.id}/comments`
        this.isLoading = true
        this.$axios.get( url, this.headerUser)
          .then(resp => {
            // TO FINISH ...
            this.log && console.log('C-FloatingCommentsBox > getRelatedComments > resp.data : ', resp.data)
            // populate comments store
            this.populateComments( resp.data )
            this.togggleNeedReload( false )
            this.isLoading = false
            // let rooms = payload.invitees.map( invitee => invitee.invitee_email )
            // let callback = { item_type: 'invitation', method: 'get', get_list: true, url: `${this.api.users}/me/invitations` }
            // this.ioBroadcastAction(ioData, rooms, callback)
          })
          .catch(error => {
            this.isLoading = false
          })
      }
    }
  }

</script>
