import Link from "next/link";

function CommentSection(postDetails: any) {
  return (
    <div>
      {postDetails.comments?.[0].text === "" ? (
        ""
      ) : (
        <div className="pt-2 text-sm">
          <p>
            <b>
              <Link href={""}>{postDetails.comments?.[0].username}</Link>
            </b>{" "}
            {postDetails.comments?.[0].text}
          </p>
        </div>
      )}
      {postDetails?.comments?.length > 1 ? (
        <div className="pt-2 text-sm">
          <p>
            <b>
              <Link href={""}>{postDetails.comments[1].username}</Link>
            </b>{" "}
            {postDetails.comments[1].text}
          </p>
        </div>
      ) : (
        ""
      )}
      {postDetails?.comments?.length > 2 &&
      postDetails.comments?.[0]?.text === "" ? (
        <div className="pt-2 text-sm">
          <p>
            <b>
              <Link href={""}>{postDetails?.comments?.[2]?.username}</Link>
            </b>{" "}
            {postDetails?.comments?.[2]?.text}
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CommentSection;