import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import StepContent from "@material-ui/core/StepContent";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import FormGeneral from "./forms/formGeneral";
import FormContact from "./forms/formContact";
import FormAccount from "./forms/formAccount";

const styles = theme => ({
    root: {
        width: "90%"
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit
    },
    actionsContainer: {
        marginBottom: theme.spacing.unit * 2
    },
    resetContainer: {
        padding: theme.spacing.unit * 3
    }
});

class Steppers extends Component {
    getStepContent = stepIndex => {
        const {
            // Check if user has clicked the next button in step
            clickedNext,

            // User's information
            firstName,
            lastName,
            birthDay,
            gender,
            khoi,
            khoa,
            phoneNumber,
            email,
            address,
            username,
            password,
            retypePassword,

            // Validation for sign up form
            firstNameValidated,
            lastNameValidated,
            emailValidated,
            usernameValidated,
            passwordValidated,
            retypePasswordValidated,

            // Function to validate
            onChangeFirstName,
            onChangeLastName,
            onChangeBirthDay,
            onChangeGender,
            onChangeKhoi,
            onChangeKhoa,
            onChangePhoneNumber,
            onChangeEmail,
            onChangeAddress,
            onChangeUsername,
            onChangePassword,
            onChangeRetypePassword
        } = this.props;

        const [FIRST_STEP, SECOND_STEP, THIRD_STEP] = [0, 1, 2];

        switch (stepIndex) {
            case FIRST_STEP:
                return (
                    <FormGeneral
                        clickedNext={clickedNext[FIRST_STEP]}
                        firstName={firstName}
                        lastName={lastName}
                        birthDay={birthDay}
                        gender={gender}
                        khoi={khoi}
                        khoa={khoa}
                        firstNameValidated={firstNameValidated}
                        lastNameValidated={lastNameValidated}
                        onChangeFirstName={onChangeFirstName}
                        onChangeLastName={onChangeLastName}
                        onChangeBirthDay={onChangeBirthDay}
                        onChangeGender={onChangeGender}
                        onChangeKhoi={onChangeKhoi}
                        onChangeKhoa={onChangeKhoa}
                    />
                );
            case SECOND_STEP:
                return (
                    <FormContact
                        clickedNext={clickedNext[SECOND_STEP]}
                        phoneNumber={phoneNumber}
                        email={email}
                        address={address}
                        emailValidated={emailValidated}
                        onChangePhoneNumber={onChangePhoneNumber}
                        onChangeEmail={onChangeEmail}
                        onChangeAddress={onChangeAddress}
                    />
                );
            case THIRD_STEP:
                return (
                    <FormAccount
                        clickedNext={clickedNext[THIRD_STEP]}
                        username={username}
                        password={password}
                        retypePassword={retypePassword}
                        usernameValidated={usernameValidated}
                        passwordValidated={passwordValidated}
                        retypePasswordValidated={retypePasswordValidated}
                        onChangeUsername={onChangeUsername}
                        onChangePassword={onChangePassword}
                        onChangeRetypePassword={onChangeRetypePassword}
                    />
                );
            default:
                return "Unknown stepIndex";
        }
    };

    render() {
        const {
            classes,
            steps,
            activeStep,
            onClickNext,
            onClickBack,
            onClickReset
        } = this.props;

        const [FIRST_STEP, LAST_STEP] = [0, steps.length - 1];
        const PAPER_HEIGHT = 1;

        return (
            <div className={classes.root}>
                <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                            <StepContent>
                                {this.getStepContent(index)}
                                <div className={classes.actionsContainer}>
                                    <div>
                                        <Button
                                            disabled={activeStep === FIRST_STEP}
                                            onClick={onClickBack}
                                            className={classes.button}
                                        >
                                            Quay lại
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={onClickNext}
                                            className={classes.button}
                                        >
                                            {activeStep === LAST_STEP
                                                ? "Hoàn tất"
                                                : "Tiếp theo"}
                                        </Button>
                                    </div>
                                </div>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === steps.length && (
                    <Paper
                        square
                        elevation={PAPER_HEIGHT}
                        className={classes.resetContainer}
                    >
                        <Typography>
                            Tất cả các bước đã hoàn tất. Giờ đây bạn có thể gửi
                            đi thông tin và chờ được phê duyệt.
                        </Typography>
                        <Button
                            onClick={onClickReset}
                            className={classes.button}
                        >
                            Quay lại
                        </Button>
                    </Paper>
                )}
            </div>
        );
    }
}

Steppers.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles)(Steppers);
