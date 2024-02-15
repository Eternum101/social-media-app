import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
    friends: [],
    profileFriends: [], 
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null; 
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("User friends don't exist");
            }
        },
        setProfileFriends: (state, action) => {
            state.profileFriends = action.payload.friends;
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        setPicturePath: (state, action) => {
            if (state.user) {
              state.user.picturePath = action.payload;
            } else {
              console.error("User doesn't exist");
            }
          },
    }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setPicturePath, setProfileFriends } = authSlice.actions;
export default authSlice.reducer;