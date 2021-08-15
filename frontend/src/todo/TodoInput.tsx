import React, { useState } from 'react';

export interface TodoProps {
  onInsert: (value: string) => void;
}

const TodoInput = ({ onInsert }: TodoProps): JSX.Element => {
  const [todo, setTodo] = useState('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };
  const onSubmit = (e: React.FormEvent) => {
    onInsert(todo);
    setTodo('');
    e.preventDefault();
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="inputWrapper">
          <input
            className="todoInput"
            type="text"
            placeholder="Add a task"
            onChange={onChangeHandler}
            value={todo}
          />
          <button type="submit">+</button>
        </div>
      </form>
    </>
  );
};
export default TodoInput;
