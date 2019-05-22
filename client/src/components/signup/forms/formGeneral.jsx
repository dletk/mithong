import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import PermIdentity from "@material-ui/icons/PermIdentity";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Gender from "./selects/gender";
import Khoi from "./selects/khoi";
import Khoa from "./selects/khoa";

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
        khoi,
        khoa,

        // Validation for general form
        firstNameValidated,
        lastNameValidated,

        // Function to validate
        onChangeFirstName,
        onChangeLastName,
        onChangeBirthDay,
        onChangeGender,
        onChangeKhoi,
        onChangeKhoa
    } = props;

    const firstNameLabel = "Tên *";
    const lastNameLabel = "Họ *";
    const birthDayLabel = "Ngày sinh";

    return (
        <React.Fragment>
            <TextField
                autoFocus
                className={classes.margin}
                margin="dense"
                id="First-name"
                label={firstNameLabel}
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
                    <em>Họ không hợp lệ</em>
                </span>
            )}
            <TextField
                className={classes.margin}
                margin="dense"
                id="Last-name"
                label={lastNameLabel}
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
                    <em>Tên không hợp lệ</em>
                </span>
            )}
            <TextField
                className={classes.margin}
                margin="dense"
                id="date"
                label={birthDayLabel}
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
            <br />
            <Khoi khoi={khoi} onChangeKhoi={onChangeKhoi} />
            <Khoa khoa={khoa} onChangeKhoa={onChangeKhoa} />
        </React.Fragment>
    );
};

FormGeneral.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormGeneral);
