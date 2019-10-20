import React, { Component } from 'react'
import { Typography, Button, AppBar, Toolbar } from '@material-ui/core/'
import { GetApp as DownloadIcon, Input as LogoutIcon } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withAuth } from 'fireview'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
import styles from '../CSS/header.js'
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
    const { classes } = this.props
    return isLoggedIn ? (
      <AppBar position="static" color="secondary">
        <Toolbar>
          <a href="https://github.com/lineville/GetStuffDone">
            <Button
              variant="extendedFab"
              aria-label="Download"
              color="primary"
              className={classes.button}
            >
              <DownloadIcon className={classes.extendedIcon} />
              Download
            </Button>
          </a>
          <Typography variant="title" color="primary" className={classes.flex}>
            To Do's
          </Typography>
          <Button
            variant="extendedFab"
            aria-label="Logout"
            className={classes.button}
            onClick={this.handleLogout}
          >
            <LogoutIcon className={classes.extendedIcon} />
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    ) : (
      <header className="App-header">
        <Typography variant="display3" color="primary">
          To Do's
        </Typography>
      </header>
    )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(withAuth(Header)))
