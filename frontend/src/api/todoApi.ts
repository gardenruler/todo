import axios from 'axios';

export const BASE_URI =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'http://localhost:8080';
const todoAPI = {
  todoList: async (): Promise<Todo[]> => {
    try {
      const response = await axios.get<Todo[]>(`${BASE_URI}/tasks`);
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  },
  todoInsert: async (todo: { content: string }): Promise<Todo> => {
    try {
      const response = await axios.post<Todo>(`${BASE_URI}/tasks`, todo);
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  },
  todoToggle: async (todoId: number): Promise<Todo> => {
    try {
      const response = await axios.patch<Todo>(`${BASE_URI}/tasks/${todoId}`);
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  },

  todoPut: async (todo: Todo): Promise<Todo> => {
    try {
      const response = await axios.put<Todo>(
        `${BASE_URI}/tasks/${todo.id}`,
        todo,
      );
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  },
  todoDelete: async (todoId: number): Promise<Todo> => {
    try {
      const response = await axios.delete<Todo>(`${BASE_URI}/tasks/${todoId}`);
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
