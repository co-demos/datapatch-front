<template>
  <v-footer
    app
    absolute
    padless
    >

    <!-- :fixed="fixed" -->
    
    <v-card
      flat
      tile
      dense
      width="100%"
      class="text-center grey lighten-3"
      >

      <v-card-text class="py-2">
        <v-btn
          v-for="item in items"
          :key="item.name"
          class="mx-4"
          color="black"
          icon
          :href="item.url"
          target="_blank"
          >
          <v-icon size="20px">
            {{ item.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>

      <!-- <v-divider></v-divider> -->

      <v-card-text class="pt-0">
        <strong>
          Data Patch
        </strong>
        - 
        <span>
          {{ $t('datapatch.codemos') }}
        </span>
        - 
        <span>
          {{ new Date().getFullYear() }}
        </span>
      </v-card-text>


    </v-card>




  </v-footer>
</template>

<script>
export default {
  data () {
    return {
      fixed: false,
      items: [
        { 
          name: 'co-demos',
          icon: 'icon-github',
          url: 'https://github.com/co-demos'
        },
        { 
          name: 'twitter',
          icon: 'icon-twitter',
          url: 'https://twitter.com/jparis_py'
        },
      ]
    }
  }
}
</script>
