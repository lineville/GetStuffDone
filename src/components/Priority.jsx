import React from "react";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  ExpandLessOutlined as IncrementIcon,
  ExpandMoreOutlined as DecrementIcon
} from "@material-ui/icons";

const styles = {
  "input-label": {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "100%",
    color: "red"
  }
};

const Priority = props => {
  const { item } = props;
  return (
    <div style={{ display: "flex"}}>
      <TextField
        label="Priority"
        // id="outlined-margin-dense"
        margin="dense"
        padding="dense"
        variant="standard"
        disabled={true}
        fullWidth={false}
        float="left"
        s
        style={{ width: 50, margin: 10, flex: 1 }}
        value={item.priority}
      />
      <ul style={{ listStyle: "none", float: "right", margin: 0, padding: 5, flex: 1 }}>
        <li>
          <IncrementIcon
            style={{ color: "primary" }}
            onClick={() => props.incrementPriority(item)}
          />
        </li>
        <li>
          <DecrementIcon
            style={{ color: "primary" }}
            onClick={() => props.decrementPriority(item)}
          />
        </li>
      </ul>
    </div>
  );
};

export default withStyles(styles)(Priority);
