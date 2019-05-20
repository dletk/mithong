import React, { Component } from "react";
import SignUp from "./components/signup/signUp";
import SignIn from "./components/signin/signIn";

class App extends Component {
    render() {
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
    }
}

export default App;
