const bannerRouter = require("express").Router();

// ALL this route is only access-able for admin
bannerRouter.get("/allBanner", (req, res) => {
    res.send("Hello from product router")
})

bannerRouter.post("/addBanner", (req, res) => {
    res.send("Hello from product router")
})

bannerRouter.put("/updateBanner/:id", (req, res) => {
    res.send("Hello from product router")
})

bannerRouter.delete("/deleteBanner/:id", (req, res) => {
    const id = req.params;
    res.send(id);
})

module.exports = bannerRouter;