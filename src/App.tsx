import AddCommentComponent from "./components/AddComment";
import ComponentList from "./components/ComponentList";
import { useDataContext } from "./hooks/useDataContext";

export default function App() {
  const { allComments } = useDataContext();

  return (
    <div className="bg-gray-200 min-h-screen overflow-hidden py-5 flex flex-col justify-center items-center ">
      <div className="mb-36">
        <ComponentList item={allComments} />
      </div>
      <AddCommentComponent />
    </div>
  );
}
