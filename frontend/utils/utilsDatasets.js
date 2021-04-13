import { Licences } from '@/utils/utilsLicences.js'

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
    name='My new dataset',
    description='My dataset description',
    color='primary',
    creationDate=undefined,
    icon='icon-database',
    licence='ODbL',
    tables=[],
    ) {
    this.owner = owner
    this.id = id
    this.name = name
    this.description = description
    this.color = color
    this.creationDate = creationDate
    this.icon = icon
    this.licence=licence
    this.tables = tables
  }

  get data () {
    return { 
      owner: this.owner,
      id: this.id,
      name: this.name,
      description: this.description, 
      color: this.color,
      creationDate: this.creationDate,
      icon: this.icon, 
      licence: this.licence, 
      tables: this.tables, 
    }
  }

  get model () {
    return [ 
      {
        name: 'name',
        field: 'text',
        label: 'dataPackage.name',
        inModal: true,
        visible: true,
        readonly: false,
        options: undefined
      },
      {
        name: 'description',
        field: 'textarea',
        label: 'dataPackage.description',
        inModal: true,
        visible: true,
        readonly: false,
        options: undefined
      }, 
      {
        name: 'id',
        field: 'text',
        label: 'dataPackage.id',
        inModal: true,
        visible: true,
        readonly: true,
        options: undefined
      },
      {
        name: 'owner',
        field: 'text',
        label: 'dataPackage.owner',
        inModal: true,
        visible: true,
        readonly: true,
        options: undefined
      },
      {
        name: 'creationDate',
        field: 'text',
        label: 'dataPackage.creationDate',
        inModal: true,
        visible: true,
        readonly: true,
        options: undefined
      },
      {
        name: 'licence',
        field: 'select',
        label: 'dataPackage.licence',
        inModal: true,
        visible: true,
        readonly: false,
        options: {
          text: 'name',
          value: 'name',
          items: Licences
        }
      },
      {
        name: 'color',
        field: 'select',
        label: 'dataPackage.color',
        inModal: true,
        visible: true,
        readonly: false,
        options: {
          prependColor: true,
          items: [
            'primary', 'accent', 'secondary', 'info', 'warning', 'error', 'success',
            'blue', 'green', 'red', 'yellow', 'purple', 'pink', 'orange'
          ]
        }
      },
      {
        name: 'icon',
        field: 'select',
        label: 'dataPackage.icon',
        inModal: true,
        visible: true,
        readonly: false,
        options: {
          prependIcon: true,
          items: [
            'icon-database',
            'icon-star',
            'icon-apps',
            'icon-settings',
            'icon-trello',
            'icon-map-pin',
            'icon-work',
            'icon-paperclip',
            'icon-map',
            'icon-message-square',
            'icon-layers',
            'icon-globe',
            'icon-bookmark',
            'icon-camera',
            'icon-at-sign',
            'icon-bell',
            'icon-bar-chart-2',
            'icon-archive',
            'icon-folder',
            'icon-power'
          ]
        }
      }, 
      {
        name: 'tables',
        field: 'list',
        label: 'dataPackage.tables',
        inModal: false,
        visible: true,
        readonly: false,
        options: undefined
      }, 
    ]
  }

 }
