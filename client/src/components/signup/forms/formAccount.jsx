import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";
import "./style.css";

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit
    }
});

const FormAccount = props => {
    const {
        classes,

        // Checked if user has clicked next button in this step
        // The error messages only render after the first time
        // click button next
        clickedNext,

        // User's information
        username,
        password,
        retypePassword,

        // Validation for acount form
        usernameValidated,
        passwordValidated,
        retypePasswordValidated,

        // Function to validate
        onChangeUsername,
        onChangePassword,
        onChangeRetypePassword
    } = props;

    const usernameLabel = "Tên đăng nhập *";
    const passwordLabel = "Mật khẩu *";
    const retypePasswordLabel = "Nhập lại mật khẩu *";

    return (
        <React.Fragment>
            <TextField
                autoFocus
                className={classes.margin}
                margin="dense"
                id="username"
                label={usernameLabel}
                type="text"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    )
                }}
                value={username}
                onChange={onChangeUsername}
            />
            {clickedNext && !usernameValidated && (
                <span className="error-message" align="center">
                    <em>Invalid username. </em>
                </span>
            )}
            <TextField
                className={classes.margin}
                margin="dense"
                id="password"
                label={passwordLabel}
                type="password"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock />
                        </InputAdornment>
                    )
                }}
                value={password}
                onChange={onChangePassword}
            />
            <small>
                Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và một số
            </small>
            {clickedNext && !passwordValidated && (
                <span className="error-message" align="center">
                    <br />
                    <em>Invalid password!</em>
                </span>
            )}
            <TextField
                className={classes.margin}
                margin="dense"
                id="Password"
                label={retypePasswordLabel}
                type="password"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Lock />
                        </InputAdornment>
                    )
                }}
                value={retypePassword}
                onChange={onChangeRetypePassword}
            />
            {clickedNext && !retypePasswordValidated && (
                <span className="error-message" align="center">
                    <em>This is not match to password</em>
                </span>
            )}
        </React.Fragment>
    );
};

FormAccount.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormAccount);
