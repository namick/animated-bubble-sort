import React from "react"
import ReactDOM from "react-dom"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import { orange, purple } from "@material-ui/core/colors"
import { CssBaseline } from "@material-ui/core"
import App from "./App"

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: orange,
    secondary: purple
  }
})

const rootElement = document.getElementById("root")
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  rootElement
)
