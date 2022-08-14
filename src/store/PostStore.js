import { createSlice } from '@reduxjs/toolkit';
const initialStateValue = {
  posts: [],
  currentPost: {},
  myPosts: [],
  comments: [],
};

export const postSlice = createSlice({
  name: 'post',
  initialState: { value: initialStateValue },
  reducers: {
    setComments: function (state, action) {
      state.value.comments = [...action.payload];
    },
    setPosts: function (state, action) {
      state.value.posts = [...action.payload];
    },
    setCurrentPost: function (state, action) {
      state.value.currentPost = action.payload;
    },
    setMyPosts: function (state, action) {
      const data = [...action.payload].filter((el) => el.userId === 1);
      state.value.myPosts = [...data];
      localStorage.setItem('myPosts', JSON.stringify(data));
    },
    addPost: function (state, action) {
      state.value.posts.unshift(action.payload);
      state.value.myPosts.unshift(action.payload);
      localStorage.setItem('myPosts', JSON.stringify(state.value.myPosts));
    },
    editPost: function (state, action) {
      const index = state.value.posts.findIndex(function (el) {
        return el.id === action.payload.id;
      });
      state.value.posts[index] = action.payload.newPost;
      state.value.myPosts[index] = action.payload.newPost;
      const myPosts = JSON.parse(localStorage.getItem('myPosts'));
      myPosts[index] = action.payload.newPost;
      localStorage.setItem('myPosts', JSON.stringify(myPosts));
      localStorage.setItem('myCurrentPost', JSON.stringify(action.payload.newPost));
    },
    delPost: function (state, action) {
      state.value.posts = state.value.posts.filter((post) => post.id !== action.payload);
      state.value.myPosts = state.value.myPosts.filter((post) => post.id !== action.payload);
      localStorage.setItem('myPosts', JSON.stringify(state.value.myPosts));
    },
  },
});

export const { addPost, delPost, editPost, setComments, setPosts, setCurrentPost, setMyPosts } = postSlice.actions;

export default postSlice.reducer;
