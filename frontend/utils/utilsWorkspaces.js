import * as models from '@/utils/utilsModels.js'
import { AuthsModels } from '@/utils/utilsAuths.js'

export class Workspace {
  constructor (
    owner=undefined,
    id=undefined,
    color='black',
    name='My new workspace',
    description='My workspace description',
    icon='icon-apps',
    creationDate=undefined,
    datasets=[],
    read='owner-only',
    // comment='owner-only',
    // patch='owner-only',
    write='owner-only',
    manage='owner-only',
    ) {
    this.owner = owner
    this.id = id
    this.name = name
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
      owner: this.owner,
      id: this.id,
      name: this.name,
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

 }
