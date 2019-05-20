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
        margin: theme.spacing.unit
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
    const {
        classes,

        // Checked if user has clicked next button in this step
        // The error messages only render after the first time
        // click button next
        clickedNext,

        // User's information
        phoneNumber,
        email,
        address,

        // Validation for contact form
        emailValidated,

        // Function to validate
        onChangePhoneNumber,
        onChangeEmail,
        onChangeAddress
    } = props;

    return (
        <React.Fragment>
            <FormControl className={classes.margin}>
                <InputLabel htmlFor="formatted-text-mask-input input-with-icon-adornment">
                    Telephone Number
                </InputLabel>
                <Input
                    value={phoneNumber}
                    onChange={onChangePhoneNumber}
                    inputProps={{
                        name: "phoneNumber",
                        id: "Telephone-number"
                    }}
                    inputComponent={TextMaskCustom}
                    startAdornment={
                        <InputAdornment position="start">
                            <Phone />
                        </InputAdornment>
                    }
                />
            </FormControl>
            <TextField
                className={classes.margin}
                margin="dense"
                id="Email"
                label="Email *"
                type="email"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Email />
                        </InputAdornment>
                    )
                }}
                value={email}
                onChange={onChangeEmail}
            />
            {clickedNext && !emailValidated && (
                <span className="error-message" align="center">
                    <em>Invalid email address</em>
                </span>
            )}
            <TextField
                className={classes.margin}
                margin="dense"
                id="Address"
                label="Address"
                type="text"
                fullWidth
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LocationOn />
                        </InputAdornment>
                    )
                }}
                value={address}
                onChange={onChangeAddress}
            />
        </React.Fragment>
    );
};

FormContact.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormContact);
