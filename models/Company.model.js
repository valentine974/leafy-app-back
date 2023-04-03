const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const companySchema = new Schema(
  {
    name: {
      type: String, 
    },
    address: {
      type: String, 
    },
    siret: {
      type: String, 
      unique:true,
    },
    numberOfVacationDays:{
      type: Number
    },
    imageUrl:{
      type: String
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
 

module.exports = model("Company", companySchema);
