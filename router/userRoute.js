const userRouter = require("express").Router();

// this route is only access-able for admin
userRouter.get("/allUser", (req, res) => {
    res.send("Hello from product router")
})

userRouter.post("/addUser", (req, res) => {
    res.send("Hello from product router")
})

userRouter.put("/updateUser/:id", (req, res) => {
    res.send("Hello from product router")
})

// this route is only access-able for admin
userRouter.delete("/deleteUser/:id", (req, res) => {
    const id = req.params;
    res.send(id);
})

module.exports = userRouter;