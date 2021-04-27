import * as models from '@/utils/utilsModels.js'

// cf :  https://dmitripavlutin.com/javascript-classes-complete-guide/

export class TableMetaData {

  constructor (
    owner_id=undefined,
    title='My new table',
    description='My table description',
    id=undefined,
    url=undefined,
    creationDate=undefined,
    licence='ODbL',

    tableData=[],
    tableFields=[],

    read='public',
    comment='owner-only',
    patch='public',
    write='owner+groups',
    manage='owner-only',
    ) {
    this.owner_id = owner_id
    this.id = id
    this.url = url
    this.title = title
    this.description = description
    this.creationDate = creationDate
    this.licence=licence

    this.tableData = tableData
    this.tableFields = tableFields

    this.read = read
    this.comment = comment
    this.patch = patch
    this.write = write
    this.manage = manage
  }

  get data () {
    return { 
      owner_id: this.owner_id,
      id: this.id,
      url: this.url,
      title: this.title,
      description: this.description, 
      creationDate: this.creationDate,
      licence: this.licence,

      tableData: this.tableData,
      tableFields: this.tableFields,

      read: this.read,
      comment: this.comment,
      patch: this.patch,
      write: this.write,
      manage: this.manage,
    }
  }

  get infos () {
    return [
      ...models.itemInfosModel,
      ...models.itemLicenceModel,
    ]
  }
  get auth () {
    return [
      ...models.itemAuthModelAll,
    ]
  }
  // get data () {
  //   return [
  //     ...models.itemMetaModelUrl,
  //     ...models.itemMetaModel,
  //   ]
  // }
  get meta () {
    return [
      ...models.itemMetaModelUrl,
      ...models.itemMetaModel,
    ]
  }

 }

 export const defaultTableData = [
  {
    id: 1,
    name: 'Elinor',                          // string example
    surname: 'Ostrom',                       // long string example
    bio: 'bblablabla',                       // long text example
    age: 42,                                 // int example
    ratio: 0.4,                              // float example
    birthDate: '',                           // date example
    jsonData : {},                           // json example
    tags : ['tag1', 'tag2'],                 // tags list example
    note : 5,                                // notation / star example
    important : true,                        // boolean example
    md: 'A _markdown_ example',              // markdown text example
    wikipediaPage: 'https://en.wikipedia.org/wiki/Elinor_Ostrom',   // url example
  },
  {
    id: 2,
    name: 'Ghibli',                          // string example
    surname: 'Le chien',                     // long string example
    bio: 'waf waf waf',                      // long text example
    age: 10,                                 // int example
    ratio: 0.9,                              // float example
    birthDate: '',                           // date example
    jsonData : {},                           // json example
    tags : ['manger', 'dormir'],             // tags list example
    note : 5,                                // notation / star example
    important : true,                        // boolean example
    md: 'A _markdown_ example',              // markdown text example
    wikipediaPage: 'https://en.wikipedia.org/wiki/Elinor_Ostrom',   // url example
  },
  { id: 3, name: 'test 3' },
  { id: 4, name: 'test 4' },
  { id: 5, name: 'test 5' },
  { id: 6, name: 'test 6' },
  { id: 7, name: 'test 7' },
  { id: 8, name: 'test 8' },
  { id: 9, name: 'test 9' },
  { id: 10, name: 'test 10' },

]
