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

        // User's information
        firstName,
        lastName,
        birthDay,
        gender,
        grade,

        // Validation for general form
        // gradeValidated,
        // emailValidated,

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
                label="First Name"
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
                required
            />
            <TextField
                className={classes.margin}
                margin="dense"
                id="Last-name"
                label="Last Name"
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
                required
            />
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
                label="Grade (example: TK14)"
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
                required
            />
        </React.Fragment>
    );
};

FormGeneral.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormGeneral);
