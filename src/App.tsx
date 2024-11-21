import { useEffect, useState } from "react";
import Card from "./components/Card";
import { Comments } from "./types/dataType";
import { getComments } from "./services/dataService";

export default function App() {
  const [allComments, setAllComments] = useState<Comments[]>([]);

  useEffect(() => {
    fetchComment();
  }, []);
  const fetchComment = async () => {
    const data = await getComments();
    setAllComments(data);
  };

  return (
    <div className="bg-stone-200 h-screen flex flex-col justify-center items-center gap-5">
      {allComments.map((item: Comments) => {
        return (
          <Card
            user={item.user}
            score={item.score}
            content={item.content}
            createAt={item.createAt}
            id={item.id}
            reply={item.reply}
          />
        );
      })}
    </div>
  );
}
