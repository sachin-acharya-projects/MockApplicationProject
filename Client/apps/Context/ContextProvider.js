import { createContext, useEffect, useState } from "react"
import { LocalStorage } from "../Utility"
import { Context } from "./Context"

export default function ContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        async function callback() {
            const user = await LocalStorage.getItem("@user")
            // console.log("ContextProvider", user)
            if (user) {
                setUserInfo(user)
            }
        }
        callback()
    }, [])

    return (
        <Context.Provider
            value={{
                userInfo,
                setUserInfo,
            }}
        >
            {children}
        </Context.Provider>
    )
}
