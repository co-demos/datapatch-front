<template>

  <!-- INPUT -->
  <v-row
    class="CommentInput justify-center mt-1 mx-0 pb-3"
    >

    <v-col 
      :cols="cols"
      class="py-0 mt-0 mb-3 text-center"
      >
      <v-icon
        x-small
        color="grey lighten-1"
        class="mr-2"
        >
        icon-message-square
      </v-icon>
      <span class="grey--text">
        {{ $t('comments.yourComment') }}
      </span>
    </v-col>

    <!-- COMMENT DATA -->
    <v-col 
      :cols="cols"
      class="py-0 mt-0 mb-3"
      >
      <v-text-field
        filled
        hide-details="auto"
        :label="$t('comments.yourEmail')"
        clearable
        :disabled="!activateEmailField"
        v-model="optionalEmail"
        dense
      />
    </v-col>

    <v-col 
      :cols="cols"
      class="py-0"
      >
      <v-textarea
        filled
        rows="3"
        hide-details="auto"
        :label="$t('comments.yourComment')"
        v-model="message"
        dense
      />
    </v-col>

    <v-col 
      :cols="cols"
      class="py-0"
      >
      <v-checkbox
        class="mt-1 justify-center"
        off-icon="icon-square"
        on-icon="icon-check-square"
        v-model="alertItemOwner"
        hide-details
        dense
        >
        <template v-slot:label>
          <span 
            :class="`caption grey--text`"
            >
            {{ $t('comments.alertItemOwner') }}
          </span>
        </template>
      </v-checkbox>
    </v-col>

    <!-- ACTION / BUTTONS -->
    <v-col 
      :cols="cols"
      class="pt-2 pb-3"
      >
    <v-row
      class="mt-0 px-3 pb-2 pt-0"
      >
      <v-col 
        :cols="cols/2"
        class="pa-0"
        >
        <v-btn
          color="grey darken-1"
          class="px-3"
          text
          rounded
          block
          @click="closeCommentsBox()"
          >
          <v-icon
            class="mr-2 mb-n1"
            small
            >
            icon-clear
          </v-icon>
          <span class="text-none">
            {{ $t('buttons.cancel') }}
          </span>
        </v-btn>
      </v-col>
      <v-col 
        :cols="cols/2"
        class="pa-0"
        >
        <v-btn
          :color="'primary darken-1'"
          class="px-3"
          text
          rounded
          block
          @click="sendComment()"
          >
          <v-icon
            small
            class="mr-2"
            >
            icon-message-square
          </v-icon>
          <span class="text-none">
            {{ $t(`buttons.comment`) }}
          </span>
        </v-btn>
      </v-col>
    </v-row>
    </v-col>

  </v-row>

</template>

<script>
  import { mapState, mapGetters, mapActions } from 'vuex'
  import { Comment } from '@/utils/utilsComments.js'

  export default {
    name: 'CommentInput',
    props: [
      'parentComment',
    ],
    data () {
      return {
        cols: 12,
        alertItemOwner: false,
        message: "",
        addPatch: false,
        patchData: undefined,
        activateEmailField: true,
        optionalEmail: undefined,
        isLoading: false,
      }
    },
    beforeMount() {
      if ( this.user.id ) {
        this.optionalEmail = this.user.email
        this.activateEmailField = false
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
        item: 'comments/getCurrentItem',
      }),
      parentCommentId() {
        let parentCommentId = this.parentComment ? this.parentComment.id : undefined
        return parentCommentId
      },
      buildComment() {
        let newComment = new Comment(
          this.message,           // message
          this.optionalEmail,     // owner_email
          this.item.item_type,    // comment_to_item_type
          this.item.id,           // comment_to_item_id
          this.parentCommentId,   // response_to_comment_id
          this.patchData,         // patch_data
          this.alertItemOwner,    // alert_item_owner
        )
        return newComment.data
      }
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
      sendComment() {
        let payload = { ...this.buildComment }
        this.log && console.log('C-CommentInput > sendComment > payload :' , payload)
        this.isLoading = true
        let url = `${this.api[this.item.item_type + 's']}/${this.item.id}/comment`
        this.$axios.post( url, payload, this.headerUser)
          .then(resp => {
            // TO FINISH ...
            this.log && console.log('C-CommentInput > sendComment > resp.data : ', resp.data)
            this.isLoading = false
            // this.closeCommentsBox()
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
