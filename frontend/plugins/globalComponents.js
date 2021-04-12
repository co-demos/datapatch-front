
import Vue from 'vue'

const components = {

  LogoAnimated: () => import(/* webpackChunkName: "LogoAnimated" */ '@/components/graphics/LogoAnimated.vue'),
  MenuList: () => import(/* webpackChunkName: "MenuList" */ '@/components/buttons/MenuList.vue'),
  Alert: () => import(/* webpackChunkName: "Alert" */ '@/components/dialogs/Alert.vue'),

}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
