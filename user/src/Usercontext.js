import { createContext, useState } from "react";

export const UserContext = createContext({})
export function UserContextProvider({children}){
    const [userInfo, setUserInfo] = useState(null);
    return(
        <UserContext.Provider value={{userInfo, setUserInfo}}>
    <div>
        {children}
    </div>
    </UserContext.Provider>
    )
    
}
