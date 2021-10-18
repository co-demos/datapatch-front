<style scoped>
  .comment-form {
    width: 100%;
  }
</style>

<template>

  <!-- INPUT -->
  <v-row
    class="CommentInput justify-center mt-1 mx-0 pt-2 pb-3"
    >

    <v-col 
      v-show="!user.id"
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

    <!-- FORM -->
    <v-form
      ref="formComment"
      class="comment-form"
      v-model="valid"
      lazy-validation
      >
      <!-- COMMENT DATA -->
      <v-col
        v-show="!user.id"
        :cols="cols"
        class="py-0 mt-0 mb-3"
        >
        <v-text-field
          v-model="optionalEmail"
          filled
          dense
          clearable
          hide-details="auto"
          :label="$t('comments.yourEmail')"
          :disabled="!activateEmailField"
        />
      </v-col>

      <v-col 
        :cols="cols"
        class="py-0"
        >
        <v-textarea
          v-model="message"
          regular
          dense
          rows="2"
          hide-details="auto"
          :label="$t('comments.yourComment')"
          :rules="minCharRules"
        />
      </v-col>

      <v-col 
        :cols="cols"
        class="py-0"
        >
        <v-checkbox
          v-model="alertItemOwner"
          class="mt-1 justify-center"
          off-icon="icon-square"
          on-icon="icon-check-square"
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
    </v-form>

    <!-- ACTION / BUTTONS -->
    <v-col 
      :cols="cols"
      class="pt-2 pb-3"
      >
      <v-row
        class="justify-center mt-0 px-3 pb-2 pt-0"
        >
        <v-col
          v-if="!hideCancel"
          :cols="cols/2"
          class="pa-1"
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
          class="pa-1"
          >
          <v-btn
            :color="`${ valid ? 'primary' : 'blue'}`"
            class="px-3"
            :dark="valid"
            rounded
            block
            elevation="0"
            :disabled="!valid"
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
  import { rules } from '@/utils/utilsRules.js'

  export default {
    name: 'CommentInput',
    props: [
      'parentComment',
      'hideCancel'
    ],
    data () {
      return {
        valid: true,
        cols: 12,
        alertItemOwner: false,
        message: '',
        addPatch: false,
        patchData: undefined,
        activateEmailField: true,
        optionalEmail: undefined,
        isLoading: false,

        minCharRules: rules.minCharRules( this.$t('rules.valEnter'), this.$t('rules.minChars'), 2 ),

      }
    },
    watch: {
      item(next, prev) {
        // this.log && console.log('C-CommentInput > watch > item > next :' , next)
        if (next) {
          this.resetValidation()
        }
      }
    },
    beforeMount() {
      if ( this.user.id ) {
        this.optionalEmail = this.user.email
        this.activateEmailField = false
      }
    },
    mounted() {
      this.socket = this.$nuxtSocket({
        name: 'main',
        path: '/ws/socket.io',
        transport: ['websocket'],
      })
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
      },
    },
    methods: {
      ...mapActions({
        togggleShowCommentsBox: 'comments/togggleShowCommentsBox',
        togggleNeedReload: 'comments/togggleNeedReload',
        populateActiveCommentId: 'comments/populateActiveCommentId',
      }),
      validateForm() {
        return this.$refs.formComment.validate()
      },
      closeCommentsBox() {
        // this.togggleShowCommentsBox(false)
        // this.$emit('closeComment')
        this.populateActiveCommentId(undefined)
      },
      resetValidation() {
        this.message = ''
        this.$refs.formComment.resetValidation()
      },
      ioBroadcastAction(ioData, rooms, callback ) {
        this.log && console.log("C-CommentInput > ioBroadcastAction > ioData : ", ioData)
        let payload = {
          from_user_email: this.user &&  this.user.email,
          item_type: this.item.item_type,
          item_id: this.item.id,
          target_rooms: rooms,
          action: 'comment',
          callback: callback
        }
        this.log && console.log("C-CommentInput > ioBroadcastAction > payload : ", payload)
        this.socket.emit('broadcast_action', payload)
      },
      sendComment() {
        if ( this.validateForm() ) {
          let payload = { ...this.buildComment }
          this.log && console.log('C-CommentInput > sendComment > payload :' , payload)
          this.isLoading = true
          const url = `${this.api[this.item.item_type + 's']}/${this.item.id}/comment`
          this.$axios.post( url, payload, this.headerUser)
            .then(resp => {
              this.log && console.log('C-CommentInput > sendComment > resp.data : ', resp.data)
              this.resetValidation()
              this.togggleNeedReload(true)
              this.isLoading = false
              this.closeCommentsBox()

              // TO FINISH ...
              let rooms = [ `${this.item.item_type}_${this.item.id}` ]
              const getCommentsUrl = `${this.api[this.item.item_type + 's']}/${this.item.id}/comments`
              let callback = { item_type: 'comment', method: 'get', get_list: true, url: getCommentsUrl }
              this.ioBroadcastAction(resp.data, rooms, callback)
              
            })
            .catch(error => {
              this.isLoading = false
            })
        }
      }
    }
  }

</script>
