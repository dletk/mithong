import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Steppers from "./steppers";

class FormDialog extends React.Component {
  state = {
    open: false,
    steps: ["Basic Informations", "Account Informations"],
    activeStep: 0,
    finished: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
      finished: this.state.activeStep === this.state.steps.length - 1
    });
  };

  handleClickBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  handleClickReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { open, steps, activeStep, finished } = this.state;

    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
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
              To sign up to this website, please enter your information here.
            </DialogContentText>
            <Steppers
              steps={steps}
              activeStep={activeStep}
              onClickNext={this.handleClickNext}
              onClickBack={this.handleClickBack}
              onClickReset={this.handleClickReset}
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

export default FormDialog;
