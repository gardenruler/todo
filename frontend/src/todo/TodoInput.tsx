import React, { useState } from 'react';

const TodoInput = (): JSX.Element => {
  const [todo, setTodo] = useState('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };
  return (
    <>
      <input
        type="text"
        placeholder="Add a task"
        onChange={onChangeHandler}
        value={todo}
      />
      <button type="button">submit</button>
    </>
  );
};
export default TodoInput;
