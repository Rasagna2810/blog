const exp=require('express')
const authorApi=exp.Router();
const eah=require('express-async-handler')
const createura=require("./createura")
const Article=require("../models/articlemodel")
const {requireAuth}=require("@clerk/express")
require('dotenv').config()
//API

authorApi.post("/author",eah(createura))
// new article
authorApi.post("/article",eah(async(req,res)=>{
    const newart=req.body;
    const newar=new Article(newart)
    const art=await newar.save();
    res.status(201).send({message:"article",payload:art})
}))
// read all articles
authorApi.get('/articles',requireAuth({signInUrl:"unauthorized"}),eah(async(req,res)=>{
    const loa=await Article.find({isArticleActive:true});
    res.status(200).send({message:"articles",payload:loa})
}))
 
authorApi.get('/unauthorized',(req,res)=>{
    res.send({message:"unauthorized request"})
})
// moify an article by article id
authorApi.put('/article/:articleId',requireAuth({signInUrl:"unauthorized"}),eah(async(req,res)=>{
    // get modified article
    const ma=req.body;
    // update article by article id
    const dbRes=await Article.findByIdAndUpdate(ma._id,{...ma},{new:true})
    // send res 
    res.status(200).send({message:"article modified",payload:dbRes})
    
}))
// deleting article here we are doing soft delete so we used put and changed activity status to false


authorApi.put('/articles/:articleId', eah(async (req, res) => {
        const {articleId} = req.params;
        const { isArticleActive } = req.body;

        const dbRes = await Article.findOneAndUpdate(
            {articleId: articleId}, 
            { isArticleActive }, 
            { new: true }
        );

        if (!dbRes) {
            return res.status(404).send({ message: "Article not found" });
        }

        res.status(200).send({ message: "article deleted or restored", payload: dbRes });
    
}));




module.exports=authorApi;