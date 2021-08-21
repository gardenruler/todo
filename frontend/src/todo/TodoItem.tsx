import React, { useCallback, useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { BiSave } from 'react-icons/bi';
import { Todo } from '../api/todoApi';

export interface TodoProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onEdit: (todo: Todo) => void;
}
const TodoItem = ({
  todo,
  onToggle,
  onRemove,
  onEdit,
}: TodoProps): JSX.Element => {
  const { id, content, done } = todo;
  const [editable, setEditable] = useState(false);
  const toggle = useCallback(() => onToggle(id), [id, onToggle]);
  const remove = useCallback(() => onRemove(id), [id, onRemove]);
  const [todoContent, setTodoContent] = useState(content);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit({ ...todo, content: todoContent });
    setEditable(false);
  };
  return (
    <>
      <li className={done ? 'done' : ''}>
        <button
          data-testid="toggle"
          className="toggle"
          type="button"
          onClick={toggle}
        >
          {' '}
        </button>
        {editable ? (
          <form onSubmit={onSubmit}>
            <input
              type="text"
              data-testid="editInput"
              value={todoContent}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTodoContent(e.target.value)
              }
            />
            <button type="submit" data-testid="saveButton">
              <BiSave />
            </button>
          </form>
        ) : (
          <>
            <span
              style={{
                textDecoration: done ? 'line-through' : 'none',
              }}
            >
              {content}
            </span>
            <button
              data-testid="edit"
              className="editable"
              type="button"
              onClick={() => {
                setEditable(!editable);
              }}
            >
              <BsPencil />
            </button>
          </>
        )}
        <button className="delete" type="button" onClick={remove}>
          ×
        </button>
      </li>
    </>
  );
};

export default TodoItem;
