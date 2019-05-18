// User model

// constants
const PASSWORD_SALT_LENGTH = 32;
const PBKDF2_KEYLEN = 512;
const PBKDF2_ITERATIONS = 10000;
const PBKDF2_DIGEST = 'sha512';

// Load mongoose 
const mongoose = require("mongoose");
const crypto = require("crypto");

// dletk realized his mistake and told me to fix like this
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true,
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
    email: { 
        type: String, 
        required: true 
    },
    dateOfBirth: Date,
    // Reference: https://stackoverflow.com/questions/29780733/store-an-image-in-mongodb-using-node-js-express-and-mongoose
    profilePic: { 
        data: Buffer, 
        contentType: String
    },
    joinedDate: { 
        type: String, 
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
userSchema.methods.foo = function(){
    console.log("qwerty");
}

// set user password
// this function doesn't need to return any value, so I use the asynchronous version of the pbkdf2 to increase its execution speed
userSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(PASSWORD_SALT_LENGTH).toString('hex');
    // pbkdf2 = Password-Based Key Derivation Function 2
    // crypto.pbkdf2(password, salt, iterations, keylen, digest, callback)
    crypto.pbkdf2(password, this.salt, PBKDF2_ITERATIONS, PBKDF2_KEYLEN, PBKDF2_DIGEST, (err, derivedKey) => {
        if(err) throw err;
        // derivedKey is in Buffer form
        // toString('hex'): convert derivedKey to hex
        this.hash = derivedKey.toString('hex');
        console.log('derived hash value: '+this.hash);
    });
};

// user password validation
// this function need to return a boolean value, hence:
// I use the synchronous version of the pbkdf2 because I don't know how to deal with the async one
userSchema.methods.validatePassword = function (password, isFinished){
    correctHash = this.hash;
    // pbkdf2Sync = synchronous Password-Based Key Derivation Function 2
    // crypto.pbkdf2Sync(password, salt, iterations, keylen, digest)    
    givenHash = crypto.pbkdf2Sync(password, this.salt, PBKDF2_ITERATIONS, PBKDF2_KEYLEN, PBKDF2_DIGEST).toString('hex');
    console.log("Given hash: "+givenHash);
    return (givenHash == correctHash);
};

mongoose.model("User", userSchema);

