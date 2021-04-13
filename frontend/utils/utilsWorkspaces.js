 export class Workspace {
  constructor (
    owner=undefined,
    id=undefined,
    name='My new workspace',
    description='My workspace description',
    icon='icon-database',
    datasets=[],
    ) {
    this.owner = owner
    this.id = id
    this.name = name
    this.description = description
    this.creationDate = creationDate
    this.icon = icon
    this.datasets = datasets
  }

  get data () {
    return { 
      owner: this.owner,
      id: this.id,
      name: this.name,
      description: this.description, 
      creationDate: this.creationDate,
      icon: this.icon, 
      datasets: this.datasets, 
    }
  }

 }
