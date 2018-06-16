const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

let emailLengthChecker = (email) => {
  if(!email) {
    return false;
  } else {
    if(email.length < 5 || email.length >30) {
      return false;
    } else {
      return true;
    }
  }
};

let validEmailChecker = (email) => {
  if(!email) {
    return false;
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/);
    return regExp.test(email);
  }
};

const emailValidators = [{
  validator: emailLengthChecker,
  message: 'E-mail must be atleast 5 character but not more then 30'
}, {
  validator: validEmailChecker,
  message: 'Must be a valid E-mail'
}];

let usernameLengthChecker = (username) => {
  if(!username) {
    return false;
  } else {
    if(username.length < 3 || username.length > 15) {
      return false;
    } else {
      return true;
    }
  }
};

let validUsernameChecker = (username) => {
  if(!username) {
    return false;
  } else {
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    return regExp.test(username);
  }
};

const usernameValidators = [{
  validator: usernameLengthChecker,
  message: 'Username must be atleast 3 character but not more then 15'
}, {
  validator: validUsernameChecker,
  message: 'Username must not have special characters or spaces'
}];

let passwordLengthChecker = (password) => {
  if(!password) {
    return false;
  } else {
    if(password.length < 3 || password.length > 16) {
      return false;
    } else {
      return true;
    }
  }
};

let validPasswordChecker = (password) => {
  if(!password) {
    return false;
  } else {
    const regExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{4,16}/);
    return regExp.test(password);
  }
};

const passwordValidators = [{
  validator: passwordLengthChecker,
  message: 'Password must be atleast 4 character but not more then 16'
}, {
  validator: validPasswordChecker,
  message: 'Password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters'
}];

const userSchema = new Schema({
  email: { type: String, required: true, unique:true, lowercase:true, validate: emailValidators },
  username: { type: String, required: true, unique:true, lowercase:true, validate: usernameValidators },
  password: { type: String, required: true, validate: passwordValidators }
});

userSchema.pre('save', function(next) {
  if(!this.isModified('password')) {
    return next();
  } else {
    bcrypt.hash(this.password, null, null, (err, hash) => {
      if(err) {
        return next(err);
      } else {
        this.password = hash;
        next();
      }
    })
  }
})

userSchema.methods.comparePassword = (password) => {
  bcrypt.compareSync(password, this.password); // true
}

module.exports = mongoose.model('User', userSchema);
