import XLSX from 'xlsx'

// FOR CSV FILES
export const readFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
  })
}

// FOR XLS FILES
export const readXlsFileAsync = (file) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = (e) => {
      let data = e.target.result
      let workbook = XLSX.read(data, {type: 'binary'})
      console.log(`UT-utilsFiles > readXlsFileAsync > workbook :`, workbook)
      resolve(workbook)
    }
    reader.onerror = reject
  })
}
export const convertXlsToJson = (sheetData) => {
  console.log(`UT-utilsFiles > convertXlsToJson > sheetData :`, sheetData)
  let json = XLSX.utils.sheet_to_json( sheetData, {raw: true} )
  console.log(`UT-utilsFiles > convertXlsToJson > json :`, json)

  let dataObj = {
    headers: Object.keys(json[0]),
    values: json
  }
  return dataObj
}

export async function processFile(file, type='csv') {
  try {
    let result 
    if (type === 'csv') {
      result = await readFileAsync(file)
    }
    if (type === 'xls') {
      result = await readXlsFileAsync(file)
    }
    return result
  } catch (err) {
    console.log(err)
  }
}
