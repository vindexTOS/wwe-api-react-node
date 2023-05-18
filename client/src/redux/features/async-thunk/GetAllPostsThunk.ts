import { ThunkDispatch, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllPost } from '../slice/GetAllPosts.ts'
import axios from 'axios'
interface GetThreadType {
  dispatch: ThunkDispatch<any, any, any>
}
export const GetAllPostsThunk = createAsyncThunk(
  'allposts/get',
  async (val: GetThreadType) => {
    const apiUrl = `http://localhost:3000/posts`

    try {
      const data = await axios
        .get(apiUrl)
        .then((res) => res.data)
        .catch((err) => console.log(err))
      console.log(data)
      val.dispatch(getAllPost(data))
    } catch (error) {
      console.log(error)
    }
  },
)
