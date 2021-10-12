<style scoped>

  .comments-box {
    width: 400px;
    position: absolute;
    z-index: 300;
    right: 20px;
    top: 100px;
  }

</style>

<template>
  
  <div
    v-show="showCommentsBox"
    class="comments-box"
    >
    <CommentsTitle
      v-if="getCurrentItem"
      :item="getCurrentItem"
      :elevation="elevation"
      :roundRadius="roundRadius"
    />
    <CommentsList
      v-if="getCurrentItem"
      :comments="getComments"
      :elevation="elevation"
      :roundRadius="roundRadius"
   />
    <CommentInputBox
      v-if="getCurrentItem"
      :elevation="elevation"
      :roundRadius="roundRadius"
   />
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
          this.log && console.log('C-FloatingCommentsBox > watch > getCurrentItem > next : ', next)
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
        showCommentsBox: 'comments/getShowCommentsBox',
        getCurrentItem: 'comments/getCurrentItem',
        getComments: 'comments/getComments',
      }),
    },
    methods: {
      ...mapActions({
        populateComments: 'comments/populateComments',
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
