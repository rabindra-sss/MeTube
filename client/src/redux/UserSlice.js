import { createSlice } from '@reduxjs/toolkit'

const initialState= {
    currentUser: null,
    loading: null,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      loginStart: (state)=>{
        state.loading= true;
      },
      loginSuccess: (state, action)=>{
        state.loading= false;
        state.currentUser= action.payload;
      },
      loginFailure: (state)=>{
        state.loading= false;
        state.error= true;
      },
      logout: (state)=>{
        state.currentUser= null;
        state.loading= false;
        state.error = false;
        // localStorage.removeItem('access_token')
      },
      subscribe: (state, action)=>{
        state.loading= false;
        state.currentUser.subscribedChannels.push(action.payload);
      },
      unsubscribe: (state, action) =>{
        const index = state.currentUser.subscribedChannels.indexOf(action.payload);
          if (index > -1) { // unlike 
            state.currentUser.subscribedChannels.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
    },
  })

  export const {loginStart, loginSuccess, loginFailure, logout, subscribe, unsubscribe}= userSlice.actions;

  export default userSlice.reducer