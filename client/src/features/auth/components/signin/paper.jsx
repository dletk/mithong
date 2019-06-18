import React, { Component } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import SignInForm from "./form";

const styles = theme => ({
    root: {
        width: 500,
        borderRadius: 25,
        marginTop: 100,
        padding: theme.spacing(3, 2),
        background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)"
    }
});

class SignInPaper extends Component {
    handleSubmit = () => {
        // Get errors
        const errors = this.props.validate();

        // If the form is not validated, it will not summitted
        if (errors) return;

        // Submit data to database and reset all state
        this.props.onSubmit();

        // Return to home page
        this.props.history.push("/home");
    };

    render() {
        const {
            classes,
            className,
            account,
            errors,
            onChangeForm
        } = this.props;

        return (
            <div align="center">
                <Paper
                    square
                    elevation={5}
                    className={clsx(classes.root, className)}
                >
                    <Typography variant="h5" component="h3">
                        Đăng nhập
                    </Typography>
                    <Typography component="p">
                        <em>
                            Chào mừng bạn đến với trang web của chúng tôi
                            <br />
                            Chúc bạn có trải nghiệm thật tuyệt vời~~
                        </em>
                    </Typography>
                    <SignInForm
                        account={account}
                        errors={errors}
                        onChangeForm={onChangeForm}
                    />
                    <div align="right">
                        <Button onClick={this.handleSubmit}>Đăng nhập</Button>
                    </div>
                    <div className="row">
                        <div className="col-7">
                            <Link to="/auth/sign-up">
                                <span style={{ color: "black" }}>
                                    <em>Chưa có tài khoản?</em>
                                </span>
                            </Link>
                        </div>
                        <Link to="auth/forget-password">
                            <span style={{ color: "black" }}>
                                <em>Quên mật khẩu?</em>
                            </span>
                        </Link>
                    </div>
                </Paper>
            </div>
        );
    }
}

SignInPaper.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default withStyles(styles)(SignInPaper);
