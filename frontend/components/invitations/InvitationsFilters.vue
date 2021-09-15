<template>

  <v-row
    class="px-5 align-center justify-center"
    >

    <v-col 
      cols="3" 
      class="pa-0 text-left grey--text text-caption pr-3"
      >
      {{ $t('invitations.status') }}
    </v-col>
    <v-col 
      cols="3" 
      class="pa-0 text-left grey--text text-caption pr-3"
      >
      {{ $t('dataPackage.itemType') }}
    </v-col>
    <v-col 
      cols="3" 
      class="pa-0 text-left grey--text text-caption pr-3"
      >
      {{ $t('invitations.search') }}
    </v-col>
    <v-col 
      cols="3" 
      class="pa-0 text-left grey--text text-caption"
      >
      {{ $t('sorts.sortResults') }}
    </v-col>

    <!-- select status -->
    <v-col cols="3" class="pa-0 pr-3">
      <v-select
        :items="statusList"
        v-model="status"
        item-value="name"
        class="pt-0"
        hide-details
        @change="handleInput"
        >
        <template v-slot:item="{ item }">
          <span>
            <v-icon 
              small 
              class="mr-2"
              :color="item.color"
              >
              {{ item.icon }}
            </v-icon>
            {{ $t(item.label) }}
          </span>
        </template>
        <template v-slot:selection="{ item }">
          <span>
            <v-icon 
              small 
              class="mr-2"
              :color="item.color"
              >
              {{ item.icon }}
            </v-icon>
            <span class="text-body-2">
              {{ $t(item.label) }}
            </span>
          </span>
        </template>
      </v-select>
    </v-col>

    <!-- select itemType -->
    <v-col cols="3" class="pa-0 pr-3">
      <v-select
        :items="itemTypesList"
        v-model="itemType"
        item-value="name" 
        class="pt-0"
        hide-details
        @change="handleInput"
        >
        <template v-slot:item="{ item }">
          <span>
            <v-icon small class="mr-2">
              {{ item.icon }}
            </v-icon>
            {{ $t(item.label) }}
          </span>
        </template>
        <template v-slot:selection="{ item }">
          <span>
            <v-icon small class="mr-2">
              {{ item.icon }}
            </v-icon>
            <span class="text-body-2">
              {{ $t(item.label) }}
            </span>
          </span>
        </template>
      </v-select>
    </v-col>

    <!-- search -->
    <v-col cols="3" class="pa-0 pr-3">
      <v-text-field
        v-model="search"
        hide-details
        @change="handleInput"
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

    <!-- select order -->
    <v-col cols="2" class="pa-0">
      <v-select
        :items="sortsList"
        v-model="sortType"
        :hint="$t('dataPackage.itemType')"
        item-value="name" 
        class="pt-0"
        hide-details
        @change="handleInput"
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

    <v-col cols="1" class="pa-0 pl-2">
      <v-btn-toggle
        v-model="sortOrder"
        @change="handleInput"
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

      <!-- <span>{{ status }}</span> / 
      <span>{{ itemType }}</span> /
      <span>{{ sortType }}</span> /
      <span>{{ sortOrder }}</span> /  -->

  </v-row>

</template>

<script>

  import { mapState, mapGetters } from 'vuex'
  import { ItemTypesOptions, InvitationStatuses } from '@/utils/utilsInvitations'

  export default {
    name: 'InvitationsFilters',
    props: [
      'hidden',
      'invitType'
    ],
    model: {
      prop: 'hidden',
      event: 'blur'
    },
    data() {
      return {
        isLoading: false,
        status: 'all',
        itemType: 'all',
        sortType: 'created_date',
        sortOrder: 'desc',
        search: null,
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
      statusList() {
        let statuses = [
          { name: 'all', label: 'invitations.all', icon: 'icon-minus-circle' },
          ...InvitationStatuses
        ]
        return statuses
      },
      itemTypesList() {
        let itemTypes = [
          { name: 'all', label: 'invitations.all', icon: 'icon-minus-circle' },
          ...ItemTypesOptions
        ]
        return itemTypes
      },
      sortsList() {
        let sorts = [
          { name: 'created_date', label: 'sorts.byDate' },
          { name: 'invitation_status', label: 'sorts.byStatus' },
          // { name: 'invitee', label: 'sorts.byUser' },
          { name: 'invitation_to_item_type', label: 'sorts.byItemType' },
        ]
        return sorts
      },
      filters() {
        let filters = {
          status: this.status,
          itemType: this.itemType,
          sortType: this.sortType,
          sortOrder: this.sortOrder,
          search: this.search,
        }
        return filters
      }
    },
    methods: {
      handleInput(val) {
        this.log && console.log("C-InvitationsFilters > handleInput > val : ", val)
        this.log && console.log("C-InvitationsFilters > handleInput > this.filters : ", this.filters)
        this.$emit('blur', this.filters)
      }
    }
  }
</script>
