import React, { Component } from 'react'
import db from '../firestore'
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  FormControl,
  Snackbar,
} from '@material-ui/core'
import { Delete as DeleteIcon, Edit as EditIcon } from '@material-ui/icons'
import MaterialUIForm from 'material-ui-form'
import Notification from './Notification'
import '../CSS/App.css'

class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: {},
      open: false,
      newTask: '',
      user: {},
      snackBarOpen: false,
      snackBarVariant: '',
      snackBarMessage: '',
    }
  }

  async componentDidMount() {
    await this.setState({
      item: this.props.item,
      user: this.props.user,
    })
    db.collection('users')
      .doc(this.state.user.id)
      .collection('tasks')
      .doc(this.state.item.id)
      .onSnapshot(snapshot => {
        this.setState({
          item: { id: snapshot.id, ...snapshot.data() },
        })
      })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  closePopup = () => {
    this.setState({ snackBarOpen: false })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  openForm = () => {
    this.setState({
      open: true,
    })
  }

  handleEdit = () => {
    try {
      db.collection('users')
        .doc(this.state.user.id)
        .collection('tasks')
        .doc(this.state.item.id)
        .update({
          task: this.state.newTask,
        })
        .then(() => {
          this.handleClose()
        })
        .then(() => {
          this.setState({
            snackBarOpen: true,
            snackBarVariant: 'success',
            snackBarMessage: `Task updated successfully!`,
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

  render() {
    return (
      <div>
        <ListItem role={undefined} dense button className="list-item">
          <Checkbox
            checked={this.state.item.completed}
            tabIndex={-1}
            disableRipple
            onClick={() => this.props.toggleChecked(this.state.item)}
          />
          <ListItemText primary={this.state.item.task} />
          <IconButton aria-label="Edit" onClick={this.openForm}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Delete" onClick={this.props.handleDelete}>
            <DeleteIcon />
          </IconButton>
          <Dialog open={this.state.open} onClose={this.handleClose}>
            <MaterialUIForm onSubmit={this.handleEdit}>
              <DialogContent>
                <FormControl>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="task"
                    name="newTask"
                    label="Task"
                    type="task"
                    fullWidth
                    onChange={this.handleChange}
                  />
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" onClick={this.handleEdit} color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </MaterialUIForm>
          </Dialog>
        </ListItem>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.snackBarOpen}
          autoHideDuration={4000}
          onClose={this.closePopup}
        >
          <Notification
            onClose={this.closePopup}
            variant={this.state.snackBarVariant}
            message={this.state.snackBarMessage}
          />
        </Snackbar>
      </div>
    )
  }
}

export default Task
