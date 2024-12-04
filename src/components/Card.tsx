import { useDataContext } from "../hooks/useDataContext";
import { Comments, Reply } from "../types/dataType";
import { useState } from "react";

type CardProps = {
  items: Comments;
};

function Card({ items }: CardProps) {
  const { currentUser, deleteComment, replyComment } = useDataContext();
  const [replyBox, setReplyBox] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<string>("");

  const handleReplySubmit = (id: string) => {
    replyComment(id, replyText);
    setReplyBox(null);
    setReplyText("");
  };

  const renderComment = (comment: Comments | Reply, isReply = false) => {
    const isCurrentUser = comment.user.username === currentUser?.username;

    return (
      <div className="flex w-screen items-center justify-center">
        {isReply && (
          <div className="ml-20 border border-gray-300 self-stretch mr-4"></div>
        )}
        <div
          className={`bg-white w-1/2 min-h-36 rounded p-6 flex gap-4 my-5`}
          key={comment.id}
        >
          <div className="bg-gray-300 p-2 flex flex-col items-center justify-between rounded-md">
            <button className="text-gray-500 font-bold">+</button>
            <p className="text-indigo-800 font-bold">{comment.score}</p>
            <button className="text-gray-500 font-bold">-</button>
          </div>

          <div className="flex flex-col w-screen gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={comment.user.image.png}
                  alt="user-avatar"
                  className="w-12"
                />
                <h6 className="font-bold">{comment.user.username}</h6>
                <span className="text-sm text-gray-500">
                  <strong>{comment.createdAt}</strong>
                </span>
              </div>
              <div className="flex">
                {isCurrentUser ? (
                  <>
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className="flex items-center gap-1 rounded-md justify-center p-1 w-20 font-bold text-red-500 hover:bg-red-100"
                    >
                      <img src="./images/icon-delete.svg" alt="reply-icon" />
                      <p>DELETE</p>
                    </button>
                    <button className="flex items-center gap-1 justify-center rounded-md p-1 w-20 font-bold hover:bg-indigo-300">
                      <img src="./images/icon-edit.svg" alt="reply-icon" />
                      <p style={{ color: "#5357B6" }}>EDIT</p>
                    </button>
                  </>
                ) : (
                  !isReply && (
                    <button
                      className="flex items-center gap-1 justify-center rounded-md p-1 w-20 font-bold hover:bg-indigo-300"
                      onClick={() =>
                        setReplyBox(replyBox === comment.id ? null : comment.id)
                      }
                    >
                      <img src="./images/icon-reply.svg" alt="reply-icon" />
                      <p style={{ color: "#5357B6" }}>REPLY</p>
                    </button>
                  )
                )}
              </div>
            </div>
            <p className="text-gray-500">{comment.content}</p>

            {replyBox === comment.id && (
              <div className="mt-4">
                <textarea
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="Write your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => handleReplySubmit(comment.id)}
                  >
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderComment(items)}
      {items.replies?.length > 0 &&
        items.replies.map((reply) => renderComment(reply, true))}
    </>
  );
}

export default Card;
