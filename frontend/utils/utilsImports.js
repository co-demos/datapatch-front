export const importOptionsInfos = [
  { title: 'imports.blank', icon: 'icon-file', value: 'blank' },
  { title: 'imports.copyPaste', icon: 'icon-copy', value: 'copyPaste' },
  { title: 'imports.csv', icon: 'icon-table2', value: 'csv' },
  { title: 'imports.excel', icon: 'icon-file-excel-o', value: 'excel', disabled: true },
  { title: 'imports.json', icon: 'icon-file-code-o', value: 'json', disabled: true },
  { title: 'imports.csvGithub', icon: 'icon-github', value: 'csvGithub' },
  { title: 'imports.gSheet', icon: 'icon-google', value: 'gSheet', disabled: true },
]

export const convertCSVToJSON = (str, delimiter = ',') => {

  const titles = str.slice(0, str.indexOf('\n')).split(delimiter)
  // slugify titles if necessary
  
  const rows = str.slice(str.indexOf('\n') + 1).split('\n')
  let rowValues = rows.map(row => {
    const values = row.split(delimiter)
    return titles.reduce((object, curr, i) => (object[curr] = values[i], object), {})
  })

  return {
    headers: titles,
    values: rowValues
  }
}
