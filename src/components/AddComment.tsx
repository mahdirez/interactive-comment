import { useState } from "react";
import { useDataContext } from "../hooks/useDataContext";

function AddCommentComponent() {
  const { currentUser, addCommentUser } = useDataContext();
  const [text, setText] = useState<string>("");
  return (
    <div className="w-full flex justify-center bg-gray-200 fixed bottom-0 left-0 py-4">
      <div className="bg-white w-1/2 min-h-36 rounded p-6 flex items-start gap-4">
        <img src={currentUser?.image.png} className="w-12 h-12" />
        <textarea
          className="w-full min-h-24 text-gray-500 border-gray-200 rounded border-2 outline-none p-2 resize-none"
          placeholder="Add comment..."
          onChange={(i) => setText(i.target.value)}
          value={text}
        />
        <button
          style={{ background: "#5357B6" }}
          onClick={() => {
            window.scrollTo(0, document.body.scrollTop),
              addCommentUser(text),
              setText("");
          }}
          className="text-white  p-2 rounded-md min-w-24"
        >
          SEND
        </button>
      </div>
    </div>
  );
}

export default AddCommentComponent;
