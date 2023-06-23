import { createContext, useContext, useState } from "react";

const AppContext = createContext("");

export const useAppContext = () => {
    return useContext(AppContext);
}

export const ContextProvider = ({ children }) => {
    const [alert, setAlert] = useState({status: false, message: ""})
    return (
        <AppContext.Provider value={{alert, setAlert}}>
            {children}
        </AppContext.Provider>
    )

}