import React, { useCallback } from 'react';

export interface Todo {
  id: string;
  text: string;
  done: boolean;
}
export interface TodoProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
}
const TodoList = ({ todo, onToggle, onRemove }: TodoProps) => {
  const { id, text, done } = todo;
  const toggle = useCallback(() => onToggle(id), [id, onToggle]);
  const remove = useCallback(() => onRemove(id), [id, onRemove]);
  return (
    <div className="listWrapper">
      <ul>
        {todo && (
          <li className={done ? 'done' : ''}>
            <button className="toggle" type="button">
              {' '}
            </button>
            <span
              role="button"
              tabIndex={0}
              style={{
                textDecoration: done ? 'line-through' : 'none',
              }}
              onClick={toggle}
              onKeyDown={toggle}
            >
              {text}
            </span>
            <button className="delete" type="button" onClick={remove}>
              ×
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};
export default TodoList;
