import axios from "axios";

const apiEndPointNewAccount = "http://localhost:3000/api/newUser";

export const SubmitSignUp = newAccount => {
    axios.post(apiEndPointNewAccount, newAccount);
};

export const SubmitSignIn = () => {
    console.log("Submitted!!");
};
