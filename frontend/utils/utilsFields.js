import * as models from '@/utils/utilsModels.js'

// cf :  https://dmitripavlutin.com/javascript-classes-complete-guide/

export const FieldTypes = [
  {
    type: 'str',
    name: 'string',
    text: 'fields.string',
    abrev: 'T'
  },
  {
    type: 'longStr',
    name: 'string',
    text: 'fields.string',
    abrev: 'TT'
  },
  {
    type: 'bool',
    name: 'boolean',
    text: 'fields.bool',
    abrev: 'B'
  },
  {
    type: 'int',
    name: 'integer',
    text: 'fields.int',
    abrev: 'I'
  },
  {
    type: 'float',
    name: 'float',
    text: 'fields.float',
    abrev: 'F'
  },
  {
    type: 'date',
    name: 'date',
    text: 'fields.date',
    abrev: 'D'
  },
  {
    type: 'json',
    name: 'json',
    text: 'fields.json',
    abrev: 'J',
    icon: 'icon-code'
  },
  {
    type: 'tag',
    name: 'tag',
    text: 'fields.tag',
    abrev: 'T',
    icon: 'icon-tag'
  },
  {
    type: 'rating',
    name: 'rating',
    text: 'fields.rating',
    abrev: 'R',
    icon: 'icon-star'
  },
  {
    type: 'md',
    name: 'markdown',
    text: 'fields.md',
    abrev: 'M'
  },
  {
    type: 'url',
    name: 'url',
    text: 'fields.url',
    abrev: 'U',
    icon: 'icon-link1'
  },
  {
    type: 'email',
    name: 'email',
    text: 'fields.email',
    abrev: '@',
    icon: 'icon-at'
  },
  {
    type: 'ref',
    name: 'reference',
    text: 'fields.ref',
    abrev: 'S'
  },
  {
    type: 'refs',
    name: 'references list',
    text: 'fields.ref',
    abrev: ''
  },
  {
    type: 'color',
    name: 'color',
    text: 'fields.color',
    abrev: 'S'
  },
]

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
      text: 'name',
      value: 'type',
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
    text: 'move',
    icon: 'icon-move',
    fixed: true,
  },
  {
    text: 'edit',
    icon: 'icon-edit',
    fixed: true,
  },
  {
    text: 'delete',
    icon: 'icon-trash-2',
    fixed: true,
  },
  {
    text: 'select',
    icon: 'icon-edit',
    fixed: true,
  },
]

export const defaultHeaders = [
  {
    field: 'name',
    title: 'name',
    align: 'start',
    type: 'str',
    fixed: true,
  },
  {
    field: 'surname',
    title: 'surname',
    type: 'str',
  },
  {
    field: 'bio',
    title: 'biography',
    type: 'longStr',
  },
  {
    field: 'age',
    title: 'age',
    type: 'int',
  },
  {
    field: 'ratio',
    title: 'ratio',
    type: 'float',
  },
  {
    field: 'birthDate',
    title: 'birthDate',
    type: 'date',
  },
  {
    field: 'jsonData',
    title: 'json data',
    type: 'json',
  },
  {
    field: 'tags',
    title: 'tags',
    type: 'tag',
  },
  {
    field: 'note',
    title: 'note',
    type: 'rating',
  },
  {
    field: 'important',
    title: 'important',
    type: 'bool',
  },
  {
    field: 'md',
    title: 'markdown',
    type: 'md',
  },
  {
    field: 'wikipediaPage',
    title: 'wikipedia page',
    type: 'url',
  },
]
