const mongoose = require('mongoose');

exports.orderSchema = new mongoose.Schema({
userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
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
quantity:{
    type: Number,
},
total:{
    type: Number,
},
});



module.exports = mongoose.model("Order", exports.orderSchema);
