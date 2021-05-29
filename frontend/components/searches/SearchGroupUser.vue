<template>
  <div>

    <v-combobox
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      
      color="grey"

      hide-no-data
      hide-selected
      clearable

      item-text="Description"
      item-value="API"
      :label="$t('buttons.searchUserGroup')"
      :placeholder="$t('buttons.queryUserGroup')"
      prepend-icon="icon-search1"
      return-object
      >
    </v-combobox>

  </div>
</template>

<script>

  import { mapState } from 'vuex'

  export default {
    name: 'SearchGroupUser',
      
    data () {
      return {
        descriptionLimit: 60,
        entries: [],
        isLoading: false,
        model: null,
        search: null,
      }
    },
    watch: {
      search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true

        // Lazily load input items
        this.$axios.get('https://api.publicapis.org/entries')
          .then(res => {
            const { count, entries } = res.data
            this.count = count
            this.entries = entries
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        api: (state) => state.api,
      }),
      items () {
        return this.entries.map(entry => {
          const Description = entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + '...'
            : entry.Description

          return Object.assign({}, entry, { Description })
        })
      },
    },
    methods: {

    }

  }
</script>
