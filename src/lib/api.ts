import axios from 'axios';
import { Post } from './types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const fetchPosts = async () => {
  const { data } = await api.get<Post[]>('/posts');
  return data;
};

export const fetchPost = async (id: number) => {
  const { data } = await api.get<Post>(`/posts/${id}`);
  return data;
};

export const createPost = async (post: Post) => {
  const { data } = await api.post<Post>('/posts', { ...post, userId: 1 });
  return data;
};

export const updatePost = async (id: number, post: Post) => {
  const { data } = await api.put<Post>(`/posts/${id}`, { ...post, userId: 1 });
  return data;
};

export const deletePost = async (id: number) => {
  await api.delete(`/posts/${id}`);
};
