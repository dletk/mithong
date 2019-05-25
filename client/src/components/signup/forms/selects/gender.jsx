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

const [MALE, FEMALE, OTHER] = [0, 1, 2];

class Gender extends React.Component {
    state = {
        open: false
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    render() {
        const { open } = this.state;

        const { classes, gender, onChangeForm } = this.props;

        const genderLabel = "Giới tính";

        return (
            <FormControl className={classes.formControl} required>
                <InputLabel htmlFor="controlled-open-select">
                    {genderLabel}
                </InputLabel>
                <Select
                    open={open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={gender}
                    onChange={onChangeForm}
                    inputProps={{
                        name: "gender",
                        id: "controlled-open-select"
                    }}
                >
                    <MenuItem value={MALE}>
                        <em>Nam</em>
                    </MenuItem>
                    <MenuItem value={FEMALE}>
                        <em>Nữ</em>
                    </MenuItem>
                    <MenuItem value={OTHER}>
                        <em>Khác</em>
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
