<template>

  <v-card
    outlined
    light
    elevation="0"
    class="ModalComment my-2 pa-3"
    :style="'width: 100%'"
    >

    <v-card-title class="mb-6 justify-center">
      <v-icon
        small
        class="mr-4"
        color="grey"
        >
        icon-message-square
      </v-icon>
      {{ $t(`buttons.comment`) }}
    </v-card-title>

    <v-row class="justify-center mb-3">
      
      <!-- COMMENT DATA -->
      <!-- <v-col 
        cols="10"
        class="py-0 mb-2"
        >
        <v-text-field
          filled
          hide-details="auto"
          :label="$t('dataPackage.title')"
          clearable
          v-model="messageTitle"
          dense
        />
      </v-col> -->

      <v-col 
        cols="10"
        class="py-0 mb-2"
        >
        <v-textarea
          filled
          rows="3"
          class="mb-2"
          hide-details="auto"
          :label="$t('dataPackage.message')"
          v-model="message"
          dense
        />
      </v-col>

      <v-col 
        cols="10"
        class="py-0 mb-2"
        >
        <v-text-field
          filled
          hide-details="auto"
          :label="$t('me.email')"
          clearable
          :disabled="!activateEmailField"
          v-model="optionalEmail"
          dense
        />
      </v-col>


      <!-- ACTION / BUTTONS -->
      <v-col cols="5" class="mt-5">
        <v-btn
          color="grey darken-1"
          class="px-3"
          dark
          large
          block
          tile
          elevation="0"
          @click="closeMessageBox()"
          >
          <v-icon
            class="mr-4"
            >
            icon-clear
          </v-icon>
          {{ $t('buttons.cancel') }}
        </v-btn>
      </v-col>
      <v-col cols="5" class="mt-5">
        <v-btn
          :color="'primary darken-1'"
          class="px-3"
          dark
          block
          large
          tile
          elevation="0"
          @click="sendComment()"
          >
          <v-icon
            small
            class="mr-4"
            >
            icon-message-square
          </v-icon>
          {{ $t(`buttons.comment`) }}
        </v-btn>
      </v-col>

    </v-row>


    <!-- DEBUGGING -->
    <p v-if="true">
      item : <code>{{ item }}</code><hr>
      buildComment : <code>{{ buildComment }}</code><hr>
    </p>

  </v-card>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import { Comment } from '@/utils/utilsComments.js'

  export default {
    name: 'ModalComment',
    props: [
      // 'hidden',
      'item',
      'allowPatch',
      'parentComment'
    ],
    // model: {
    //   prop: 'hidden',
    //   event: 'blur'
    // },
    data () {
      return {
        alertOwner: false,
        // messageTitle: "",
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
      }),
      parentCommentId() {
        let parentCommentId = this.parentComment ? this.parentComment.id : undefined
        return parentCommentId
      },
      buildComment() {
        let newComment = new Comment(
          // this.messageTitle,      // title
          this.message,           // message
          this.optionalEmail,     // owner_email
          this.item.item_type,    // comment_to_item_type
          this.item.id,           // comment_to_item_id
          this.parentCommentId,   // response_to_comment_id
          this.patchData          // patch / patch_data
        )
        return newComment.data
      }
    },
    methods: {
      // handleInput(val) {
      //   this.$emit('blur', val)
      // },
      closeMessageBox() {
        this.$emit('closeComment')
      },
      sendComment() {
  

        this.log && console.log('C-ModalComment > sendComment > newComment :' , newComment)
        let payload = { ...this.buildComment }
        this.isLoading = true
        let url = `${this.api[this.item.item_type + 's']}/${this.item.id}/comment`
        this.$axios.post( url, payload, this.headerUser)
          .then(resp => {
            this.log && console.log('C-SearchList > handleAction > resp.data : ', resp.data)
            this.isLoading = false
            // this.closeMessageBox()
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
