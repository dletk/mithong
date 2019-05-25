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
        typeOfPassword: "password",
        typeOfRetypePassword: "password"
    };

    visiblePassword = event => {
        event.preventDefault();
        event.stopPropagation();

        this.setState({
            typeOfPassword:
                this.state.typeOfPassword === "text" ? "password" : "text"
        });
    };

    visibleRetypePassword = event => {
        event.preventDefault();
        event.stopPropagation();

        this.setState({
            typeOfRetypePassword:
                this.state.typeOfRetypePassword === "text" ? "password" : "text"
        });
    };

    render() {
        const { classes, account, onChangeForm, errors } = this.props;

        const { username, password, retypePassword } = account;

        const { typeOfPassword, typeOfRetypePassword } = this.state;

        const usernameLabel = "Tên đăng nhập *";
        const passwordLabel = "Mật khẩu *";
        const retypePasswordLabel = "Nhập lại mật khẩu *";

        return (
            <React.Fragment>
                <TextField
                    autoFocus
                    className={classes.margin}
                    margin="dense"
                    label={usernameLabel}
                    type="text"
                    // fullWidth
                    InputProps={{
                        name: "username",
                        id: "username",
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        )
                    }}
                    value={username}
                    onChange={onChangeForm}
                />
                <small>
                    Tên đăng nhập phải có ít nhất 3 kí tự, nhiều nhất 25 kí tự
                    và không chứa dấu cách
                </small>
                {errors.username !== "" && (
                    <span className="error-message" align="center">
                        <br />
                        <em>{errors.username}</em>
                    </span>
                )}
                <div className="group">
                    <TextField
                        className={classes.margin}
                        margin="dense"
                        label={passwordLabel}
                        type={typeOfPassword}
                        // fullWidth
                        InputProps={{
                            name: "password",
                            id: "password",
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            )
                        }}
                        value={password}
                        onChange={onChangeForm}
                    />
                    <span
                        toogle="#password"
                        className="field-icon"
                        onClick={this.visiblePassword}
                    >
                        {typeOfPassword === "text" ? (
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
                {errors.password !== "" && (
                    <span className="error-message" align="center">
                        <br />
                        <em>{errors.password}</em>
                    </span>
                )}
                <div className="group">
                    <TextField
                        className={classes.margin}
                        margin="dense"
                        label={retypePasswordLabel}
                        type={typeOfRetypePassword}
                        // fullWidth
                        InputProps={{
                            name: "retypePassword",
                            id: "retype-password",
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            )
                        }}
                        value={retypePassword}
                        onChange={onChangeForm}
                    />
                    <span
                        toogle="#password"
                        className="field-icon"
                        onClick={this.visibleRetypePassword}
                    >
                        {typeOfRetypePassword === "text" ? (
                            <Visibility />
                        ) : (
                            <VisibilityOff />
                        )}
                    </span>
                </div>
                {errors.retypePassword !== "" && (
                    <span className="error-message" align="center">
                        <em>{errors.retypePassword}</em>
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
