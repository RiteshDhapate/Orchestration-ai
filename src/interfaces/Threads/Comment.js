import React from "react";
import Comments from "./Comments";
import { UpArrowIcon } from "../../assets/Icons";

const formatDate = (dateString) => {
  const date = new Date(dateString);

  // Format the date to a readable string
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Format the time
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} at ${formattedTime}`;
};

const Comment = ({ comment, postId }) => {
  const [data, setData] = React.useState(comment);
  const likeComment = async (id) => {
    // console.log(postId, id);
    const response = await fetch(
      process.env.REACT_APP_SHIPTALK_API + "/like_comment/" + postId + "/" + id
    );
    if (response.ok) {
      const resp = await response.json();
      setData(resp);
    }
  };

  return (
    <div className="border-t border[#85869833] py-4 ps-8" key={data.id}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <h3 className="text-sm text-[#EBEBEB99]">{data.author}</h3>
        </div>
        <p className="text-sm text-[#EBEBEB99]">
          {formatDate(data.created_at)}
        </p>
      </div>
      <div className="">
        <p className="mb-2 leading-8">{data.content}</p>
        <button
          type="button"
          className="flex items-center gap-2 bg-transparent border border-[#85869833] rounded-full px-4 py-1"
          onClick={() => likeComment(data.id)}
        >
          <UpArrowIcon />
          {data.upvotes} Upvotes
        </button>
        {data.comments && <Comments comments={data.comments} />}
      </div>
    </div>
  );
};

export default Comment;
