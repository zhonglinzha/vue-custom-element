import 'document-register-element/build/document-register-element';
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Prism from 'prismjs/prism';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism.css';
import vueElement from './vue-element';

import App from './demo/App';
import Home from './demo/Home';
import Demos from './demo/Demos';

import demos from './demo/services/demos';

//
// import DemoBasicDocs from './demo/components/DemoBasic-docs';
// import DemoBindingDocs from './demo/components/DemoBinding-docs';

///////////////////////
//  Use Vue plugins  //
///////////////////////
Vue.use(vueElement);
Vue.use(VueRouter);
Vue.use(ElementUI);

///////////////////////////////////////////////////////
//  Get docs components and Register Custom Elements //
///////////////////////////////////////////////////////
const demosDocs = {};
Object.keys(demos).forEach((demo) => {
  demosDocs[demo] = require(`./demo/components/Demo${demo.charAt(0).toUpperCase()}${demo.slice(1)}-docs`); // eslint-disable-line
  demosDocs[demo].methods.registerCustomElement();
});

//////////////////////////////
//  Config and init router  //
//////////////////////////////
const demosRoutes = [];
Object.keys(demosDocs).forEach((demo) => {
  demosRoutes.push({
    path: demo,
    component: demosDocs[demo]
  });
});

const routes = [
  {
    path: '/',
    component: App,
    children: [
      { path: '/', component: Home },
      {
        path: '/demos',
        component: Demos,
        children: demosRoutes
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

router.afterEach(() => {
  setTimeout(() => {
    Prism.highlightAll();
  }, 200);
});

const app = new Vue({
  router
}).$mount('#vue-demo-app');

export default app;
