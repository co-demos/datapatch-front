<template>
  <div>

    <!-- <code>hidden: {{ hidden }}</code><br> -->
    <!-- <code>model: {{ model }}</code> -->

    <p
      :class="`caption font-weight-bold text-center mb-1 ${customColor ? 'white--text' : ''}`"
      >
      {{ $t('auth.authTypesRead') }}
      <!-- - {{ onlyUsers }} -->
    </p>
    <v-radio-group
      v-model="model"
      hide-details
      class="mt-0 ml-2"
      @change="handleInput"
      >
      <v-radio
        v-for="auth in filteredAuthTypes"
        :key="auth.name"
        dense
        :value="auth.name"
        :dark="!!customColor"
        class="my-1"
        >
        <template v-slot:label>
          <div>
            <span
              :dark="!!customColor"
              class="body-2"
              >
              {{ $t(auth.label) }}
            </span>
            <v-tooltip top>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  x-small
                  class="ml-1"
                  :dark="!!customColor"
                  v-bind="attrs"
                  v-on="on"
                  >
                  icon-info
                </v-icon>
              </template>
              {{ $t(auth.tooltip) }}
            </v-tooltip>
          </div>
        </template>
      </v-radio>
    </v-radio-group>

  </div>
</template>

<script>

  import { AuthsOptions } from '@/utils/utilsAuths.js'

  export default {
    name: 'SearchAuthLevel',
    props: [
      'hidden',
      'customColor',
      'onlyUsers'
    ],
    model: {
      prop: 'hidden',
      event: 'blur'
    },
    data () {
      return {
        model: undefined,
        authTypes: AuthsOptions,
      }
    },
    beforeMount () {
      this.model = this.hidden
    },
    computed: {
      filteredAuthTypes() {
        let filtered = this.onlyUsers ? this.authTypes.filter(auth => auth.name !== 'owner+groups' ) : this.authTypes
        return  filtered
      }
    },
    methods: {
      handleInput(val) {
        this.$emit('blur', val)
      }
    }
  }

</script>
