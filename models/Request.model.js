const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const requestSchema = new Schema(
  {
    status: {
      type: String,  
    },
    isFullDay: {
      type: Boolean,  
    },
    startDate: {
      type: Date, 
      required:[true, "Start date is required."],
    },
    morningAfternoonStart: {
      type: String, 
      required:[true, "Choice is required."],
    },
    endDate: {
      type: Date,  
    }, 
    morningAfternoonEnd: {
      type: String, 
    },
    requester: {type : Schema.Types.ObjectId,ref:'User' },
    validations: [
        {
        validatorId: {type : Schema.Types.ObjectId,ref:'User' },
        status: String,
    }
    ],
    conversationId: {type : Schema.Types.ObjectId,ref:'Conversation' },
    comments: {
      type: String,  
    },
    approvalLimitDate: {
      type: Date, 
    },
    
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
 

module.exports = model("Request", requestSchema);