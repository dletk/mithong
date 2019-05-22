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

// Create an array of 9 elements corresponding to 9 subjects
const [
    MATH,
    PHYSICS,
    CHEMISTRY,
    ENGLISH,
    LITERATURES,
    BIOLOGY,
    IT,
    HISTORY,
    GEOGRAPHY
] = Array.apply(null, { length: 9 }).map(Number.call, Number);

class Khoi extends React.Component {
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

        const { classes, khoi, onChangeKhoi } = this.props;

        const khoiLabel = "Khối chuyên";

        return (
            <FormControl className={classes.formControl} required>
                <InputLabel htmlFor="controlled-open-select">
                    {khoiLabel}
                </InputLabel>
                <Select
                    open={open}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    value={khoi}
                    onChange={onChangeKhoi}
                    inputProps={{
                        name: "khoi",
                        id: "controlled-open-select"
                    }}
                    startAdornment={
                        <InputAdornment position="start">
                            <School />
                        </InputAdornment>
                    }
                >
                    <MenuItem value={MATH}>
                        <em>Toán</em>
                    </MenuItem>
                    <MenuItem value={PHYSICS}>
                        <em>Lý</em>
                    </MenuItem>
                    <MenuItem value={CHEMISTRY}>
                        <em>Hóa</em>
                    </MenuItem>
                    <MenuItem value={ENGLISH}>
                        <em>Anh</em>
                    </MenuItem>
                    <MenuItem value={LITERATURES}>
                        <em>Văn</em>
                    </MenuItem>
                    <MenuItem value={BIOLOGY}>
                        <em>Sinh</em>
                    </MenuItem>
                    <MenuItem value={IT}>
                        <em>Tin</em>
                    </MenuItem>
                    <MenuItem value={HISTORY}>
                        <em>Sử</em>
                    </MenuItem>
                    <MenuItem value={GEOGRAPHY}>
                        <em>Địa</em>
                    </MenuItem>
                </Select>
            </FormControl>
        );
    }
}

Khoi.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Khoi);
