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
        margin: theme.spacing(1),
        minWidth: 120
    },
    icon: {
        margin: theme.spacing(1),
        fontSize: 32
    }
});

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

        const { classes, khoi, onChangeForm } = this.props;

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
                    onChange={onChangeForm}
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
                    <MenuItem value={"toan"}>
                        <em>Toán</em>
                    </MenuItem>
                    <MenuItem value={"ly"}>
                        <em>Lý</em>
                    </MenuItem>
                    <MenuItem value={"hoa"}>
                        <em>Hóa</em>
                    </MenuItem>
                    <MenuItem value={"anh"}>
                        <em>Anh</em>
                    </MenuItem>
                    <MenuItem value={"van"}>
                        <em>Văn</em>
                    </MenuItem>
                    <MenuItem value={"sinh"}>
                        <em>Sinh</em>
                    </MenuItem>
                    <MenuItem value={"tin"}>
                        <em>Tin</em>
                    </MenuItem>
                    <MenuItem value={"su"}>
                        <em>Sử</em>
                    </MenuItem>
                    <MenuItem value={"dia"}>
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
