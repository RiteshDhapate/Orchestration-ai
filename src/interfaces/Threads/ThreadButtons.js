import React from "react";
import {
  CommentIcon,
  RepostIcon,
  ShareIcon,
  StarIcon,
  UpArrowIcon,
} from "../../assets/Icons";

const ThreadButtons = ({
  upvotes,
  likePost,
  postId,
  comments,
  toggleComments,
}) => {
  return (
    <div className="flex items-center gap-2 pb-4 flex-wrap">
      <button
        type="button"
        className="flex items-center gap-2 bg-transparent border border-[#85869833] rounded-full px-4 py-1 text-nowrap"
        onClick={() => {
          likePost(postId);
        }}
      >
        <UpArrowIcon />
        {upvotes} Upvotes
      </button>
      <button
        type="button"
        className="flex items-center gap-2 bg-transparent border border-[#85869833] rounded-full px-4 py-1 text-nowrap"
        onClick={toggleComments}
      >
        <CommentIcon />
        {comments} Comments
      </button>
      <button
        type="button"
        className="flex items-center gap-2 bg-transparent border border-[#85869833] rounded-full px-4 py-1 text-nowrap"
      >
        <RepostIcon />1 Repost
      </button>
      <button
        type="button"
        className="flex items-center gap-2 bg-transparent border border-[#85869833] rounded-full px-4 py-1 text-nowrap"
      >
        <ShareIcon />
        Share
      </button>
      <button
        type="button"
        className="flex items-center gap-2 bg-transparent border border-[#85869833] rounded-full px-4 py-1 text-nowrap"
      >
        <StarIcon fill="transparent" stroke="#A0A5AE" width={16} height={16} />
        Star
      </button>
    </div>
  );
};

export default ThreadButtons;
