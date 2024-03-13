import CloseBtnSVG from "@/components/svgComps/CloseBtnSVG";
import DragPhotosVideos from "@/components/svgComps/DragPhotosVideos";
import ReturnArrow from "@/components/svgComps/ReturnArrow";
import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { Root, UserDetails, getAllPosts } from "../lib/slices/mainSlice";

function UsersProfile() {
  const [imageSelected, setImageSelected] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<any>();
  const [caption, setCaption] = React.useState("");
  const [isLoading, setISLoading] = React.useState(false);
  const [isAddPostShow, setISAddPostShow] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  const allPosts = useSelector(
    (state: Root) => state?.userDetails?.userPostDetails
  );

  const handleSelectedImage = ({ e }: any) => {
    const fileType = e?.target?.files[0]?.type;
    const imageFile = e?.target?.files[0];

    const checkImageSize = imageFile?.size / (1024 * 1024);

    if (checkImageSize <= 5) {
      if (
        fileType === "image/png" ||
        fileType === "image/jpg" ||
        fileType === "image/jpeg"
      ) {
        setSelectedImage(imageFile);
        setImageSelected(true);
      } else {
        console.log("please only use .png, .jpg, .jpeg file types");
      }
    } else return;
  };

  const handleSubmit = () => {
    setISLoading(true);
    let formData = new FormData();

    console.log({ selectedImage });

    formData.append("file", selectedImage);
    formData.append("description", caption);

    axios
      .post("https://insta-post-api.onrender.com/posts", formData, {
        headers: {
          " Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        getAllPosts();
        setISLoading(false);

        setISAddPostShow(false);
        getAllPosts();
      })
      .catch((error) => {
        setISLoading(false);
      });
  };

  useEffect(() => {
    allPosts && allPosts.length > 0 ? null : getAllPosts();
  }, []);

  return (
    <div className={"flex justify-center flex-col gap-10 relative"}>
      <div>
        <Button
          variant="outlined"
          onClick={() => setISAddPostShow(!isAddPostShow)}
        >
          Create New Post
        </Button>
      </div>
      {allPosts ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {allPosts?.map((post: UserDetails) => {
            return (
              <picture>
                <img
                  className="h-[444px] w-[444px] object-cover"
                  src={post?.image}
                />
              </picture>
            );
          })}
        </div>
      ) : null}

      {isAddPostShow && (
        <div
          className="absolute top-0 z-10 flex h-full w-full cursor-default  items-center justify-center bg-[#0000008f] dark:bg-[#000000d7]"
          onClick={(e: any) => {
            if (e.target.id === "closeAddPost") setISAddPostShow(false);
          }}
          role="button"
          tabIndex={0}
          id="closeAddPost"
        >
          <div>
            <button
              className="fixed top-5 right-5"
              type="button"
              onClick={() => setISAddPostShow(false)}
            >
              <CloseBtnSVG
                lightColor="#f1f5f9"
                darkColor="#f1f5f9"
                heightWidth="20"
              />
            </button>
            <div className="w-[444px] flex-col overflow-hidden rounded-xl bg-white dark:border dark:border-stone-300 dark:bg-[#000000]">
              {imageSelected ? (
                <div>
                  <div className="flex items-center justify-between px-4">
                    <button
                      onClick={() => {
                        setSelectedImage(undefined);
                        setImageSelected(false);
                      }}
                      type="button"
                    >
                      <ReturnArrow />
                    </button>
                    <h1 className="border-b border-stone-300 py-3 text-center font-semibold dark:border-stone-700">
                      Post Preview
                    </h1>
                    <LoadingButton
                      onClick={handleSubmit}
                      className="font-semibold text-[#0095f6]"
                      type="button"
                      loading={isLoading}
                    >
                      Create
                    </LoadingButton>
                  </div>
                  <div>
                    <picture>
                      <img
                        className="h-[444px] w-[444px] object-cover"
                        src={URL.createObjectURL(selectedImage!)}
                        alt="post"
                      />
                    </picture>
                  </div>
                  <div className="p-4">
                    <input
                      className="w-full focus:outline-none"
                      placeholder="Write a caption..."
                      type="text"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="border-b border-stone-300 py-5 text-center font-semibold dark:border-stone-700">
                    Create new post
                  </h1>
                  <div className="flex h-[444px] flex-col items-center justify-center">
                    <div className="mx-auto">
                      <DragPhotosVideos />
                    </div>
                    <h1 className="py-5 text-xl">Upload photos and videos</h1>
                    <div className="flex justify-center rounded-[4px] bg-[#0095f6] text-sm font-semibold text-white dark:border-stone-700 dark:text-[#0f0f0f]">
                      <label
                        className="flex-grow cursor-pointer px-3 py-1  text-center"
                        htmlFor="photoFile"
                      >
                        Select From Computer
                        <input
                          type="file"
                          id="photoFile"
                          accept=".png, .jpg, .jpeg"
                          hidden
                          onChange={(e) =>
                            handleSelectedImage({
                              e,
                            })
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsersProfile;
