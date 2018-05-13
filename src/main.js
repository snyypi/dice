// Inject materialize-css framework
import 'materialize-css';
import 'materialize-css/dist/css/materialize.css';

import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
