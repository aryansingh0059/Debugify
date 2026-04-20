import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * User Schema definition for Debugify.
 * Includes profile details as per the UI template.
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please add a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false, // Don't return password by default
  },
  mobile: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    default: "USA",
  },
  avatar: {
    type: String,
    default: "https://api.dicebear.com/7.x/avataaars/svg?seed=Debugify",
  },
  plan: {
    type: String,
    enum: ["Free", "Pro", "Enterprise"],
    default: "Free",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password using bcrypt before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare user entered password with hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", UserSchema);
