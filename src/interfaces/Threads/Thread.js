import React from "react";
import ThreadButtons from "./ThreadButtons";
import Comments from "./Comments";
import { DownArrowIcon, SendIcon } from "../../assets/Icons";
import { v4 as uuidv4 } from "uuid";

const Thread = ({ item }) => {
  const [data, setData] = React.useState(item);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState(item.comments);
  const [showComments, setShowComments] = React.useState(false);
  const [showMore, setShowMore] = React.useState(false);

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

  const likePost = async (id) => {
    const response = await fetch(
      process.env.REACT_APP_SHIPTALK_API + "/like_post/" + id
    );
    if (response.ok) {
      const resp = await response.json();
      setData(resp);
    }
  };
  const generateRandomAuthor = () => {
    const randomNum = Math.floor(Math.random() * 1000);
    const randomChar = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Random letter A-Z
    return `Anonymous_${randomChar}${randomNum}`;
  };

  const addComment = async (id) => {
    const response = await fetch(
      process.env.REACT_APP_SHIPTALK_API + "/upload_comment/" + id,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uuidv4(),
          content: comment,
          author: generateRandomAuthor(),
        }),
      }
    );
    if (response.ok) {
      const resp = await response.json();
      setComment("");
      setComments([...comments, resp]);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div className="py-4 px-8" key={data.id}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <h3 className="text-sm text-[#EBEBEB99]">
            {data.author ?? "Anonymous"}
          </h3>
        </div>
        <p className="text-sm text-[#EBEBEB99]">
          {formatDate(data.created_at)}
        </p>
      </div>
      <div className="">
        <h2 className="font-semibold mb-2">{data.title}</h2>
        <p className="mb-2 text-sm text-gray-400">{data.category}</p>
        <p className={`mb-2 leading-8 ${showMore ? "" : "line-clamp-2"}`}>
          {data.content}
        </p>
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-gray-400 mb-4 flex gap-4 items-center"
        >
          {showMore ? "Show less" : "Show more"}
          <DownArrowIcon
            style={{
              transform: showMore ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </button>
        <ThreadButtons
          upvotes={data.upvotes}
          likePost={likePost}
          postId={data.id}
          comments={comments.length}
          toggleComments={toggleComments}
        />
        {showComments && comments && (
          <Comments comments={comments} postId={data.id} />
        )}
        <div className="flex border rounded-lg mt-4">
          <input
            type="text"
            placeholder="Comment"
            className="grow rounded-e-lg py-2 ps-4 bg-transparent focus-visible:outline-none"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex h-100 items-center justify-center px-3">
            <button className="grow p-2" onClick={() => addComment(data.id)}>
              <SendIcon fill="#A0A5AECC" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thread;
