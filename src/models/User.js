const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new Schema({
  username: String,
  email: String,
  password: String
});

userSchema.pre("save", function (next) {
  var user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

/*
userSchema.methods.encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10);
    bcrypt.hash(password, salt);
}
*/

userSchema.methods.validatePassword = function (password) {
  console.log("Entra" + password + " compara con " + this.password);
  return bcrypt.compare(password, this.password);
  
  
};
module.exports = model("User", userSchema);
