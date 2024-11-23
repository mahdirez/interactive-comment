import { Comments, Reply } from "../types/dataType";

type CardProps = {
  items: Comments;
};

function Card({ items }: CardProps) {
  const renderComment = (comment: Comments | Reply, isReply = false) => {
    return (
      <div className="flex w-screen items-center justify-center">
        {isReply && (
          <div className="ml-20 border-2 border-gray-300  self-stretch mr-4"></div>
        )}
        <div
          className={`bg-white w-1/2 h-36 rounded p-6 flex gap-4 `}
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
                <p className="text-zinc-500">{comment.createAt}</p>
                {isReply && (
                  <span className="text-sm text-gray-500">
                    replying to{" "}
                    <strong>@{(comment as Reply).replyingTo}</strong>
                  </span>
                )}
              </div>
              <button className="flex items-center gap-3 rounded-md w-20 font-bold hover:bg-indigo-300">
                <img src="./images/icon-reply.svg" alt="reply-icon" />
                <p style={{ color: "#5357B6" }}>REPLY</p>
              </button>
            </div>
            <p className="text-gray-500">{comment.content}</p>
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
