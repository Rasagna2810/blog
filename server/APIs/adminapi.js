const exp=require('express')
const UserAuthor=require('../models/userautherModel')
const adminApi=exp.Router();
const eah=require('express-async-handler')
const createura=require("./createura")


//API
adminApi.get("/", async (req, res) => {
    try {
        const re = await UserAuthor.find({ role: { $ne: "admin" } }); // Exclude admins
        res.status(200).send({ message: "articles", payload: re });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong", details: error.message });
    }
});


adminApi.post("/admin",eah(createura))

adminApi.get("/:email", async (req, res) => {
    try {
        let e = req.params.email;

        const result = await UserAuthor.updateMany(
            { email: e },
            [{ $set: { report: { $cond: { if: { $eq: ["$report", 1] }, then: 0, else: 1 } } } }]
        );

        res.json({ message: "Report status toggled successfully", result });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong", details: error.message });
    }
});

adminApi.get("/admin/:email", async (req, res) => {
    let e = req.params.email;
    const re = await UserAuthor.findOne({ email: e });
  
    if (!re) {
      return res.status(404).json({ message: "User not found" });
    }
  
    res.json({ report: re.report });
  });  
  

module.exports=adminApi;