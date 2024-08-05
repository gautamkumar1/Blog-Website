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
        return res.status(400).json({ message: 'Invalid status. Must be "Approved" or "Rejected".' });
    }

    try {
        const post = await Blog.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        post.status = status;
        await post.save();
        res.status(200).json({ message: `Post ${status.toLowerCase()} successfully`, post });
    } catch (error) {
        res.status(500).json({ message: `Error updating post status`});
        console.log(error);
    }
}
const showApprovedPosts = async (req, res) => {
    try {
        const posts = await Blog.find({ status: 'Approved' }).populate('author', 'username email');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching approved posts', error });
    }
}
const showAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}
const showAllPosts = async (req, res) => {
    try {
        const posts = await Blog.find().populate('author', 'username email');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Blog.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
}
module.exports = {getAllUsers,approvedPost,showAllUser,deleteUser,showAllPosts,deletePost,showApprovedPosts,updateUser}
