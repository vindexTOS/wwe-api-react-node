import { ThunkDispatch } from '@reduxjs/toolkit'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostCommentThunk } from '../../../redux/features/async-thunk/FireStoreThunks/CommentThunk'
import { getComment } from '../../../redux/features/slice/CommentSlice'
import Cookies from 'universal-cookie'
import { getCookies } from '../../../redux/features/slice/LoginSlice'
type CommentProp = {
  name: string
  postID: string
}
export type DataType = {
  data: CommentProp
}

const CommentPost: FC<DataType> = ({ data }) => {
  const comment = useSelector((state: any) => state.CommentReducer.comment)
  const userInfo = useSelector((state: any) => state.LoginReducer.data)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>()

  const { name, postID } = data
  const style = {
    mainDiv: `w-[80%]`,
    textarea: `w-[100%] h-[200px] max-h-[400px]`,
  }

  const makeComment = () => {
    if (userInfo.user) {
      const { _id } = userInfo?.user

      const commentObj = { userID: _id, postID, comment }
      if (comment) {
        dispatch(PostCommentThunk({ data: commentObj }))
      } else {
        console.log('erro')
      }
    }
  }

  return (
    <div className={style.mainDiv}>
      <p>Comment as {name}</p>
      <textarea
        onChange={(e) => dispatch(getComment(e.target.value))}
        className={style.textarea}
      ></textarea>
      <button onClick={() => makeComment()}>SEND COMMENT</button>
    </div>
  )
}

export default CommentPost
