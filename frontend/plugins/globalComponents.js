
import Vue from 'vue'

const components = {

  LogoAnimated: () => import(/* webpackChunkName: "LogoAnimated" */ '@/components/graphics/LogoAnimated.vue'),

}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
