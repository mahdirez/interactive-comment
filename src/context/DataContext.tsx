import { createContext, ReactNode, useEffect, useState } from "react";
import { Comments } from "../types/dataType";
import { getComments } from "../services/dataService";

export const DataContext = createContext<{
  allComments: Comments[];
  setAllComments: React.Dispatch<React.SetStateAction<Comments[]>>;
} | null>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [allComments, setAllComments] = useState<Comments[]>([]);

  useEffect(() => {
    fetchComment();
  });

  const fetchComment = async () => {
    const data = await getComments();
    setAllComments(data);
  };

  return (
    <DataContext.Provider value={{ allComments, setAllComments }}>
      {children}
    </DataContext.Provider>
  );
};
