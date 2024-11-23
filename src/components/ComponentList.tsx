import { Comments } from "../types/dataType";
import Card from "./Card";

type ComponentListProps = {
  item: Comments[];
};

function ComponentList({ item }: ComponentListProps) {
  return item.map((i) => {
    return <Card items={i} />;
  });
}

export default ComponentList;
