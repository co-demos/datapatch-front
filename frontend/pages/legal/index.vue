<style scoped>

  .border-dash {
    border-style: dashed !important;
    background-color: transparent !important;
    border-color: #ffffff !important;
  }

</style>

<template>

  <v-container class="mb-12 mt-6 mx-6 pb-12">

    <p class="text-center text-h4 white--text font-weight-bold">
      {{ $t('pages.legal') }}
    </p>

    <v-divider class="my-12 border-dash"/>

    <p class="text-left text-h6 white--text mb-6">
      {{ $t('legal.editorInfos') }} : 
    </p>
    <p 
      v-for="item in itemsEditor"
      :key="`editor-${item.textLabel}`"
      class="white--text ml-12"
      >
      <span class="mr-4 font-italic">
        {{ $t(item.textLabel) }} :
      </span>
      <span class="font-weight-black">
        <a
          v-if="item.isLink"
          :href="item.textContent"
          target="_blank"
          class="white--text"
          >
          {{ item.textContent }}
        </a>
        <span v-else>
          {{ item.textContent }}
        </span>
      </span>
    </p>

    <v-divider class="my-12 border-dash"/>

    <p class="text-left text-h6 white--text mb-6">
      {{ $t('legal.providerInfos') }} : 
    </p>
    <p 
      v-for="item in itemsProvider"
      :key="`provider-${item.textLabel}`"
      class="white--text ml-12"
      >
      <span class="mr-4 font-italic">
        {{ $t(item.textLabel) }} :
      </span>
      <span class="font-weight-black">
        <a
          v-if="item.isLink"
          :href="item.textContent"
          target="_blank"
          class="white--text"
          >
          {{ item.textContent }}
        </a>
        <span v-else>
          {{ item.textContent }}
        </span>
      </span>
    </p>

    <v-divider class="my-12 border-dash"/>


  <br>
  </v-container>

</template>

<script>

  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'LegalMentions',
    layout: 'layout_landing',
    head() {
      return {
        title: `${this.appTitle} - ${this.$t('pages.legal')}`,
        htmlAttrs: {
          lang: this.$i18n.locale
        },
      }
    },
    data () {
      return {
        pathItems: [
          { 
            text: 'pages.legal',
            disabled: true,
            to: '/legal',
          }
        ],
      }
    },
    beforeMount () {
      this.updatePath(this.pathItems)
    },
    computed: {
      ...mapState({
        log: (state) => state.log,
        appTitle: (state) => state.appTitle,
      }),
      itemsEditor() {
        let items =  [
            {
              textLabel: 'legal.legalName',
              textContent: process.env.CONFIG_APP.legal.EDITOR_NAME
            },
            {
              textLabel: 'legal.legalAdress',
              textContent: process.env.CONFIG_APP.legal.EDITOR_ADRESS
            },
            {
              textLabel: 'legal.legalTel',
              textContent: process.env.CONFIG_APP.legal.EDITOR_TEL
            },
            {
              textLabel: 'legal.legalCode',
              textContent: process.env.CONFIG_APP.legal.EDITOR_CODE
            },
          ]
        return items
      },
      itemsProvider() {
        let items = [
          {
            textLabel: 'legal.legalName',
            textContent: process.env.CONFIG_APP.legal.PROVIDER_NAME
          },
          {
            textLabel: 'legal.legalAdress',
            textContent: process.env.CONFIG_APP.legal.PROVIDER_ADRESS
          },
          {
            textLabel: 'legal.providerSite',
            textContent: process.env.CONFIG_APP.legal.PROVIDER_SITE,
            isLink: true
          },
        ]
        return items
      } 
    },
    methods: {
      ...mapActions({
        updatePath: 'updateCrumbsPath',
      }),
    }  
  }

</script>
