import {createContext} from 'react'

export interface INavigationContext {
    currentPage: string
    navigate: (value: string) => void
}

const NavigationContext = createContext<INavigationContext | null>(null)

export default NavigationContext