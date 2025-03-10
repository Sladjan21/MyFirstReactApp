import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMembers, BlogPost, deleteBlogPost, editBlogPost, addBlogPost } from "../../data/data"; 
import { RootState } from "../store";

export const fetchBlogs = createAsyncThunk<BlogPost[]>(
  "blogs/fetchBlogs",
  async () => getMembers(),
);

export const deleteBlog = createAsyncThunk<void, string>(
  "blog/removeBlog",
  async (id : string) => {
    try{
      await deleteBlogPost(id);
    }
    catch (error){
      console.log("Error deleting blog:", error);
      throw error;
    }
  }
);

export const updateBlog = createAsyncThunk<BlogPost, BlogPost>(
  "blog/updateBlog",
  async (blog: BlogPost) => {
    try{
      const response = await editBlogPost(blog.id, blog);
      return response;
    }
    catch(error){
      console.log("Error updating blog:", error);
      throw error;
    }
  }
);

export const saveBlog = createAsyncThunk<BlogPost, BlogPost>(
  "blog/add",
  async (blog: BlogPost) => {
    try {
      const response = await addBlogPost(blog);
      return response;
    } catch (error) {
      console.error("Error adding blog:", error);
      throw error;
    }
  }
)

export interface BlogPostState {
  blogList: BlogPost[];
}

const initialState: BlogPostState = {
  blogList: [],
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    // Add custom reducers here if needed
    // myAwesomeReducer() {}
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.fulfilled, (state, { payload }) => {
      console.log(state.blogList.length)
      console.log(payload.length);
      state.blogList = payload; 
    }).addCase(deleteBlog.fulfilled, (state, { payload, meta }) => {
        const blogId = meta.arg;
        state.blogList = state.blogList.filter((blog) => blog.id !== blogId);
    }).addCase(updateBlog.fulfilled, (state, {payload}) => {
      const index = state.blogList.findIndex((blog) => blog.id === payload.id);
      if (index !== -1) {
        state.blogList[index] = payload;
      }
    }).addCase(saveBlog.fulfilled, (state, {payload}) => {
      console.log(state.blogList.length);
      state.blogList.push(payload);
      console.log(payload)
      console.log(state.blogList.length);
    });
  },
});

export default blogSlice.reducer;

export const selectBlogs = (state: RootState) => state.blog.blogList;
