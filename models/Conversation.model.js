const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const conversationSchema = new Schema(
  {
    participants: {
      type: [{type:Schema.Types.ObjectId,ref:'User'}],
      validate: [({ length }) => length > 1, "Conversation must have at least two participants"]
    },
    messages: [{type : Schema.Types.ObjectId,ref:'Message' }], 
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
 

module.exports =model("Conversation", conversationSchema);