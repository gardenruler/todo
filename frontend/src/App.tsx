import React from 'react';
import TodoInput from './todo/TodoInput';
import TodoList, { Todo } from './todo/TodoList';
import './todo/Todo.scss';

function App(): JSX.Element {
  const todoList = [];

  const todo: Todo = {
    id: '1',
    text: 'TDD training',
    done: true,
  };
  const onInsert = (todoText: string) => {
    todoList.push(todoText);
  };
  const onToggle = (id: string) => {
    console.log(id);
  };
  const onRemove = (id: string) => {
    console.log(id);
  };
  return (
    <div className="App">
      <h1>TODO</h1>
      <div className="main">
        <TodoInput onInsert={onInsert} />
        <TodoList todo={todo} onToggle={onToggle} onRemove={onRemove} />
      </div>
    </div>
  );
}

export default App;
