import { createContext, ReactNode, useEffect, useState } from "react";
import { Comments, User } from "../types/dataType";
import { getComments, getCurrentUser } from "../services/dataService";

export const DataContext = createContext<{
  allComments: Comments[];
  setAllComments: React.Dispatch<React.SetStateAction<Comments[]>>;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
} | null>(null);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [allComments, setAllComments] = useState<Comments[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    fetchCurrentUserInformation();
    fetchComment();
  }, []);

  const fetchComment = async () => {
    const data = await getComments();
    setAllComments(data);
  };

  const fetchCurrentUserInformation = async () => {
    const data = await getCurrentUser();
    setCurrentUser(data);
  };

  return (
    <DataContext.Provider
      value={{ allComments, setAllComments, currentUser, setCurrentUser }}
    >
      {children}
    </DataContext.Provider>
  );
};
