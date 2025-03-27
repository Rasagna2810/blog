const mongoose = require("mongoose");

// Define schema for author data
const authorDataSchema = new mongoose.Schema({
    nameOfAuthor: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profileimg: {
        type: String
    }
}, { "strict": "throw" });

// Define schema for comments, allowing nested replies
const commentSchema = new mongoose.Schema({
    nameofUser: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    replies: [{
        nameofUser: { type: String, required: true },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }  // Add timestamp for replies
    }]
}, { "strict": "throw" });

// Define schema for articles
const articleSchema = new mongoose.Schema({
    authorData: authorDataSchema,
    articleId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    dateofCreation: {
        type: String,
        required: true
    },
    dateofModification: {
        type: String,
        required: true
    },
    comments: [commentSchema],  // Updated to support nested replies
    isArticleActive: {
        type: Boolean
    }
}, { "strict": "throw" });

// Create model for article
const Article = mongoose.model('article', articleSchema);

module.exports = Article;
