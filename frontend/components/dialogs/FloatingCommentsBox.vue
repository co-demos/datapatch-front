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
    />
    <CommentInput
      v-if="getCurrentItem"
      :item="getCurrentItem"
      :elevation="elevation"
      :allowPatch="false"
    />
  </div>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'FloatingCommentsBox',
    props: [

    ],
    components: {
      CommentsTitle: () => import(/* webpackChunkName: "CommentsTitle" */ '@/components/dialogs/CommentsTitle.vue'),
      CommentInput: () => import(/* webpackChunkName: "CommentInput" */ '@/components/dialogs/CommentInput.vue'),
    },
    data () {
      return {
        elevation: 20,     
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
      }),
    },
    methods: {
    }
  }

</script>
