import * as models from '@/utils/utilsModels.js'

export const ItemTypesOptions = [
  {
    name: 'workspace',
    label: 'dataPackage.workspace',
  },
  {
    name: 'dataset',
    label: 'dataPackage.dataset',
  },
  {
    name: 'group',
    label: 'dataPackage.group',
  },
  {
    name: 'table',
    label: 'dataPackage.table',
  },
]

export const ItemTypes = [
  {
    name: 'invitation_to_item_type',
    nameDetails: 'read+comment+patch',
    field: 'select',
    label: 'invitations.selectItemType',
    default: 'workspace',
    help: '',
    inModal: true,
    visible: true,
    readonly: false,
    options: {
      custom: true,
      text: 'label',
      value: 'name',
      translate: true,
      items: ItemTypesOptions
    },
  },
  {
    name: 'id',
    field: 'integer',
    label: 'dataPackage.id',
    inModal: true,
    visible: true,
    readonly: false,
    options: undefined
  },
]

export class Invitation {

  static itemType = 'invitation'

  constructor (
    owner_id=undefined,
    title='My new invitation',
    message='My invitation description',
    creationDate=undefined,
    
    invitees=[],
    invitation_to_item_type='workspace',
    invitation_to_item_id=undefined,

    icon='icon-user-plus',
    id=undefined,
    ) {
    this.owner_id = owner_id
    this.id = id
    this.title = title
    this.message = message

    this.invitees = invitees
    this.invitation_to_item_type = invitation_to_item_type
    this.invitation_to_item_id = invitation_to_item_id

    this.creationDate = creationDate

    this.icon = icon
  
  }

  get data () {
    return { 
      owner_id: this.owner,
      id: this.id,
      title: this.title,
      message: this.message,

      invitees: this.invitees,
      invitation_to_item_type: this.invitation_to_item_type,
      invitation_to_item_id: this.invitation_to_item_id,

      icon: this.icon,

      creationDate: this.creationDate,

      itemType: this.itemType,
    }
  }

  get infos () {
    return [
      ...models.itemTitleModel,
      ...models.itemMessageModel,
      ...models.itemInviteesModel,
      ...ItemTypes,
    ]
  }
  get meta () {
    return [
      ...models.itemMetaModel,
    ]
  }

 }
