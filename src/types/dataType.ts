export type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export type Reply = {
  id: any;
  content: string;
  createAt: string;
  score: number;
  replyingTo: string;
  user: User;
};

export type Comments = {
  id: any;
  content: string;
  createAt: string;
  score: number;
  user: User;
  replies: Reply[];
};
