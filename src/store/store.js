import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    posts: [],
    displayedPosts: [],
    search: '',
    newPost: {
      title: '',
      body: '',
      id: -1,
    },
  },
  actions: {
    async fetchPosts({ commit }) {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      const json = await response.json();
      commit('setPosts', json);
      commit('setDisplayedPosts', json);
    },
    deletePost({ commit, state }, payload) {
      const newPosts = [];
      state.posts.forEach((post) => {
        if (post.id !== payload.id) {
          newPosts.push(post);
        }
      });
      commit('setPosts', newPosts);
      commit('setDisplayedPosts', newPosts);
    },
    addPost({ commit, state }) {
      const newPost = { ...state.newPost };
      newPost.id = state.posts.length + 1;
      commit('addPost', newPost);
    },
    updateSearch({ commit, state }, payload) {
      const newDisplayedPosts = state.posts.filter((post) => post.title.includes(payload.search)
        || post.body.includes(payload.search));
      commit('setDisplayedPosts', newDisplayedPosts);
      commit('updateSearch', payload.search);
    },

  },
  mutations: {
    setPosts(state, payload) {
      state.posts = [...payload];
    },
    setDisplayedPosts(state, payload) {
      state.displayedPosts = [...payload];
    },
    updateSearch(state, payload) {
      state.search = payload;
    },
    handleTitle(state, payload) {
      state.newPost.title = payload;
    },
    handleBody(state, payload) {
      state.newPost.body = payload;
    },
    cancelNewPost(state) {
      state.newPost = {
        title: '',
        body: '',
        id: -1,
      };
    },
    addPost(state, payload) {
      state.newPost = {
        title: '',
        body: '',
        id: -1,
      };
      state.posts = [payload, ...state.posts];
      state.displayedPosts = [...state.posts];
    },
  },
});

export default store;
