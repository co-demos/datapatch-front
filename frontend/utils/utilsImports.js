export const csvSeparators = [
  { 
    value: 'comma',
    sep: ',',
    sepTxt: ',',
    label: 'imports.comma'
  },
  { 
    value: 'semicolon',
    sep: ';',
    sepTxt: ';',
    label: 'imports.semicolon'
  },
  { 
    value: 'tab',
    sep: '\t',
    sepTxt: '¶',
    label: 'imports.tab'
  },
  { 
    value: 'pipe',
    sep: '|',
    sepTxt: '|',
    label: 'imports.pipe'
  },
  { 
    value: 'colon',
    sep: ':',
    sepTxt: ':',
    label: 'imports.colon'
  },
]

export const importOptionsInfos = [
  { 
    title: 'imports.blank', 
    title_full: 'imports.blank_full', 
    icon: 'icon-file', 
    value: 'blank',
    disabled: false, 
  },
  { 
    title: 'imports.copyPaste', 
    title_full: 'imports.copyPaste_full', 
    icon: 'icon-copy', 
    value: 'copyPaste',
    disabled: false,
    options: {
      separators: csvSeparators
    }
  },
  { 
    title: 'imports.csv', 
    title_full: 'imports.csv_full', 
    icon: 'icon-table2', 
    value: 'csv',
    disabled: false,
    options: {
      separators: csvSeparators
    }
  },
  { 
    title: 'imports.excel', 
    title_full: 'imports.excel_full', 
    icon: 'icon-file-excel-o', 
    value: 'excel',
    disabled: false,
  },
  { 
    title: 'imports.json', 
    title_full: 'imports.json_full', 
    icon: 'icon-file-code-o', 
    value: 'json',
    disabled: false,
  },
  { 
    title: 'imports.csvGithub', 
    title_full: 'imports.csvGithub_full', 
    icon: 'icon-github', 
    value: 'csvGithub',
    disabled: false,
    options: {
      separators: csvSeparators
    }
  },
  { 
    title: 'imports.gSheet', 
    title_full: 'imports.gSheet_full', 
    icon: 'icon-google', 
    value: 'gSheet',
    disabled: false, 
  },
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
