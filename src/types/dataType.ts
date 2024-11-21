export type User = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export type Comments = {
  id: string;
  content: string;
  createAt: string;
  score: 12;
  user: User;
  reply: [];
};
