import { createSlice } from '@reduxjs/toolkit'

const initialState= {
    currentVideo: null,
    loading: null,
    error: null
}

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
      fetchStart: (state)=>{
        state.loading= true;
      },
      fetchSuccess: (state, action)=>{
        state.loading= false;
        state.currentVideo= action.payload;
      },
      fetchFailure: (state)=>{
        state.loading= false;
        state.error= true;
      },
      likeVideo: (state, action)=>{
        // like
        state.currentVideo.likes.push(action.payload)

        const index = state.currentVideo.dislikes.indexOf(action.payload);
          if (index > -1) { // remove dislike 
            state.currentVideo.dislikes.splice(index, 1); // 2nd parameter means remove one item only
        }
      },
      unlikeVideo: (state, action)=>{
        const index = state.currentVideo.likes.indexOf(action.payload);
          if (index > -1) { // unlike 
            state.currentVideo.likes.splice(index, 1); // 2nd parameter means remove one item only
        }
      },
      dislikeVideo:(state, action)=>{
        // dislike
        state.currentVideo.dislikes.push(action.payload)

        const index = state.currentVideo.likes.indexOf(action.payload);
          if (index > -1) { // remove like 
            state.currentVideo.likes.splice(index, 1); // 2nd parameter means remove one item only
        }
      },
      undislikeVideo: (state, action)=>{
        const index = state.currentVideo.dislikes.indexOf(action.payload);
          if (index > -1) { // unlike 
            state.currentVideo.dislikes.splice(index, 1); // 2nd parameter means remove one item only
        }
      },
    },
  })

  export const {fetchStart, fetchSuccess, fetchFailure, likeVideo, unlikeVideo, dislikeVideo, undislikeVideo}= videoSlice.actions;

  export default videoSlice.reducer