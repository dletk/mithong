import React from "react";
import zxcvbn from "zxcvbn";
import "./style.css";

const createPasswordLabel = result => {
    switch (result.score) {
        case 0:
            return "Quá yếu";
        case 1:
            return "Yếu";
        case 2:
            return "Vừa";
        case 3:
            return "Mạnh";
        case 4:
            return "Rất mạnh";
        default:
            return "Quá yếu";
    }
};

const getPasswordStyle = result => {
    switch (result.score) {
        case 0:
            return "Weak";
        case 1:
            return "Weak";
        case 2:
            return "Fair";
        case 3:
            return "Good";
        case 4:
            return "Strong";
        default:
            return "Weak";
    }
};

const PasswordStrengthMeter = ({ password }) => {
    const testedResult = zxcvbn(password);

    return (
        <div className="password-strength-meter">
            <progress
                className={`password-strength-meter-progress strength-${getPasswordStyle(
                    testedResult
                )}`}
                value={testedResult.score}
                max="4"
            />
            <br />
            <label className="password-strength-meter-label">
                {password && (
                    <>
                        <strong>Password strength:</strong>{" "}
                        {createPasswordLabel(testedResult)}
                    </>
                )}
            </label>
        </div>
    );
};

export default PasswordStrengthMeter;
