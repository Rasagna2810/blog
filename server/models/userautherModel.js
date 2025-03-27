const mongoose = require("mongoose");

// Define user or author schema
const userauthorSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    profileImg: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    report: {  
        type: Number,  
        default: 0  
    }
}, { "strict": "throw" }); //"strict":"throw" throws error whenever there is a validation error

// Create model for user author schema
const UserAuthor = mongoose.model('userauthor', userauthorSchema);

// Export
module.exports = UserAuthor;
