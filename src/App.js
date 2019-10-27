import React, { Component } from 'react'
import './CSS/App.css'
import Header from './components/Header'
import Routes from './Routes'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import AddToHomescreen from 'react-add-to-homescreen'

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      input: {
        // placeholder: {
        //   color: 'purple',
        // },
        color: 'black',
      },
    },
  },
  palette: {
    primary: {
      main: '#21c3ef',
    },
    secondary: {
      main: '#4BB543',
    },
  },
  typography: {
    fontFamily: ['Source Sans Pro', 'Roboto Condensed', 'sans-serif'].join(','),
  },
})

class App extends Component {
  componentDidMount() {
    const ele = document.getElementById('ipl-progress-indicator')
    if (ele) {
      // fade out
      ele.classList.add('available')
      setTimeout(() => {
        // remove from DOM
        ele.outerHTML = ''
      }, 2000)
    }
  }

  handleAddToHomescreenClick = () => {
    alert(`
      1. Open Share menu
      2. Tap on "Add to Home Screen" button`)
  }

  render() {
    return (
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Header />
          <Routes />
          <AddToHomescreen
            onAddToHomescreenClick={this.handleAddToHomescreenClick}
          />
        </MuiThemeProvider>
      </div>
    )
  }
}

export default App
