import React, { Component } from "react";
import SignUpDialog from "./components/signup/dialog";
import SignInDialog from "./components/signin/dialog";

class App extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-2">
                    <SignUpDialog />
                </div>
                <div className="col">
                    <SignInDialog />
                </div>
            </div>
        );
    }
}

export default App;
