const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const conversationSchema = new Schema(
  {
    participants: [{type : Schema.Types.ObjectId,ref:'User' }],
    messages: [{type : Schema.Types.ObjectId,ref:'Message' }], 
   
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
 

module.exports =model("Conversation", conversationSchema);