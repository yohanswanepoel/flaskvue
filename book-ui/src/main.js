// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueKeyCloak from '@dsb-norge/vue-keycloak-js';
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

const url = window.location.hostname;

const domainURL = url.substring(url.indexOf('.'), url.length);
const kpath = `http://keycloak-myproject${domainURL}/auth`;

const kc = {
  authRealm: 'bookapi',
  authUrl: kpath,
  authClientId: 'vue',
  authRedirectUri: url,
};

const kcInit = {
  onLoad: 'login-required',
};

Vue.use(BootstrapVue);

Vue.use(VueKeyCloak, {
  config: kc,
  init: kcInit,
  onReady: (keycloak) => {
    console.log(`I wonder what Keycloak returns: ${keycloak}`);
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      template: '<App/>',
      render: h => h(App),
      data: {
        baseURL: 'http://python-app-myproject.192.168.42.125.nip.io',
      },
    });
  },
});


/* eslint-disable no-new */
/* new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data: {
    baseURL: 'http://python-app-myproject.192.168.42.125.nip.io',
  },
}); */
