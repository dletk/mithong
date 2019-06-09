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
        margin: theme.spacing(1)
    }
});

const FormGeneral = props => {
    const { classes, account, onChangeForm, errors } = props;

    const { firstname, lastname, dateOfBirth, gender, khoi, khoa } = account;

    const firstnameLabel = "Tên *";
    const lastnameLabel = "Họ *";
    const dateOfBirthLabel = "Ngày sinh";

    return (
        <React.Fragment>
            <div className="form-group">
                <TextField
                    className={classes.margin}
                    margin="dense"
                    label={lastnameLabel}
                    type="text"
                    fullWidth
                    InputProps={{
                        name: "lastname",
                        id: "lastname",
                        startAdornment: (
                            <InputAdornment position="start">
                                <PermIdentity />
                            </InputAdornment>
                        )
                    }}
                    value={lastname}
                    onChange={onChangeForm}
                />
                {errors.lastname && (
                    <div className="alert alert-danger">{errors.lastname}</div>
                )}
            </div>
            <div className="form-group">
                <TextField
                    autoFocus
                    className={classes.margin}
                    margin="dense"
                    label={firstnameLabel}
                    type="text"
                    fullWidth
                    InputProps={{
                        name: "firstname",
                        id: "firstname",
                        startAdornment: (
                            <InputAdornment position="start">
                                <PermIdentity />
                            </InputAdornment>
                        )
                    }}
                    value={firstname}
                    onChange={onChangeForm}
                />
                {errors.firstname && (
                    <div className="alert alert-danger">{errors.firstname}</div>
                )}
            </div>
            <TextField
                className={classes.margin}
                margin="dense"
                label={dateOfBirthLabel}
                type="date"
                fullWidth
                InputLabelProps={{
                    shrink: true
                }}
                InputProps={{
                    name: "dateOfBirth",
                    id: "date",
                    startAdornment: (
                        <InputAdornment position="start">
                            <CalendarToday />
                        </InputAdornment>
                    )
                }}
                value={dateOfBirth}
                onChange={onChangeForm}
            />
            <Gender gender={gender} onChangeForm={onChangeForm} />
            <br />
            <Khoi khoi={khoi} onChangeForm={onChangeForm} />
            <Khoa khoa={khoa} onChangeForm={onChangeForm} />
        </React.Fragment>
    );
};

FormGeneral.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormGeneral);
