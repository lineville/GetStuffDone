import React, { Component } from "react";
import db from "../firestore";
import firebase from "firebase";
import { withAuth } from "fireview";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Snackbar,
  Typography,
  Paper,
  Tabs,
  Tab,
  Switch,
  FormControlLabel
} from "@material-ui/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Spinner from "react-spinkit";
import Task from "./Task";
import Notification from "./Notification";
import CreateTask from "./CreateTask";
import "../CSS/App.css";
import styles from "../CSS/tasklist";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      user: {},
      filter: 0,
      snackBarOpen: false,
      snackBarVariant: "",
      snackBarMessage: "",
      isLoading: false
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const user = await firebase.auth().currentUser;
    await db
      .collection("users")
      .doc(user.uid)
      .get()
      .then(fsUser => {
        this.setState({ user: { id: fsUser.id, ...fsUser.data() } });
      })
      .then(() => {
        db.collection("users")
          .doc(user.uid)
          .collection("tasks")
          .orderBy("completed")
          .onSnapshot(snapshot => {
            this.setState({
              tasks: snapshot.docs.map(task => {
                return { id: task.id, ...task.data() };
              })
            });
          });
      })
      .then(() => {
        db.collection("users")
          .doc(user.uid)
          .onSnapshot(doc => {
            this.setState({
              user: { id: doc.id, ...doc.data() }
            })
            document.body.style.backgroundColor = this.state.user.darkMode
              ? "#464542"
              : "white";
            document.body.style.color = this.state.user.darkMode
              ? "white"
              : "#464542";
          })
      })

    this.setState({ isLoading: false });
  }

  handleDelete = task => {
    try {
      db.collection("users")
        .doc(this.state.user.id)
        .collection("tasks")
        .doc(task.id)
        .delete()
        .then(() => {
          this.setState({
            snackBarOpen: true,
            snackBarVariant: "success",
            snackBarMessage: "Task deleted!"
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

  toggleChecked = item => {
    try {
      db.collection("users")
        .doc(this.state.user.id)
        .collection("tasks")
        .doc(item.id)
        .update({
          completed: !item.completed
        });
    } catch (error) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "warning",
        snackBarMessage: `Oops... ${error.message}`
      });
    }
  };

  toggleStarred = item => {
    try {
      db.collection("users")
        .doc(this.state.user.id)
        .collection("tasks")
        .doc(item.id)
        .update({
          starred: !item.starred
        });
    } catch (error) {
      this.setState({
        snackBarOpen: true,
        snackBarVariant: "warning",
        snackBarMessage: `Oops... ${error.message}`
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      snackBarOpen: false
    });
  };

  handleChange = (event, value) => {
    this.setState({
      filter: value
    });
  };

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const tasks = this.reorder(
      this.state.tasks,
      result.source.index,
      result.destination.index
    );

    this.setState({
      tasks
    });
  };

  filterTasks = tasks => {
    switch (this.state.filter) {
      case 1:
        return tasks.filter(task => task.completed);
      case 2:
        return tasks.filter(task => !task.completed);
      case 3:
        return tasks.filter(task => task.starred);

      default:
        return tasks;
    }
  };

  handleDarkModeToggle = event => {
    console.log(event.target.value);
    try {
      db.collection("users")
        .doc(this.state.user.id)
        .update({
          darkMode: !this.state.user.darkMode
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
    console.log(this.state.user);
    const { classes } = this.props;
    if (this.state.isLoading) {
      return (
        <Spinner
          name="ball-clip-rotate-multiple"
          color="primary"
          className="center"
        />
      );
    }
    return this.state.tasks.length ? (
      <div>
        <CreateTask />

        <FormControlLabel
          control={
            <Switch
              checked={this.state.user.darkMode}
              onChange={this.handleDarkModeToggle}
              color="primary"
              value={this.state.user.darkMode}
            />
          }
          label="Dark Mode"
        />

        <Tabs
          value={this.state.filter}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="inherit"
          centered
        >
          <Tab label="All" disableRipple />
          <Tab label="Completed" disableRipple />
          <Tab label="Incomplete" disableRipple />
          <Tab label="Starred" disableRipple />
        </Tabs>
        <div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div ref={provided.innerRef}>
                  {this.filterTasks(this.state.tasks).map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task
                            key={item.id}
                            item={item}
                            DataTransferItemList
                            className="list"
                            handleDelete={() => this.handleDelete(item)}
                            toggleChecked={() => this.toggleChecked(item)}
                            toggleStarred={() => this.toggleStarred(item)}
                            user={this.state.user}
                            darkMode={this.state.darkMode}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
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
    ) : (
      <div>
        <CreateTask />
        <Paper elevation={1} className={classes.root}>
          <Typography variant="title" color="inherit">
            You have nothing to complete right now, add some tasks and get
            working!
          </Typography>
        </Paper>
        <Spinner
          name="ball-clip-rotate-multiple"
          color="primary"
          className="center"
        />
      </div>
    );
  }
}

TaskList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withAuth(TaskList));
