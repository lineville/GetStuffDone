import React, { Component } from "react";
import db from "../firestore";
import {
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  FormControl,
  Snackbar,
  Typography
} from "@material-ui/core";
import {
  Delete as DeleteIcon,
  Edit as EditIcon
} from "@material-ui/icons";
import MaterialUIForm from "material-ui-form";
import Spinner from "react-spinkit";
import Notification from "./Notification";
import "../CSS/App.css";

import { withStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";

const styles = {
  "input-label": {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "100%",
    color: "red"
  },

  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "yellow"
    }
  }
};

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      open: false,
      newTask: "",
      user: {},
      snackBarOpen: false,
      snackBarVariant: "",
      snackBarMessage: ""
    };
  }

  async componentDidMount() {
    await this.setState({
      user: this.props.user
    });
    await db
      .collection("users")
      .doc(this.state.user.id)
      .collection("tasks")
      .doc(this.props.item.id)
      .onSnapshot(snapshot => {
        this.setState({
          item: { id: snapshot.id, ...snapshot.data() }
        });
      });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  closePopup = () => {
    this.setState({ snackBarOpen: false });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  openForm = () => {
    this.setState({
      open: true
    });
  };

  handleEdit = () => {
    try {
      db.collection("users")
        .doc(this.state.user.id)
        .collection("tasks")
        .doc(this.state.item.id)
        .update({
          task: this.state.newTask
        })
        .then(() => {
          this.handleClose();
        })
        .then(() => {
          this.setState({
            snackBarOpen: true,
            snackBarVariant: "success",
            snackBarMessage: `Task updated successfully!`
          });
        });
    } catch (error) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "warning",
        snackBarMessage: `Oops... ${error.message}`
      });
    }
  };

  render() {
    return Object.keys(this.state.item).length ? (
      <div>
        <ListItem dense button className="list-item">
          {this.state.item.completed ? (
            <CheckCircleOutlineOutlinedIcon
              color="primary"
              onClick={() => this.props.toggleChecked(this.state.item)}
            />
          ) : (
            <RadioButtonUncheckedOutlinedIcon
              style={{ color: "#8f8f8f" }}
              onClick={() => this.props.toggleChecked(this.state.item)}
            />
          )}

          {this.state.item.starred ? (
            <StarIcon
              style={{ color: "#f9d71c" }}
              onClick={() => this.props.toggleStarred(this.state.item)}
            />
          ) : (
            <StarBorderIcon
              style={{ color: "#8f8f8f" }}
              onClick={() => this.props.toggleStarred(this.state.item)}
            />
          )}

          {this.state.item.work ? (
            <WorkOutlineIcon
              // color="primary"
              style={{ color: "#32CD32" }}
              onClick={() => this.props.toggleWork(this.state.item)}
            />
          ) : (
            <WorkOutlineIcon
              style={{ color: "#8f8f8f" }}
              onClick={() => this.props.toggleWork(this.state.item)}
            />
          )}

          <ListItemText disableTypography>
            <Typography color="inherit">{this.state.item.task}</Typography>
          </ListItemText>
          <IconButton aria-label="Edit" color="inherit" onClick={this.openForm}>
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="Delete"
            color="inherit"
            onClick={this.props.handleDelete}
          >
            <DeleteIcon />
          </IconButton>
          <Dialog open={this.state.open} onClose={this.handleClose} fullWidth>
            <MaterialUIForm onSubmit={this.handleEdit} fullWidth>
              <DialogContent fullWidth>
                <FormControl fullWidth>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="task"
                    name="newTask"
                    placeholder={this.state.item.task}
                    type="task"
                    fullWidth
                    onChange={this.handleChange}
                    defaultValue={this.state.item.task}
                    InputProps={{
                      classes: { input: this.props.classes.input }
                    }}
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
            vertical: "bottom",
            horizontal: "left"
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
    ) : (
      <Spinner name="ball-clip-rotate-multiple" color="primary" />
    );
  }
}

export default withStyles(styles)(Task);
