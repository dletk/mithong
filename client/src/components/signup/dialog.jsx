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
        clickedNext: [false, false, false],
        finished: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ activeStep: FIRST_STEP, open: false });
    };

    handleClickNext = () => {
        // Validation for each step
        const { stepValidated } = this.props;
        const { activeStep } = this.state;

        if (!stepValidated[activeStep]) {
            // After the first click "next" of each step,
            // the error message for each field in the step
            // will render if this field is not valid
            let clickedNext = [...this.state.clickedNext];
            clickedNext[activeStep] = true;
            this.setState({ clickedNext });

            // If at least one required field is not correct,
            // cannot go to next step
            return;
        }

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
        const { open, steps, activeStep, clickedNext, finished } = this.state;

        const {
            classes,
            className,

            // User's information
            firstName,
            lastName,
            birthDay,
            gender,
            grade,
            phoneNumber,
            email,
            address,
            username,
            password,
            retypePassword,

            // Validation for sign up form
            firstNameValidated,
            lastNameValidated,
            gradeValidated,
            emailValidated,
            usernameValidated,
            passwordValidated,
            retypePasswordValidated,

            // Function to validate
            onChangeFirstName,
            onChangeLastName,
            onChangeBirthDay,
            onChangeGender,
            onChangeGrade,
            onChangePhoneNumber,
            onChangeEmail,
            onChangeAddress,
            onChangeUsername,
            onChangePassword,
            onChangeRetypePassword
        } = this.props;

        return (
            <div>
                <Button
                    className={classNames(classes.root, className)}
                    onClick={this.handleClickOpen}
                >
                    Đăng ký
                </Button>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Đăng ký</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Để đăng ký tài khoản, hãy điền thông tin của bạn vào
                            đây
                            <br />
                            Miễn phí và sẽ mãi như vậy!
                            <br />* Thông tin bắt buộc
                        </DialogContentText>
                        <Steppers
                            steps={steps}
                            activeStep={activeStep}
                            clickedNext={clickedNext}
                            onClickNext={this.handleClickNext}
                            onClickBack={this.handleClickBack}
                            onClickReset={this.handleClickReset}
                            // User's information
                            firstName={firstName}
                            lastName={lastName}
                            birthDay={birthDay}
                            gender={gender}
                            grade={grade}
                            phoneNumber={phoneNumber}
                            email={email}
                            address={address}
                            username={username}
                            password={password}
                            retypePassword={retypePassword}
                            // Validation for sign up form
                            firstNameValidated={firstNameValidated}
                            lastNameValidated={lastNameValidated}
                            gradeValidated={gradeValidated}
                            emailValidated={emailValidated}
                            usernameValidated={usernameValidated}
                            passwordValidated={passwordValidated}
                            retypePasswordValidated={retypePasswordValidated}
                            // Handle function to validate
                            onChangeFirstName={onChangeFirstName}
                            onChangeLastName={onChangeLastName}
                            onChangeBirthDay={onChangeBirthDay}
                            onChangeGender={onChangeGender}
                            onChangeGrade={onChangeGrade}
                            onChangePhoneNumber={onChangePhoneNumber}
                            onChangeEmail={onChangeEmail}
                            onChangeAddress={onChangeAddress}
                            onChangeUsername={onChangeUsername}
                            onChangePassword={onChangePassword}
                            onChangeRetypePassword={onChangeRetypePassword}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Hủy
                        </Button>
                        <form onSubmit={this.handleSubmit}>
                            <Button
                                type="submit"
                                color="primary"
                                disabled={!finished}
                            >
                                Gửi đi
                            </Button>
                        </form>
                    </DialogActions>
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
