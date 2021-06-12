import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider, ColorModeScript,extendTheme } from "@chakra-ui/react"

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}
const theme = extendTheme({ config })

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App/>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

