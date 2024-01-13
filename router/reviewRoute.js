const reviewRouter = require("express").Router();

// this route is only access-able for admin
reviewRouter.get("/allReviews", (req, res) => {
    res.send("Hello from product router")
})

reviewRouter.post("/addReview", (req, res) => {
    res.send("Hello from product router")
})

reviewRouter.put("/updateReview/:id", (req, res) => {
    res.send("Hello from product router")
})

reviewRouter.delete("/deleteReview/:id", (req, res) => {
    const id = req.params;
    res.send(id);
})

module.exports = reviewRouter;