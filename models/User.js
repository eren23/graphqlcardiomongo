const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // When we create a user we dont have a profile right away so we are adding this avatar part here to have at least have our avatar after registration
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("user", UserSchema);
// We are exporting 2 things under User first thing is the model name which is user and the UserSchema the thigns we created above
