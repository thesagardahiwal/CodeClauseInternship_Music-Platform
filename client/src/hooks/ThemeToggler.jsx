import React, { createContext, useContext, useEffect, useState } from 'react'

const themeContext = createContext();

export const useTheme = () => {
    return useContext(themeContext);
}

function ThemeToggler({children}) {
    const [theme, setTheme] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    let currentTheme = {
      background: theme ? "bg-slate-100" : "bg-gradient-to-l from-violet-900 to-blue-900",
      header: theme ? "bg-slate-200" : "bg-violet-950 text-slate-200",
      footer: theme ? "bg-slate-200" : "bg-violet-950 text-slate-100",
      menu: theme ? "bg-slate-100" : "bg-violet-550",
      menuItems: theme ? "bg-slate-200 bg-slate-100 text-slate-900" : "bg-violet-200 bg-violet-900 text-slate-200",
      menuPlaylist: theme ? "bg-slate-200 bg-slate-100 text-slate-900" : "bg-gradient-to-r from-indigo-500 to-violet-900 text-slate-200",
      page: theme ? "bg-slate-200" : "bg-violet-950",
      pageItems: theme ? "bg-slate-200" : "bg-violet-950",
      musicPlayer: theme ? "bg-slate-300" : "bg-gradient-to-t from-indigo-500 hover:to-slate-200 text-slate-200",
      PlaylistDetail: theme ? "bg-slate-300" : "text-slate-200 bg-gradient-to-l from-violet-900",
      PlaylistDetailItem: theme ? "bg-slate-300" : "text-slate-200 bg-gradient-to-r from-indigo-500 hover:to-slate-200 hover:text-black",
      musicDetails : theme ? "bg-slate-300" : "text-slate-200 bg-gradient-to-r from-violet-900 p-10",
      signIn : theme ? "bg-slate-300" : "text-slate-200 bg-gradient-to-t from-violet-400 to-indigo-500 p-10",
      explore : theme ? "bg-slate-300" : "text-slate-200 bg-gradient-to-l from-violet-900  p-10",
    };

    useEffect(() => {
    }, [theme])
  return (
    <themeContext.Provider value={{currentTheme, setTheme, theme, showMenu, setShowMenu}}>
        {children}
    </themeContext.Provider>
  )
}

export default ThemeToggler