
const router = require("express").Router()
const userController = require("../controllers/userController")
const postController = require("../controllers/productcontroller")
const featuredController = require("../controllers/featuredController")
const arrivalController = require("../controllers/arrivalController")
const adminController = require("../controllers/adminController")
const cartController = require("../controllers/cartController")
const orderController = require("../controllers/orderController")
const billingController = require("../controllers/billingController")
const {verifiedAccessToken, verifiedAdminToken} = require("./verifyTokens")

// USER ROUTES

// create user
router.post("/user/register", userController.createUser)
// login user
router.post("/user/login", userController.loginUser)
// Update User
router.put("/user/update/:id", verifiedAccessToken, userController.updateUser)
// Delete user
router.delete("/user/delete/:id", verifiedAccessToken, userController.deleteUser)
// Get one User
router.get("/user/get/:id", verifiedAccessToken, userController.getOneUser)
// Get All Users
router.get("/user/all/:id", verifiedAdminToken, userController.getAllUsers)


// ADMIN ROUTES

// create admin
// router.post("/admin/register", adminController.createUser)
// login admin
router.post("/admin/login", adminController.loginUser)
// Update admin
router.put("/admin/update/:id", verifiedAdminToken, adminController.updateUser)
// Delete admin
router.delete("/admin/delete/:id", verifiedAdminToken, adminController.deleteUser)
// Get Dashboard Data
router.get("/admin/dashboard/:id", adminController.adminDashboard)

// PORODUCT ROUTES

// create product
router.post("/product/create/:id", verifiedAdminToken, postController.createProduct)
// get one product
router.get("/product/get/:id", postController.getOneProduct)
// get varieties of products
router.get("/product/get", postController.getProducts)
// GET RECOMMENDATIONS
router.get("/product/recommends", postController.getProducts)
// Update product
router.put("/product/update/:id", postController.updateProduct)
// Delete product
router.delete("/product/delete/:id", verifiedAdminToken, postController.deleteProduct)


// FEATURED ROUTES

// create product
router.post("/featured/create/:id", verifiedAdminToken, featuredController.createProduct)
// get one product
router.get("/featured/get/:id", featuredController.getOneProduct)
// get varieties of products
router.get("/featured/get", featuredController.getProducts)
// Update product
router.put("/featured/update/:id", verifiedAdminToken, featuredController.updateProduct)
// Delete product
router.delete("/featured/delete/:id", verifiedAdminToken, featuredController.deleteProduct)


// NEW ARRIVAL ROUTES

// create product
router.post("/arrival/create/:id", verifiedAdminToken, arrivalController.createProduct)
// get one product
router.get("/arrival/get/:id", arrivalController.getOneProduct)
// get varieties of products
router.get("/arrival/get", arrivalController.getProducts)
// Update product
router.put("/arrival/update/:id", verifiedAdminToken, arrivalController.updateProduct)
// Delete product
router.delete("/arrival/delete/:id", verifiedAdminToken, arrivalController.deleteProduct)


// Create cart
router.post("/cart/create/:id", cartController.createCart)
// Update cart
router.put("/cart/update/:id",  cartController.updateCart)
// delete cart
router.delete("/cart/delete/:id", cartController.deleteCart)
// get user cart
router.get("/cart/user/:id",  cartController.getUsersCart)
// get all carts
router.get("/cart/get/:id",  cartController.getAllCart)


// Create billing
router.post("/billing/create/:id", verifiedAccessToken, billingController.createBilling)
// Update billing
router.put("/billing/update/:id", verifiedAccessToken, billingController.updateBilling)
// get all billing
router.get("/billing/user/all", billingController.getAllBilling)
// get user billing
router.get("/billing/user/:id", billingController.getUsersBilling)

// ORDER ROUTES

// Create order
router.post("/order/create/:id", verifiedAccessToken, orderController.createOrder)
// Update order
router.put("/order/update/:id", verifiedAccessToken, orderController.updateOrder)
// delete order
router.delete("/order/delete/:id", verifiedAdminToken, orderController.deleteOrder)
// get user order
router.get("/order/user/:id", verifiedAccessToken, orderController.getOneOrder)
// get all orders
router.get("/order/get/:id", verifiedAdminToken, orderController.getAllOrder)


module.exports = router