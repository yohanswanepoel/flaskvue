// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueKeyCloak from '@dsb-norge/vue-keycloak-js';
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

if (window.USE_SSO === '__USE_SSO__') {
  console.log('Setting Default Values');
  window.USE_SSO = false;
  window.SSO_URL = 'http://keycloak-myproject[YourURLGOESHERE]]/auth';
}
const url = window.location.hostname;

if (window.USE_SSO) {
  const kpath = window.SSO_URL;

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
} else {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    data: {
      baseURL: 'http://python-app-myproject.192.168.42.125.nip.io',
    },
  });
}
