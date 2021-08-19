import axios from 'axios';

export const BASE_URI = 'http://localhost:8080';
const todoAPI = {
  todoList: async (): Promise<Todo[]> => {
    try {
      const response = await axios.get<Todo[]>(`${BASE_URI}/tasks`);
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export interface Todo {
  id: number;
  createdAt: string;
  updatedAt: string;
  content: string;
  done: boolean;
}

export default todoAPI;
