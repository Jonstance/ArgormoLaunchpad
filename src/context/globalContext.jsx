import { createContext, useState } from "react";

import React from "react";


export const AppContext = createContext()

const GlobalContext = ({children})=>{

    const [isUserConnected, setIsUserConnected] =  useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [userWallet, setUserWallet] = useState("")


    return <AppContext.Provider
    value={{
        isUserConnected, setIsUserConnected,
        userWallet, setUserWallet,
        isAdmin, setIsAdmin
    }}
    >
        {children}
    </AppContext.Provider>
}

export default GlobalContext