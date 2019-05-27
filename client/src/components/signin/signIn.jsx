import React, { Component } from "react";
import Joi from "joi-browser";
import SignInDialog from "./dialog";

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
            .regex(ASCII)
            .label("Username"),
        // Password is required and must contain only ASCII characters.
        // It must contain at least one one uppercase letter,
        // one lowercase letter and one number
        password: Joi.string()
            .required()
            .regex(ASCII)
            .regex(/^[a-zA-Z0-9]$/)
            .label("Password")
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
        for (let item of error.details) errors[item.path[0]] = item.message;

        this.setState({ errors: errors || {} });

        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const schema = { [name]: this.schema[name] };
        const { error } = Joi.validate(obj, schema);

        return error ? error.details[0].message : null;
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
        const { account, errors } = this.state;

        return (
            <SignInDialog
                account={account}
                errors={errors}
                validate={this.validate}
                onChangeForm={this.handleChangeForm}
                onSubmit={this.handleSubmit}
            />
        );
    }
}

export default SignIn;
