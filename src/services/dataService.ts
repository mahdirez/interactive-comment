import axios from "axios";
import { Comments, User } from "../types/dataType";

const API_URL = "http://localhost:5001/comments";
const API_URL_CurrentUser = "http://localhost:5001/currentUser";

export const getCurrentUser = async (): Promise<User> => {
  const response = await axios.get(API_URL_CurrentUser);
  return response.data;
};

export const getComments = async (): Promise<Comments[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addComment = async (
  item: Omit<Comments, "id">
): Promise<Comments> => {
  const response = await axios.post(API_URL, item);
  return response.data;
};

export const updateComment = async (item: Comments): Promise<Comments> => {
  const response = await axios.put(`${API_URL}/${item.id}`, item);
  return response.data;
};

export const deleteComment = async (id: any): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
