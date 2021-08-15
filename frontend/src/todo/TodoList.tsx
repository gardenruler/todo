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
    <div className="listWrapper">
      <ul>
        <li className="done">
          <button className="toggle" type="button">
            {' '}
          </button>
          <span>TDD training</span>
          <button className="delete" type="button">
            ×
          </button>
        </li>
      </ul>
    </div>
  );
};
export default TodoList;
