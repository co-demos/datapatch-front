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
        <span class="font-weight-bold">
          Data Patch
        </span>
        <v-icon small class="mx-2">
          icon-minus1
        </v-icon> 
        <span>
          {{ $t('datapatch.codemos') }}
        </span>
        <v-icon small class="mx-2">
          icon-minus1
        </v-icon>
        ©
        <span class="font-weight-bold">
          {{ new Date().getFullYear() }}
        </span>
      </v-card-text>

      <v-card-text class="pt-0">

        <span
          v-for="(item, index) in infos"
          :key="item.name"
          >
          <v-icon v-if="index" small class="mx-2">
            icon-minus1
          </v-icon> 
          <nuxt-link
            v-if="item.to"
            :to="item.to"
            class="grey--text"
            >
            {{ $t(item.text) }}
          </nuxt-link>
          <a
            v-if="item.url"
            :href="item.url"
            target="_blank"
            class="grey--text"
            >
            {{ $t(item.text) }}
          </a>
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
            name: 'datapatch',
            icon: 'icon-app',
            url: 'https://wiki.resilience-territoire.ademe.fr/wiki/Data_Patch',
            text: 'datapatch.ademe'
          },
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
