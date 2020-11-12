import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import store from './store/store';

import App from './App.vue';

import './style.scss';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app');
