import React, { Component } from "react";
import SignInDialog from "./dialog";

class SignIn extends Component {
    state = {
        // User's account
        username: "",
        password: "",

        // Validation for sign in form
        usernameValidated: false,
        passwordValidated: false,
        formValidated: false,
        submitFailed: false
    };

    handleChangeUsername = event => {
        this.setState({ username: event.target.value }, function() {
            const { username } = this.state;
            const [MIN_LENGTH_USERNAME, MAX_LENGTH_USERNAME] = [3, 25];

            let usernameValidated =
                username.length >= MIN_LENGTH_USERNAME &&
                username.length <= MAX_LENGTH_USERNAME;

            // Username should contain only ASCII characters
            const ASCII = /^[!-~]*$/;
            usernameValidated &= ASCII.test(username);

            this.setState({ usernameValidated });
        });
    };

    handleChangePassword = event => {
        this.setState({ password: event.target.value }, function() {
            const { password } = this.state;
            const MIN_LENGTH_PASSWORD = 8;

            let passwordValidated = password.length >= MIN_LENGTH_PASSWORD;

            // Password must contain at least one uppercase letter,
            // one lowercase letter and one number
            passwordValidated &=
                /[A-Z]/.test(password) &&
                /[a-z]/.test(password) &&
                /[0-9]/.test(password);

            // Password should contain only ASCII characters
            const ASCII = /^[!-~]*$/;
            passwordValidated &= ASCII.test(password);

            this.setState({ passwordValidated });
        });
    };

    handleSubmit = event => {
        const { usernameValidated, passwordValidated } = this.state;

        this.setState(
            { formValidated: usernameValidated && passwordValidated },
            function() {
                const { formValidated } = this.state;

                if (formValidated) {
                    // this.props.Submit();
                    this.setState({
                        username: "",
                        password: "",
                        usernameValidated: false,
                        passwordValidated: false
                    });
                } else {
                    this.setState({
                        submitFailed: true
                    });
                }
            }
        );
    };

    render() {
        const { username, password, formValidated, submitFailed } = this.state;

        return (
            <SignInDialog
                // User's account
                username={username}
                password={password}
                // Validation for form sign in
                formValidated={formValidated}
                submitFailed={submitFailed}
                // Handle function to validate
                onChangeUsername={this.handleChangeUsername}
                onChangePassword={this.handleChangePassword}
                // Handle function to submit
                onSubmit={this.handleSubmit}
            />
        );
    }
}

export default SignIn;
