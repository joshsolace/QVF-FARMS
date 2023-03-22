const Order = require("../models/orderModel")


exports.createOrder = async (req, res) => {
    try {
      const { name, category, price, quantity } = req.body;
  
      // Find the product in the database and check if it exists
      const product = await Produce.findOne({ name, category });
      if (!product) {
        return res.status(404).json({
          message: "Product not found.",
        });
      }
  
      // Check if the price is correct
      if (price !== product.price) {
        return res.status(400).json({
          message: "Incorrect price",
        });
      }
  
      // Get the user ID from the request object
      const userId = req.user.id;
  
      // Find the user in the database and check if it exists
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
  
      // Check if the user has enough funds for the order
      if (user.balance < 0) {
        return res.status(400).json({
          message: "Insufficient funds",
        });
      }
  
      // Check if there is enough stock for the order
      if (quantity > product.stock) {
        return res.status(400).json({
          message: "Insufficient stock",
        });
      }
  
      // Calculate the total price of the order
      const total = price * quantity;
  
      // Deduct the total price from the user's balance
      user.balance -= total;
      await user.save();
  
      // Create a new order object
      const newOrder = await Order.create({
        name,
        price,
        quantity,
        total,
        userId: user._id // Assign the userId to the currently logged in user's ID
      });
  
      // Deduct the ordered quantity from the product stock
      product.stock -= quantity;
      await product.save();
  
      return res.status(201).json({ message: "Order created successfully", newOrder });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: error.message,
        message: "Internal server error",
      });
    }
  };
  
  exports.updateOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, price, quantity } = req.body;
  
      // Find the order in the database and check if it exists
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }
  
      // Find the product in the database and check if it exists
      const product = await Produce.findOne({ name, category });
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
  
      // Check if the price is correct
      if (price !== product.price) {
        return res.status(400).json({
          message: "Incorrect price",
        });
      }
  
      // Check if there is enough stock
      if (quantity > product.stock) {
        return res.status(400).json({
          message: "Insufficient stock",
        });
      }
  
      // Calculate the total price of the updated order
      const total = price * quantity;
  
      // Update the order object with the new values
      order.name = name;
      order.price = price;
      order.quantity = quantity;
      order.total = total;
  
      // Save the updated order to the database
      const updatedOrder = await order.save();
  
      const quantityDifference = quantity - order.quantity;
    product.stock -= quantityDifference;
  await product.save();
  
  
      return res.status(200).json({
        message: "Order updated successfully",
        updatedOrder,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: error.message,
        message: "Internal server error",
      });
    }
  };
  
  exports.DeleteOrder = async (req, res) => {
    try {
      const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }
      const deletedOrder = await Order.findByIdAndDelete(id);
      if (!deletedOrder) {
        return res.status(404).json({
          message: "Order not found",
        });
      }
      return res.status(200).json({
        message: "Order deleted succesfully",
        deletedOrder,
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
  };
  
  exports.allOrders = async (req, res) =>{
    try {
      const allorders = await Order.find()
      return res.status(200).json({
        allorders
      })
    } catch (error) {
            return res.status(500).json({
              error: error.message,
          });
    }
  }
  