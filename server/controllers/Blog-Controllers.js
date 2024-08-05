const Blog = require('../models/blogSchema')
const Draft = require('../models/draftSchema')
const createBlog = async (req, res) => {
    try {
        const {title,intro,content} = req.body;
        const author = req.user._id;
        if(!title || !intro || !content || !author) {
            return res.status(400).json({message: 'Please enter all fields'});
        }
        // Check if the blog already exists
        const blogExists = await Blog.findOne({ title });
        if (blogExists) {
            return res.status(400).json({ message: "Blog with the same title already exists" });
        }
        // if(!blogExists.isWriter) {
        //     return res.status(403).json({ message: "You are not authorized to create this blog" });
        // }
        const newBlog = await Blog.create({title, intro, content, author});
        await newBlog.save();
        res.json({message: 'Blog created successfully', blog: newBlog});
    } catch (error) {
        res.status(404).json({message:"Error creating blog"})
        console.log(error);
    }
}

const showDraftBlogs = async (req, res) => {
    try {
        const drafts = await Blog.find({ author: req.user._id, status: 'Pending' });
        res.status(200).json(drafts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching drafts', error });
    }
}

const checkBlogIsApprovedOrNot = async (req, res) => {
    try {
        const blogs = await Blog.find({ author: req.user._id });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs', error });
    }
}

const saveDraftBlog = async (req, res) => {
        try {
        const { title, intro, content, userId } = req.body;
        const draft = new Draft({ title, intro, content, userId });
        await draft.save();
        res.status(201).json({ message: 'Draft saved successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to save draft', error: err.message });
    }

}
const editDraft = async (req, res) => {
    const draftId = req.params.id;
    console.log(draftId);
    
    const { title, intro, content } = req.body;

    try {
        const draft = await Draft.findById(draftId);
        console.log(draft);
        
        if (!draft) {
            return res.status(404).json({ message: 'Draft not found' });
        }

        // Check if the user is the owner of the draft
        if (req.user._id.toString() !== draft.userId.toString()) {
            return res.status(403).json({ message: 'You are not authorized to edit this draft' });
        }

        draft.title = title;
        draft.intro = intro;
        draft.content = content;

        await draft.save();

        res.status(200).json({ message: 'Draft updated successfully', draft });
    } catch (err) {
        console.error('Error editing draft:', err);
        res.status(500).json({ message: 'An error occurred while editing the draft' });
    }
};

const getDraftBlogForUser = async (req, res) => {
    try {
        const drafts = await Draft.find({ userId: req.params.userId });
        res.status(200).json(drafts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to get drafts', error: err.message });
    }
}
module.exports = {createBlog,showDraftBlogs,checkBlogIsApprovedOrNot,saveDraftBlog,getDraftBlogForUser,editDraft}