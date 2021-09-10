<style scoped>

  .add-border {
    border: thin solid lightGrey !important;
  }

</style>

<template>

  <v-card
    elevation="0"
    outlined
    flat
    :class="`invit mb-2 py-3 ${hover ? 'add-border' : ''}`"
    :color="`${hover ? 'white' : 'grey lighten-4'}`"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    >
    <v-row class="ma-0 align-center">

      <!-- status -->
      <v-col cols="3" class="text-center">

        <v-chip
          text-color="white"
          :color="statusColor"
          >
          <v-icon 
            small
            class="mr-2"
            >
            {{ statusIcon }}
          </v-icon>
          {{ $t( `invitations.${invit.invitation_status}`) }}
        </v-chip>

        <!-- show details -->
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn 
              v-bind="attrs"
              v-on="on"
              icon
              small
              @click="showDetails = !showDetails"
              >
              <v-icon
                small
                color="grey"
                >
                icon-info1
              </v-icon>
            </v-btn>
          </template>
          <span>
            {{ $t('invitations.details') }}
          </span>
        </v-tooltip>

      </v-col>

      <!-- item invited to -->
      <v-col cols="4">
        <v-icon
          small
          class="mr-2"
          >
          {{ itemTypeIcon }}
        </v-icon>
        {{ $t( `dataPackage.${invit.invitation_to_item_type}`) }}
        <code>{{ invit.invitation_to_item_id }}</code>
      </v-col>


      <!-- auths -->
      <v-col cols="2" class="text-center">

        <span
          v-for="authLevel in authChoices"
          :key="authLevel.name"
          >
          <v-tooltip top>
          
            <template v-slot:activator="{ on, attrs }">
              <v-icon 
                v-bind="attrs"
                v-on="on"
                small 
                class="mr-2 pb-1"
                :color="invit.auths[authLevel.name]? 'green' : 'grey lighten-2'"
                >
                {{ authLevel.icon }}
              </v-icon>
            </template>

            <span>
              <v-icon 
                x-small 
                class="mr-2"
                color="white"
                >
                {{ authLevel.icon }}
              </v-icon>
              <span 
                :class="`text-body-2 ${ invit.auths[authLevel.name]? '' : 'text-decoration-line-through'}`"
                >
                {{ $t(authLevel.label) }}
              </span>
            </span>

          </v-tooltip>
        </span>

      </v-col>

      <!-- ACCEPT / REFUSE -->
      <v-col cols="2" class="align-center justify-center pr-0">
        <v-btn
          dark
          dense
          block
          elevation="0"
          :color="btnActionColor"
          :loading="isLoading"
          :disabled="isLoading"
          @click="handleAction()"
          >
          <v-icon small color="white" class="pr-2">
            {{ btnActionIcon }}
          </v-icon>
          {{ $t(btnActionLabel) }}
        </v-btn>
      </v-col>
      <v-col cols="1" class="align-center justify-center pl-0">
        <v-menu
          open-on-hover
          offset-y
          >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              icon
              dense
              color="black"
              class="px-0"
              v-bind="attrs"
              v-on="on"
              >
              <v-icon color="black">
                icon-keyboard_arrow_down
              </v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in btnActions"
              :key="item.action"
              @click="action = item.action"
              >
              <v-list-item-title>
                <v-icon x-small class="pr-2">
                  {{ item.icon }}
                </v-icon>
                {{ $t(item.label) }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

      </v-col>


    </v-row>

    <!-- DETAILS -->
    <v-expand-transition>
      <v-row v-show="showDetails" class="ma-0 mtt-3 align-center">
        
        <!-- sender -->
        <v-col cols="4">
          {{ $t('invitations.sentBy', { username : invit.owner_id } ) }}
          <!-- <code>{{ invit.owner_id }}</code><br> -->
        </v-col>

        <!-- date -->
        <v-col cols="4">
          {{ $t('invitations.sentDate', { date : invit.created_date} ) }}
          <!-- <code>{{ invit.created_date }}</code> -->
        </v-col>

      </v-row>
    </v-expand-transition>

  </v-card>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  import { ItemTypesOptions, InvitationStatuses } from '@/utils/utilsInvitations'
  import { AuthLevelsChoices } from '@/utils/utilsAuths'

  export default {
    name: 'InvitationItem',
    props: [
      'invit',
      'invitType'
    ],
    data() {
      return {
        hover: false,
        isLoading: false,
        action: undefined,
        hoverBtn: false,
        authChoices: [],
        showDetails: false,
        invitActions: [
          { 
            action: 'edit', 
            label: 'buttons.edit', 
            color: 'green',
            icon: 'icon-edit', 
            for: ['sent'] 
          },
          { 
            action: 'accept', 
            label: 'buttons.accept', 
            color: 'green',
            icon: 'icon-check-circle1', 
            for: ['received'] 
          },
          { 
            action: 'comment', 
            label: 'buttons.comment', 
            color: 'primary',
            icon: 'icon-message-square', 
            for: ['sent', 'received'] 
          },
          { 
            action: 'refuse', 
            label: 'buttons.refuse', 
            color: 'red',
            icon: 'icon-x-circle', 
            for: ['received'] 
          },
          { 
            action: 'remove', 
            label: 'buttons.remove', 
            color: 'red',
            icon: 'icon-trash-2', 
            for: ['sent'] 
          },
        ]
      }
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
        userId: 'user/userId',
        headerUser: 'user/headerUser'
      }),
      statusInvit() {
        let invitStaus = InvitationStatuses.find( status => status.name === this.invit.invitation_status )
        return invitStaus
      },
      statusIcon() {
        return this.statusInvit.icon
      },
      statusColor() {
        return this.statusInvit.color
      },
      itemTypeIcon() {
        let itemType = ItemTypesOptions.find( type => type.name === this.invit.invitation_to_item_type )
        return itemType.icon
      },
      btnActions() {
        let actions = this.invitActions.filter( act => act.for.includes(this.invitType) )
        return actions
      },
      btnAction() {
        let actionSelected = this.invitActions.find( act => act.action === this.action )
        return actionSelected
      },
      btnActionIcon() {
        let actionSelected = this.btnAction
        return actionSelected.icon
      },
      btnActionLabel() {
        let actionSelected = this.btnAction
        return actionSelected.label
      },
      btnActionColor() {
        let actionSelected = this.btnAction
        return actionSelected.color
      }
    },
    beforeMount () {
      this.authChoices = [...AuthLevelsChoices]
      // choose default action for invitations
      this.action = this.invitType === 'sent' ? 'edit' : 'accept'
    },
    methods: {
      handleAction() {
        this.log && console.log("C-InvitationItem > handleAction > this.action : ", this.action)
        let payload = {
          invitation_id: this.invit.id,
          action: this.action,
        } 
        this.log && console.log("C-InvitationItem > handleAction > payload : ", payload)
        let url = `${this.api.invitations}/${this.invit.id}`
        this.isLoading = true
        this.log && console.log('C-InvitationItem > handleAction > invite > url :' , url)

        if (this.invitType === 'received') {
          // accept/refuse invitation
          this.$axios.post( url, payload, this.headerUser)
            .then(resp => {
              this.log && console.log('C-InvitationItem > handleAction > resp.data : ', resp.data)
              this.isLoading = false
            })
            .catch(error => {
              this.isLoading = false
            })
        } else {
          // update invitation
          this.$axios.put( url, payload, this.headerUser)
            .then(resp => {
              this.log && console.log('C-InvitationItem > handleAction > resp.data : ', resp.data)
              this.isLoading = false
            })
            .catch(error => {
              this.isLoading = false
            })
        }
      }
    }
  }
</script>
