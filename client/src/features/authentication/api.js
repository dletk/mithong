import axios from "axios";

const apiEndPointNewAccount = "http://localhost:3000/api/newUser";

export const submitSignUp = newAccount => {
    axios.post(apiEndPointNewAccount, newAccount);
};

export const submitSignIn = () => {
    console.log("Submitted!!");
};