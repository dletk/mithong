import React, { Component } from "react";
import Joi from "joi-browser";
import SignUpDialog from "./dialog";
import { submitSignUp } from "../../api";

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

const MIN_LENGTH_USERNAME = 3;
const MAX_LENGTH_USERNAME = 25;
const ASCII = /^[!-~]*$/;

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
        },
        // Error messages
        errors: {}
    };

    schema = {
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email({ minDomainAtoms: 2 }),
        // Username is required and must be at least 3 characters long,
        // less than or equal to 255 characters long. And it must
        // contain only ASCII characters
        username: Joi.string()
            .required()
            .min(MIN_LENGTH_USERNAME)
            .max(MAX_LENGTH_USERNAME)
            .regex(ASCII),
        // Password is required and must contain only ASCII characters.
        // It must contain at least one one uppercase letter,
        // one lowercase letter and one number
        password: Joi.string()
            .required()
            .regex(ASCII)
            .regex(/[A-Z]/)
            .regex(/[a-z]/)
            .regex(/[0-9]/),
        retypePassword: Joi.any()
            .valid(Joi.ref("password"))
            .required()
    };

    getLabel = label => {
        switch (label) {
            case "firstname":
                return "Tên";
            case "lastname":
                return "Họ";
            case "email":
                return "Email";
            case "username":
                return "Tên đăng nhập";
            case "password":
                return "Mật khẩu";
            case "retypePassword":
                return "Nhập lại mật khẩu";
            default:
                return "No label";
        }
    };

    getErrorMessage = error => {
        const { type, context } = error;
        const { label, limit, pattern } = context;

        const newLabel = this.getLabel(label);

        switch (type) {
            case "any.empty":
                return `"${newLabel}" không được để trống đâu nhé`;
            case "string.min":
                return `"${newLabel}" phải chứa ít nhất ${limit} ký tự bạn ạ`;
            case "string.max":
                return `"${newLabel}" chỉ được chứa không quá ${limit} ký tự thôi nhé`;
            case "string.email":
                return `Hmm, cái này đâu phải địa chỉ email`;
            case "string.regex.base":
                if (String(pattern) === String(ASCII))
                    return `"${newLabel}" chỉ được chứa các ký tự trong bảng mã ASCII và không chứa dấu cách`;
                else
                    return `"${newLabel}" phải chứa ít nhất một trong các ký tự: ${pattern}`;
            case "any.allowOnly":
                return `Không khớp với mật khẩu được nhập phía trên rồi bạn`;
            default:
                return "Don't have any error";
        }
    };

    getStepFields = step => {
        const [FIRST_STEP, SECOND_STEP, THIRD_STEP] = [0, 1, 2];

        switch (step) {
            case FIRST_STEP:
                return ["firstname", "lastname"];
            case SECOND_STEP:
                return ["email"];
            case THIRD_STEP:
                return ["username", "password", "retypePassword"];
            default:
                return "No field";
        }
    };

    validate = activeStep => {
        // Remove the white spaces at the start and the end of these field's value
        const account = { ...this.state.account };
        account["firstname"] = account["firstname"].trim();
        account["lastname"] = account["lastname"].trim();
        account["address"] = account["address"].trim();
        this.setState({ account });

        // Validate data
        const options = { abortEarly: false };
        const { error } = Joi.validate(account, this.schema, options);

        if (!error) return null;

        const stepFields = this.getStepFields(activeStep);

        const errors = {};
        let preErr = {
            path: ["Null"]
        };
        for (let err of error.details) {
            // Get first error message of each field
            if (err.path[0] === preErr.path[0]) {
                preErr = err;
                continue;
            }

            // Only get errors of current step
            if (!stepFields.includes(err.context.label)) continue;

            errors[err.path[0]] = this.getErrorMessage(err);
            preErr = err;
        }

        this.setState({ errors: errors || {} });

        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };

        const { error } = Joi.validate(obj, schema);

        return error ? this.getErrorMessage(error.details[0]) : null;
    };

    handleChangeForm = event => {
        const { name, value } = event.target;

        const account = { ...this.state.account };
        account[name] = value;

        // If this field is not in schema, don't validate property
        if (!Joi.describe(this.schema).children.hasOwnProperty(name)) {
            this.setState({ account });
            return;
        }

        const errors = { ...this.state.errors };

        const errorMessage = this.validateProperty(event.target);

        if (errorMessage) errors[name] = errorMessage;
        else delete errors[name];

        // If user change field password/retypePassword,
        // delete error message of field retypePassword
        if (["password", "retypePassword"].includes(name))
            delete errors["retypePassword"];

        this.setState({ account, errors });
    };

    // Handle Submit Function
    handleSubmit = () => {
        // Submit data to database
        const {
            username,
            lastname,
            firstname,
            email,
            password,
            // Optional data
            dateOfBirth,
            gender,
            address,
            phoneNumber,
            khoi,
            khoa
        } = this.state.account;

        let newAccount = {
            username: username,
            lastname: lastname,
            firstname: firstname,
            email: email,
            password: password,
            // Optional data
            dateOfBirth: dateOfBirth,
            gender: gender,
            phoneNumber: phoneNumber,
            major: khoi,
            khoa: khoa
        };

        if (address !== "") newAccount.address = address

        submitSignUp(newAccount);

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
        const { account, errors } = this.state;

        return (
            <SignUpDialog
                account={account}
                errors={errors}
                validate={this.validate}
                onChangeForm={this.handleChangeForm}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

export default SignUp;
