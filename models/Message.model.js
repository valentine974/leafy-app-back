const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const messageSchema = new Schema(
  {
    author: {type : Schema.Types.ObjectId,ref:'User' },
    message: {
      type: String, 
      required: [true, "Message is required."],
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    attachment: {
      type: String, 
    }, 
   
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
 

module.exports =model("Message", messageSchema);