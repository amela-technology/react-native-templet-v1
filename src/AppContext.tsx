import * as React from "react"

export interface AppContextInterface {
    theme: string,
    language: string,
    // .....
}

const ctx = React.createContext<AppContextInterface | null>(null)

export const AppContext = ctx.Provider

export const AppContextConsumer = ctx.Consumer


// You can use templet for Providing the Context
// import * as React from 'react';
// import { AppContextInterface, AppContextProvider } from './AppContext';
//
// const sampleAppContext: AppContextInterface = {
//     theme: 'Light',
//     language: 'en_US',
// };
//
// export const App = () => (
//     <AppContextProvider value={sampleAppContext}>
//         ...
//     </AppContextProvider>
// );
// Consuming the Context
// import * as React from 'react';
// import { AppContextConsumer } from './AppContext';
//
// export const ScreenOrComponent = () => (
//     <AppContextConsumer>
//         {appContext => appContext && (
//             <div>
//                 Name: {appContext.name},
//                 Author: {appContext.author},
//                 Url: {appContext.url}
//             </div>
//         )}
//     </AppContextConsumer>
// );
