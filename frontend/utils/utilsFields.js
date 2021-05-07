import * as models from '@/utils/utilsModels.js'

// cf :  https://dmitripavlutin.com/javascript-classes-complete-guide/

export const FieldTypes = [
  {
    field_type: 'str',
    name: 'string',
    text: 'fields.str',
    icon: 'icon-typography'
  },
  {
    field_type: 'longStr',
    name: 'string',
    text: 'fields.longStr',
    icon: 'icon-pilcrow'
  },
  {
    field_type: 'int',
    name: 'integer',
    text: 'fields.int',
    icon: '1'
  },
  {
    field_type: 'float',
    name: 'float',
    text: 'fields.float',
    icon: '0.1'
  },
  {
    field_type: 'bool',
    name: 'boolean',
    text: 'fields.bool',
    icon: 'icon-check-square'
  },
  {
    field_type: 'date',
    name: 'date',
    text: 'fields.date',
    icon: 'icon-calendar'
  },
  {
    field_type: 'tag',
    name: 'tag',
    text: 'fields.tag',
    icon: 'icon-tag'
  },
  {
    field_type: 'rating',
    name: 'rating',
    text: 'fields.rating',
    icon: 'icon-star'
  },
  {
    field_type: 'url',
    name: 'url',
    text: 'fields.url',
    icon: 'icon-link1'
  },
  {
    field_type: 'email',
    name: 'email',
    text: 'fields.email',
    icon: 'icon-at-sign'
  },
  {
    field_type: 'latlon',
    name: 'latlon',
    text: 'fields.latlon',
    icon: 'icon-map-pin1'
  },
  {
    field_type: 'json',
    name: 'json',
    text: 'fields.json',
    icon: 'icon-code'
  },
  {
    field_type: 'html',
    name: 'html',
    text: 'fields.html',
    icon: 'icon-code1'
  },
  {
    field_type: 'md',
    name: 'markdown',
    text: 'fields.md',
    icon: 'icon-terminal1'
  },
  {
    field_type: 'curr',
    name: 'currency',
    text: 'fields.curr',
    icon: 'icon-euro'
  },
  {
    field_type: 'ref',
    name: 'reference',
    text: 'fields.ref',
    icon: 'icon-link1'
  },
  {
    field_type: 'refs',
    name: 'references list',
    text: 'fields.refs',
    icon: 'icon-link-2'
  },
  {
    field_type: 'color',
    name: 'color',
    text: 'fields.color',
    icon: 'icon-paint-format'
  },
]

export const HideChoices = [
  {
    value: 'false',
    text: 'fields.shownField',
    icon: 'icon-eye'
  },
  {
    value: 'true',
    text: 'fields.hiddenField',
    icon: 'icon-eye-off'
  },
]

export const FindFieldIcon = (field_type) => {
  let fieldType = FieldTypes.find(f => f.field_type === field_type)
  return fieldType.icon
}

export const FindFieldText = (field_type) => {
  let fieldType = FieldTypes.find(f => f.field_type === field_type)
  return fieldType.text
}

export const itemFieldModel = [
  {
    name: 'text',
    field: 'text',
    label: 'dataPackage.fieldName',
    inModal: true,
    visible: true,
    readonly: false,
    options: undefined
  },
  {
    name: 'value',
    field: 'text',
    label: 'dataPackage.fieldValue',
    inModal: true,
    visible: true,
    readonly: false,
    options: undefined
  },
]

export const itemTypeModel = [
  {
    name: 'field_type',
    field: 'select',
    label: 'dataPackage.fieldTypeShort',
    inModal: true,
    visible: true,
    readonly: false,
    options: {
      custom: true,
      text: 'text',
      value: 'field_type',
      prependIcon: true,
      translate: true,
      items: FieldTypes
    }
  },
]

export const itemHideModel = [
  {
    name: 'hide',
    field: 'checkbox',
    label: 'dataPackage.hide',
    inModal: true,
    visible: true,
    readonly: false,
    options: {
      custom: true,
      text: 'text',
      value: 'value',
      prependIcon: true,
      translate: true,
      items: HideChoices
    }
  },
]

export class Field {

  itemType = 'field'

  constructor (
    owner_id=undefined,
    value=undefined,
    text='My new field',
    field_type='str',
    
    description='My field description',
    creationDate=undefined,
    id=undefined,

    read='public',
    write='owner+groups',
    manage='owner-only',

    width='auto',
    hide=false,
    constraints=undefined,

    ) {
    this.owner_id = owner_id
    
    this.value = value
    this.text = text
    this.field_type = field_type
    
    this.description = description
    this.creationDate = creationDate

    this.id = id

    this.read = read
    this.write = write
    this.manage = manage

    this.hide = hide
    this.hWidth = width
    this.constraints = constraints
  }

  set icon (val) {
    this.hIcon = val
  }
  set divider (val) {
    this.hDivider = val
  }
  set position (val) {
    this.hPosition = val
  }
  set helpHeader (bool) {
    this.isHelpHeader = bool
  }
  set addCol (bool) {
    this.isAddCol = bool
  }
  set width (val) {
    this.hWidth = val
  }
  set fixed (val) {
    this.hFixed = val
  }
  set hide (val) {
    this.hHide = val
  }
  set rebuild (obj) {
    Object.assign(this, obj)
  }

  get data () {
    return { 
      owner_id: this.owner_id,
      
      value: this.value,
      text: this.text,
      field_type: this.field_type,

      icon: this.icon,
      sortable: false,
      divider: this.divider,
      
      helpHeader: this.isHelpHeader,

      description: this.description, 
      creationDate: this.creationDate,
      read: this.read,
      write: this.write,
      manage: this.manage,
      id: this.id,

      width: this.hWidth,
      fixed: this.hFixed,
      hide: this.hHide,
      constraints: this.constraints,

      itemType: this.itemType,
    }
  }

  get dataHelper () {
    return { 
      // owner_id: this.owner_id,
      
      value: this.value,
      text: this.text,
      field_type: this.field_type,

      icon: this.icon,
      position: this.position,
      divider: this.divider,

      width: this.hWidth,
      fixed: this.hFixed,
      
      helpHeader: this.isHelpHeader,
    }
  }

  get icon () {
    return this.hIcon
  }
  get divider () {
    return this.hDivider
  }
  get position () {
    return this.hPosition
  }
  get helpHeader () {
    return this.isHelpHeader
  }
  get addCol () {
    return this.isAddCol
  }
  get width () {
    return this.hWidth
  }
  get fixed () {
    return this.hFixed
  }
  get hide () {
    return this.hHide
  }

  get infos () {
    return [
      ...itemFieldModel,
      ...itemTypeModel,
      ...models.itemDescriptionModel,
      ...itemHideModel,
    ]
  }
  get auth () {
    return [
      ...models.itemAuthModelBasic,
    ]
  }
  get meta () {
    return [
      ...models.itemMetaModel,
    ]
  }

 }

export const helpHeaders = [
  {
    value: 'delete',
    text: '',
    icon: 'icon-trash-2',
    position: 'start'
  },
  {
    value: 'select',
    text: '',
    icon: 'icon-square',
    position: 'start'
  },
  {
    value: 'edit',
    text: '',
    icon: 'icon-edit-3',
    position: 'start'
  },
  {
    value: 'move',
    text: '',
    // icon: 'icon-more-vertical',
    icon: 'icon-move',
    position: 'start',
    divider: true,
  },
]
export const helpHeadersFields = helpHeaders.map(h => {
  let helperField = new Field(
    undefined,
    h.value,
    h.text,
    h.field_type,
  )
  helperField.helpHeader = true
  // helperField.fixed = true
  helperField.position = h.position
  helperField.icon = h.icon
  helperField.width = 40
  helperField.divider = h.divider
  return helperField
})

export const addColHeaders = [
  {
    value: 'addCol',
    text: '',
    icon: 'icon-plus',
    helpHeader: true,
    position: 'end'
  },
]
export const endHeadersFields = addColHeaders.map(h => {
  let helperEndField = new Field(
    undefined,
    h.value,
    h.text,
    h.field_type,
  )
  helperEndField.helpHeader = true
  helperEndField.position = h.position
  helperEndField.icon = h.icon
  helperEndField.width = 80
  helperEndField.addCol = true
  return helperEndField
})

export const defaultHeaders = [
  {
    value: 'name',
    text: 'Name',
    field_type: 'str',
    // text: 'name', // TO DELETE
    // value: 'name', // TO DELETE
    sortable: false,
    align: 'start',
    fixed: true,
    divider: true,
  },
  {
    value: 'surname',
    text: 'Surname',
    field_type: 'str',
    // text: 'surname', // TO DELETE
    // value: 'surname', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'bio',
    text: 'Biography',
    field_type: 'longStr',
    // text: 'bio', // TO DELETE
    // value: 'bio', // TO DELETE
    sortable: false,
    align: 'start',
    },
  {
    value: 'age',
    text: 'Age',
    field_type: 'int',
    // text: 'age', // TO DELETE
    // value: 'age', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'ratio',
    text: 'Ratio',
    field_type: 'float',
    // text: 'ratio', // TO DELETE
    // value: 'ratio', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'birthDate',
    text: 'BirthDate',
    field_type: 'date',
    // text: 'birthDate', // TO DELETE
    // value: 'birthDate', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'jsonData',
    text: 'Json data',
    field_type: 'json',
    // text: 'jsonData', // TO DELETE
    // value: 'jsonData', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'tags',
    text: 'Tags',
    field_type: 'tag',
    // text: 'tags', // TO DELETE
    // value: 'tags', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'note',
    text: 'Note',
    field_type: 'rating',
    // text: 'note', // TO DELETE
    // value: 'note', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'important',
    text: 'Important',
    field_type: 'bool',
    // text: 'important', // TO DELETE
    // value: 'important', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'md',
    text: 'Markdown',
    field_type: 'md',
    // text: 'md', // TO DELETE
    // value: 'md', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'wikipediaPage',
    text: 'Wikipedia page',
    field_type: 'url',
    // text: 'wikipediaPage', // TO DELETE
    // value: 'wikipediaPage', // TO DELETE
    sortable: false,
    align: 'start',
  },
]
