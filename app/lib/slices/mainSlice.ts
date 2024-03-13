import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { dispatch } from "../store";

export interface Root {
  userDetails: {
    userPostDetails: UserDetails[];
    isPostCreated: boolean;
  };
}

export interface UserDetails {
  _id: string;
  user: User;
  image: string;
  description: string;
  likes: Like[];
  comments: Comment[];
  __v: number;
  likedByUser: boolean;
}

export interface ApiPostDetails {
  _id: string;
  user: User;
  image: Image;
  description: string;
  likes: Like[];
  comments: Comment[];
  __v: number;
  likedByUser: boolean;
}

export interface User {
  id: string;
  name: string;
  _id: string;
}

export interface Image {
  type: string;
  data: number[];
}

export interface Like {
  likedById: string;
  _id: string;
}

export interface Comment {
  comment: string;
  author: Author;
  _id: string;
}

export interface Author {
  id: string;
  name: string;
  _id: string;
}
const initialState = {
  userPostDetails: [],
  isPostCreated: false,
};

const userSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    getAllUsersPost(state, action) {
      state.userPostDetails = action.payload;
    },
    setIsPostCreated(state, action) {
      state.isPostCreated = action.payload;
    },
  },
});

export const { getAllUsersPost, setIsPostCreated } = userSlice.actions;

export default userSlice.reducer;

const parseImage = (img: ApiPostDetails) => {
  const imageBuffer = img.image?.data;
  const base64String = Buffer.from(imageBuffer).toString("base64");
  const dataURL = `data:image/jpeg;base64,${base64String}`;

  return dataURL;
};

export const getAllPosts = () => {
  const accessToken = localStorage.getItem("accessToken");

  dispatch(setIsPostCreated(true));

  axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      const imageArray = res?.data;

      const parsedImages = imageArray?.map((img: ApiPostDetails) => {
        return {
          ...img,
          image: parseImage(img),
        };
      });

      dispatch(getAllUsersPost(parsedImages));
      dispatch(setIsPostCreated(false));
    })
    .catch((error) => {
      console.log({ error });
    });
};
