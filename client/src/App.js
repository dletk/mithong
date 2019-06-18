import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrimarySearchAppBar from "./features/appbar/appBar";
// import Authentication from "./features/authentication/authentication";
import Profile from "./features/profile/profile";
import Messenger from "./features/messenger/messenger";
import Home from "./features/home/home";
import Contests from "./features/contests/contests";
import Tutorials from "./features/tutorials/tutorials";
import NotFound from "./features/notfound/notFound";
import SignIn from "./features/auth/components/signin/signIn";
import SignUp from "./features/auth/components/signup/signUp";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <PrimarySearchAppBar />
                {/* <Authentication /> */}
                <div className="content">
                    <Switch>
                        <Route path="/profile" component={Profile} />
                        <Route path="/messenger" component={Messenger} />
                        <Route path="/contests" component={Contests} />
                        <Route path="/tutorials" component={Tutorials} />
                        <Route path="/not-found" component={NotFound} />
                        <Route
                            path="/auth/sign-in"
                            render={props => <SignIn {...props} />}
                        />
                        <Route path="/auth/sign-up" component={SignUp} />
                        <Route path="/" exact component={Home} />
                        <Redirect from="/home" to="/" />
                        <Redirect to="/not-found" />
                    </Switch>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
