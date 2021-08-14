import React from 'react';

export interface Todo {
  id: number;
  text: string;
  done: boolean;
}
export interface TodoProps {
  todo?: Todo;
}
const TodoList = ({ todo }: TodoProps) => {
  return (
    <ul>
      <li>
        <span>TDD training</span>
        <button type="button">delete</button>
      </li>
    </ul>
  );
};
export default TodoList;
