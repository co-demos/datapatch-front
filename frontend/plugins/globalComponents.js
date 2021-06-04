
import Vue from 'vue'

const components = {

  LogoAnimated: () => import(/* webpackChunkName: "LogoAnimated" */ '@/components/graphics/LogoAnimated.vue'),
  MenuList: () => import(/* webpackChunkName: "MenuList" */ '@/components/buttons/MenuList.vue'),
  Alert: () => import(/* webpackChunkName: "Alert" */ '@/components/dialogs/Alert.vue'),
  AlertSnack: () => import(/* webpackChunkName: "AlertSnack" */ '@/components/dialogs/AlertSnack.vue'),
  BackRouter: () => import(/* webpackChunkName: "BackRouter" */ '@/components/buttons/BackRouter.vue'),
  Breadcrumbs: () => import(/* webpackChunkName: "Breadcrumbs" */ '@/components/navbars/Breadcrumbs.vue'),
  
  LandingTitle: () => import(/* webpackChunkName: "LandingTitle" */ '@/components/landing/LandingTitle.vue'),

  SearchAny: () => import(/* webpackChunkName: "SearchAny" */ '@/components/searches/SearchAny.vue'),

  ItemAvatar: () => import(/* webpackChunkName: "ItemAvatar" */ '@/components/graphics/ItemAvatar.vue'),

  ModalItem: () => import(/* webpackChunkName: "ModalItem" */ '@/components/data/ModalItem.vue'),
  ModalTabs: () => import(/* webpackChunkName: "ModalTabs" */ '@/components/data/ModalTabs.vue'),
  ModalFields: () => import(/* webpackChunkName: "ModalFields" */ '@/components/data/ModalFields.vue'),
  ModalDelete: () => import(/* webpackChunkName: "ModalDelete" */ '@/components/dialogs/ModalDelete.vue'),
  // ModalShare: () => import(/* webpackChunkName: "ModalShare" */ '@/components/dialogs/ModalShare.vue'),

  ModalRow: () => import(/* webpackChunkName: "ModalRow" */ '@/components/data/ModalRow.vue'),
  ModalRowFields: () => import(/* webpackChunkName: "ModalRowFields" */ '@/components/data/ModalRowFields.vue'),

  TableItem: () => import(/* webpackChunkName: "TableItem" */ '@/components/data/TableItem.vue'),
  DataTables: () => import(/* webpackChunkName: "DataTables" */ '@/components/data/DataTables.vue'),

  DataPatchTable: () => import(/* webpackChunkName: "DataPatchTable" */ '@/components/data/table/DataPatchTable.vue'),
  DataPatchTools: () => import(/* webpackChunkName: "DataPatchTools" */ '@/components/data/table/DataPatchTools.vue'),
  DataPatchHeader: () => import(/* webpackChunkName: "DataPatchHeader" */ '@/components/data/table/DataPatchHeader.vue'),
  DataPatchCell: () => import(/* webpackChunkName: "DataPatchCell" */ '@/components/data/table/DataPatchCell.vue'),

}

Object.entries(components).forEach(([name, component]) => {
  Vue.component(name, component)
})
