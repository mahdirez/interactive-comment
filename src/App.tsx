import ComponentList from "./components/ComponentList";
import { useDataContext } from "./hooks/useDataContext";

export default function App() {
  const { allComments } = useDataContext();

  return (
    <div className="bg-stone-200 h-full overflow-hidden py-5 flex flex-col justify-center items-center gap-5">
      <ComponentList item={allComments} />
    </div>
  );
}
