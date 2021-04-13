 export class Dataset {
  constructor (
    owner=undefined,
    id=undefined,
    name='My new dataset',
    description='My dataset description',
    color='primary',
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

 }
