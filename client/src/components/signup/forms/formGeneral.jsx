import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import PermIdentity from "@material-ui/icons/PermIdentity";
import School from "@material-ui/icons/School";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Gender from "./Selects/gender";

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit
    }
});

const FormGeneral = props => {
    const {
        classes,

        // Checked if user has clicked next button in this step
        // The error messages only render after the first time
        // click button next
        clickedNext,

        // User's information
        firstName,
        lastName,
        birthDay,
        gender,
        grade,

        // Validation for general form
        firstNameValidated,
        lastNameValidated,
        gradeValidated,

        // Function to validate
        onChangeFirstName,
        onChangeLastName,
        onChangeBirthDay,
        onChangeGender,
        onChangeGrade
    } = props;

    return (
        <React.Fragment>
            <TextField
                autoFocus
                className={classes.margin}
                margin="dense"
                id="First-name"
                label="First Name *"
                type="text"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PermIdentity />
                        </InputAdornment>
                    )
                }}
                value={firstName}
                onChange={onChangeFirstName}
            />
            {clickedNext && !firstNameValidated && (
                <span className="error-message" align="center">
                    <em>Invalid first name</em>
                </span>
            )}
            <TextField
                className={classes.margin}
                margin="dense"
                id="Last-name"
                label="Last Name *"
                type="text"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PermIdentity />
                        </InputAdornment>
                    )
                }}
                value={lastName}
                onChange={onChangeLastName}
            />
            {clickedNext && !lastNameValidated && (
                <span className="error-message" align="center">
                    <em>Invalid last name</em>
                </span>
            )}
            <TextField
                className={classes.margin}
                margin="dense"
                id="date"
                label="Day of Birth"
                type="date"
                fullWidth
                InputLabelProps={{
                    shrink: true
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <CalendarToday />
                        </InputAdornment>
                    )
                }}
                value={birthDay}
                onChange={onChangeBirthDay}
            />
            <Gender gender={gender} onChangeGender={onChangeGender} />
            <TextField
                className={classes.margin}
                margin="dense"
                id="Grade"
                label="Grade (example: TK14) *"
                type="text"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <School />
                        </InputAdornment>
                    )
                }}
                value={grade}
                onChange={onChangeGrade}
            />
            {clickedNext && !gradeValidated && (
                <span className="error-message" align="center">
                    <em>Invalid grade</em>
                </span>
            )}
        </React.Fragment>
    );
};

FormGeneral.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormGeneral);
