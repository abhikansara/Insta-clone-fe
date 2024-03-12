import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "../store";

interface userState {
  userPostDetails: any;
}

const initialState: userState = {
  userPostDetails: [],
};

const userSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    getAllUsersPost(state, action) {
      state.userPostDetails = action.payload;
    },
  },
});

export const { getAllUsersPost } = userSlice.actions;

export default userSlice.reducer;

const parseImage = (img: any) => {
  const imageBuffer = img.image?.data;
  const base64String = Buffer.from(imageBuffer).toString("base64");
  const dataURL = `data:image/jpeg;base64,${base64String}`;

  return dataURL;
};

export const getAllPosts = () => {
  const accessToken = localStorage.getItem("accessToken");

  axios
    .get("https://insta-post-api.onrender.com/posts", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      const imageArray = res?.data;

      const parsedImages = imageArray?.map((img: any) => {
        return {
          ...img,
          image: parseImage(img),
        };
      });

      console.log({ parsedImages });
      dispatch(getAllUsersPost(parsedImages));
    })
    .catch((error) => {
      console.log({ error });
    });
};

