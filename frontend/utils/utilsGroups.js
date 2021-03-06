import * as models from '@/utils/utilsModels.js'

export class Group {

  static itemType = 'group'

  constructor (
    owner_id=undefined,
    title='My new group',
    description='My group description',
    creationDate=undefined,
    users=[],
    pending_users=[],
    id=undefined,
    color='black',
    icon='icon-users',
    read='owner+groups',
    comment='owner-only',
    write='owner-only',
    manage='owner-only',
    tags=[],
    ) {
    this.owner_id = owner_id
    this.id = id
    this.title = title
    this.description = description

    this.users = users
    this.pending_users = pending_users

    this.creationDate = creationDate

    this.color = color
    this.icon = icon
    
    this.read = read
    this.comment = comment
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
      pending_users: this.pending_users,

      creationDate: this.creationDate,

      color: this.color,
      icon: this.icon,

      read: this.read,
      comment: this.comment,
      write: this.write,
      manage: this.manage,

      itemType: this.itemType,
      tags: this.tags,
    }
  }

  get infos_new () {
    return [
      ...models.itemInfosModel,
      ...models.itemUsersPendingModel,
      ...models.itemTagsModel,
    ]
  }

  get infos () {
    return [
      ...models.itemInfosModel,
      ...models.itemUsersModel,
      ...models.itemUsersPendingModel,
      ...models.itemTagsModel,
    ]
  }
  get auth () {
    return [
      ...models.itemAuthModelGroup,
    ]
  }
  get share () {
    return [
      // ...models.itemUserSharingModel,
      ...models.itemUsersModel,
      ...models.itemUsersPendingModel,
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
    let colorsList = models.itemPrefsModel.find(pref => pref.name === 'color').options.items
    // let iconsList = models.itemPrefsModel.find(pref => pref.name === 'icon').options.items

    const randomColorIdx = Math.floor(Math.random() * colorsList.length)
    // const randomIconIdx = Math.floor(Math.random() * iconsList.length)

    this.color = colorsList[randomColorIdx]
    // this.icon = iconsList[randomIconIdx]

  }
 }
