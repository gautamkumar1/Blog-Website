const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: [100, "Title cannot exceed 100 characters!"],
    },
    intro: {
        type: String,
        required: true,
        maxLength: [250, "Blog intro must contain at least 250 characters!"],
      },
    content: {
        type: String,
        required: true,
        maxLength: [5000, "Content cannot exceed 5000 characters!"],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // isWriter:{
    //     type: Boolean,
    //     default: false,
    //     required: true,
    // },
    status: { type: String, enum: ['Draft', 'Pending', 'Approved', 'Rejected'], default: 'Draft' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
