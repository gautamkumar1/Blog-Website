const Blog = require('../models/blogSchema')

const createBlog = async (req, res) => {
    try {
        const {title,intro,content} = req.body;
        const author = req.user._id;
        if(!title || !intro || !content || !author) {
            return res.status(400).json({msg: 'Please enter all fields'});
        }
        const newBlog = await Blog.create({title, intro, content, author});
        await newBlog.save();
        res.json({msg: 'Blog created successfully', blog: newBlog});
    } catch (error) {
        res.status(404).json({msg:"Error creating blog"})
        console.log(error);
    }
}

const showDraftBlogs = async (req, res) => {
    try {
        const drafts = await Blog.find({ author: req.user._id, status: 'Draft' });
        res.status(200).json(drafts);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching drafts', error });
    }
}

const checkBlogIsApprovedOrNot = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user._id });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching blogs', error });
    }
}

module.exports = {createBlog,showDraftBlogs,checkBlogIsApprovedOrNot}