// server/models/Draft.js
const mongoose = require('mongoose');

const draftSchema = new mongoose.Schema({
    title: String,
    intro: String,
    content: String,
    userId: mongoose.Schema.Types.ObjectId, 
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Draft', draftSchema);
