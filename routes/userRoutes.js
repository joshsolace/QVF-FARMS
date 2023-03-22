const express = require ("express");
const { userSignup, userLogin,getUsers, userLogout } = require("../controller/userController");
const {allOrders,createOrder, updateOrder, DeleteOrder}= require("../controller/orderController");
const {createProduce,getFarmDivisions, getcategories, getProduceByCategory}= require("../controller/produceController");
const { isAuthenticated } = require("../middleware/auth");
const roleBasedAccess = require("../middleware/rbac");
const { validateRequest, schemas } = require("../validation/validate");
const router = express.Router();



router.post("/signup", validateRequest(schemas.signupSchema), userSignup);
router.post("/login", validateRequest(schemas.loginSchema), userLogin);
router.get('/getusers',isAuthenticated, roleBasedAccess(["admin"]),getUsers);
router.post('/createproduce',isAuthenticated, roleBasedAccess(["admin"]), validateRequest(schemas.produceSchema),createProduce);
router.get("/categories/:category", isAuthenticated, getcategories);
router.get("/allproducecategory", isAuthenticated, getProduceByCategory);
router.post("/createorder", isAuthenticated,roleBasedAccess(["user"]),validateRequest(schemas.orderSchema), createOrder);
router.put("/updateorder/:id", isAuthenticated,roleBasedAccess(["user"]), updateOrder);
router.delete("/deleteorder/:id", isAuthenticated,DeleteOrder);
router.get("/allorders",isAuthenticated, roleBasedAccess(["admin"]), allOrders)
router.get("/logout", userLogout);
router.get("/farm-divisions",isAuthenticated, getFarmDivisions);



// export routes
module.exports=router