const appReducer = (state, action) => {
  switch(action.type) {
    case 'GET_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'SET_MENU_ACTIVE' :
      return {
        id: action.payload
      }
    default:
      return state;
  }
}

export default appReducer