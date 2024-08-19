import { legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  theme: 'light',
  isValidUser: false,
}

const changeState = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'set':
      return { ...state, ...payload }
    case 'SET_VALID_USER':
      return { ...state, isValidUser: payload }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store