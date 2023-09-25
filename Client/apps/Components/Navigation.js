import { ContextProvider } from "../Context"
import { Home, Account } from "../Pages"

import NavigationContainer, { Route } from "../Navigation/NavigationContainer"

export default function Navigation() {
    return (
        <ContextProvider>
            <NavigationContainer defaultPage="Home">
                <Route name="Home" component={<Home />} />
                <Route name="Account" component={<Account />} />
            </NavigationContainer>
        </ContextProvider>
    )
}