import { useEffect, useState } from "react";
import { Comments } from "./types/dataType";
import { getComments } from "./services/dataService";
import ComponentList from "./components/ComponentList";

export default function App() {
  const [allComments, setAllComments] = useState<Comments[]>([]);
  // console.log(allComments);

  useEffect(() => {
    fetchComment();
  }, []);
  const fetchComment = async () => {
    const data = await getComments();
    setAllComments(data);
  };

  return (
    <div className="bg-stone-200 h-full overflow-hidden py-5 flex flex-col justify-center items-center gap-5">
      <ComponentList item={allComments} />
    </div>
  );
}
