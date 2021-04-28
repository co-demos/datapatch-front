import { TableMetadata } from '@/utils/utilsTables.js' 


export const state = () => ({
  currentTables: undefined,
  currentTable: undefined,
})

export const getters = {
  getCurrentTables: (state) => {
    // console.log('S-tables > getCurrentTables > state.currentTables : ', state.currentTables)
    return state.currentTables
  },
  getCurrentTable: (state) => {
    // console.log('S-tables > getCurrentTable > state.currentTable : ', state.currentTable)
    return state.currentTable
  },
  getCurrentTableId: (state) => {
    // console.log('S-tables > getCurrentTableId > state.currentTable : ', state.currentTable)
    return state.currentTable.id
  },
  getTableMetadataById: (state, getters) => (tableId) => {
    // console.log('S-tables > getCurrentTableMetadata > state.currentTable : ', state.currentTable)
    const filterOutKeys = ['tableData', 'tableFields']
    let table = getters.getTableById(tableId)
    const filtered = Object.keys(table)
      .filter(key => !filterOutKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = table[key]
        return obj
      }, {})
    return filtered
  },
  getTableById: (state) => (tableId) => {
    // console.log('S-tables > getCurrentTableById > state.currentTables : ', state.currentTables)
    return state.currentTables.find( t => t.id === tableId)
  },
}

export const mutations = {
  setItems (state, {space, items}) {
    // console.log('S-tables > setItems > items : ', items)
    state[space] = items
  },
  setCurrentItemById (state, tableId) {
    // console.log('S-tables > setCurrentTableById > tableId : ', tableId)
    let table = state.currentTables.find (t => t.id === tableId)
    state.currentTable = table
  },

  addItem (state, {space, item}) {
    // console.log('S-tables > addItem > item : ', item)
    state[space].push(item)
  },
  updateItem (state, {space, item}) {
    // console.log('S-tables > updateItem > item : ', item)
    state[space] = [ ...state[space].map(obj => obj.id !== item.id ? obj : {...obj, ...item})]
  },
  removeItem (state, {space, item}) {
    // console.log('S-tables > removeItem > space : ', space)
    // console.log('S-tables > removeItem > item : ', item)
    let removeIndex = state[space].findIndex(ws => ws.id == item.id)
    // console.log('S-tables > removeItem > removeIndex : ', removeIndex)
    state[space].splice(removeIndex, 1)
    // console.log('S-datasets > removeItem > state[space] : ', state[space])
  },
  resetItems (state, {space}) {
    // console.log('S-tables > resetItems > space : ', space)
    state[space] = undefined
  },
}

export const actions = {

  setCurrentTables ({ commit }, tables) {
    commit('setItems', {space: 'currentTables', items: tables})
  },
  setCurrentTable ({ commit }, table) {
    commit('setItems', {space: 'currentTable', items: table})
  },
  setCurrentTableById ({ commit }, tableId) {
    commit('setCurrentItemById', tableId)
  },

  appendTable ({ commit }, table) {
    commit('addItem', {space: 'currentTables', item: table})
  },
  updateTable ({ commit }, table) {
    commit('updateItem', {space: 'currentTables', item: table})
  },
  removeTable ({ commit }, table) {
    commit('removeItem', {space: 'currentTables', item: table})
  },

  resetCurrentTables ({ commit }) {
    commit('resetItems', {space: 'currentTables'})
  },
  resetCurrentTable ({ commit }) {
    commit('resetItems', {space: 'currentTable'})
  },
}
