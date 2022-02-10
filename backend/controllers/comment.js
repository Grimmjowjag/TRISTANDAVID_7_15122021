const Comment = require('../models/commentModel')

exports.createComment = (req, res, next) => {
    Comment.create({
      description: req.body.description,
      user_id: req.body.user_id,
      postId: req.body.postId,
    })
    .then(() => res.status(201).json({ message: 'Commentaire créé !'}))
    .catch(error => res.status(400).json({ error }))
}

exports.getAllComments = (req, res, next) => {
    Comment.findAll({ where: { comment: req.body.comment } })
    .then((comment) => {res.status(200).json(comment)})
    .catch((error) => {res.status(400).json({error: error})})
}

exports.deleteComment = (req, res, next) => {
    Comment.findOne({ id: req.params.commentId })
      .then(Comment => {
          Comment.destroy({ where: { id: req.params.commentId } })
            .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
            .catch(error => res.status(400).json({ error }))
        })
      .catch(error => res.status(500).json({ error }))
  }

// !!!!!!!!!!!!!!!!! PENSER A LINK LES TABLES - Utiliser méthode ***.***belongsTo({***.***,onDelete:'CASCADE'})!!!!!!!!!!!!!!!!!!!!!!!!