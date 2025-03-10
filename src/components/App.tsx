import React, { useEffect } from "react";
import styled from "styled-components";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { fetchUsers, selectUsers } from "../redux/user/userSlice";
import { GlobalStyles } from "./GlobalStyles/GlobalStyles";
import UserTableWrapper from "./UserTableWrapper/UserTableWrapper";
import { fetchBlogs, selectBlogs } from "../redux/blog/blogSlice";
import { BrowserRouter, Route, Routes } from "react-router";
import BlogPost from "./BlogPost/BlogPostForm";

const StyledWrapper = styled.div`
  padding: 0 24px;
`;

export const App = () => {
  const dispatch = useAppDispatch();
  const users = useTypedSelector(selectUsers);
  const blogs = useTypedSelector(selectBlogs);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchBlogs());
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <StyledWrapper>
        <Routes>
          <Route path="/" element={<UserTableWrapper users={users} blogs={blogs} />} />
          <Route path="/blog/:idUser/:isAdd" element={<BlogPost />} />
        </Routes>
      </StyledWrapper>
    </BrowserRouter>
  );
};
