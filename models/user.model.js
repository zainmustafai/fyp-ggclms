import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Student from "./student.model.js";
import noSpaceValidator from "./validators/nospaceValidator.js";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    profileImage: {
      filename: { type: String },
      url: { type: String },
      asset_id: { type: String },
      publicId: { type: String },
    },
    coverImage: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "First name is required."],
      maxlength: [20, "First name cannot exceed 20 characters."],
      minlength: [2, "First name should have at least 2 characters."],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required."],
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required."],
    },
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      validate: {
        validator: noSpaceValidator,
        message: "Spaces are not allowed in the username field.",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      validate: {
        validator: function (value) {
          return !/\s/.test(value);
        },
        message: "Spaces are not allowed in the email field.",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    role: {
      type: String,
      enum: ["Student", "Teacher", "Admin"],
      required: [true, "Role is required."],
      default: "Student",
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "role",
    },
    createdAt: { type: Date, default: new Date().toISOString() },
    updatedAt: { type: Date, default: new Date().toISOString() },
    tokens: [
      {
        token: {
          type: String,
          required: true,
          signedAt: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

//**********************************************SCHEMA METHODS************************************************************************************************************* */
// HASHING PASSWORD:
userSchema.pre("save", async function (next) {
  const user = this;
  const normalPassword = user.password;
  console.log("Password is " + normalPassword);
  try {
    // hash the password if it is not already hashed.
    if (user.isModified("password")) {
      console.log("Hashing Password...");
      console.log("GENERATING SALT....");
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(normalPassword, salt);
    }
    next();
  } catch (err) {
    next(err);
  }
});

/*********************************************************************************************************************************************************************************** */

// MAKE SURE DELETE THE USER AS WELL WHEN STUDENT OR TEACHER IS DELETED CORRESPONDINGLY.
userSchema.pre("remove", async function (next) {
  const user = this;

  try {
    // Check if the user's role is 'Student'
    if (user.role === "Student") {
      // Assuming you have a Student model
      const student = await Student.findOne({ user: user._id });
      if (student) {
        // Delete the corresponding student document
        await student.remove();
      }
    } else if (user.role === "Teacher") {
      const teacher = await Teacher.findOne({ user: user._id });
      if (teacher) {
        await teacher.remove();
      }
    }
    next();
  } catch (error) {
    next(error);
  }
  /**
   * The pre function is used to define a pre-remove hook, which will be executed before a user document is removed from the database.
The remove event is triggered when a user document is about to be removed.
Inside the pre-remove hook, you access the current user document using this.
The code checks the role of the user. If the role is "Student", it looks for a corresponding Student document based on the user field. If the role is "Teacher", it looks for a corresponding Teacher document based on the user field.
If a corresponding document is found, it is removed using the remove() method.
Finally, next() is called to continue with the user removal process.
Make sure you have the Student and Teacher models defined and imported correctly in your code.
   */
});

//custom method to generate authToken
// Remember:--generate Token on Login & Sign up.
//
/**
 * Question:-- Why userSchema.methods.myCustomMethod cannot be an arrow function? 
 * Answer:---> The reason that userSchema.methods.myCustomMethod cannot be an arrow function is 
 *                  because arrow functions do not have their own this binding, but instead inherit this from their parent scope.
In the context of Mongoose, this refers to the Mongoose document being operated on, which means that this is the
instance of the User model when you call user.myCustomMethod().

* 
*/
//GENERATE AUTH TOKEN.
userSchema.methods.generateAuthToken = async function () {
  console.log("GENERATING AUTH TOKEN...");
  const user = this; // refers to the user instance.
  const privateKey = process.env.JWT_PRIVATE_KEY;
  const token = jwt.sign(
    { _id: user._id.toString(), role: user.role.toString() },
    privateKey,
    {
      expiresIn: "1d", // Set the token expiration time as per your requirements
    }
  ); //get the private key from the config file -> environment variable
  user.tokens = user.tokens.concat({ token }); // concatinate the new token into user's tokens list/array.
  await user.save(); // save the user.
  return token;
};

/********************** */

userSchema.statics.findUserByCredentials = async (email, password) => {
  console.log("Finding by credentials......");
  const user = await User.findOne({ email });
  if (!user) {
    // in case user is not found.
    throw new Error("Error 404 user not found");
  }
  // compare password with hash
  const isMatch = await bcrypt.compare(password, user.password); // compare the password with the hash.
  if (!isMatch) {
    throw new Error("Error happened! ");
  }
  console.log("User found and Matched");
  return user;
};
/********************************************************/
// Find user by username
userSchema.statics.findByUsername = async function (username) {
  const User = this;
  try {
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    throw new Error("Error finding user by username");
  }
};

/********************************************************* */
// update password
userSchema.methods.updatePassword = async function (newPassword) {
  try {
    this.password = newPassword;
    await this.save();
    return true;
  } catch (error) {
    throw new Error("Error updating password");
  }
};

const User = mongoose.model("User", userSchema);
export default User;
