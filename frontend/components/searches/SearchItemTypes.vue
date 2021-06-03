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
      class="my-1"
      @change="handleInput"
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
