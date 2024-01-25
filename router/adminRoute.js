const adminRouter = require("express").Router();

// ALL this route is only access-able for admin
adminRouter.get("/login", (req, res) => {
    res.send("Hello from product router")
})

adminRouter.post("/register", (req, res) => {
    res.send("Hello from product router")
})

adminRouter.put("/updateInfo/:id", (req, res) => {
    res.send("Hello from product router")
})

adminRouter.delete("/deleteAdmin/:id", (req, res) => {
    const id = req.params;
    res.send(id);
})

module.exports = adminRouter;