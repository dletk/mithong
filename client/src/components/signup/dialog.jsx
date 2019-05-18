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

const STEPS = ["General", "Contact", "Account"];
const [FIRST_STEP, LAST_STEP] = [0, STEPS.length - 1];
const DEFAULT_BIRTH_DAY = "yyyy-MM-dd"; // I don't know why this get warning??
const MALE = 0;
const DEFAULT_PHONE_NUMBER = "(+84)   -   -    ";

class SignUpDialog extends Component {
    state = {
        open: false,
        steps: STEPS,
        activeStep: FIRST_STEP,
        finished: false,

        // User's information
        firstName: "",
        lastName: "",
        birthDay: DEFAULT_BIRTH_DAY,
        gender: MALE,
        grade: "",
        phoneNumber: DEFAULT_PHONE_NUMBER,
        email: "",
        address: "",
        username: "",
        password: "",
        retypePassword: "",

        // Validation for sign up form
        gradeValidated: false,
        emailValidated: false,
        usernameValidated: false,
        passwordValidated: false,
        retypePasswordValidated: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ activeStep: FIRST_STEP, open: false });
    };

    handleClickNext = () => {
        this.setState({
            activeStep: this.state.activeStep + 1,
            finished: this.state.activeStep === LAST_STEP
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

    handleChangeFirstName = event => {
        this.setState({ firstName: event.target.value });
    };

    handleChangeLastName = event => {
        this.setState({ lastName: event.target.value });
    };

    handleChangeBirthDay = event => {
        this.setState({ birthDay: event.target.value });
    };

    handleChangeGender = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleChangeGrade = event => {
        this.setState({ grade: event.target.value });
    };

    handleChangePhoneNumber = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleChangeEmail = event => {
        this.setState({ email: event.target.value });
    };

    handleChangeAddress = event => {
        this.setState({ address: event.target.value });
    };

    hanldeChangeUsername = event => {
        this.setState({ username: event.target.value });
    };

    handleChangePassword = event => {
        this.setState({ password: event.target.value });
    };

    handleChangeRetypePassword = event => {
        this.setState({ retypePassword: event.target.value });
    };

    render() {
        const {
            open,
            steps,
            activeStep,
            finished,

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
            classValidated,
            emailValidated,
            usernameValidated,
            passwordValidated,
            retypePasswordValidated
        } = this.state;

        const { classes, className } = this.props;

        return (
            <div>
                <Button
                    className={classNames(classes.root, className)}
                    onClick={this.handleClickOpen}
                >
                    Sign up
                </Button>
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Sign up</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To sign up to this website, please enter your
                            information here.
                            <br />
                            It's free and always will be.
                        </DialogContentText>
                        <Steppers
                            steps={steps}
                            activeStep={activeStep}
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
                            classValidated={classValidated}
                            emailValidated={emailValidated}
                            usernameValidated={usernameValidated}
                            passwordValidated={passwordValidated}
                            retypePasswordValidated={retypePasswordValidated}
                            // Handle function to validate
                            onChangeFirstName={this.handleChangeFirstName}
                            onChangeLastName={this.handleChangeLastName}
                            onChangeBirthDay={this.handleChangeBirthDay}
                            onChangeGender={this.handleChangeGender}
                            onChangeGrade={this.handleChangeGrade}
                            onChangePhoneNumber={this.handleChangePhoneNumber}
                            onChangeEmail={this.handleChangeEmail}
                            onChangeAddress={this.handleChangeAddress}
                            onChangeUsername={this.hanldeChangeUsername}
                            onChangePassword={this.handleChangePassword}
                            onChangeRetypePassword={
                                this.handleChangeRetypePassword
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleClose}
                            color="primary"
                            disabled={!finished}
                        >
                            Submit
                        </Button>
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
