import React, { Component } from 'react'
import { Typography, Button } from '@material-ui/core/'
import { SaveAlt as DownloadIcon } from '@material-ui/icons'
import { withAuth } from 'fireview'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
import '../CSS/App.css'

class Header extends Component {
  handleLogout = async () => {
    try {
      await firebase.auth().signOut()
      this.props.history.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const isLoggedIn = this.props._user
    return isLoggedIn ? (
      <header className="App-header">
        <Typography variant="display3" color="primary">
          Get Stuff Done
          <div className="logout">
            <Button
              variant="contained"
              type="submit"
              color="primary"
              // className="logout"
              onClick={this.handleLogout}
            >
              Logout
            </Button>
            <a href="/getstuffdone-0.1.0.dmg" download>
              <DownloadIcon />
            </a>
          </div>
        </Typography>
      </header>
    ) : (
      <header className="App-header">
        <Typography variant="display3" color="primary">
          Get Stuff Done
          <div className="logout">
            <a href="/getstuffdone-0.1.0.dmg" download>
              <DownloadIcon />
            </a>
          </div>
        </Typography>
      </header>
    )
  }
}

export default withRouter(withAuth(Header))
