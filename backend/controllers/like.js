// const Like = require('../models/likeModel')

// exports.createLike = (req, res, next) => {
//     console.log("")
//       Like.create({
//         user_id: req.body.user_id,
//         postId: req.body.postId,
//        })
//         .then(() => res.status(201).json({ message: 'Vous aimez ce post !'}))
//         .catch((error) => {res.status(404).json({error: error})})
//     }

// exports.getOneLike = (req, res, next) => {
//     Like.find({ where: { _id: req.params.id } })
//     .then((like) => {res.status(200).json(like)})
//     .catch((error) => {res.status(404).json({error: error})})
// }