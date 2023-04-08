import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import dataV from '@jiaminghi/data-view';
// 引入全局css
import './assets/scss/style.scss';
// 按需引入vue-awesome图标
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';
import 'echarts/map/js/world.js'
import 'echarts/map/js/china.js'
import 'echarts/extension-src/bmap/bmap.js'
import axios from "axios";

//引入echart
//4.x 引用方式
import echarts from 'echarts'
import Config from '../static/config.json'
//5.x 引用方式为按需引用
//希望使用5.x版本的话,需要在package.json中更新版本号,并切换引用方式
//import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios 
Vue.config.productionTip = false;
axios.defaults.baseURL = "http://" + Config.server_ip + ":" + Config.server_port
axios.defaults.timeout = Config.timeout
// 全局注册
Vue.component('icon', Icon);
Vue.use(dataV);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
