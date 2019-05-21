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

class FormSignIn extends Component {
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
        const {
            classes,
            username,
            password,
            onChangeUsername,
            onChangePassword
        } = this.props;

        const { type } = this.state;

        const usernameLabel = "Tên đăng nhập";
        const passwordLabel = "Mật khẩu";

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
                <div className="group">
                    <TextField
                        className={classes.margin}
                        margin="dense"
                        id="password"
                        label={passwordLabel}
                        type={type}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            )
                        }}
                        fullWidth
                        value={password}
                        onChange={onChangePassword}
                    />
                    <span
                        toogle="#password"
                        className="field-icon"
                        onClick={this.visiblePassword}
                    >
                        {type === "text" ? <Visibility /> : <VisibilityOff />}
                    </span>
                </div>
            </React.Fragment>
        );
    }
}

FormSignIn.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormSignIn);
