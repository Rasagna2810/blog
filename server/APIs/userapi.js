const exp=require('express')
const ua=exp.Router();
const UserAuthor=require('../models/userautherModel')
const eah=require('express-async-handler')
const Article=require("../models/articlemodel")
const createura=require("./createura")
//API

ua.post("/user",eah(createura))
// adding comments
ua.put('/comment/:articleId',eah(async(req,res)=>{
    const comme=req.body;
    // add comment obj to comment array
    const rf=await Article.findOneAndUpdate({articleId:req.params.articleId}
        ,{$push:{comments:comme}},
           {new:true})
    res.send({message:"comment added",payload:rf})
}))
ua.delete("/comment/:articleId/:commentId", async (req, res) => {
    try {
      const article = await Article.findOne({ articleId: req.params.articleId });
      if (!article) return res.status(404).json({ message: "Article not found" });
  
      article.comments = article.comments.filter(
        (c) => c._id.toString() !== req.params.commentId
      );
      await article.save();
  
      res.json({ message: "comment deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports=ua;