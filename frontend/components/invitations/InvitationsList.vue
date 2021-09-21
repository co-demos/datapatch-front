<template>

  <div class="InvitationsList">
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
    <div class="justify-center" v-if="true">
      <span>filters : <code>{{ filters }}</code></span><br>
      <!-- <span>filteredInvits : <code>{{ filteredInvits.length }}</code></span> -->
    </div>

    <v-row
      class="justify-center"
      >
      <v-col 
        :cols="cols"
        :class="`offset-${offsetCols}`"
        >
        <div
          v-if="filteredInvits().length > 0"
          >
          <!-- <draggable
            v-model="filteredInvits"
            v-bind="dragOptions"
            draggable=".invit"
            group="invitsGroup"
            @start="drag=true"
            @end="drag=false"
            > -->
            <InvitationItem
              v-for="invit in filteredInvits()"
              :key="invit.id"
              :invit="invit"
              :invitType="invitType"
            />
          <!-- </draggable> -->
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
  import { mapOrder } from '@/utils/utilsFunctions'

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
        drag: false,
        filters: {
          status: 'all',
          itemType: 'all',
          sortType: 'date',
          sortOrder: 'desc',
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
      dragOptions() {
        return {
          animation: 200,
          group: "invitsGroup",
          disabled: false,
          ghostClass: "ghost"
        }
      },
    },
    methods: {
      filteredInvits() {
        // this.log && console.log("\nC-InvitationsList > filteredInvits > this.invits : ", this.invits)
        // this.log && console.log("C-InvitationsList > filteredInvits > this.filters : ", this.filters)
        let invits = this.invits ? this.invits : []
        // let invits = [ ...this.invits  ]
        // this.log && console.log("C-InvitationsList > filteredInvits > invits.length : ", invits.length )
        if (invits.length > 0 ) {
          // filter by status
          invits = invits
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
          // TO DO

          // sort by
          const sortField = this.filters.sortType
          invits = invits.sort((a, b) => {
            if (a[sortField] < b[sortField]) return -1
            return a[sortField] > b[sortField] ? 1 : 0
          })

          // sort order
          // this.log && console.log("C-InvitationsList > filteredInvits > invits - before order : ", invits)
          if ( this.filters.sortOrder === 'desc' ) {
            invits.reverse()
          }
          // this.log && console.log("C-InvitationsList > filteredInvits > invits - after order : ", invits)

        }

        return invits
      }
    }
  }
</script>
