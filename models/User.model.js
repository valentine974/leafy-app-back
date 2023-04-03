const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    imageUrl: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    surname: {
      type: String,
      required: [true, "Surname is required."],
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: [true, "Company is required"],
    },
    validators: [{ type: Schema.Types.ObjectId, ref: "User" }],
    vacationCounter1: {
      type: Number,
    },
    vacationCounter2: {
      type: Number,
    },
    position: {
      type: String,
      required: [true, "Position is required."],
    },
    isNewEmployee: {
      type: Boolean,
    },
    contractStartDate: {
      type: Date,
      required: [true, "Employee's Start Date is required."],
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
