import { createContext } from "react"

type IContext = {
    userInfo: string,
    setUserInfo: (value: string) => void
}

export const Context = createContext<IContext | null>(null)