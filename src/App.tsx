import { ChakraProvider } from '@chakra-ui/react'

import Router from '@/components/routes/Router'
import theme from '@/styles/theme'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router />
    </ChakraProvider>
  )
}

export default App
