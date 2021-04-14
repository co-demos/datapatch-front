import * as models from '@/utils/utilsModels.js'

export const initialsFromString = (str) => {
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')
  let initials = [...str.matchAll(rgx)] || []
  initials = (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  ).toUpperCase()
  return initials
}

export class Dataset {
  constructor (
    owner=undefined,
    id=undefined,
    url=undefined,
    name='My new dataset',
    description='My dataset description',
    color='primary',
    creationDate=undefined,
    icon='icon-database',
    licence='ODbL',
    tables=[],
    read='owner-only',
    comment='owner-only',
    patch='owner-only',
    write='owner-only',
    manage='owner-only',
    ) {
    this.owner = owner
    this.id = id
    this.url = url
    this.name = name
    this.description = description
    this.color = color
    this.creationDate = creationDate
    this.icon = icon
    this.licence=licence
    this.tables = tables
    this.read = read
    this.comment = comment
    this.patch = patch
    this.write = write
    this.manage = manage
  }

  get data () {
    return { 
      owner: this.owner,
      id: this.id,
      url: this.url,
      name: this.name,
      description: this.description, 
      color: this.color,
      creationDate: this.creationDate,
      icon: this.icon,
      licence: this.licence,
      tables: this.tables,
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
  get prefs () {
    return [
      ...models.itemPrefsModel,
    ]
  }
  get meta () {
    return [
      ...models.itemMetaModelUrl,
      ...models.itemMetaModel,
    ]
  }
 }
