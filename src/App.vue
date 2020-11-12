<template>
  <b-container fluid class="no-gutters p-0">
    <b-row no-gutters >
      <b-col lg="2" sm="12" class="px-3 py-2 sidebar">
        <Nav/>
      </b-col>
      <b-col lg="10" sm="12" class="px-3 py-2">
        <Search/>
        <Posts/>
      </b-col>
    </b-row>
    <Modal/>
  </b-container>
</template>

<script>

import Modal from './components/Modal.vue';
import Posts from './components/Posts.vue';
import Search from './components/Search.vue';
import Nav from './components/Nav.vue';

export default {
  name: 'app',
  components: {
    Modal, Posts, Search, Nav,
  },
  mounted() {
    this.$store.dispatch('fetchPosts');
  },
};
</script>

<style lang="scss" scoped>
</style>
