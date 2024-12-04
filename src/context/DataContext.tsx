import { v4 as uuidv4 } from "uuid";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Comments, Reply, User } from "../types/dataType";
import {
  addComment,
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
  addCommentUser: (content: string) => void;
  replyComment: (id: string, content: string) => void;
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

  const addCommentUser = (content: string) => {
    if (!currentUser) {
      console.error("User is not logged in.");
      return;
    }

    const data = {
      id: uuidv4(),
      content: content,
      createdAt: new Date().toISOString(),
      score: 0,
      user: currentUser,
      replies: [],
    };

    try {
      addComment(data);
      setAllComments((prev) => [data, ...prev]);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const replyComment = async (idParent: string, content: string) => {
    if (!currentUser) {
      console.error("user is not logged in");
      return;
    }
    const replyingToItem = allComments.find((item) => item.id === idParent);

    if (!replyingToItem) {
      console.log("parent comment not found.");
      return;
    }

    const data: Reply = {
      id: uuidv4(),
      content: content,
      createdAt: new Date().getTime().toLocaleString(),
      score: 0,
      replyingTo: replyingToItem?.user.username,
      user: {
        image: {
          png: currentUser?.image.png,
          webp: currentUser?.image.webp,
        },
        username: currentUser?.username,
      },
    };

    const addReply = {
      ...replyingToItem,
      replies: [...replyingToItem.replies, data],
    };

    try {
      const updateData = await updateComment(addReply);
      setAllComments((prev) =>
        prev.map((comment) => (comment.id === idParent ? updateData : comment))
      );
    } catch (err) {
      console.error(err);
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
        addCommentUser: addCommentUser,
        replyComment: replyComment,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
