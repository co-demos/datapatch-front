import * as models from '@/utils/utilsModels.js'

export class Group {

  static itemType = 'group'

  constructor (
    owner_id=undefined,
    title='My new group',
    description='My group description',
    creationDate=undefined,
    users=[],
    id=undefined,
    color='black',
    icon='icon-users',
    read='owner-only',
    write='owner-only',
    manage='owner-only',
    tags=[],
    ) {
    this.owner_id = owner_id
    this.id = id
    this.title = title
    this.description = description
    this.users = users

    this.creationDate = creationDate

    this.color = color
    this.icon = icon
    
    this.read = read
    this.write = write
    this.manage = manage

    this.tags = tags
  }

  get data () {
    return { 
      owner_id: this.owner,
      id: this.id,
      title: this.title,
      description: this.description, 
      users: this.users,

      creationDate: this.creationDate,

      color: this.color,
      icon: this.icon,

      read: this.read,
      write: this.write,
      manage: this.manage,

      itemType: this.itemType,
      tags: this.tags,
    }
  }

  get infos () {
    return [
      ...models.itemInfosModel,
      ...models.itemUsersModel,
      ...models.itemTagsModel,
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
