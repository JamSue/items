import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import SparkMD5 from 'spark-md5';

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(SparkMD5)
new Vue({
  render: h => h(App),
}).$mount('#app')
