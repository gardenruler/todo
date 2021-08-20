import React, { useCallback, useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { Todo } from '../api/todoApi';

export interface TodoProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}
const TodoItem = ({ todo, onToggle, onRemove }: TodoProps): JSX.Element => {
  const { id, content, done } = todo;
  const [editable, setEditable] = useState(false);
  const toggle = useCallback(() => onToggle(id), [id, onToggle]);
  const remove = useCallback(() => onRemove(id), [id, onRemove]);
  return (
    <>
      <li className={done ? 'done' : ''}>
        <button className="toggle" type="button" onClick={toggle}>
          {' '}
        </button>
        <span
          role="button"
          tabIndex={0}
          style={{
            textDecoration: done ? 'line-through' : 'none',
          }}
          onKeyDown={toggle}
        >
          {editable ? <input type="text" value={content} /> : content}
        </span>
        <button
          className="editable"
          type="button"
          onClick={() => {
            setEditable(!editable);
          }}
        >
          <BsPencil />
        </button>
        <button className="delete" type="button" onClick={remove}>
          ×
        </button>
      </li>
    </>
  );
};

export default TodoItem;
