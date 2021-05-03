import axios from 'axios'

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
    disabled: true,
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

export const convertGithubUrlToRawUrl = (url) => {
  // console.log(`U-utilsImports > convertGithubUrlToRawUrl > url :`, url)
  const githubPublic = 'https://github.com/'
  const githubRaw = 'https://raw.githubusercontent.com/'
  let blob = 'blob/'

  let trimmedPath = ''
  let remainingPath = ''
  let pathArrayUrl
  let urlData = {
    originalFileUrl: url,
    githubUser: undefined,
    repo: undefined,
    branch: undefined,
    filename: undefined,
    rawFileUrl: undefined,
  }

  /*
  https://github.com/co-demos/datapatch-front/blob/master/test-files/csv/test-datapatch-PiNG-2021.csv
  to =>
  https://raw.githubusercontent.com/co-demos/datapatch-front/master/test-files/csv/test-datapatch-PiNG-2021.csv
  */

  if ( url.startsWith(githubPublic) ) {
    // console.log(`U-utilsImports > convertGithubUrlToRawUrl > githubPublic > ...`)
    trimmedPath = url.replace(githubPublic, '' )
    pathArrayUrl = trimmedPath.split('/') 
    // console.log(`U-utilsImports > convertGithubUrlToRawUrl > githubRaw > pathArrayUrl :`, pathArrayUrl)
    urlData.branch = pathArrayUrl[3]
  } 
  else if ( url.startsWith(githubRaw) ) {
    // console.log(`U-utilsImports > convertGithubUrlToRawUrl > githubRaw > ...`)
    trimmedPath = url.replace(githubRaw, '' )
    pathArrayUrl = trimmedPath.split('/') 
    urlData.branch = pathArrayUrl[2]
  }
  urlData.githubUser = pathArrayUrl[0]
  urlData.repo = pathArrayUrl[1]
  urlData.filename = pathArrayUrl[pathArrayUrl.length - 1]  
  remainingPath = trimmedPath.replace(`/${urlData.filename}`, '').replace(blob, '')

  urlData.rawFileUrl = `${githubRaw}${remainingPath}/${urlData.filename }`

  return urlData
  
}




// ### DATA GSHEETS

// REMAPPER
export function remapGSheetData ( GSdataEntryList ) {
  
  const gsPrefix = "gsx$"
  const gsValKey = "$t"

  // console.log('\n>>> UT-remapGSheetData / GSdataEntryList :', GSdataEntryList)

  let remappedHeaders = []
  let remappedGSdata = GSdataEntryList.map( entryObject => {
    // console.log('>>> UT-remapGSheetData / entryObject :', entryObject)
    let container = {}
    for ( let entryKey in entryObject ){
      if (entryKey.startsWith(gsPrefix) ){
        let rawValue = entryObject[entryKey][gsValKey]
        let rawKey = entryKey.replace(gsPrefix,"")
        container[ rawKey ] = rawValue
        if ( !remappedHeaders.includes(rawKey) ) { remappedHeaders.push(rawKey) }
      }
    }
    // console.log('>>> UT-remapGSheetData / container :', container)
    // console.log("...")
    return container
  })
  // console.log('>>> UT-remapGSheetData / remappedGSdata :', remappedGSdata)
  return {
    headers: remappedHeaders,
    rows: remappedGSdata
    }
} 



export const GsheetConfig = (gsheetUrl, gsheetSheetNumbers) => {

  // console.log('\n>>> U-loadGSheet / gsheetUrl :', gsheetUrl)
  // console.log('>>> U-loadGSheet / gsheetUrl :', gsheetSheetNumbers)

  // build url from gsheet config object
  // https://docs.google.com/spreadsheets/d/12Sq361P9QbOjqNLjE2TpDm1aa6ued8hUN10y6t6Bvc0/edit#gid=0

  const gsbaseEditBaseUrl = 'https://docs.google.com/spreadsheets/d/'
  const gsbaseEditBaseUrlSuffix = '/edit#gid='

  let gsheetObj = gsheetUrl.replace(gsbaseEditBaseUrl, '').split(gsbaseEditBaseUrlSuffix)
  // console.log('>>> U-loadGSheet / gsheetObj :', gsheetObj)

  let gsbaseBaseUrl = 'https://spreadsheets.google.com/feeds/list/'
  let gsheetId = gsheetObj[0]
  let gsheetSheet= gsheetObj[1]
  let gsheetSuffix = '/public/values?alt=json'

  let urls = []
  for (const sheetNumber of gsheetSheetNumbers) {
    let gsheetApiUrl = `https://spreadsheets.google.com/feeds/list/${gsheetId}/${sheetNumber}/public/values?alt=json`
    // console.log('>>> U-loadGSheet / gsheetApiUrl :', gsheetApiUrl)
    urls.push(gsheetApiUrl)
  }
  
  let gsheetInfos = {
    gsUrl: gsheetUrl, 
    gsId: gsheetId,
    gsSheetNumber: gsheetSheet,
    gsApiUrls: urls
  }

  return gsheetInfos

}


// main function to load data frrom GSheet and loading it into the store
export async function loadGoogleSheet( GSheetPublicUrl, gsheetSheetNumbers ){

  // console.log('>>> UT-loadGSheet / GSheetPublicUrl :', GSheetPublicUrl)
  // build url from gsheet config object
  let GSheetConfig = GsheetConfig(GSheetPublicUrl, gsheetSheetNumbers)
  // console.log('>>> UT-loadGSheet / GSheetConfig :', GSheetConfig)

  let results = {
    GSheetConfig: GSheetConfig,
    data: []
  }

  for (const url of GSheetConfig.gsApiUrls) {
    try {
      let data = await axios.get( url )
        .then(response => {
          // console.log('>>> UT-loadGSheet / response :', response)
          let dataMapped = remapGSheetData( response.data.feed.entry )
          let GSdata = {
            nameSheet: response.data.feed.title.$t,
            headers: dataMapped.headers,
            values: dataMapped.rows,
          }
          // console.log('>>> UT-loadGSheet / GSdata :', GSdata)
          results.data.push( GSdata )
        })
    } catch (error) {
      alert(error)
    }
  }
  return results

}
