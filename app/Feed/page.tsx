/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Post from "./post";
import { dispatch } from "../lib/store";
import { getAllPosts, getAllUsersPost } from "../lib/slices/mainSlice";
import { Box, CircularProgress } from "@mui/material";
interface Props {
  username: string;
  index: number;
}

const Feed = () => {
  const accessToken = localStorage.getItem("accessToken");
  // const dispatch = useDispatch();

  // const parseImage = (img: any) => {
  //   const imageBuffer = img.image?.data;
  //   const base64String = Buffer.from(imageBuffer).toString("base64");
  //   const dataURL = `data:image/jpeg;base64,${base64String}`;

  //   return dataURL;
  // };

  // const getAllPosts = () => {
  //   axios
  //     .get("https://insta-post-api.onrender.com/posts", {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then((res) => {
  //       const imageArray = res?.data;

  //       const parsedImages = imageArray?.map((img: any) => {
  //         return {
  //           ...img,
  //           image: parseImage(img),
  //         };
  //       });

  //       console.log({ parsedImages });
  //       dispatch(getAllUsersPost(parsedImages));
  //     })
  //     .catch((error) => {
  //       console.log({ error });
  //     });
  // };

  const allPosts = useSelector(
    (state: any) => state?.userDetails?.userPostDetails
  );

  useEffect(() => {
    allPosts && allPosts.length > 0 ? null : getAllPosts();
  }, []);

  console.log({ allPosts });

  return (
    <div className="h-full">
      {allPosts && allPosts.length > 0 ? (
        allPosts?.map((postData: any) => <Post postData={postData} />)
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default Feed;
