const User = require('../models/userSchema')
const Blog = require('../models/blogSchema')
const getAllUsers = async (req, res) => {
    try {

        const users = await User.find({});

        return res.json({
            message: "All Users fetched successfully",
            data: users
        });
    } catch (error) {
        throw new Error(error);
    }
}

const approvedPost = async (req, res) => {
    const { status } = req.body;
    
    if (!['Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ msg: 'Invalid status. Must be "Approved" or "Rejected".' });
    }

    try {
        const post = await Blog.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        post.status = status;
        await post.save();
        res.status(200).json({ msg: `Post ${status.toLowerCase()} successfully`, post });
    } catch (error) {
        res.status(500).json({ msg: `Error updating post status`});
        console.log(error);
    }
}

const showAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching users', error });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ msg: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting user', error });
    }
}

const showAllPosts = async (req, res) => {
    try {
        const posts = await Blog.find().populate('author', 'username email');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching posts', error });
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Blog.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.status(200).json({ msg: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting post', error });
    }
}
module.exports = {getAllUsers,approvedPost,showAllUser,deleteUser,showAllPosts,deletePost}
