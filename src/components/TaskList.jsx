import React, { Component } from 'react'
import db from '../firestore'
import firebase from 'firebase'
import { withAuth } from 'fireview'
import { List, Snackbar } from '@material-ui/core'
import Task from './Task'
import Notification from './Notification'
import CreateTask from './CreateTask'
import '../CSS/App.css'

class TaskList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      user: {},
      snackBarOpen: false,
      snackBarVariant: '',
      snackBarMessage: '',
    }
  }

  async componentDidMount() {
    const user = await firebase.auth().currentUser
    await db
      .collection('users')
      .doc(user.uid)
      .get()
      .then(user => {
        this.setState({ user: { id: user.id, ...user.data() } })
      })
      .then(() => {
        db.collection('users')
          .doc(user.uid)
          .collection('tasks')
          .onSnapshot(snapshot => {
            this.setState({
              tasks: snapshot.docs.map(task => {
                return { id: task.id, ...task.data() }
              }),
            })
          })
      })
  }

  handleDelete = task => {
    try {
      db.collection('users')
        .doc(this.state.user.id)
        .collection('tasks')
        .doc(task.id)
        .delete()
        .then(() => {
          this.setState({
            snackBarOpen: true,
            snackBarVariant: 'success',
            snackBarMessage: `Task deleted!`,
          })
        })
    } catch (error) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: 'warning',
        snackBarMessage: `Oops... ${error.message}`,
      })
    }
  }

  toggleChecked = item => {
    try {
      db.collection('users')
        .doc(this.state.user.id)
        .collection('tasks')
        .doc(item.id)
        .update({
          completed: !item.completed,
        })
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
    return (
      <div>
        <CreateTask />
        <List>
          {this.state.tasks.map(item => {
            return (
              <Task
                key={item.id}
                item={item}
                DataTransferItemList
                className="list"
                handleDelete={() => this.handleDelete(item)}
                toggleChecked={() => this.toggleChecked(item)}
                user={this.state.user}
              />
            )
          })}
        </List>
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

export default withAuth(TaskList)
