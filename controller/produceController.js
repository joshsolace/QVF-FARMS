const Produce = require("../models/produceModel");

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
  
  
  exports.getFarmDivisions = (req, res) => {
    const farmDivisions = {
      "farm_divisions": [
        {
          "name": "Trainings",
          "description": "QVF Farms offers a range of training programs for farmers, covering topics such as crop cultivation, livestock management, and business planning.",
          "url": "https://qvf-farms.herokuapp.com/api/v1/trainings"
        },
        {
          "name": "House Consultation",
          "description": "QVF Farms provides expert consultation services for farmers who need help with issues such as pest control, soil management, and crop planning.",
          "url": "https://qvf-farms.herokuapp.com/api/v1/house-consultation"
        },
        {
          "name": "Health Products",
          "description": "QVF Farms produces a variety of health products for livestock, including vaccines, supplements, and medications.",
          "url": "https://qvf-farms.herokuapp.com/api/v1/health-products"
        },
        {
          "name": "Feed Analysis and Research",
          "description": "QVF Farms conducts extensive research on livestock feed, and offers a range of testing and analysis services to help farmers optimize their feed programs.",
          "url": "https://qvf-farms.herokuapp.com/api/v1/feed-analysis"
        },
        {
          "name": "Livestock Feeds",
          "description": "QVF Farms produces high-quality feed for a variety of livestock, including cattle, poultry, and swine..",
          "url": "https://qvf-farms.herokuapp.com/api/v1/livestock-feeds"
        }
      ]
    };
  
    res.json(farmDivisions);
  };