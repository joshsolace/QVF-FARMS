const { boolean, number } = require("joi");
const mongoose = require ("mongoose");

const produceSchema = mongoose.Schema({
    name:{
        type: String,
    },
    category: {
        type: String,
        enum: ["Fishery", "Poultry", "Crops", "Piggery"]
    },
    price: {
        type: Number,
    },
    stock:{
        type: Number,
    }
},{
    timestamps: true
});
// // Define a virtual property called isAvailable that will be calculated based on the value of stock
// produceSchema.virtual('isAvailable').get(function () {
//     return this.stock > 0;
//   });
  
//   // Define a pre-save hook that will update the availability based on the stock
//   produceSchema.pre('save', function (next) {
//     this.availability = this.stock > 0;
//     next();
//   });


module.exports=mongoose.model("Produce", produceSchema)