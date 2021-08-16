import React from 'react';

export interface Todo {
  id: string;
  text: string;
  done: boolean;
}
export interface TodoProps {
  todo?: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}
const TodoList = ({ todo, onToggle, onRemove }: TodoProps) => {
  return (
    <div className="listWrapper">
      <ul>
        {todo && (
          <li className={todo.done ? 'done' : ''}>
            <button className="toggle" type="button">
              {' '}
            </button>
            <span
              role="button"
              tabIndex={0}
              style={{
                textDecoration: todo.done ? 'line-through' : 'none',
              }}
              onClick={() => {
                onToggle(todo.id);
              }}
              onKeyDown={() => {
                onToggle(todo.id);
              }}
            >
              {todo.text}
            </span>
            <button
              className="delete"
              type="button"
              onClick={() => {
                onRemove(todo.id);
              }}
            >
              ×
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
export default TodoList;
