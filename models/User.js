// Load helper modules
const debug_model_user = require("debug")("model:user");
const jwt = require("jsonwebtoken");
const config = require("config");

// User model
const MAJORS_LIST = ["toan", "ly", "hoa", "anh", "van", "sinh", "tin",  "su", "dia"];
const GENDERS_LIST = ["male", "female", "other"];


// constants
const PASSWORD_SALT_LENGTH = 32;
const PBKDF2_KEYLEN = 512;
const PBKDF2_ITERATIONS = 10000;
const PBKDF2_DIGEST = 'sha512';

const JWT_SECRET_KEY = String(config.get("jwt_secret_key"));

// Load mongoose 
const mongoose = require("mongoose");
const crypto = require("crypto");

// dletk realized his mistake and told me to fix like this
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3, // Make sure the username is long enough to be descriptive
        maxlength: 25
    },
    lastname: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        require: true,
        enum: {
            values: GENDERS_LIST,
            message: "Gender value not in allowed list"
        }
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: Date,
    phoneNumber: String,
    address: String,
    // Reference: https://stackoverflow.com/questions/29780733/store-an-image-in-mongodb-using-node-js-express-and-mongoose
    profilePic: {
        data: Buffer,
        contentType: String
    },
    // NBK related information
    major: {
        type: String,
        enum: {
            values: MAJORS_LIST,
            message: "Major value not in allowed list"
        }
    },
    khoa: {
        type: Number,
        min: [1, "Khoa 1 is the oldest"]
    },
    joinedDate: {
        type: Date,
        default: Date.now
    },
    // This is for password
    hash: String,
    salt: String,
    // Administration option
    isAdmin: {
        type: Boolean,
        default: false
    },
    // Status option
    isOnline: Boolean,
});

// for debugging
userSchema.methods.foo = function () {
    console.log("qwerty");
}

// set user password
// this function doesn't need to return any value, so I use the asynchronous version of the pbkdf2 to increase its execution speed
userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(PASSWORD_SALT_LENGTH).toString('hex');
    // pbkdf2 = Password-Based Key Derivation Function 2
    // This method generate the hash based on the password provided
    // Using the asynchronous version making it difficult to save the instance to database (because this mthod only use callback)
    this.hash = crypto.pbkdf2Sync(password, this.salt, PBKDF2_ITERATIONS, PBKDF2_KEYLEN, PBKDF2_DIGEST).toString("hex");
    debug_model_user('===> Derived hash value:\n' + this.hash);
};


// ======================== MODEL INSTANCE METHODS ================================
// user password validation
// this function need to return a boolean value
userSchema.methods.validatePassword = function (password) {
    correctHash = this.hash;
    givenHash = crypto.pbkdf2Sync(password, this.salt, PBKDF2_ITERATIONS, PBKDF2_KEYLEN, PBKDF2_DIGEST).toString('hex');
    debug_model_user("Given hash:\n" + givenHash);
    debug_model_user("Correct hash:\n" + correctHash);
    return (givenHash == correctHash);
};

// Method to generate the signature for JWT for this user to do authentication
userSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date();
    // The expiration date of this JWT is 30 days from today
    expirationDate.setDate(today.getDate() + 30);

    // Sign the JWT using our secret key 
    return jwt.sign({
        username: this.username,
        id: this._id,
        // getTime is in milliseconds, so we convert it into seconds
        exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, JWT_SECRET_KEY);
}

// Method to generate the JWT for the current user
userSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        id: this._id,
        // The signature
        token: this.generateJWT()
    }
}


// ========================= MODEL STATIC METHODS =================================

/**
 * user password validation
 *  This is a model static method
 * 
 * user: the first user matched the username query
 * inputPassword: the password provided from request
 * validationHandler: callback function to handle the validation result, should take in an boolean value
 */
userSchema.statics.validatePassword = function (user, inputPassword, validationHandler) {
    correctHash = user.hash;
    userSalt = user.salt

    console.log(user);


    // pbkdf2Sync = synchronous Password-Based Key Derivation Function 2
    // crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)

    crypto.pbkdf2(inputPassword, userSalt, PBKDF2_ITERATIONS, PBKDF2_KEYLEN, PBKDF2_DIGEST,
        (err, derivedKey) => {
            if (err) return err;
            // Compare the given hash to the true value
            if (process.env.DEBUG == "model:user") {
                validationHandler(correctHash, derivedKey.toString("hex"));
            } else {
                validationHandler(correctHash == derivedKey.toString("hex"));
            }
        });
};

mongoose.model("User", userSchema);


// EXPORT
module.exports.MAJORS_LIST = MAJORS_LIST;
module.exports.GENDERS_LIST = GENDERS_LIST;