import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

const FormAccount = ({ classes }) => {
  return (
    <React.Fragment>
      <TextField
        autoFocus
        className={classes.margin}
        margin="dense"
        id="username"
        label="Username"
        type="text"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          )
        }}
        required
      />
      <TextField
        className={classes.margin}
        margin="dense"
        id="password"
        label="Password"
        type="password"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          )
        }}
        required
      />
      <TextField
        className={classes.margin}
        margin="dense"
        id="Password"
        label="Retype Password"
        type="password"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          )
        }}
        required
      />
    </React.Fragment>
  );
};

FormAccount.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FormAccount);
