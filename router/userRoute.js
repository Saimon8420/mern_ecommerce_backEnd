const { registerVerify, loginVerify } = require("../middlewares/userVerify");

const { registerController, loginController, getUserDataController, updateController } = require("../controller/userController/userController");

const userRouter = require("express").Router();

// login user
userRouter.post("/login", loginVerify, loginController);

// register user
userRouter.post("/register", registerVerify, registerController);

// getUser Data
userRouter.get("/getUser", getUserDataController);

// update UserData
userRouter.put("/updateUser/:id", updateController);


// from here all these routes are only access-able for admin
userRouter.get("/allUser", (req, res) => {
    res.send("Hello from product router")
})

userRouter.delete("/deleteUser/:id", (req, res) => {
    const id = req.params;
    res.send(id);
})

module.exports = userRouter;