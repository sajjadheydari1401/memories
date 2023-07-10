import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const getPosts = createAsyncThunk("posts/fetchAll", async () => {
  try {
    const response = await api.fetchPosts();
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
});

export const createPost = createAsyncThunk("posts/create", async (post) => {
  try {
    const response = await api.createPost(post);
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
});

export const updatePost = createAsyncThunk("posts/update", async (post) => {
  try {
    const response = await api.updatePost(post.id, post);
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
});

export const likePost = createAsyncThunk("posts/like", async (id) => {
  try {
    const response = await api.likePost(id);
    console.log("response", response);
    return response;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
});

export const deletePost = createAsyncThunk("posts/delete", async (id) => {
  try {
    await api.deletePost(id);
    return id;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.posts.push(action.payload);
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { reducer: postReducer } = postsSlice;
export default postsSlice.actions;
