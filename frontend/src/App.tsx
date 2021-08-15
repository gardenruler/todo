import React from 'react';
import TodoInput from './todo/TodoInput';
import TodoList from './todo/TodoList';
import './todo/Todo.scss';

function App(): JSX.Element {
  const todoList = [];
  const onInsert = (todo: string) => {
    todoList.push(todo);
  };
  return (
    <div className="App">
      <h1>TODO</h1>
      <div className="main">
        <TodoInput onInsert={onInsert} />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
