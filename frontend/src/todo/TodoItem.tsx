import React, { useCallback } from 'react';
import { Todo } from '../api/todoApi';

export interface TodoProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}
const TodoItem = ({ todo, onToggle, onRemove }: TodoProps): JSX.Element => {
  const { id, content, done } = todo;
  const toggle = useCallback(() => onToggle(id), [id, onToggle]);
  const remove = useCallback(() => onRemove(id), [id, onRemove]);
  return (
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
        {content}
      </span>
      <button className="delete" type="button" onClick={remove}>
        ×
      </button>
    </li>
  );
};

export default TodoItem;
