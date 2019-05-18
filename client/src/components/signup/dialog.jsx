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

class SignUpDialog extends Component {
    state = {
        open: false,
        steps: ["General", "Contact", "Account"],
        activeStep: 0,
        finished: false
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ activeStep: 0, open: false });
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
