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
        open: false,
        username: "",
        password: "",
        usernameValidated: false,
        passwordValidated: false,
        formValidated: false,
        submitFailed: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChangeUsername = event => {
        const [MIN_LENGTH_USERNAME, MAX_LENGTH_USERNAME] = [3, 25];

        this.setState(
            {
                username: event.target.value
            },
            function() {
                const { username } = this.state;

                let usernameValidated =
                    username.length >= MIN_LENGTH_USERNAME &&
                    username.length <= MAX_LENGTH_USERNAME;

                // Username cannot contain spaces
                usernameValidated &= !(username.indexOf(" ") > -1);

                this.setState({ usernameValidated });
            }
        );
    };

    handleChangePassword = event => {
        const MIN_LENGTH_PASSWORD = 8;

        this.setState(
            {
                password: event.target.value
            },
            function() {
                const { password } = this.state;

                let passwordValidated = password.length >= MIN_LENGTH_PASSWORD;

                // Password cannot contain spaces
                passwordValidated &= !(password.indexOf(" ") > -1);

                // Password must contain at least one uppercase letter,
                // one lowercase letter and one number
                passwordValidated &=
                    /[A-Z]/.test(password) &&
                    /[a-z]/.test(password) &&
                    /[0-9]/.test(password);

                this.setState({ passwordValidated });
            }
        );
    };

    handleSubmit = event => {
        event.preventDefault(); // Do not reload page after submit

        this.setState(
            {
                formValidated:
                    this.state.usernameValidated && this.state.passwordValidated
            },
            function() {
                if (this.state.formValidated) {
                    // this.props.Submit();
                    this.setState({
                        open: false,
                        username: "",
                        password: ""
                    });
                } else {
                    this.setState({
                        submitFailed: true
                    });
                }
            }
        );
    };

    render() {
        const { classes, className } = this.props;
        const {
            open,
            username,
            password,
            formValidated,
            submitFailed
        } = this.state;

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
                    <DialogTitle id="form-dialog-title">Sign in</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Welcome to our website!!
                            <br />
                            Hope you have a great experience~~
                        </DialogContentText>
                        <Form
                            username={username}
                            password={password}
                            onChangeUsername={this.handleChangeUsername}
                            onChangePassword={this.handleChangePassword}
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
                        <form onSubmit={this.handleSubmit}>
                            <Button type="submit" color="primary">
                                Sign in
                            </Button>
                        </form>
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
