
import Vue from 'vue'

const components = {

  LogoAnimated: () => import(/* webpackChunkName: "LogoAnimated" */ '@/components/graphics/LogoAnimated.vue'),
  MenuList: () => import(/* webpackChunkName: "MenuList" */ '@/components/buttons/MenuList.vue'),
  Alert: () => import(/* webpackChunkName: "Alert" */ '@/components/dialogs/Alert.vue'),
  AlertSnack: () => import(/* webpackChunkName: "AlertSnack" */ '@/components/dialogs/AlertSnack.vue'),
  BackRouter: () => import(/* webpackChunkName: "BackRouter" */ '@/components/buttons/BackRouter.vue'),
  Breadcrumbs: () => import(/* webpackChunkName: "Breadcrumbs" */ '@/components/navbars/Breadcrumbs.vue'),

  ItemAvatar: () => import(/* webpackChunkName: "ItemAvatar" */ '@/components/graphics/ItemAvatar.vue'),

  ModalItem: () => import(/* webpackChunkName: "ModalItem" */ '@/components/data/ModalItem.vue'),
  ModalFields: () => import(/* webpackChunkName: "ModalFields" */ '@/components/data/ModalFields.vue'),
  ModalDelete: () => import(/* webpackChunkName: "ModalDelete" */ '@/components/dialogs/ModalDelete.vue'),

}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
