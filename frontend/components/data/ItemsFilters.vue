<template>

  <v-row
    class="ItemsFilters align-center"
    >

    <!-- checkboxes -->
    <v-col 
      cols="12" 
      class="py-0 ml-n2 text-left grey--text text-caption px-1 mx-0"
      >
      <!-- select user items -->
      <!-- <v-row class="flex-grow-1"> -->
        <v-checkbox
          class="my-1 mx-3"
          off-icon="icon-square"
          on-icon="icon-check-square"
          hide-details="auto"
          v-model="userItems"
          dense
          @change="handleInput()"
          >
          <template v-slot:label>
            <span 
              :class="`caption ${ userItems ? 'primary' : 'grey' }--text`"
              >
              {{ $t(userItemText) }}
            </span>
          </template>
        </v-checkbox>
      <!-- </v-row> -->
      
      <br>

      <!-- select shared items -->
      <!-- <v-row class=""> -->
        <v-checkbox
          class="my-1 mx-3"
          off-icon="icon-square"
          on-icon="icon-check-square"
          hide-details="auto"
          v-model="sharedItems"
          dense
          @change="handleInput()"
          >
          <template v-slot:label>
            <span 
              :class="`caption ${ sharedItems ? 'primary' : 'grey' }--text`"
              >
              {{ $t(sharedItemText) }}
            </span>
          </template>
        </v-checkbox>
      <!-- </v-row> -->

    </v-col>


    <!-- search -->
    <!-- <v-col 
      cols="4" 
      class="py-0 text-left grey--text text-caption px-1"
      >
      
      <v-row>
        {{ $t('workspaces.searchWorkspace') }}
      </v-row>

      <v-row>
        <v-col cols="12" class="">
          <v-text-field
            v-model="search"
            hide-details
            @input="handleInput()"
            class="pt-0"
            clearable
            single-line
            >
            <template v-slot:prepend-inner>
              <v-icon small>
                icon-search1
              </v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>

    </v-col> -->


    <!-- select order -->
    <v-col 
      cols="4" 
      class="py-0 text-left grey--text text-caption px-1"
      >

      <!-- <v-row>
        {{ $t('sorts.sortResults') }}
      </v-row>

      <v-row>
        <v-col cols="9" class="">
          <v-select
            :items="sortsList"
            v-model="sortType"
            :hint="$t('dataPackage.itemType')"
            item-value="name" 
            class="pt-0"
            hide-details
            @change="handleInput()"
            >
            <template v-slot:item="{ item }">
              {{ $t(item.label) }}
            </template>
            <template v-slot:selection="{ item }">
              <span class="text-body-2">
                {{ $t(item.label) }}
              </span>
            </template>
          </v-select>
        </v-col>

        <v-col cols="3" class="pa-0 pl-2">
          <v-btn-toggle
            v-model="sortOrder"
            @change="handleInput()"
            class="pt-0"
            mandatory
            dense
            group
            >
            <v-btn 
              :value="'desc'" 
              text
              >
              <v-icon small>
                icon-arrow-down
              </v-icon>
            </v-btn>
            <v-btn 
              :value="'asc'" 
              text
              >
              <v-icon small>
                icon-arrow-up
              </v-icon>
            </v-btn>
          </v-btn-toggle>

        </v-col>
      </v-row> -->

    </v-col>


  </v-row>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  // import { ItemTypesOptions, InvitationStatuses } from '@/utils/utilsInvitations'

  export default {
    name: 'ItemsFilters',
    props: [
      'hidden',
      'itemsType',
    ],
    model: {
      prop: 'hidden',
      event: 'blur'
    },
    data() {
      return {
        isLoading: false,

        // status: 'all',
        // itemType: 'all',
        userItems: true,
        sharedItems: true,

        sortType: 'created_date',
        sortOrder: 'desc',
        search: null,
        itemsTypeTexts: {
          workspaces: {
            userItem: 'workspaces.myWorkspaces',
            sharedItems: 'workspaces.sharedWorkspaces',
          },
          groups: {
            userItem: 'groups.myGroups',
            sharedItems: 'groups.sharedGroups',
          }
        }
      }
    },
    beforeMount () {
      this.model = this.hidden
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
      }),
      ...mapGetters({
        isAuthenticated: 'user/isAuthenticated',
        userId: 'user/userId',
      }),

      refTexts() {
        return this.itemsTypeTexts[this.itemsType]
      },
      userItemText() {
        return this.refTexts.userItem
      },
      sharedItemText() {
        return this.refTexts.sharedItems
      },
      // statusList() {
      //   let statuses = [
      //     { name: 'all', label: 'invitations.all', icon: 'icon-minus-circle' },
      //     ...InvitationStatuses
      //   ]
      //   return statuses
      // },
      // itemTypesList() {
      //   let itemTypes = [
      //     { name: 'all', label: 'invitations.all', icon: 'icon-minus-circle' },
      //     ...ItemTypesOptions
      //   ]
      //   return itemTypes
      // },

      sortsList() {
        let sorts = [
          { name: 'created_date', label: 'sorts.byDate' },
          // { name: 'invitation_status', label: 'sorts.byStatus' },
          // { name: 'invitee', label: 'sorts.byUser' },
          // { name: 'invitation_to_item_type', label: 'sorts.byItemType' },
        ]
        return sorts
      },
      filters() {
        let filters = {
          userItems: this.userItems,
          sharedItems: this.sharedItems,
          sortType: this.sortType,
          sortOrder: this.sortOrder,
          search: this.search,
        }
        return filters
      }
    },
    methods: {
      handleInput() {
        // this.log && console.log("C-ItemsFilters > handleInput > val : ", val)
        // this.log && console.log("C-ItemsFilters > handleInput > this.filters : ", this.filters)
        this.$emit('blur', this.filters)
      }
    }
  }
</script>
