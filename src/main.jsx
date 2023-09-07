import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { Routers } from './Routers.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/index.js'
import { BrowserRouter } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.50',
      },
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <LoadingBar />

          <Routers />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
