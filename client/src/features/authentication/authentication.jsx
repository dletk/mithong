import React from "react";
import SignIn from "./components/signin/signIn";
import SignUp from "./components/signup/signUp";

const Authentication = () => {
    return (
        <div className="row">
            <div className="col-2">
                <SignUp />
            </div>
            <div className="col">
                <SignIn />
            </div>
        </div>
    );
};

export default Authentication;
