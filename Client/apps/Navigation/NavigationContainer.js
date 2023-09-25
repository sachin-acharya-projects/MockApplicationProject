import React, { useContext, useState } from "react"
import NavigationContext from "./navigationContext"

/**
 * Navigation Container: Content Navigation Component - a Wrapper
 * @param {object} props - Props for the Component
 * @param {string} props.defaultPage - Default Page to render first
 * @param {JSX.Element} props.children - Children of the component
 */
export default function NavigationContainer({ children, defaultPage }) {
    const [currentPage, setCurrentPage] = useState(defaultPage)

    return (
        <NavigationContext.Provider
            value={{
                currentPage,
                navigate: setCurrentPage,
            }}
        >
            {children}
        </NavigationContext.Provider>
    )
}

/**
 * Component to Handle Navigation - a child of NavigationContainer
 * @param {object} props - Props for component
 * @param {string} props.name - Name of the Component
 * @param {JSX.Element} props.component - Component to Render
 */
export function Route({ name, component }) {
    const { currentPage, navigate } = useContext(NavigationContext)

    return currentPage === name
        ? React.cloneElement(component, {
              navigation: {
                  currentPage,
                  navigate,
              },
          })
        : null
}
