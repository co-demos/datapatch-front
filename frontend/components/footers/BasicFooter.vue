<template>
  <v-footer
    app
    absolute
    >
    <!-- :fixed="fixed" -->
    Data Patch &nbsp;
    <span>
      &copy; {{ new Date().getFullYear() }}
    </span>
  </v-footer>
</template>

<script>
export default {
  data () {
    return {
      fixed: false,
    }
  }
}
</script>
