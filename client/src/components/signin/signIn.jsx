import React, { Component } from "react";
import SignInDialog from "./dialog";

class SignIn extends Component {
    state = {
        // User's account
        account: {
            username: "",
            password: ""
        }
    };

    validate = () => {
        const { account } = this.state;
        const { username, password } = account;

        const ASCII = /^[!-~]*$/;

        /* ~~~ VALIDATION FOR USER NAME ~~~ */
        const [MIN_LENGTH_USERNAME, MAX_LENGTH_USERNAME] = [3, 25];

        let usernameValidated =
            username.length >= MIN_LENGTH_USERNAME &&
            username.length <= MAX_LENGTH_USERNAME;

        // Username should contain only ASCII characters
        usernameValidated &= ASCII.test(username);

        /* ~~~ VALIDATION FOR PASSWORD ~~~ */
        const MIN_LENGTH_PASSWORD = 8;

        let passwordValidated = password.length >= MIN_LENGTH_PASSWORD;

        // Password must contain at least one uppercase letter,
        // one lowercase letter and one number
        passwordValidated &=
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password);

        // Password should contain only ASCII characters
        passwordValidated &= ASCII.test(password);

        /* ~~~ RETURN ERROR MESSAGES FOR FORM SIGN IN ~~~ */
        return usernameValidated && passwordValidated
            ? ""
            : "Tên đăng nhập hoặc mật khẩu không chính xác!";
    };

    handleChangeForm = ({ currentTarget: input }) => {
        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account });
    };

    handleSubmit = () => {
        // Submit data to database
        console.log("Submitted!");

        //Reset all states
        this.setState({
            account: {
                username: "",
                password: ""
            }
        });
    };

    render() {
        const { account } = this.state;
        const { username, password } = account;

        return (
            <SignInDialog
                username={username}
                password={password}
                validate={this.validate}
                onChangeForm={this.handleChangeForm}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

export default SignIn;
