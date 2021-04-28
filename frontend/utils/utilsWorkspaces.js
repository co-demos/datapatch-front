import * as models from '@/utils/utilsModels.js'
import { AuthsModels } from '@/utils/utilsAuths.js'

export class Workspace {
  constructor (
    owner_id=undefined,
    title='My new workspace',
    description='My workspace description',
    creationDate=undefined,
    id=undefined,
    color='black',
    icon='icon-apps',
    datasets=[],
    read='owner-only',
    // comment='owner-only',
    // patch='owner-only',
    write='owner-only',
    manage='owner-only',
    ) {
    this.owner_id = owner_id
    this.id = id
    this.title = title
    this.description = description
    this.creationDate = creationDate
    this.color = color
    this.icon = icon
    this.datasets = datasets
    this.read = read
    // this.comment = comment
    // this.patch = patch
    this.write = write
    this.manage = manage
  }

  get data () {
    return { 
      owner_id: this.owner,
      id: this.id,
      title: this.title,
      description: this.description, 
      creationDate: this.creationDate,
      color: this.color,
      icon: this.icon, 
      datasets: this.datasets,
      read: this.read,
      // comment: this.comment,
      // patch: this.patch,
      write: this.write,
      manage: this.manage,
    }
  }

  get infos () {
    return [
      ...models.itemInfosModel,
    ]
  }
  get auth () {
    return [
      ...models.itemAuthModelBasic,
    ]
  }
  get prefs () {
    return [
      ...models.itemPrefsModel,
    ]
  }
  get meta () {
    return [
      ...models.itemMetaModel,
    ]
  }

  set randomBasics (value) {
    let iconsList = models.itemPrefsModel.find(pref => pref.name === 'icon').options.items
    const randomIconIdx = Math.floor(Math.random() * iconsList.length);
    this.icon = iconsList[randomIconIdx]
  }

 }
