import * as authsModels from '@/utils/utilsAuths.js'
import { Licences } from '@/utils/utilsLicences.js'

export const itemTitleModel = [ 
  {
    name: 'title',
    field: 'text',
    label: 'dataPackage.title',
    inModal: true,
    visible: true,
    readonly: false,
    options: undefined
  },
]

export const itemDescriptionModel = [ 
  {
    name: 'description',
    field: 'textarea',
    label: 'dataPackage.description',
    inModal: true,
    visible: true,
    readonly: false,
    options: undefined
  },
]

export const itemMessageModel = [ 
  {
    name: 'message',
    field: 'textarea',
    label: 'dataPackage.message',
    inModal: true,
    visible: true,
    readonly: false,
    options: undefined
  },
]

export const itemTagsModel = [ 
  {
    name: 'tags',
    field: 'combobox',
    label: 'dataPackage.tags',
    hint: 'dataPackage.tagsHint',
    inModal: true,
    visible: true,
    readonly: false,
    options: undefined
  },
]

export const itemUsersModel = [ 
  {
    name: 'users',
    field: 'combobox',
    label: 'dataPackage.users',
    hint: 'dataPackage.usersHint',
    showField: 'email',
    inModal: true,
    visible: true,
    readonly: false,
    options: undefined
  },
]

export const itemUsersPendingModel = [ 
  {
    name: 'users_pending',
    field: 'combobox',
    label: 'dataPackage.usersPending',
    hint: 'dataPackage.usersHint',
    inModal: true,
    visible: true,
    readonly: false,
    options: undefined
  },
]

export const itemInviteesModel = [ 
  {
    name: 'invitees',
    field: 'combobox',
    label: 'dataPackage.invitees',
    inModal: true,
    visible: true,
    readonly: false,
    options: undefined
  },
]

export const itemInfosModel = [ 
  ...itemTitleModel,
  ...itemDescriptionModel,
]

export const itemLicenceModel = [
  {
    name: 'licence',
    field: 'select',
    label: 'dataPackage.licence',
    inModal: true,
    visible: true,
    readonly: false,
    options: {
      text: 'title',
      value: 'title',
      items: Licences
    }
  },
]


export const itemAuthModelAll = [
  ...authsModels.AuthsModelsRead,
  ...authsModels.AuthsModelsPatch,
  ...authsModels.AuthsModelsWriteDefault
]
export const itemAuthModelBasic = [
  ...authsModels.AuthsModelsRead,
  ...authsModels.AuthsModelsWriteDefault
]
export const itemAuthModelGroup = [
  ...authsModels.AuthsModelsReadGroup,
  ...authsModels.AuthsModelsWriteRestricted
]

export const itemMetaModelUrl = [
  {
    name: 'url',
    field: 'text',
    label: 'dataPackage.url',
    inModal: true,
    visible: true,
    readonly: true,
    options: undefined
  },
]

export const itemMetaModel = [
  {
    name: 'id',
    field: 'text',
    label: 'dataPackage.id',
    inModal: true,
    visible: true,
    readonly: true,
    options: undefined
  },
  {
    name: 'owner_id',
    field: 'text',
    label: 'dataPackage.owner_id',
    inModal: true,
    visible: true,
    readonly: true,
    options: undefined
  },
  {
    name: 'creationDate',
    field: 'text',
    label: 'dataPackage.creationDate',
    inModal: true,
    visible: true,
    readonly: true,
    options: undefined
  },
]

export const itemPrefsModel = [ 
  {
    name: 'color',
    field: 'select',
    label: 'dataPackage.color',
    inModal: true,
    visible: true,
    readonly: false,
    options: {
      custom: true,
      prependColor: true,
      items: [
        'black', 'grey',
        'blue', 'green', 'red', 'purple', 'pink', 'orange',
        'indigo', 'deep-purple', 'cyan', 'teal', 'lime', 'amber', 'brown', 'deep-orange',
        'primary', 'accent', 'secondary', 'info', 'warning', 'error', 'success',
      ]
    }
  },
  {
    name: 'icon',
    field: 'select',
    label: 'dataPackage.icon',
    inModal: true,
    visible: true,
    readonly: false,
    options: {
      custom: true,
      prependIcon: true,
      valueIsIcon: true,
      items: [
        '',
        'icon-table',
        'icon-database',
        'icon-star',
        'icon-apps',
        'icon-settings',
        'icon-trello',
        'icon-map-pin',
        'icon-work',
        'icon-paperclip',
        'icon-map',
        'icon-message-square',
        'icon-layers',
        'icon-globe',
        'icon-users',
        'icon-bookmark',
        'icon-camera',
        'icon-at-sign',
        'icon-bell',
        'icon-bar-chart-2',
        'icon-archive',
        'icon-folder',
        'icon-power'
      ]
    }
  },
]

export const itemWorkspaceDataModel = [ 
  {
    name: 'datasets',
    field: 'list',
    label: 'dataPackage.datasets',
    inModal: false,
    visible: true,
    readonly: false,
    options: undefined
  },
]

export const itemDatasetDataModel = [ 
  {
    name: 'tables',
    field: 'list',
    label: 'dataPackage.tables',
    inModal: false,
    visible: true,
    readonly: false,
    options: undefined
  },
]
