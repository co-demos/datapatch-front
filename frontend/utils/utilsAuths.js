export const AuthsOptions = [
  {
    name: 'owner-only',
    label: 'auth.ownerOnly',
    tooltip: 'auth.ownerOnlyHelp',
    help: 'Only owner is authorized',
  },
  {
    name: 'owner+groups',
    label: 'auth.groups',
    tooltip: 'auth.groupsHelp',
    help: 'Owner and invited groups or users are authorized',
  },
  {
    name: 'owner+groups+users',
    label: 'auth.users',
    tooltip: 'auth.usersHelp',
    help: 'Owner, invited groups, and registred users are authorized',
  },
  {
    name: 'public',
    label: 'auth.public',
    tooltip: 'auth.publicHelp',
    help: 'Owner, invited groups, registred and non-registerd users are authorized',
  },
]

export const AuthsModelsRead = [
  {
    name: 'read',
    nameDetails: 'read',
    field: 'select',
    label: 'auth.read',
    icon: 'icon-eye',
    role: 'roles.reader',
    tooltip: 'auth.readTooltip',
    default: 'owner-only',
    help: 'Can read the item data',
    inModal: true,
    visible: true,
    readonly: false,
    auths: {
      read: true,
      comment: false,
      patch: false,
      write: false,
      manage: false,
    },
    options: {
      custom: true,
      text: 'label',
      tooltip: 'tooltip',
      value: 'name',
      translate: true,
      items: AuthsOptions  //.filter( auth => auth.name !== 'owner+groups' )
    },
  },
]
export const AuthsModelsReadGroup = [
  {
    name: 'read',
    nameDetails: 'read',
    field: 'select',
    label: 'auth.read',
    icon: 'icon-eye',
    role: 'roles.reader',
    tooltip: 'auth.readTooltip',
    default: 'owner+groups',
    help: 'Can read the item data',
    inModal: true,
    visible: true,
    readonly: false,
    auths: {
      read: true,
      comment: false,
      patch: false,
      write: false,
      manage: false,
    },
    options: {
      custom: true,
      text: 'label',
      tooltip: 'tooltip',
      value: 'name',
      translate: true,
      items: AuthsOptions.slice(1, 4)
    },
  },
]

export const AuthsModelsComment = [
  {
    name: 'comment',
    nameDetails: 'read+comment',
    field: 'select',
    label: 'auth.comment',
    icon: 'icon-message-square',
    role: 'roles.commenter',
    tooltip: 'auth.commentTooltip',
    default: 'owner-only',
    help: 'Can read, and comment the item data',
    inModal: true,
    visible: true,
    readonly: false,
    auths: {
      read: true,
      comment: true,
      patch: false,
      write: false,
      manage: false,
    },
    options: {
      custom: true,
      text: 'label',
      tooltip: 'tooltip',
      value: 'name',
      translate: true,
      items: AuthsOptions
    },
  },
]

export const AuthsModelsPatch = [
  {
    name: 'patch',
    nameDetails: 'read+comment+patch',
    field: 'select',
    label: 'auth.patch',
    icon: 'icon-plus-square',
    role: 'roles.patcher',
    tooltip: 'auth.patchTooltip',
    default: 'owner-only',
    help: 'Can read, comment and patch the item data',
    inModal: true,
    visible: true,
    readonly: false,
    auths: {
      read: true,
      comment: true,
      patch: true,
      write: false,
      manage: false,
    },
    options: {
      custom: true,
      text: 'label',
      tooltip: 'tooltip',
      value: 'name',
      translate: true,
      items: AuthsOptions
    },
  },
]

export const AuthModelsWriteBasics = [
  {
    name: 'write',
    nameDetails: 'read+comment+patch+write',
    field: 'select',
    label: 'auth.write',
    icon: 'icon-edit-3',
    role: 'roles.writer',
    tooltip: 'auth.writeTooltip',
    default: 'owner-only',
    help: 'Can read, comment, patch, accept proposals, and write on the item data',
    inModal: true,
    visible: true,
    readonly: false,
    auths: {
      read: true,
      comment: true,
      patch: true,
      write: true,
      manage: false,
    },
    options: {
      custom: true,
      text: 'label',
      tooltip: 'tooltip',
      value: 'name',
      translate: true,
      items: AuthsOptions.slice(0, 3)
    },
  },
]

export const AuthsModelsWriteGroup = [
  {
    name: 'write',
    nameDetails: 'read+comment+patch+write',
    field: 'select',
    label: 'auth.write',
    icon: 'icon-edit-3',
    role: 'roles.writer',
    tooltip: 'auth.writeTooltip',
    default: 'owner-only',
    help: 'Can read, comment, patch, accept proposals, and write on the item data',
    inModal: true,
    visible: true,
    readonly: false,
    auths: {
      read: true,
      comment: true,
      patch: true,
      write: true,
      manage: false,
    },
    options: {
      custom: true,
      text: 'label',
      tooltip: 'tooltip',
      value: 'name',
      translate: true,
      items: AuthsOptions.slice(0, 2)
    },
  },
]

export const AuthsModelsManageBasics = [
  {
    name: 'manage',
    nameDetails: 'read+comment+patch+write+manage',
    field: 'select',
    label: 'auth.manage',
    icon: 'icon-settings',
    role: 'roles.manager',
    tooltip: 'auth.manageTooltip',
    default: 'owner-only',
    help: 'Can read, comment, patch, accept proposals, write, delete and change owner/groups authorized of the item data',
    inModal: true,
    visible: true,
    readonly: false,
    auths: {
      read: true,
      comment: true,
      patch: true,
      write: true,
      manage: true,
    },
    options: {
      custom: true,
      text: 'label',
      tooltip: 'tooltip',
      value: 'name',
      translate: true,
      items: AuthsOptions.slice(0, 2)
    },
  },
]

export const AuthsModelsWriteDefault = [
  ...AuthModelsWriteBasics,
  ...AuthsModelsManageBasics,
]

export const AuthsModelsWriteRestricted = [
  ...AuthsModelsWriteGroup,
  ...AuthsModelsManageBasics,
]

export const AuthLevelsChoices = [
  ...AuthsModelsRead,
  ...AuthsModelsComment,
  ...AuthsModelsPatch,
  ...AuthModelsWriteBasics,
  ...AuthsModelsManageBasics,
]

export const GetAuthObject = ( authsObj ) => {
  // console.log("\nU-utilsAuths > GetAuthObject > authsObj : ", authsObj)
  let authResult = AuthLevelsChoices.find( auth => {
    let readBool = auth.auths.read === authsObj.read
    let commentBool = auth.auths.comment === authsObj.comment
    let patchBool = auth.auths.patch === authsObj.patch
    let writeBool = auth.auths.write === authsObj.write
    let manageBool = auth.auths.manage === authsObj.manage
    let bools = [ readBool, commentBool, patchBool, writeBool, manageBool ]
    return bools.every( Boolean )
  })
  // console.log("U-utilsAuths > GetAuthObject > authResult : ", authResult)
  return authResult
}
