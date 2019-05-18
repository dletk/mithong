import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 32
    }
});

class Gender extends React.Component {
    state = {
        gender: 0,
        open: false
    };

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    render() {
        const { classes } = this.props;

        return (
            <FormControl className={classes.formControl} required>
                <InputLabel htmlFor="controlled-open-select">Gender</InputLabel>
                <Select
                    open={this.state.open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={this.state.gender}
                    onChange={this.handleChange}
                    inputProps={{
                        name: "gender",
                        id: "controlled-open-select"
                    }}
                >
                    <MenuItem value={0}>
                        <em>Male</em>
                    </MenuItem>
                    <MenuItem value={1}>
                        <em>Female</em>
                    </MenuItem>
                    <MenuItem value={2}>
                        <em>Other</em>
                    </MenuItem>
                </Select>
            </FormControl>
        );
    }
}

Gender.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Gender);
