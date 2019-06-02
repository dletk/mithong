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
import Steppers from "./steppers";

const styles = {
    root: {
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
    }
};

const STEPS = ["Thông tin chung", "Liên lạc", "Tài khoản"];
const [FIRST_STEP, LAST_STEP] = [0, STEPS.length - 1];

class SignUpDialog extends Component {
    state = {
        open: false,
        steps: STEPS,
        activeStep: FIRST_STEP,
        finished: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ activeStep: FIRST_STEP, open: false });
    };

    handleClickNext = () => {
        const { activeStep } = this.state;

        const errors = this.props.validate(activeStep);

        // If at least one required field is not correct,
        // cannot go to next step
        const stepValidated = [
            // First step
            !errors.firstname && !errors.lastname,
            // Second step
            !errors.email,
            // Third step
            !errors.username && !errors.password && !errors.retypePassword
        ];

        if (!stepValidated[activeStep]) return;

        this.setState({
            activeStep: activeStep + 1,
            finished: activeStep === LAST_STEP
        });
    };

    handleClickBack = () => {
        this.setState({
            activeStep: this.state.activeStep - 1
        });
    };

    handleClickReset = () => {
        this.setState({ activeStep: FIRST_STEP });
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
        const { open, steps, activeStep, finished } = this.state;

        const {
            classes,
            className,
            account,
            errors,
            onChangeForm
        } = this.props;

        return (
            <div>
                <Button
                    className={clsx(classes.root, className)}
                    onClick={this.handleClickOpen}
                >
                    Đăng ký
                </Button>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <form onSubmit={this.handleSubmit}>
                        <DialogTitle id="form-dialog-title">
                            Đăng ký
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Để đăng ký tài khoản, hãy điền thông tin của bạn
                                vào đây
                                <br />
                                Miễn phí và sẽ mãi như vậy!
                                <br />* Thông tin bắt buộc
                            </DialogContentText>
                            <Steppers
                                // Steppers
                                steps={steps}
                                activeStep={activeStep}
                                onClickNext={this.handleClickNext}
                                onClickBack={this.handleClickBack}
                                onClickReset={this.handleClickReset}
                                // Form
                                account={account}
                                onChangeForm={onChangeForm}
                                errors={errors}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Hủy
                            </Button>
                            <Button
                                type="submit"
                                color="primary"
                                disabled={!finished}
                            >
                                Gửi đi
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    }
}

SignUpDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default withStyles(styles)(SignUpDialog);
