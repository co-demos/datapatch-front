<template>

  <div>
    <v-row
      class="justify-center my-5"
      >
      <v-col 
        :cols="cols"
        :class="`offset-${offsetCols}`"
        >
        <InvitationsFilters
          v-model="filters"
          :invitType="invitType"
        />
      </v-col>
    </v-row>

    <!-- DEBUGGING -->
    <div class="justify-center" v-if="false">
      <span>filters : <code>{{ filters }}</code></span><br>
      <span>filteredInvits : <code>{{ filteredInvits.length }}</code></span>
    </div>

    <v-row
      class="justify-center"
      >
      <v-col 
        :cols="cols"
        :class="`offset-${offsetCols}`"
        >
        <div
          v-if="filteredInvits.length > 0"
          >
          <InvitationItem
            v-for="invit in filteredInvits"
            :key="invit.id"
            :invit="invit"
            :invitType="invitType"
          />
        </div>
        <p v-else>
          {{ $t('buttons.searchNoData') }}
        </p>
      </v-col>
    </v-row>
  
  </div>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'

  export default {
    name: 'InvitationsList',
    components: {
      InvitationsFilters: () => import(/* webpackChunkName: "InvitationsFilters" */ '@/components/invitations/InvitationsFilters.vue'),
      InvitationItem: () => import(/* webpackChunkName: "InvitationItem" */ '@/components/invitations/InvitationItem.vue'),
    },
    props: [
      'invits',
      'invitType',
      'cols',
      'offsetCols'
    ],
    data() {
      return {
        filters: {
          status: 'all',
          itemType: 'all',
          sortType: 'date',
          sortOrder: 'asc',
          search: null,
        },
      }
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
        userId: 'user/userId',
      }),
      filteredInvits() {
        let invits = this.invits
          // filter by status
          .filter( inv => { 
            if ( this.filters.status !== 'all' ) {
              return inv.invitation_status === this.filters.status
            } else {
              return true
            }
          })
          // filter by itemType
          .filter( inv => { 
            if ( this.filters.itemType !== 'all' ) {
              return inv.invitation_to_item_type === this.filters.itemType
            } else {
              return true
            }
          })
          // search
        // sort by

        // sort order
        return invits
      }
    }
  }
</script>
