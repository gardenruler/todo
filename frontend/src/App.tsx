import React from 'react';
import TodoInput from './todo/TodoInput';
import TodoList from './todo/TodoList';

function App(): JSX.Element {
  const todoList = [];
  const onInsert = (todo: string) => {
    todoList.push(todo);
  };
  return (
    <div className="App">
      <TodoInput onInsert={onInsert} />
      <TodoList />
    </div>
  );
}

export default App;
