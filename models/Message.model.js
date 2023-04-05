const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const messageSchema = new Schema(
  {
    sender: {type : Schema.Types.ObjectId,ref:'User' },
    content: {
      type: String, 
      required: [true, "Message can't be empty."],
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