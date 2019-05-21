import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import "./style.css";

const styles = theme => ({
    margin: {
        margin: theme.spacing.unit
    }
});

class FormAccount extends Component {
    state = {
        typePassword: "password",
        typeRetypePassword: "password"
    };

    visiblePassword = event => {
        event.preventDefault();
        event.stopPropagation();

        this.setState({
            typePassword:
                this.state.typePassword === "text" ? "password" : "text"
        });
    };

    visibleRetypePassword = event => {
        event.preventDefault();
        event.stopPropagation();

        this.setState({
            typeRetypePassword:
                this.state.typeRetypePassword === "text" ? "password" : "text"
        });
    };

    render() {
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
        } = this.props;

        const { typePassword, typeRetypePassword } = this.state;

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
                    // fullWidth
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
                <small>
                    Tên đăng nhập phải có ít nhất 3 kí tự, nhiều nhất 25 kí tự
                    và không chứa dấu cách
                </small>
                {clickedNext && !usernameValidated && (
                    <span className="error-message" align="center">
                        <br />
                        <em>Tên đăng nhập không hợp lệ</em>
                    </span>
                )}
                <div className="group">
                    <TextField
                        className={classes.margin}
                        margin="dense"
                        id="password"
                        label={passwordLabel}
                        type={typePassword}
                        // fullWidth
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
                    <span
                        toogle="#password"
                        className="field-icon"
                        onClick={this.visiblePassword}
                    >
                        {typePassword === "text" ? (
                            <Visibility />
                        ) : (
                            <VisibilityOff />
                        )}
                    </span>
                </div>
                <small>
                    Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường và
                    một số
                </small>
                {clickedNext && !passwordValidated && (
                    <span className="error-message" align="center">
                        <br />
                        <em>Mật khẩu không hợp lệ</em>
                    </span>
                )}
                <div className="group">
                    <TextField
                        className={classes.margin}
                        margin="dense"
                        id="retype-password"
                        label={retypePasswordLabel}
                        type={typeRetypePassword}
                        // fullWidth
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
                    <span
                        toogle="#password"
                        className="field-icon"
                        onClick={this.visibleRetypePassword}
                    >
                        {typeRetypePassword === "text" ? (
                            <Visibility />
                        ) : (
                            <VisibilityOff />
                        )}
                    </span>
                </div>
                {clickedNext && !retypePasswordValidated && (
                    <span className="error-message" align="center">
                        <em>Không khớp với mật khẩu được nhập phía trên!</em>
                    </span>
                )}
            </React.Fragment>
        );
    }
}

FormAccount.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormAccount);
