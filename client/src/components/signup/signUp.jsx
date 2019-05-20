import React, { Component } from "react";
import SignUpDialog from "./dialog";

// Get date
const TODAY = new Date();
const DD = String(TODAY.getDate()).padStart(2, "0");
const MM = String(TODAY.getMonth() + 1).padStart(2, "0"); // January is 0!
const YYYY = String(TODAY.getFullYear());
const DEFAULT_BIRTH_DAY = YYYY + "-" + MM + "-" + DD;

const MALE = 0;
const DEFAULT_PHONE_NUMBER = "(+84)   -   -    ";

class SignUp extends Component {
    state = {
        // User's information
        firstName: "",
        lastName: "",
        birthDay: DEFAULT_BIRTH_DAY,
        gender: MALE,
        grade: "",
        phoneNumber: DEFAULT_PHONE_NUMBER,
        email: "",
        address: "",
        username: "",
        password: "",
        retypePassword: "",

        // Validation for sign up form
        firstNameValidated: false,
        lastNameValidated: false,
        gradeValidated: false,
        emailValidated: false,
        usernameValidated: false,
        passwordValidated: false,
        retypePasswordValidated: false
    };

    handleChangeFirstName = event => {
        this.setState({ firstName: event.target.value }, function() {
            const { firstName } = this.state;

            this.setState({
                // First name is required and first character should not be space
                firstNameValidated:
                    firstName.length !== 0 && firstName[0] !== " "
            });
        });
    };

    handleChangeLastName = event => {
        this.setState({ lastName: event.target.value }, function() {
            const { lastName } = this.state;

            this.setState({
                // Last name is required and first character should not be space
                lastNameValidated: lastName.length !== 0 && lastName[0] !== " "
            });
        });
    };

    handleChangeBirthDay = event => {
        this.setState({ birthDay: event.target.value });
    };

    handleChangeGender = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleChangeGrade = event => {
        this.setState({ grade: event.target.value }, function() {
            this.setState({
                gradeValidated: this.state.grade.length !== 0
            });
        });
    };

    handleChangePhoneNumber = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleChangeEmail = event => {
        this.setState({ email: event.target.value }, function() {
            const { email } = this.state;
            const LAST_CHARACTER = email.length - 1;

            // Email address field is required and should have "@"
            let emailValidated =
                /[@]/.test(email) &&
                email.indexOf("@") > 0 &&
                email.indexOf("@") < LAST_CHARACTER;

            // Email should have only 1 character "@"
            emailValidated &= email.split("@").length === 2;

            this.setState({ emailValidated });
        });
    };

    handleChangeAddress = event => {
        this.setState({ address: event.target.value });
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

    handleChangeRetypePassword = event => {
        this.setState({ retypePassword: event.target.value }, function() {
            this.setState({
                retypePasswordValidated:
                    this.state.retypePassword === this.state.password
            });
        });
    };

    // Handle Submit Function
    handleSubmit = () => {
        this.setState({
            // User's information
            firstName: "",
            lastName: "",
            birthDay: DEFAULT_BIRTH_DAY,
            gender: MALE,
            grade: "",
            phoneNumber: DEFAULT_PHONE_NUMBER,
            email: "",
            address: "",
            username: "",
            password: "",
            retypePassword: "",

            // Validation for sign up form
            firstNameValidated: false,
            lastNameValidated: false,
            gradeValidated: false,
            emailValidated: false,
            usernameValidated: false,
            passwordValidated: false,
            retypePasswordValidated: false
        });
    };

    render() {
        const {
            // User's information
            firstName,
            lastName,
            birthDay,
            gender,
            grade,
            phoneNumber,
            email,
            address,
            username,
            password,
            retypePassword,

            // Validation for sign up form
            firstNameValidated,
            lastNameValidated,
            gradeValidated,
            emailValidated,
            usernameValidated,
            passwordValidated,
            retypePasswordValidated
        } = this.state;

        const stepValidated = [
            firstNameValidated && lastNameValidated && gradeValidated, // First step
            emailValidated, // Second step
            usernameValidated && passwordValidated && retypePasswordValidated // Third step
        ];

        return (
            <SignUpDialog
                // User's information
                firstName={firstName}
                lastName={lastName}
                birthDay={birthDay}
                gender={gender}
                grade={grade}
                phoneNumber={phoneNumber}
                email={email}
                address={address}
                username={username}
                password={password}
                retypePassword={retypePassword}
                // Validation for sign up form
                firstNameValidated={firstNameValidated}
                lastNameValidated={lastNameValidated}
                gradeValidated={gradeValidated}
                emailValidated={emailValidated}
                usernameValidated={usernameValidated}
                passwordValidated={passwordValidated}
                retypePasswordValidated={retypePasswordValidated}
                // Validation for each step
                stepValidated={stepValidated}
                // Handle function to validate
                onChangeFirstName={this.handleChangeFirstName}
                onChangeLastName={this.handleChangeLastName}
                onChangeBirthDay={this.handleChangeBirthDay}
                onChangeGender={this.handleChangeGender}
                onChangeGrade={this.handleChangeGrade}
                onChangePhoneNumber={this.handleChangePhoneNumber}
                onChangeEmail={this.handleChangeEmail}
                onChangeAddress={this.handleChangeAddress}
                onChangeUsername={this.handleChangeUsername}
                onChangePassword={this.handleChangePassword}
                onChangeRetypePassword={this.handleChangeRetypePassword}
                // Handle function to submit
                onSubmit={this.handleSubmit}
            />
        );
    }
}

export default SignUp;
