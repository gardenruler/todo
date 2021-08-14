import React from 'react';
import TodoInput from './todo/TodoInput';

function App(): JSX.Element {
  const todoList = [];
  const onInsert = (todo: string) => {
    todoList.push(todo);
  };
  return (
    <div className="App">
      <TodoInput onInsert={onInsert} />
    </div>
  );
}

export default App;
