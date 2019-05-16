import React from "react";
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

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <FormGeneral />;
    case 1:
      return <FormContact />;
    case 2:
      return <FormAccount />;
    default:
      return "Unknown stepIndex";
  }
}

const Steppers = props => {
  const {
    classes,
    steps,
    activeStep,
    onClickNext,
    onClickBack,
    onClickReset
  } = props;

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
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
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={onClickReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
};

Steppers.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(Steppers);
