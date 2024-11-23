export type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export type Reply = {
  id: number | string;
  content: string;
  createAt: string;
  score: number;
  replyingTo: string;
  user: User;
};

export type Comments = {
  id: number | string;
  content: string;
  createAt: string;
  score: number;
  user: User;
  replies: Reply[];
};
