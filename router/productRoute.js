const productRouter = require("express").Router();


productRouter.get("/allProduct", (req, res) => {
    res.send("Hello from product router")
})

// ALL this route is only access-able for admin
productRouter.post("/addProduct", (req, res) => {
    res.send("Hello from product router")
})

productRouter.put("/updateProduct/:id", (req, res) => {
    res.send("Hello from product router")
})

productRouter.delete("/deleteProduct/:id", (req, res) => {
    const id = req.params;
    res.send(id);
})

module.exports = productRouter;