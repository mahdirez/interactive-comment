import { createContext, ReactNode, useEffect, useState } from "react";
import { Comments, User } from "../types/dataType";
import {
  deleteComment,
  getComments,
  getCurrentUser,
  updateComment,
} from "../services/dataService";

export const DataContext = createContext<{
  allComments: Comments[];
  setAllComments: React.Dispatch<React.SetStateAction<Comments[]>>;
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  deleteComment: (id: string) => void;
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

  const handleDelete = (id: string) => {
    const parent = allComments.find((item) => item.id === id);
    console.log(parent);

    if (!parent) {
      const foundParent = allComments.find((item) =>
        item.replies.some((child) => child.id === id)
      );

      if (foundParent) {
        const updatedReplies = foundParent.replies.filter(
          (item) => item.id !== id
        );

        const updatedParent = {
          ...foundParent,
          replies: updatedReplies,
        };

        try {
          updateComment(updatedParent);
          setAllComments((prev) =>
            prev.map((item) =>
              item.id === foundParent.id ? updatedParent : item
            )
          );
        } catch (error) {
          console.error("Error updating replies:", error);
        }
      } else {
        console.log(parent);
      }
    } else {
      deleteComment(parent.id);
      setAllComments((prev) =>
        prev.filter((items) => {
          return items.id !== id;
        })
      );
    }
  };

  return (
    <DataContext.Provider
      value={{
        allComments,
        setAllComments,
        currentUser,
        setCurrentUser,
        deleteComment: handleDelete,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
