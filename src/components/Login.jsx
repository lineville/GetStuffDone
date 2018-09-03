import React, { Component } from 'react'
import firebase from 'firebase'
import { withAuth } from 'fireview'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  FormControl,
  Button,
  TextField,
  Snackbar,
  Typography,
  Divider,
} from '@material-ui/core'
import Notification from './Notification'
import styles from '../CSS/login'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      snackBarOpen: false,
      snackBarVariant: '',
      snackBarMessage: '',
    }
  }

  handleChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleLogin = async event => {
    event.preventDefault()
    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
      this.props.history.push('/tasklist')
    } catch (error) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: 'warning',
        snackBarMessage: `Oops... ${error.message}`,
      })
    }
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({
      snackBarOpen: false,
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <form onSubmit={this.handleLogin} className={classes.container}>
          <FormControl className={classes.margin}>
            <TextField
              id="email-input"
              name="email"
              label="Email"
              className={classes.textField}
              type="email"
              margin="normal"
              onChange={this.handleChange}
            />
          </FormControl>
          <FormControl className={classes.margin}>
            <TextField
              id="password-input"
              label="Password"
              name="password"
              className={classes.textField}
              onChange={this.handleChange}
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
          </FormControl>
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            onClick={this.handleLogin}
          >
            Login
          </Button>
          <Divider />
          <Typography>
            First time user?
            <a href="/signup"> Signup</a>
          </Typography>
        </form>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackBarOpen}
          autoHideDuration={4000}
          onClose={this.handleClose}
        >
          <Notification
            onClose={this.handleClose}
            variant={this.state.snackBarVariant}
            message={this.state.snackBarMessage}
          />
        </Snackbar>
      </div>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(withAuth(Login)))
