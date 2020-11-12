<template>
  <b-input-group prepend="Поиск:" class="mt-3 mb-3 primary" >
    <b-form-input :value="search"  @input="handleSearch"/>
  </b-input-group>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Search',
  computed: {
    ...mapState({
      search: (state) => state.search,
    }),
  },
  methods: {
    handleSearch(e) {
      this.$store.dispatch({ type: 'updateSearch', search: e });
    },
  },
};
</script>
