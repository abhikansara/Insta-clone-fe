import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Post from "./post";
import { Root, UserDetails, getAllPosts } from "../lib/slices/mainSlice";
import { Box, CircularProgress } from "@mui/material";

const Feed = () => {
  const allPosts = useSelector(
    (state: Root) => state?.userDetails?.userPostDetails
  );

  useEffect(() => {
    allPosts && allPosts.length > 0 ? null : getAllPosts();
  }, []);

  return (
    <div className="h-full">
      {allPosts && allPosts.length > 0 ? (
        allPosts?.map((postData: UserDetails) => (
          <Post postData={postData} allPosts={allPosts} />
        ))
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default Feed;
