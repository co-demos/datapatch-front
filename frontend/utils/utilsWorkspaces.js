 export class Workspace {
  constructor (
    owner=undefined,
    id=undefined,
    name='My new workspace',
    description='My workspace description',
    // icon='icon-database',
    creationDate=undefined,
    datasets=[],
    ) {
    this.owner = owner
    this.id = id
    this.name = name
    this.description = description
    this.creationDate = creationDate
    // this.icon = icon
    this.datasets = datasets
  }

  get data () {
    return { 
      owner: this.owner,
      id: this.id,
      name: this.name,
      description: this.description, 
      creationDate: this.creationDate,
      // icon: this.icon, 
      datasets: this.datasets, 
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
        name: 'datasets',
        field: 'list',
        label: 'dataPackage.datasets',
        inModal: false,
        visible: true,
        readonly: false,
        options: undefined
      }, 
    ]
  }

 }
