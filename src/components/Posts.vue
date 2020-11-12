<template>
    <b-container class="d-flex flex-wrap">
          <div v-for="post in posts" :key="post.id"  class="mb-3 mr-3 post-block" >
            <b-card :title="post.title"  >
              <b-card-text>
                {{post.body}}
              </b-card-text>
              <b-button @click="deletePost(post.id)" variant="danger" class="float-right" >
                Удалить
              </b-button>
            </b-card>
          </div>
        </b-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Posts',
  computed: {
    ...mapState({
      posts: (state) => state.displayedPosts,
    }),
  },
  methods: {
    deletePost(id) {
      this.$store.dispatch({ type: 'deletePost', id });
    },
  },
};
</script>
