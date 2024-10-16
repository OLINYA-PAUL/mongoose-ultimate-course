const {mongoose, document, Model, model} = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId, // Explicitly define an ObjectId field
    unique: true, // Ensure uniqueness
  },
  name: {
    type: String,
    required: true,
  },
  nikeName: {
    type: String,
    unique: true,
    maxlength: [20, "name should not be less greater than 20 words"],
    minLength: 15,
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
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to hash the password before saving the user
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); // Hash the password
  }
  next(); // Proceed to the next middleware or save operation
});

const SchemeModel = mongoose.model("User", userSchema);
module.exports = SchemeModel;
