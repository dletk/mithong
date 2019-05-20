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

    handleSubmit = event => {
        // Prevent reloading page after submitting
        event.preventDefault();

        // Submit and reset all state
        this.props.onSubmit();

        // Close dialog
        this.handleClose();
    };

    render() {
        const {
            classes,
            className,
            // User's account
            username,
            password,
            // Validation for form sign in
            formValidated,
            submitFailed,
            // Function to validate
            onChangeUsername,
            onChangePassword
        } = this.props;
        const { open } = this.state;

        return (
            <div>
                <Button
                    className={classNames(classes.root, className)}
                    onClick={this.handleClickOpen}
                >
                    Sign in
                </Button>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <form onSubmit={this.handleSubmit}>
                        <DialogTitle id="form-dialog-title">
                            Sign in
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Welcome to our website!!
                                <br />
                                Hope you have a great experience~~
                            </DialogContentText>
                            <Form
                                username={username}
                                password={password}
                                onChangeUsername={onChangeUsername}
                                onChangePassword={onChangePassword}
                            />
                            {!formValidated && submitFailed && (
                                <span style={{ color: "red" }}>
                                    <em>Username or password is incorrect!</em>
                                </span>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Sign in
                            </Button>
                        </DialogActions>
                    </form>
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
