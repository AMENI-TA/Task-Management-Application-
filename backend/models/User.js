


/*const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;  */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: { type: mongoose.Types.ObjectId, ref: "tasks"}
 
});

// Hachage du mot de passe avant l'enregistrement
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Comparaison du mot de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//const User = mongoose.model('User', userSchema);

//module.exports = User;
module.exports = mongoose.model("User", userSchema);



