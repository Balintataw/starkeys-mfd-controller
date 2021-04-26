import React, { createContext, useReducer } from 'react'

const initialState = {
  hostip: '',
  fileid: '',
  serverCheck: true,
}

export const store = createContext(initialState)

const { Provider } = store

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const currentState = { ...state }
    switch (action.type) {
      case types.setHostIP:
        currentState.hostip = action.payload
        return currentState
      case types.setFileId:
        currentState.fileid = action.payload
        return currentState
      case types.setServerCheck:
        currentState.serverCheck = action.payload
        return currentState
      default:
        throw new Error('Unsupported action type')
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export const types = Object.freeze({
  setHostIP: 'SET_HOSTIP',
  setFileId: 'SET_FILEID',
  setServerCheck: 'SET_SERVER_CHECK'
})