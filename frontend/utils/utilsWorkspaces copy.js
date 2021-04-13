 export class Dataset {
  constructor (
    owner,
    id=undefined,
    name='My new dataset',
    description='My dataset description',
    icon='icon-database',
    tables=[],
    ) {
    this.owner = owner
    this.id = id
    this.name = name
    this.description = description
    this.icon = icon
    this.tables = tables
  }

  get data () {
    return { 
      owner: this.owner,
      id: this.id,
      name: this.name,
      description: this.description, 
      icon: this.icon, 
      tables: this.datasets, 
    }
  }

 }
