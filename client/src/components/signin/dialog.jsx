import React, { Component } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Form from "./form";

const styles = {
  root: {
    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)"
  }
};

class SignInDialog extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, className } = this.props;

    return (
      <div>
        <Button
          className={classNames(classes.root, className)}
          onClick={this.handleClickOpen}
        >
          Sign in
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Sign in</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Welcome to our page!!
              <br />
              Hope you have a great experience~~
            </DialogContentText>
            <Form />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Sign in
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SignInDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default withStyles(styles)(SignInDialog);
