import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { store } from './store.ts'
import { Provider } from 'react-redux'
import { ColorModeProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <ColorModeProvider options={{ initialColorMode: "light" }}>
          <App />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)