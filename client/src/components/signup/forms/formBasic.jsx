import React, { Component } from "react";
import MaskedInput from "react-text-mask";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import PermIdentity from "@material-ui/icons/PermIdentity";
import School from "@material-ui/icons/School";
import Email from "@material-ui/icons/Email";
import Phone from "@material-ui/icons/Phone";
import LocationOn from "@material-ui/icons/LocationOn";
import CalendarToday from "@material-ui/icons/CalendarToday";

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

class FormBasic extends Component {
  state = {
    textmask: "(+84)   -   -    "
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { textmask } = this.state;

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
        />
        <TextField
          className={classes.margin}
          margin="dense"
          id="Class"
          label="Class (example: TK14)"
          type="text"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <School />
              </InputAdornment>
            )
          }}
          required
        />
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="formatted-text-mask-input input-with-icon-adornment">
            Telephone Number
          </InputLabel>
          <Input
            value={textmask}
            onChange={this.handleChange("textmask")}
            id="Telephone-number"
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
          label="Email Address"
          type="email"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            )
          }}
          required
        />
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
        />
      </React.Fragment>
    );
  }
}

FormBasic.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormBasic);
