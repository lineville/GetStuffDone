import React, { Component } from 'react'
import firebase from 'firebase'
import db from '../firestore'
import { FormControl, Button, TextField, Snackbar } from '@material-ui/core'
import MaterialUIForm from 'material-ui-form'
import Notification from './Notification'
import { Add as AddIcon } from '@material-ui/icons'
import '../CSS/App.css'

class CreateTask extends Component {
  constructor() {
    super()
    this.state = {
      newTask: '',
      snackBarOpen: false,
      snackBarMessage: '',
      snackBarVariant: '',
    }
  }

  handleChange = event => {
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

  createTask = async event => {
    const user = await firebase.auth().currentUser
    try {
      await db
        .collection('users')
        .doc(user.uid)
        .collection('tasks')
        .add({
          task: this.state.newTask,
          completed: false,
          starred: false
        })
      this.setState({
        newTask: '',
        snackBarOpen: true,
        snackBarVariant: 'success',
        snackBarMessage: `Task added!`,
      })
    } catch (error) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: 'warning',
        snackBarMessage: `Oops... ${error.message}`,
      })
    }
  }

  render() {
    return (
      <div>
        <MaterialUIForm onSubmit={this.createTask}>
          <FormControl>
            <TextField
              id="newTask"
              name="newTask"
              label="New Task"
              type="newTask"
              margin="normal"
              width="100%"
              value={this.state.newTask}
              onChange={this.handleChange}
            />
          </FormControl>

          <Button
            variant="fab"
            color="primary"
            aria-label="Add"
            id="addbutton"
            size="medium"
            onClick={this.createTask}
          >
            <AddIcon />
          </Button>
        </MaterialUIForm>
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

export default CreateTask
