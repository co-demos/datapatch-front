import { Field, helpHeadersFields, endHeadersFields } from '@/utils/utilsFields'
import { TableMetaData } from '@/utils/utilsTables.js' 

let emptyTable = new TableMetaData()

export const state = () => ({
  helpersHs: helpHeadersFields, //.map( h => h.dataHelper ),
  addColHs: endHeadersFields, //.map( h => h.dataHelper ),

  isLoading: false,
  loadingItem: undefined,

  itemModel: {
    infos: emptyTable.infos,
    auth: emptyTable.auth,
  },
  itemModelShare: {
    share: emptyTable.share,
  },

  needReload: false,
  needRedraw: false,

  currentTableId: undefined,
  currentTables: undefined,
  selectedRows: {},

  tempTableId: undefined,
  tempTables: undefined,
  tempSelectedRows: {},

})

export const getters = {

  getTablesNeedReload: (state) => {
    return state.needReload
  },
  getTablesNeedRedraw: (state) => {
    return state.needRedraw
  },

  getSelectedRowsForCurrentTable: (state) => {
    const tableId = state.currentTableId
    return state.selectedRows[tableId] || []
  },

  getCurrentTableId: (state) => {
    // console.log('S-tables > getCurrentTables > state.currentTables : ', state.currentTables)
    return state.currentTableId
  },
  getCurrentTables: (state) => {
    // console.log('S-tables > getCurrentTables > state.currentTables : ', state.currentTables)
    return state.currentTables
  },
  getCurrentTable: (state) => {
    console.log('S-tables > getCurrentTable > state.currentTables : ', state.currentTables)
    console.log('S-tables > getCurrentTable > state.currentTableId : ', state.currentTableId)
    return state.currentTables && state.currentTables.find(t => t.id === state.currentTableId)
  },
  getTableById: (state) => (tableId) => {
    // console.log('S-tables > getCurrentTableById > state.currentTables : ', state.currentTables)
    return state.currentTables.find( t => t.id === tableId)
  },
  getTableMetadataById: (state, getters) => (tableId) => {
    // console.log('S-tables > getCurrentTableMetadata > state.currentTable : ', state.currentTable)
    const filterOutKeys = ['table_data', 'table_fields']
    let table = getters.getTableById(tableId)
    const filtered = Object.keys(table)
      .filter(key => !filterOutKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = table[key]
        return obj
      }, {})
    return filtered
  },

  // FIELDS - DATA - getters
  getCurrentTableFieldsDataLength: (state, getters) => {
    let currentTable = getters.getCurrentTable
    return currentTable.table_fields.length
  },
  getCurrentTableFieldsData: (state, getters) => {
    // console.log('S-tables > getCurrentTableFieldsData > state.currentTable.table_fields : ', state.currentTable.table_fields)
    let currentTable = getters.getCurrentTable
    let dataFields = currentTable && currentTable.table_fields.map( h => (h instanceof Field ? h.data : h) )
    // console.log('S-tables > getCurrentTableFieldsData > dataFields : ', dataFields)
    return dataFields
  },
  getCurrentTableFields: (state, getters) => {
    // console.log('S-tables > getCurrentTableFields > state.currentTable.table_fields : ', state.currentTable.table_fields)
    let helpersHs = state.helpersHs.map( h => h.dataHelper )
    let addColHs = state.addColHs.map( h => h.dataHelper )
    let dataFields = getters.getCurrentTableFieldsData
    // console.log('S-tables > getCurrentTableFields > dataFields : ', dataFields)
    let tableHeaders = dataFields && [ ...helpersHs, ...dataFields, ...addColHs ]
    // console.log('S-tables > getCurrentTableFields > tableHeaders : ', tableHeaders)
    return tableHeaders
  },
  getCurrentTableRowsLength: (state, getters) => {
    let currentTable = getters.getCurrentTable
    return currentTable && currentTable.table_data.length
  },
  getCurrentTableRows: (state, getters) => {
    let currentTable = getters.getCurrentTable
    console.log('S-tables > getCurrentTableRows > currentTable : ', currentTable)
    return currentTable && currentTable.table_data
  },
}

export const mutations = {

  setIsLoading (state, bool) {
    state.isLoading = bool
  },
  setItemLoading (state, id) {
    state.loadingItem = id
  },

  setTablesNeedReload (state, bool) {
    state.needReload = bool
  },
  setTablesNeedRedraw (state, bool) {
    state.needRedraw = bool
  },

  setCurrentTableId (state, tableId) {
    state.currentTableId = tableId
  },

  setSelectedRows (state, {tableId, rowIds}) {
    state.selectedRows[tableId] = rowIds
  },

  setCurrentTables (state, items) {
    // console.log('S-tables > setCurrentTables > items : ', items)
    state.currentTables = items
  },

  addItem (state, {space, item}) {
    state[space].push(item)
  },
  addItemStart (state, {space, item}) {
    state[space] = [ item, ...state[space] ]
  },
  updateItem (state, {space, item}) {
    // console.log('S-tables > updateItem > item : ', item)
    state[space] = [ ...state[space].map(obj => obj.id !== item.id ? obj : {...obj, ...item})]
    // console.log('S-tables > updateItem > state[space] : ', state[space])
  },
  removeItem (state, {space, item}) {
    // console.log('S-tables > removeItem > space : ', space)
    // console.log('S-tables > removeItem > item : ', item)
    let removeIndex = state[space].findIndex(obj => obj.id == item.id)
    // console.log('S-tables > removeItem > removeIndex : ', removeIndex)
    state[space].splice(removeIndex, 1)
    // console.log('S-datasets > removeItem > state[space] : ', state[space])
  },
  resetItems (state, {space}) {
    // console.log('S-tables > resetItems > space : ', space)
    state[space] = undefined
  },

  // FIELDS-DATA - currrent table mutations
  appendToCurrentTable (state, {space, item}) {
    let table = state.currentTables.find( t => t.id === state.currentTableId)
    table[space].push(item)
  },
  updateSpaceInCurrentTable (state, {space, items}) {
    // console.log('\nS-tables > updateInCurrentTable > space : ', space)
    // console.log('S-tables > updateInCurrentTable > items : ', items)
    let table = state.currentTables.find( t => t.id === state.currentTableId)
    // console.log('S-tables > updateInCurrentTable > table : ', table)
    table[space] = items
  },
  updateInCurrentTable (state, {space, item}) {
    // console.log('\nS-tables > updateInCurrentTable > space : ', space)
    // console.log('S-tables > updateInCurrentTable > item : ', item)
    // console.log('S-tables > updateInCurrentTable > state.currentTableId : ', state.currentTableId)
    let table = state.currentTables.find( t => t.id === state.currentTableId)
    // console.log('S-tables > updateInCurrentTable > table : ', table)
    // let matchKey = space === 'table_fields' ? 'value' : 'id'
    // let matchKey = 'id'
    // console.log('S-tables > updateInCurrentTable > matchKey : ', matchKey)
    // table[space] = [ ...table[space].map(obj => obj[matchKey] !== item[matchKey] ? obj : {...obj, ...item} ) ]
    table[space] = [ ...table[space].map(obj => obj.id !== item.id ? obj : {...obj, ...item} ) ]
    // console.log('S-tables > updateInCurrentTable > table[space] : ', table[space])
  },

  deleteInCurrentTable (state, {space, itemId}) {
    console.log('\nS-tables > deleteInCurrentTable > space : ', space)
    console.log('S-tables > deleteInCurrentTable > itemId : ', itemId)
    let table = state.currentTables.find( t => t.id === state.currentTableId)
    console.log('S-tables > deleteInCurrentTable > table[space].length A : ', table[space].length)
    table[space] = [ ...table[space].filter(r => r.id !== itemId) ]
    console.log('S-tables > deleteInCurrentTable > table[space].length B : ', table[space].length)
  },

}

export const actions = {

  togggleIsLoading({commit}, bool) {
    commit('setIsLoading', bool)
  },

  toggleTablesNeedReload ({ commit }, bool) {
    commit('setTablesNeedReload', bool)
    if (bool) {
      commit('setCurrentTableId', undefined)
    }
  },
  toggleTablesNeedRedraw ({ commit }, bool) {
    commit('setTablesNeedRedraw', bool)
  },

  // CURRENT TABLES
  setCurrentTables ({ commit }, { tables, tableId=undefined } ) {
    // console.log('S-tables > setCurrentTables > table : ', tables )
    // console.log('S-tables > setCurrentTables > tableId : ', tableId )
    commit('setCurrentTableId', tableId || tables[0].id)
    commit('setCurrentTables', tables)
    commit('setIsLoading', false)
  },
  setCurrentTableId ({ commit }, tableId) {
    commit('setCurrentTableId', tableId)
  },

  // TABLES LIST
  appendTable ({ commit }, table ) {
    commit('addItem', {space: 'currentTables', item: table})
  },
  appendTableStart ({ commit }, table) {
    commit('addItemStart', {space: 'currentTables', item: table})
  },
  updateTable ({ commit }, table) {
    commit('updateItem', {space: 'currentTables', item: table})
  },
  updateUserItem ({ commit }, table) {
    commit('updateItem', {space: 'currentTables', item: table})
  },
  removeTable ({ commit }, table) {
    commit('removeItem', {space: 'currentTables', item: table})
  },

  resetCurrentTables ({ commit }) {
    commit('resetItems', {space: 'currentTables'})
    commit('setSelectedRows', {})
  },

  // SELECTED ROWS 
  setSelectedRows({commit}, data) {
    commit('setSelectedRows', { tableId: data.tableId, rowIds: data.rowIds } )
  },

  // FIELDS - currrent table actions
  appendColumnToCurrentTableFields ({ commit }, newCol) {
    commit('appendToCurrentTable', {space: 'table_fields', item: newCol})
  },
  updateColumnInCurrentTableFields ({ commit }, col) {
    commit('updateInCurrentTable', {space: 'table_fields', item: col})
  },
  deleteColumnInCurrentTableFields ({ commit }, colId) {
    commit('deleteInCurrentTable', {space: 'table_fields', item: colId})
  },
  updateColumnsOrderInTableData ({ commit, getters }, columns) {
    commit('updateSpaceInCurrentTable', {space: 'table_fields', items: columns} )
  },

  // DATA - currrent table actions
  appendRowToCurrentTableData ({ commit, getters }, newRow) {
    commit('appendToCurrentTable', {space: 'table_data', item: newRow})
    commit('setTablesNeedRedraw', true)
  },
  updateRowInCurrentTableData ({ commit, getters }, row) {
    commit('updateInCurrentTable', {space: 'table_data', item: row})
    commit('setTablesNeedRedraw', true)
  },
  updateCellValueInTableData ({ commit, getters }, cellData) {
    const table = getters.getCurrentTable
    let row = { ...table.table_data.find( r => r.id === cellData.rowId) }
    row[cellData.headerValue] = cellData.value
    commit('updateInCurrentTable', {space: 'table_data', item: row} )
    commit('setTablesNeedRedraw', true)
  },
  updateRowsOrderInTableData ({ commit, getters }, rows) {
    commit('updateSpaceInCurrentTable', {space: 'table_data', items: rows} )
    commit('setTablesNeedRedraw', true)
  },
  deleteRowInCurrentTableData ({ commit, getters }, rowId) {
    commit('deleteInCurrentTable', {space: 'table_data', itemId: rowId})
    const table = getters.getCurrentTable
    console.log('S-tables > deleteRowInCurrentTableData > table : ', table)
    commit('setTablesNeedRedraw', true)
  },
}
