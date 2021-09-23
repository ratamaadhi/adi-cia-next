import { createContext, useReducer } from "react";
import { RiArticleLine, RiGalleryLine, RiHeart2Line, RiTimeLine } from "react-icons/ri";
import AppReducer from './AppReducer';
export const GlobalContext = createContext({});

export const navMenu = [
  {id: 1, name: "About", icon: (<RiHeart2Line />)},
  {id: 2, name: "Gallery", icon: (<RiGalleryLine />)},
  {id: 3, name: "Blog", icon: (<RiArticleLine />) },
  {id: 4, name: "Moment", icon: (<RiTimeLine />)},
]

const initMenuBottomState = {
  id: '#'
}

export const MenuBottomCtx = createContext(initMenuBottomState)

export const MenuBottomProv = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initMenuBottomState);

  function changeActiveMenu(id){
    dispatch({
      type: 'SET_MENU_ACTIVE',
      payload: id
    });
  }

  return (<MenuBottomCtx.Provider value={{
    id: state.id,
    changeActiveMenu,
  }}>
    {children}
  </MenuBottomCtx.Provider>);
}