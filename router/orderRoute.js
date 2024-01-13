const orderRouter = require("express").Router();

// this route is only access-able for admin
orderRouter.get("/allOrder", (req, res) => {
    res.send("Hello from product router")
})

// this route is access-able for user
orderRouter.post("/addOrder", (req, res) => {
    res.send("Hello from product router")
})

// this route is only access-able for admin
orderRouter.put("/updateOrder/:id", (req, res) => {
    res.send("Hello from product router")
})

// this route is only access-able for admin
orderRouter.delete("/deleteUser/:id", (req, res) => {
    const id = req.params;
    res.send(id);
})

module.exports = orderRouter;