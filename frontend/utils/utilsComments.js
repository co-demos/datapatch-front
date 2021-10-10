import * as models from '@/utils/utilsModels.js'

// cf :  https://dmitripavlutin.com/javascript-classes-complete-guide/

export class Comment {

  itemType = 'comment'

  constructor (
    // title='My new comment',
    message='My comment message',
    
    owner_email=undefined,

    comment_to_item_type=undefined,
    comment_to_item_id=undefined,
    response_to_comment_id=undefined,

    patch_data=undefined,
    alert_item_owner=false,

    patch_id=undefined,

    comment_status=undefined,

    id=undefined,
    creation_date=undefined,
    ) {
    this.id = id

    this.owner_email = owner_email

    // this.title = title
    this.message = message
    this.creation_date = creation_date
    
    this.alert_item_owner = alert_item_owner
    this.owner_email = owner_email
    this.comment_to_item_type = comment_to_item_type
    this.comment_to_item_id = comment_to_item_id
    this.comment_status = comment_status
    this.response_to_comment_id = response_to_comment_id
    this.patch_id = patch_id
    this.patch_data = patch_data
    
  }

  get data () {
    return { 
      id: this.id,

      // title: this.title,
      message: this.message,

      creation_date: this.creation_date,
      
      // owner_id: this.owner_id,
      owner_email: this.owner_email,
      alert_item_owner: this.alert_item_owner,

      comment_to_item_type: this.comment_to_item_type,
      comment_to_item_id: this.comment_to_item_id,
      comment_status: this.comment_status,

      response_to_comment_id: this.response_to_comment_id,

      patch_id: this.patch_id,
      patch_data: this.patch_data,
    }
  }

  get infos () {
    return [
      // ...models.itemInfosModel,
    ]
  }

  get meta () {
    return [
      // ...models.itemMetaModel,
    ]
  }
 }
