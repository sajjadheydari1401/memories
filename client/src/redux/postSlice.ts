import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as api from "../api/index.js";

interface Post {
  _id: string;
  // Add other properties of a post here
}

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const getPosts = createAsyncThunk("posts/fetchAll", async () => {
  try {
    const { data } = await api.fetchPosts();
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
});

export const createPost = createAsyncThunk(
  "posts/create",
  async (post: Post) => {
    try {
      const { data } = await api.createPost(post);
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async ({ id, post }: { id: string; post: Post }) => {
    try {
      const { data } = await api.updatePost(id, post);
      return data;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
);

export const likePost = createAsyncThunk("posts/like", async (id: string) => {
  try {
    const { data } = await api.likePost(id);
    return data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
});

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id: string) => {
    try {
      await api.deletePost(id);
      return id;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }
);

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
      .addCase(getPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.isLoading = false;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.isLoading = false;
        state.error = null;
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.isLoading = false;
        state.error = null;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(likePost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.isLoading = false;
        state.error = null;
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = null;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      });
  },
});

export default postsSlice.reducer;
