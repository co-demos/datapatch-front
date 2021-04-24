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
    name: 'field',
    field: 'text',
    label: 'dataPackage.field',
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
    field=undefined,
    title='My new field',
    type='str',
    
    description='My field description',
    creationDate=undefined,
    read='public',
    write='owner+groups',
    manage='owner-only',
    id=undefined,
    ) {
    this.owner_id = owner_id
    
    this.field = field
    this.title = title
    this.type = type
    
    this.description = description
    this.creationDate = creationDate
    this.read = read
    this.write = write
    this.manage = manage
    this.id = id
  }

  get data () {
    return { 
      owner_id: this.owner_id,
      
      field: this.field,
      title: this.title,
      type: this.type,
      
      description: this.description, 
      creationDate: this.creationDate,
      read: this.read,
      write: this.write,
      manage: this.manage,
      id: this.id,
    }
  }

  get infos () {
    return [
      ...itemFieldModel,
      ...models.itemTitleModel,
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
    field: 'delete',
    icon: 'icon-trash-2',
    fixed: true,
    helpHeader: true,
    position: 'start'
  },
  {
    field: 'select',
    icon: 'icon-edit',
    fixed: true,
    helpHeader: true,
    position: 'start'
  },
  {
    field: 'edit',
    icon: 'icon-edit',
    fixed: true,
    helpHeader: true,
    position: 'start'
  },
  {
    field: 'move',
    icon: 'icon-move',
    fixed: true,
    helpHeader: true,
    position: 'start'
  },
]

export const addColHeaders = [
  {
    field: 'addCol',
    icon: 'icon-plus',
    helpHeader: true,
    position: 'end'
  },
]

export const defaultHeaders = [
  {
    field: 'name',
    title: 'Name',
    type: 'str',
    // fixed: true,
  },
  {
    field: 'surname',
    title: 'Surname',
    type: 'str',
  },
  {
    field: 'bio',
    title: 'Biography',
    type: 'longStr',
  },
  {
    field: 'age',
    title: 'Age',
    type: 'int',
  },
  {
    field: 'ratio',
    title: 'Ratio',
    type: 'float',
  },
  {
    field: 'birthDate',
    title: 'BirthDate',
    type: 'date',
  },
  {
    field: 'jsonData',
    title: 'Json data',
    type: 'json',
  },
  {
    field: 'tags',
    title: 'Tags',
    type: 'tag',
  },
  {
    field: 'note',
    title: 'Note',
    type: 'rating',
  },
  {
    field: 'important',
    title: 'Important',
    type: 'bool',
  },
  {
    field: 'md',
    title: 'Markdown',
    type: 'md',
  },
  {
    field: 'wikipediaPage',
    title: 'Wikipedia page',
    type: 'url',
  },
]
