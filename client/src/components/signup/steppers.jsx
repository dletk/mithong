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
            // User's information
            firstName,
            lastName,
            gender,
            grade,
            email,
            address,
            username,
            password,
            retypePassword,

            // Validation for sign up form
            gradeValidated,
            emailValidated,
            usernameValidated,
            passwordValidated,
            retypePasswordValidated,

            // Function to validate
            onChangeFirstName,
            onChangeLastName,
            onChangeGender,
            onChangeGrade,
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
                        firstName={firstName}
                        lastName={lastName}
                        gender={gender}
                        grade={grade}
                        gradeValidated={gradeValidated}
                        emailValidated={emailValidated}
                        onChangeFirstName={onChangeFirstName}
                        onChangeLastName={onChangeLastName}
                        onChangeGender={onChangeGender}
                        onChangeGrade={onChangeGrade}
                    />
                );
            case SECOND_STEP:
                return (
                    <FormContact
                        email={email}
                        address={address}
                        onChangeEmail={onChangeEmail}
                        onChangeAddress={onChangeAddress}
                    />
                );
            case THIRD_STEP:
                return (
                    <FormAccount
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
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={onClickNext}
                                            className={classes.button}
                                        >
                                            {activeStep === LAST_STEP
                                                ? "Finish"
                                                : "Next"}
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
                            All steps completed - You can now submit your
                            profile
                        </Typography>
                        <Button
                            onClick={onClickReset}
                            className={classes.button}
                        >
                            Reset
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
