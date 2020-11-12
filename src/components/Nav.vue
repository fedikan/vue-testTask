<template>
<div class="sidebar-content">
    <Logo/>
    <b-nav>
        <b-nav-item  >Link 1</b-nav-item>
        <b-nav-item>Link 2</b-nav-item>
        <b-nav-item >Link 3</b-nav-item>
        <b-nav-item>Another Link</b-nav-item>
    </b-nav>
    <b-button  v-b-modal.add-post-modal >Add Post</b-button>
</div>
</template>

<script>
import Logo from './Logo.vue';

export default {
  components: {
    Logo,
  },
};
</script>
