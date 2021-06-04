<template>

  <div>

    <!-- <code>hidden: {{ hidden }}</code><br> -->
    <!-- <code>model: {{ model }}</code> -->

    <p
      :class="`caption font-weight-bold text-center ${customColor ? 'white--text' : ''}`"
      >
      {{ $t('dataPackage.itemType') }}
    </p>
    <v-checkbox
      v-for="type in itemTypes"
      :key="type"
      v-model="model"
      dense
      :label="$t(`dataPackage.${type}`)"
      :value="type"
      :dark="!!customColor"
      hide-details
      on-icon="icon-check-square"
      off-icon="icon-square"
      class="my-1"
      @change="handleInput"
      :readonly="justOneSelected && model[0] === type"
      :disabled="justOneSelected && model[0] === type"
    />

  </div>
</template>

<script>

  export default {
    name: 'SearchItemTypes',
    props: [
      'hidden',
      'itemTypes',
      'customColor',
      'justOneSelected'
    ],
    model: {
      prop: 'hidden',
      event: 'blur'
    },
    data () {
      return {
        model: undefined,
      }
    },
    beforeMount () {
      this.model = this.hidden
    },
    methods: {
      handleInput(val) {
        this.$emit('blur', val)
      }
    }
  }

</script>
