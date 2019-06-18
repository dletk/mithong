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
        margin: theme.spacing(1)
    }
});

class SignInForm extends Component {
    state = {
        type: "password"
    };

    visiblePassword = event => {
        event.preventDefault();
        event.stopPropagation();

        this.setState({
            type: this.state.type === "text" ? "password" : "text"
        });
    };

    render() {
        const { classes, account, errors, onChangeForm } = this.props;

        const { type } = this.state;

        const { username, password } = account;

        const usernameLabel = "Tên đăng nhập";
        const passwordLabel = "Mật khẩu";

        return (
            <React.Fragment>
                <div className="form-group">
                    <TextField
                        autoFocus
                        className={classes.margin}
                        margin="dense"
                        label={usernameLabel}
                        type="text"
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
                    {errors.username && (
                        <div className="alert alert-danger">
                            {errors.username}
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <TextField
                        className={classes.margin}
                        margin="dense"
                        label={passwordLabel}
                        type={type}
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
                        {type === "text" ? <Visibility /> : <VisibilityOff />}
                    </span>
                    {errors.password && (
                        <div className="alert alert-danger">
                            {errors.password}
                        </div>
                    )}
                </div>
            </React.Fragment>
        );
    }
}

SignInForm.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignInForm);
