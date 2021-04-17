export const AuthsOptions = [
  {
    name: 'owner-only',
    label: 'auth.ownerOnly',
    help: 'Only owner is authorized',
  },
  {
    name: 'owner+groups',
    label: 'auth.groups',
    help: 'Owner and invited groups are authorized',
  },
  {
    name: 'owner+groups+users',
    label: 'auth.users',
    help: 'Owner, invited groups, and registred users are authorized',
  },
  {
    name: 'public',
    label: 'auth.public',
    help: 'Owner, invited groups, registred and non-registerd users are authorized',
  },
]

export const AuthsModelsRead = [
  {
    name: 'read',
    nameDetails: 'read',
    field: 'select',
    label: 'auth.read',
    default: 'owner-only',
    help: 'Can read the item data',
    inModal: true,
    visible: true,
    readonly: false,
    options: {
      custom: true,
      text: 'label',
      value: 'name',
      translateText: true,
      items: AuthsOptions
    },
  },
]
export const AuthsModelsComment = [
  {
    name: 'comment',
    nameDetails: 'read+comment',
    field: 'select',
    label: 'auth.comment',
    default: 'owner-only',
    help: 'Can read, and comment the item data',
    inModal: true,
    visible: true,
    readonly: false,
    options: {
      custom: true,
      text: 'label',
      value: 'name',
      translateText: true,
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
    default: 'owner-only',
    help: 'Can read, comment and patch the item data',
    inModal: true,
    visible: true,
    readonly: false,
    options: {
      custom: true,
      text: 'label',
      value: 'name',
      translateText: true,
      items: AuthsOptions
    },
  },
]
export const AuthsModelsWrite = [
  {
    name: 'write',
    nameDetails: 'read+comment+patch+write',
    field: 'select',
    label: 'auth.write',
    default: 'owner-only',
    help: 'Can read, comment, patch, accept proposals, and write on the item data',
    inModal: true,
    visible: true,
    readonly: false,
    options: {
      custom: true,
      text: 'label',
      value: 'name',
      translateText: true,
      items: AuthsOptions
    },
  },
  {
    name: 'manage',
    nameDetails: 'read+comment+patch+write+manage',
    field: 'select',
    label: 'auth.manage',
    default: 'owner-only',
    help: 'Can read, comment, patch, accept proposals, write, delete and change owner/groups authorized of the item data',
    inModal: true,
    visible: true,
    readonly: false,
    options: {
      custom: true,
      text: 'label',
      value: 'name',
      translateText: true,
      items: AuthsOptions
    },
  },
]
