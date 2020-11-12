<template>
  <b-modal id="add-post-modal" title="BootstrapVue" @cancel="cancelNewPost" @ok="handleSubmit">

      <b-input-group prepend="Title" class="mt-3 mb-3">
           <b-form-input :value="title"  @input="handleTitle"/>
        </b-input-group>
      <b-input-group prepend="Body" class="mt-3 mb-3">
           <b-form-input :value="body"  @input="handleBody"/>
        </b-input-group>

  </b-modal>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Modal',
  computed: {
    ...mapState({
      title: (state) => state.newPost.title,
      body: (state) => state.newPost.body,
    }),
  },
  methods: {
    handleTitle(e) {
      this.$store.commit('handleTitle', e);
    },
    handleBody(e) {
      this.$store.commit('handleBody', e);
    },
    handleSubmit() {
      this.$store.dispatch('addPost');
    },
    cancelNewPost() {
      this.$store.commit('cancelNewPost');
    },
  },
};
</script>
