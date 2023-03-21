const User = require("../models/userModel");
const Produce = require("../models/produceModel");
const Order = require("../models/orderModel")
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

exports.userSignup = async (req, res) => {
  const { firstname, lastname, email, phoneNumber, password } = req.body;
  try {
    // check if User already exists
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Hashing Password
    const salt = await bcrypt.genSalt(10);
    const HashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      firstname,
      lastname,
      phoneNumber,
      email,
      password: HashedPassword,
    });
    user;
    return res.status(201).json({
      message: "User Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const userExistInDB = await User.findOne({ email });
    if (!userExistInDB) {
      return res.status(404).json({
        message: "User does not exist, please sign up",
      });
    }
    // Check if password matches the one in the database
    const isPasswordValid = await bcrypt.compare(
      password,
      userExistInDB.password
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    // tokenize password
    const token = await jwt.sign(
      {
        email: userExistInDB.email,
        id: userExistInDB._id,
        firstname: userExistInDB.firstname,
        lastname: userExistInDB.lastname,
        phoneNumber: userExistInDB.phoneNumber,
        role: userExistInDB.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXP,
      }
    );

    res.cookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 3, // 3 minutes
    });

    return res.status(200).json({
      message: "Login Successful",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.userLogout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logout Successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // exclude password field from the response
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

exports.createProduce = async (req, res) => {
  const { name, category, price, stock } = req.body;
  // Check if the new produce already exists
  try {
    const existingProduce = await Produce.findOne({ name, category, price });

      if (existingProduce) {
        existingProduce.stock += stock;
        await existingProduce.save();
        return res.status(200).json({
          message: "Produce stock updated successfully",
          produce: existingProduce,
        });
        }
    // Create new produce object
    const newProduce = {
      name,
      category,
      price,
      stock,
    };

    // Save the new produce object to the database
    const produce = await Produce.create(newProduce);

    // Send a response back to the client
    return res.status(201).json({ message: "Produce Created Successfully", produce });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
      message: "Internal server error",
    });
  }
};

exports.getcategories = async (req, res) => {
  const { category } = req.params;

  if (
    category === "Piggery" ||
    category === "Fishery" ||
    category === "Crops" ||
    category === "Poultry"
  ) {
    const getcategory = await Produce.find({ category });

    if (getcategory.length === 0) {
      return res
        .status(404)
        .json({ message: "No items found in this category" });
    }

    const categoryItems = [];

    for (let i = 0; i < getcategory.length; i++) {
      categoryItems.push(
        `Item: ${getcategory[i].name}, Price: ${getcategory[i].price}, Stock: ${getcategory[i].stock}`
      );
    }

    return res.status(200).json({
      categoryItems,
    });
  } else {
    return res.status(400).json({
      message: "Invalid category",
    });
  }
};

exports.getProduceByCategory = async (req, res) => {
  try {
    // Fetch all produce from the database
    const produce = await Produce.find();

    // Group produce by category
    const produceByCategory = {};
    produce.forEach((item) => {
      const { category } = item;
      if (!produceByCategory[category]) {
        produceByCategory[category] = [];
      }
      produceByCategory[category].push(item);
    });

    // Send a response back to the client
    return res.status(200).json({ produceByCategory });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Internal server error",
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

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

exports.getFarmDivisions = (req, res) => {
  const farmDivisions = {
    "farm_divisions": [
      {
        "name": "Trainings",
        "description": "QVF Farms offers a range of training programs for farmers, covering topics such as crop cultivation, livestock management, and business planning.",
        "url": "http://localhost:5443/trainings"
      },
      {
        "name": "House Consultation",
        "description": "QVF Farms provides expert consultation services for farmers who need help with issues such as pest control, soil management, and crop planning.",
        "url": "http://localhost:5443/house-consultation"
      },
      {
        "name": "Health Products",
        "description": "QVF Farms produces a variety of health products for livestock, including vaccines, supplements, and medications.",
        "url": "http://localhost:5443/health-products"
      },
      {
        "name": "Feed Analysis and Research",
        "description": "QVF Farms conducts extensive research on livestock feed, and offers a range of testing and analysis services to help farmers optimize their feed programs.",
        "url": "http://localhost:5443/feed-analysis"
      },
      {
        "name": "Livestock Feeds",
        "description": "QVF Farms produces high-quality feed for a variety of livestock, including cattle, poultry, and swine.",
        "url": "http://localhost:5443/livestock-feeds"
      }
    ]
  };

  res.json(farmDivisions);
};

exports.DeleteOrder