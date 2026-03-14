import React, {createContext, useState}from 'react';

//Creo una constante para acceder a ella desde cualquier pantalla 
export const UserContext = createContext();

export const UserProvider = ({children}) => { 
    const [user ,setUser] = useState(null);

    return(
        <UserContext.Provider value ={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
}
