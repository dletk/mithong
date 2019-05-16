import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import PermIdentity from "@material-ui/icons/PermIdentity";
import School from "@material-ui/icons/School";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Gender from "./Selects/gender";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

const FormGeneral = ({ classes }) => {
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
      <Gender />
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
    </React.Fragment>
  );
};

FormGeneral.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormGeneral);
