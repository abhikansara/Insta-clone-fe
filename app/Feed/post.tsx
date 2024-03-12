/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfilePicSVG from "@/components/svgComps/ProfilePicSVG";
import HeartHollow from "@/components/svgComps/HeartHollow";
import CommentSVG from "@/components/svgComps/CommentSVG";
import HeartSVG from "@/components/svgComps/HeartSVG";
import CommentSection from "../CommentSection/page";
import axios from "axios";
import { useSelector } from "react-redux";
import ArrowSVG from "@/components/svgComps/ArrowSVG";
import { getAllPosts } from "../lib/slices/mainSlice";
interface Props {
  username: string;
  index: number;
}

const Post = ({ postData }: any) => {
  console.log({ postData });

  const accessToken = localStorage.getItem("accessToken");

  const postDetails = {
    comments: [
      { avatarURL: "", username: "Abhi", text: "Helo" },
      { avatarURL: "", username: "Abhi", text: "Helo" },
      { avatarURL: "", username: "Abhi", text: "Helo" },
    ],
    imgURL: "",
    likes: ["", "", "", ""],
    createdAt: "",
  };

  const [isPostLiked, setIsPostLiked] = useState<boolean>(false);

  const [showCommentBox, setShowCommentBox] = useState<boolean>(false);

  const [comment, setComment] = useState<string>("");

  const handleComment = (e: any) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    setComment("");
    axios
      .post(
        "https://insta-post-api.onrender.com/comment",
        {
          postId: postData?._id,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        getAllPosts();
      });
  };

  const handleLikePost = () => {
    setIsPostLiked(!isPostLiked);
    axios
      .put(
        "https://insta-post-api.onrender.com/like",
        {
          postId: postData?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        getAllPosts();
      });
  };

  return (
    <div>
      <div className="ml-3 flex items-center py-3">
        <Link href={""}>
          <div className="h-8 w-8 cursor-pointer select-none rounded-full">
            <ProfilePicSVG strokeWidth="1" />
          </div>
        </Link>
        <Link href={""}>
          <p className="ml-4 cursor-pointer">
            {postDetails.comments[0].username}
          </p>
        </Link>
      </div>
      <div role="button" tabIndex={0} className="px-16">
        <Image
          className="h-auto min-h-[400px] w-full select-none bg-[#ebebeb] dark:bg-[#313131] "
          src={postData?.image}
          alt="post"
          width="0"
          height="0"
          sizes="100vw"
          priority
        />
      </div>
      <div>
        <div className="border-t border-stone-200 px-5 py-4 dark:border-stone-700">
          <div className="mb-3 flex gap-4">
            <button id="like" type="button" onClick={handleLikePost}>
              <div className="group">
                <div>
                  {isPostLiked ? (
                    <HeartSVG fillColor="#ed4956" height="24" width="24" />
                  ) : (
                    <HeartHollow />
                  )}
                </div>
              </div>
            </button>
            <button
              type="button"
              className="h-6 w-6 cursor-pointer"
              onClick={() => setShowCommentBox(!showCommentBox)}
            >
              <div className="group">
                <div>
                  <CommentSVG
                    outline={"#262626"}
                    height="24"
                    width="24"
                    fill="none"
                  />
                </div>
              </div>
            </button>
          </div>

          <div style={{ display: "flex", gap: "10px", fontSize: "14px" }}>
            <span
              style={{
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              {postData?.user?.name.split("@")[0]}
            </span>
            {postData?.description}
          </div>

          <div className="flex text-sm">
            {postData.likes.length > 0 ? (
              <div className="pl-1">
                Liked by{" "}
                <b>
                  {postData.likes.length}{" "}
                  {postData.likes.length === 1 ? "people" : "peoples"}{" "}
                </b>
              </div>
            ) : (
              "No Likes "
            )}
          </div>

          {showCommentBox ? (
            <div className="relative inline-flex w-full items-center mt-2">
              <input
                className="border-2 border-solid w-full px-[4px] py-[8px] rounded-[10px]"
                value={comment}
                onChange={handleComment}
              />
              <div
                className="absolute h-[20px] w-[20px] right-[10px] cursor-pointer"
                onClick={handleCommentSubmit}
              >
                <ArrowSVG white={false} />
              </div>
            </div>
          ) : null}
          <button className="mt-3 text-xs text-[#a5a5a5]" type="button">
            {postDetails.comments.length === 1 &&
            postDetails.comments[0].text === "" ? (
              <div>No comments</div>
            ) : (
              <div>
                {postDetails.comments.length === 2 ? (
                  <p>View the 1st comment</p>
                ) : (
                  <p>View all {postDetails.comments.length - 1} comments</p>
                )}
              </div>
            )}
          </button>
          <p className="pt-2 text-xs text-[#a5a5a5]">
            {new Date().toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Post;
