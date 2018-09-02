import firebase from 'firebase'
import React, { Component } from 'react'
import db from '../firestore'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { withAuth } from 'fireview'
import { withStyles } from '@material-ui/core/styles'
import {
  TextField,
  FormControl,
  Button,
  Divider,
  Typography,
  Snackbar,
} from '@material-ui/core/'
import Notification from './Notification'
import styles from '../CSS/login'

class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      snackBarOpen: false,
      snackBarMessage: '',
      snackBarVariant: '',
    }
  }

  handleChange = event => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({
      snackBarOpen: false,
    })
  }

  handleSignup = async event => {
    event.preventDefault()
    try {
      const user = await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() =>
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.state.email,
              this.state.password
            )
        )
      await db
        .collection('users')
        .doc(user.user.uid)
        .set({
          email: this.state.email,
        })
      this.props.history.push('/tasklist')
    } catch (error) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: 'warning',
        snackBarMessage: `Oops... ${error.message}`,
      })
    }
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <form onSubmit={this.handleLogin} className={classes.container}>
          <FormControl>
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
            type="submit"
            color="primary"
            onClick={this.handleSignup}
          >
            Signup
          </Button>
          <Divider />
          <Typography>
            Already have an account?
            <a href="/login"> Login</a>
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
Signup.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(withRouter(withAuth(Signup)))
