import React from "react";
import Comment from "./Comment";

const Comments = ({ comments, postId }) => {
  return (
    <div className="comments">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} postId={postId} />
      ))}
    </div>
  );
};

export default Comments;
