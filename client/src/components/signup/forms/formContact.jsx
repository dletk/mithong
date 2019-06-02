import React from "react";
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import LocationOn from "@material-ui/icons/LocationOn";
import "./style.css";

const styles = theme => ({
    margin: {
        margin: theme.spacing(1)
    }
});

const TextMaskCustom = ({ inputRef, ...other }) => {
    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={[
                "(",
                "+",
                /\d/,
                /\d/,
                ")",
                " ",
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                "-",
                /\d/,
                /\d/,
                /\d/,
                /\d/
            ]}
            placeholderChar={"\u2000"}
            showMask
        />
    );
};

TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired
};

const FormContact = props => {
    const { classes, account, onChangeForm, errors } = props;

    const { phoneNumber, email, address } = account;

    const phoneNumberLabel = "Số điện thoại";
    const emailLabel = "Email *";
    const addressLabel = "Địa chỉ hiện tại";

    return (
        <React.Fragment>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor="formatted-text-mask-input">
                    {phoneNumberLabel}
                </InputLabel>
                <Input
                    value={phoneNumber}
                    onChange={onChangeForm}
                    inputProps={{
                        name: "phoneNumber",
                        id: "phone-number"
                    }}
                    inputComponent={TextMaskCustom}
                    startAdornment={
                        <InputAdornment position="start">
                            <Phone />
                        </InputAdornment>
                    }
                />
            </FormControl>
            <div className="form-group">
                <TextField
                    className={classes.margin}
                    margin="dense"
                    label={emailLabel}
                    type="email"
                    fullWidth
                    InputProps={{
                        name: "email",
                        id: "email",
                        startAdornment: (
                            <InputAdornment position="start">
                                <Email />
                            </InputAdornment>
                        )
                    }}
                    value={email}
                    onChange={onChangeForm}
                />
                {errors.email && (
                    <div className="alert alert-danger">{errors.email}</div>
                )}
            </div>
            <TextField
                className={classes.margin}
                margin="dense"
                label={addressLabel}
                type="text"
                fullWidth
                InputProps={{
                    name: "address",
                    id: "address",
                    startAdornment: (
                        <InputAdornment position="start">
                            <LocationOn />
                        </InputAdornment>
                    )
                }}
                value={address}
                onChange={onChangeForm}
            />
        </React.Fragment>
    );
};

FormContact.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormContact);
