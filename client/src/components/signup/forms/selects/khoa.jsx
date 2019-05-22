import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import School from "@material-ui/icons/School";
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

// Get current year
const TODAY = new Date();
const YEAR = TODAY.getFullYear();

// NOK - NUMBER_OF_KHOA
const NOK = YEAR - 2001;

// Create an array of NOK elements corresponding to NOK
const khoaArray = Array.apply(null, { length: NOK }).map(Number.call, Number);

class Khoa extends React.Component {
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

        const { classes, khoa, onChangeKhoa } = this.props;

        const khoaLabel = "Khóa";

        return (
            <FormControl className={classes.formControl} required>
                <InputLabel htmlFor="controlled-open-select">
                    {khoaLabel}
                </InputLabel>
                <Select
                    open={open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={khoa}
                    onChange={onChangeKhoa}
                    inputProps={{
                        name: "khoa",
                        id: "controlled-open-select"
                    }}
                    startAdornment={
                        <InputAdornment position="start">
                            <School />
                        </InputAdornment>
                    }
                >
                    {khoaArray.map(khoa => (
                        <MenuItem key={khoa} value={khoa}>
                            <em>Khóa {khoa + 1}</em>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
}

Khoa.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Khoa);
