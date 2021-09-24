<template>
  <v-footer
    app
    padless
    absolute
    >

    <!-- :fixed="fixed" -->
    
    <v-card
      flat
      tile
      dense
      width="100%"
      class="text-center grey lighten-3 pt-3"
      >

      <v-card-text class="py-2">

        <v-tooltip         
          v-for="item in items"
          :key="item.name"
          top
          >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-4"
              color="black"
              icon
              :href="item.url"
              target="_blank"
              v-bind="attrs"
              v-on="on"
              >
              <v-icon 
                size="20px"
                >
                {{ item.icon }}
              </v-icon>
            </v-btn>
          </template>
          {{ $t(item.text) }}
        </v-tooltip>

      </v-card-text>

      <!-- <v-divider></v-divider> -->

      <v-card-text class="pt-0 pb-1">
        <strong>
          Data Patch
        </strong>
        - 
        <span>
          {{ $t('datapatch.codemos') }}
        </span>
        <!-- - 
        <span>
          {{ new Date().getFullYear() }}
        </span> -->
      </v-card-text>

      <v-card-text class="pt-0">
        ©
        <span class="ml-1">
          2021-{{ new Date().getFullYear() }}
        </span>

        <span
          v-for="item in infos"
          :key="item.to"
          >
          - 
          <nuxt-link
            :to="item.to"
            class="grey--text"
            >
            {{ $t(item.text) }}
          </nuxt-link>
        </span>

      </v-card-text>

    </v-card>

  </v-footer>
</template>

<script>

  export default {
    name: 'BasicFooter',
    data () {
      return {
        fixed: false,
        items: [
          { 
            name: 'Co-demos on Github',
            icon: 'icon-github',
            url: 'https://github.com/co-demos/datapatch-front',
            text: "footer.github"
          },
          { 
            name: 'Twitter',
            icon: 'icon-twitter',
            url: 'https://twitter.com/jparis_py',
            text: "footer.twitter"
          },
          {
            name: 'Tipee',
            icon: 'icon-credit-card',
            url: 'https://fr.tipeee.com/data-patch',
            text: "footer.tipee"
          }
        ],
        infos: [
          { 
            name: 'legal',
            icon: 'icon-gavel',
            to: '/legal',
            text: 'pages.legal'
          },
        ]
      }
    }
  }

</script>
