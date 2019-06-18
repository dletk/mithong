import React, { Component } from "react";
import Joi from "joi-browser";
import SignInPaper from "./paper";
import { submitSignIn } from "../../api";

const MIN_LENGTH_USERNAME = 3;
const MAX_LENGTH_USERNAME = 25;
const ASCII = /^[!-~]*$/;

class SignIn extends Component {
    state = {
        // User's account
        account: {
            username: "",
            password: ""
        },
        // Error messages
        errors: {}
    };

    schema = {
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
            .regex(/[0-9]/)
    };

    getErrorMessage = error => {
        const { type, context } = error;
        const { label, limit, pattern } = context;

        const newLabel = label === "username" ? "Tên đăng nhập" : "Mật khẩu";

        switch (type) {
            case "any.empty":
                return `${newLabel} không được để trống`;
            case "string.min":
                return `${newLabel} phải chứa ít nhất ${limit} ký tự`;
            case "string.max":
                return `${newLabel} chỉ được chứa không quá ${limit} ký tự`;
            case "string.regex.base":
                if (String(pattern) === String(ASCII))
                    return `${newLabel} chỉ được chứa các ký tự trong bảng mã ASCII và không chứa dấu cách`;
                else
                    return `${newLabel} phải chứa ít nhất một trong các ký tự: ${pattern}`;
            default:
                return "Don't have any error";
        }
    };

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(
            this.state.account,
            this.schema,
            options
        );

        if (!error) return null;

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

    handleChangeForm = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);

        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const account = { ...this.state.account };
        account[input.name] = input.value;
        this.setState({ account, errors });
    };

    handleSubmit = () => {
        // Submit data to database
        submitSignIn();

        //Reset all states
        this.setState({
            account: {
                username: "",
                password: ""
            }
        });
    };

    render() {
        const { account, errors } = this.state;
        const props = { ...this.props };

        return (
            <SignInPaper
                account={account}
                errors={errors}
                validate={this.validate}
                onChangeForm={this.handleChangeForm}
                onSubmit={this.handleSubmit}
                {...props}
            />
        );
    }
}

export default SignIn;
