import * as models from '@/utils/utilsModels.js'

// cf :  https://dmitripavlutin.com/javascript-classes-complete-guide/

export const FieldTypes = [
  {
    type: 'str',
    name: 'string',
    text: 'fields.str',
    icon: 'icon-typography'
  },
  {
    type: 'longStr',
    name: 'string',
    text: 'fields.longStr',
    icon: 'icon-pilcrow'
  },
  {
    type: 'int',
    name: 'integer',
    text: 'fields.int',
    icon: '1'
  },
  {
    type: 'float',
    name: 'float',
    text: 'fields.float',
    icon: '0.1'
  },
  {
    type: 'bool',
    name: 'boolean',
    text: 'fields.bool',
    icon: 'icon-check-square'
  },
  {
    type: 'date',
    name: 'date',
    text: 'fields.date',
    icon: 'icon-calendar'
  },
  {
    type: 'tag',
    name: 'tag',
    text: 'fields.tag',
    icon: 'icon-tag'
  },
  {
    type: 'rating',
    name: 'rating',
    text: 'fields.rating',
    icon: 'icon-star'
  },
  {
    type: 'url',
    name: 'url',
    text: 'fields.url',
    icon: 'icon-link1'
  },
  {
    type: 'email',
    name: 'email',
    text: 'fields.email',
    icon: 'icon-at-sign'
  },
  {
    type: 'latlon',
    name: 'latlon',
    text: 'fields.latlon',
    icon: 'icon-map-pin1'
  },
  {
    type: 'json',
    name: 'json',
    text: 'fields.json',
    icon: 'icon-code'
  },
  {
    type: 'html',
    name: 'html',
    text: 'fields.html',
    icon: 'icon-code1'
  },
  {
    type: 'md',
    name: 'markdown',
    text: 'fields.md',
    icon: 'icon-terminal1'
  },
  {
    type: 'curr',
    name: 'currency',
    text: 'fields.curr',
    icon: 'icon-euro'
  },
  {
    type: 'ref',
    name: 'reference',
    text: 'fields.ref',
    icon: 'icon-link1'
  },
  {
    type: 'refs',
    name: 'references list',
    text: 'fields.refs',
    icon: 'icon-link-2'
  },
  {
    type: 'color',
    name: 'color',
    text: 'fields.color',
    icon: 'icon-paint-format'
  },
]

export const FindFieldIcon = (type) => {
  let fieldType = FieldTypes.find(f => f.type === type)
  return fieldType.icon
}

export const FindFieldText = (type) => {
  let fieldType = FieldTypes.find(f => f.type === type)
  return fieldType.text
}

export const itemFieldModel = [
  {
    name: 'value',
    field: 'text',
    label: 'dataPackage.fieldValue',
    inModal: true,
    visible: true,
    readonly: false,
    options: undefined
  },
  {
    name: 'text',
    field: 'text',
    label: 'dataPackage.fieldName',
    inModal: true,
    visible: true,
    readonly: false,
    options: undefined
  },
]

export const itemTypeModel = [
  {
    name: 'type',
    field: 'select',
    label: 'dataPackage.type',
    inModal: true,
    visible: true,
    readonly: false,
    options: {
      custom: true,
      text: 'text',
      value: 'type',
      prependIcon: true,
      translate: true,
      items: FieldTypes
    }
  },
]

export class Field {

  constructor (
    owner_id=undefined,
    value=undefined,
    text='My new field',
    type='str',
    
    description='My field description',
    creationDate=undefined,
    id=undefined,

    hide=false,

    read='public',
    write='owner+groups',
    manage='owner-only',
    width='auto',
    ) {
    this.owner_id = owner_id
    
    this.value = value
    this.text = text
    this.type = type
    
    this.description = description
    this.creationDate = creationDate
    this.read = read
    this.write = write
    this.manage = manage
    this.id = id

    this.hHide = hide
    this.hWidth = width
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

  get data () {
    return { 
      owner_id: this.owner_id,
      
      value: this.value,
      text: this.text,
      type: this.type,

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
    }
  }

  get dataHelper () {
    return { 
      // owner_id: this.owner_id,
      
      value: this.value,
      text: this.text,
      type: this.type,

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
    h.type,
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
    h.type,
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
    type: 'str',
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
    type: 'str',
    // text: 'surname', // TO DELETE
    // value: 'surname', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'bio',
    text: 'Biography',
    type: 'longStr',
    // text: 'bio', // TO DELETE
    // value: 'bio', // TO DELETE
    sortable: false,
    align: 'start',
    },
  {
    value: 'age',
    text: 'Age',
    type: 'int',
    // text: 'age', // TO DELETE
    // value: 'age', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'ratio',
    text: 'Ratio',
    type: 'float',
    // text: 'ratio', // TO DELETE
    // value: 'ratio', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'birthDate',
    text: 'BirthDate',
    type: 'date',
    // text: 'birthDate', // TO DELETE
    // value: 'birthDate', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'jsonData',
    text: 'Json data',
    type: 'json',
    // text: 'jsonData', // TO DELETE
    // value: 'jsonData', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'tags',
    text: 'Tags',
    type: 'tag',
    // text: 'tags', // TO DELETE
    // value: 'tags', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'note',
    text: 'Note',
    type: 'rating',
    // text: 'note', // TO DELETE
    // value: 'note', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'important',
    text: 'Important',
    type: 'bool',
    // text: 'important', // TO DELETE
    // value: 'important', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'md',
    text: 'Markdown',
    type: 'md',
    // text: 'md', // TO DELETE
    // value: 'md', // TO DELETE
    sortable: false,
    align: 'start',
  },
  {
    value: 'wikipediaPage',
    text: 'Wikipedia page',
    type: 'url',
    // text: 'wikipediaPage', // TO DELETE
    // value: 'wikipediaPage', // TO DELETE
    sortable: false,
    align: 'start',
  },
]
