import * as models from '@/utils/utilsModels.js'

export const initialsFromString = (str) => {
  let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')
  let initials = [...str.matchAll(rgx)] || []
  initials = (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  ).toUpperCase()
  return initials
}

// cf :  https://dmitripavlutin.com/javascript-classes-complete-guide/

export class Dataset {
  constructor (
    owner_id=undefined,
    title='My new dataset',
    description='My dataset description',
    creationDate=undefined,
    id=undefined,
    color='primary',
    icon='icon-table',
    licence='ODbL',
    tables=[],
    read='public',
    // comment='owner-only',
    patch='public',
    write='owner+groups',
    manage='owner-only',
    url=undefined,
    ) {
    this.owner_id = owner_id
    this.id = id
    this.url = url
    this.title = title
    this.description = description
    this.color = color
    this.creationDate = creationDate
    this.icon = icon
    this.licence=licence
    this.tables = tables
    this.read = read
    // this.comment = comment
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
      color: this.color,
      creationDate: this.creationDate,
      icon: this.icon,
      licence: this.licence,
      tables: this.tables,
      read: this.read,
      // comment: this.comment,
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

  set randomBasics (value) {
    let colorsList = models.itemPrefsModel.find(pref => pref.name === 'color').options.items
    let iconsList = models.itemPrefsModel.find(pref => pref.name === 'icon').options.items

    const randomColorIdx = Math.floor(Math.random() * colorsList.length);
    const randomIconIdx = Math.floor(Math.random() * iconsList.length);

    this.color = colorsList[randomColorIdx]
    this.icon = iconsList[randomIconIdx]

  }
 }
