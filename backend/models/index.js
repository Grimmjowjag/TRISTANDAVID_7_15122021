const User = require("./User")
const Post = require("./postModel")
const Comment = require("./commentModel")
const Reaction = require("./reactionModel")
const models = { User, Post, Comment, Reaction };

User.associate(models)
Post.associate(models)
Comment.associate(models)
Reaction.associate(models)

module.exports = models