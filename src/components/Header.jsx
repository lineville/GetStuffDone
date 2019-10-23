import React, { Component } from 'react'
import { Typography, AppBar, Toolbar, Button } from '@material-ui/core/'
import { Input as LogoutIcon } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withAuth } from 'fireview'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
import styles from '../CSS/header.js'
import '../CSS/App.css'
import GithubCorner from 'react-github-corner';

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
          <Typography variant="title" color="primary" className={classes.flex}>
            To Do's
          </Typography>
          <Button onClick={this.handleLogout}>
            <LogoutIcon className={classes.extendedIcon} color="primary" />
          </Button>
          <GithubCorner direction="left" size="60" color="inherit" target="_blank" href="https://github.com/lineville/GetStuffDone/" />


        </Toolbar>
      </AppBar>
    ) : (
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="title" color="primary" className={classes.flex}>
              To Do's
          </Typography>


            <GithubCorner direction="left" size="60" color="inherit" target="_blank" href="https://github.com/lineville/GetStuffDone/" />
          </Toolbar>
        </AppBar>
        // <header className="App-header">
        //   <Typography variant="display3" color="primary">
        //     To Do's
        // </Typography>
        // </header>
      )
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(withAuth(Header)))
