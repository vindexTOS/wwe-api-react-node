import Comment from '../models/commentModel.js'
import User from '../models/userModel.js'

export const makeComment = async (req, res) => {
  const { comment, postID, userID } = req.body

  //   console.log(comment)
  //   console.log(req.body)
  try {
    if (!comment) {
      return res.status(400).json({ msg: 'Comment fealed is empity' })
    }

    const commentObj = { comment, postID, userID }
    const postComment = await Comment.create(commentObj)
    return res.status(201).json(postComment)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: error })
  }
}

export const getComments = async (req, res) => {
  let { id } = req.params
  id = id.replace('\n', '')

  const postComment = await Comment.find({})
  let postCommentsArray = postComment.filter((val) => val.postID === id)
  const users = await User.find({}, 'name avatar ')
  postCommentsArray = postCommentsArray.map((comment) => {
    const user = users.find((u) => String(u._id) === String(comment.userID))
    return { ...comment._doc, user }
  })

  if (!postCommentsArray) {
    return res.status(404).json({ msg: 'comment dont exist' })
  }

  return res.status(200).json(postCommentsArray)
}
