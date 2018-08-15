// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VueKeyCloak from '@dsb-norge/vue-keycloak-js';
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

/* function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return undefined;
} */
const myCookie = document.cookie;
const url = window.location.hostname;
console.log(`Cookies: ${myCookie}`);
const cSettings = undefined;
// const cSettings = JSON.parse(getCookie('config'));

if (cSettings != null && cSettings.useSSO) {
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
