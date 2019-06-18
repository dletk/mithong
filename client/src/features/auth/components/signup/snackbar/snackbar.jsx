import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "./contentWrapper";

const SuccessSnackbar = ({ open, onClose }) => {
    const SUCCESS_MESSAGE = "Đăng ký thành công";

    return (
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
        >
            <SnackbarContentWrapper
                onClose={onClose}
                variant="success"
                message={SUCCESS_MESSAGE}
            />
        </Snackbar>
    );
};

export default SuccessSnackbar;
