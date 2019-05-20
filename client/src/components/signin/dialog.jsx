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
        submitFailed: false
    };

    handleClickOpen = () => {
        this.setState({ open: true, submitFailed: false });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = event => {
        // Prevent reloading page after submitting
        event.preventDefault();

        const { formValidated } = this.props;

        if (formValidated) {
            // Submit and reset all state
            this.props.onSubmit();

            // Close dialog
            this.handleClose();
        } else {
            this.setState({
                submitFailed: true
            });
        }
    };

    render() {
        const {
            classes,
            className,

            // User's account
            username,
            password,

            // Validation for sign in form
            formValidated,

            // Function to validate
            onChangeUsername,
            onChangePassword
        } = this.props;
        const { open, submitFailed } = this.state;

        return (
            <div>
                <Button
                    className={classNames(classes.root, className)}
                    onClick={this.handleClickOpen}
                >
                    Đăng nhập
                </Button>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <form onSubmit={this.handleSubmit}>
                        <DialogTitle id="form-dialog-title">
                            Đăng nhập
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Chào mừng đến trang web của chúng tôi
                                <br />
                                Chúc bạn có trải nghiệm thật tuyệt vời~~
                            </DialogContentText>
                            <Form
                                username={username}
                                password={password}
                                onChangeUsername={onChangeUsername}
                                onChangePassword={onChangePassword}
                            />
                            {!formValidated && submitFailed && (
                                <span style={{ color: "red" }}>
                                    <em>
                                        Tên đăng nhập hoặc mật khẩu không chính
                                        xác!
                                    </em>
                                </span>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Hủy
                            </Button>
                            <Button type="submit" color="primary">
                                Đăng nhập
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
