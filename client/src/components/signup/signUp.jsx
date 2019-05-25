import React, { Component } from "react";
import SignUpDialog from "./dialog";

// Get date
const TODAY = new Date();
const DD = String(TODAY.getDate()).padStart(2, "0");
const MM = String(TODAY.getMonth() + 1).padStart(2, "0"); // January is 0!
const YYYY = String(TODAY.getFullYear());
const DEFAULT_DATE_OF_BIRTH = YYYY + "-" + MM + "-" + DD;

const DEFAULT_GENDER = 0; // 0 -> Male (Hoang Hai's gender)
const DEFAULT_KHOI = 0; // 0 -> Math (Hoang Hai's khoi)
const DEFAULT_KHOA = 13; // 13 -> Khoa 14 (Hoang Hai's khoa)
const DEFAULT_PHONE_NUMBER = "(+84)   -   -    ";

class SignUp extends Component {
    state = {
        // User's information
        account: {
            firstname: "",
            lastname: "",
            dateOfBirth: DEFAULT_DATE_OF_BIRTH,
            gender: DEFAULT_GENDER,
            khoi: DEFAULT_KHOI,
            khoa: DEFAULT_KHOA,
            phoneNumber: DEFAULT_PHONE_NUMBER,
            email: "",
            address: "",
            username: "",
            password: "",
            retypePassword: ""
        }
    };

    validate = () => {
        const {
            firstname,
            lastname,
            email,
            username,
            password,
            retypePassword
        } = this.state.account;

        const ASCII = /^[!-~]*$/;

        /* ~~~ VALIDATION FOR FIRST NAME ~~~ */
        // First name is required and first character should not be space
        const firstnameValidated =
            firstname.length !== 0 && firstname[0] !== " ";

        // Error message for first name
        const errorFirstname = firstnameValidated ? "" : "Tên không hợp lệ";

        /* ~~~ VALIDATION FOR LAST NAME ~~~ */
        // Last name is required and first character should not be space
        const lastnameValidated = lastname.length !== 0 && lastname[0] !== " ";

        // Error message for last name
        const errorLastname = lastnameValidated ? "" : "Họ không hợp lệ";

        /* ~~~ VALIDATION FOR EMAIL ~~~ */
        const LAST_CHARACTER = email.length - 1;

        // Email address field is required and should have "@"
        let emailValidated =
            /[@]/.test(email) &&
            email.indexOf("@") > 0 &&
            email.indexOf("@") < LAST_CHARACTER;

        // Email should have only 1 character "@"
        emailValidated &= email.split("@").length === 2;

        // Error message for email
        const errorEmail = emailValidated ? "" : "Địa chỉ email không hợp lệ";

        /* ~~~ VALIDATION FOR USERNAME ~~~ */
        const [MIN_LENGTH_USERNAME, MAX_LENGTH_USERNAME] = [3, 25];

        let usernameValidated =
            username.length >= MIN_LENGTH_USERNAME &&
            username.length <= MAX_LENGTH_USERNAME;

        // Username should contain only ASCII characters
        usernameValidated &= ASCII.test(username);

        // Error message for username
        const errorUsername = usernameValidated
            ? ""
            : "Tên đăng nhập không hợp lệ";

        /* ~~~ VALIDATION FOR PASSWORD ~~~ */
        const MIN_LENGTH_PASSWORD = 8;

        let passwordValidated = password.length >= MIN_LENGTH_PASSWORD;

        // Password must contain at least one uppercase letter,
        // one lowercase letter and one number
        passwordValidated &=
            /[A-Z]/.test(password) &&
            /[a-z]/.test(password) &&
            /[0-9]/.test(password);

        // Password should contain only ASCII character
        passwordValidated &= ASCII.test(password);

        // Error message for password
        const errorPassword = passwordValidated ? "" : "Mật khẩu không hợp lệ";

        /* ~~~ VALIDATION FOR RETYPE PASSWORD ~~~ */
        const retypePasswordValidated = retypePassword === password;

        // Error message for retype password
        const errorRetypePassword = retypePasswordValidated
            ? ""
            : "Không khớp với mật khẩu được nhập phía trên";

        /* ~~~ RETURN ERROR MESSAGES ~~~ */
        const errors = {
            firstname: errorFirstname,
            lastname: errorLastname,
            email: errorEmail,
            username: errorUsername,
            password: errorPassword,
            retypePassword: errorRetypePassword
        };

        return errors;
    };

    handleChangeForm = event => {
        const account = { ...this.state.account };
        account[event.target.name] = event.target.value;
        this.setState({ account });
    };

    // Handle Submit Function
    handleSubmit = () => {
        // Submit data to database
        console.log("Submitted!");

        // Reset all state
        this.setState({
            account: {
                firstname: "",
                lastname: "",
                dateOfBirth: DEFAULT_DATE_OF_BIRTH,
                gender: DEFAULT_GENDER,
                khoi: DEFAULT_KHOI,
                khoa: DEFAULT_KHOA,
                phoneNumber: DEFAULT_PHONE_NUMBER,
                email: "",
                address: "",
                username: "",
                password: "",
                retypePassword: ""
            }
        });
    };

    render() {
        return (
            <SignUpDialog
                account={this.state.account}
                validate={this.validate}
                onChangeForm={this.handleChangeForm}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

export default SignUp;
