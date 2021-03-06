import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormSignIn from "./form";

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

        // Get errors
        const errors = this.props.validate();

        // If the form is not validated, it will not summitted
        if (errors) return;

        // Submit data to database and reset all state
        this.props.onSubmit();

        // Close Dialog
        this.handleClose();
    };

    render() {
        const {
            // Styles
            classes,
            className,

            // User's account
            account,
            errors,

            // Function to change value of form
            onChangeForm
        } = this.props;

        const { open } = this.state;

        return (
            <div>
                <Button
                    className={clsx(classes.root, className)}
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
                            <FormSignIn
                                account={account}
                                errors={errors}
                                onChangeForm={onChangeForm}
                            />
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
