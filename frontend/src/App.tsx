import React from 'react';
import TodoInput from './todo/TodoInput';
import TodoList from './todo/TodoList';
import { Todo } from './todo/type';
import './todo/Todo.scss';

function App(): JSX.Element {
  const todoList: Todo[] = [
    {
      id: '1',
      text: 'TDD training',
      done: false,
    },
    {
      id: '2',
      text: 'going to home',
      done: true,
    },
  ];
  const onInsert = (todoText: string) => {
    todoList.push({
      id: '3',
      text: todoText,
      done: false,
    });
  };
  return (
    <div className="App">
      <h1>TODO</h1>
      <div className="main">
        <TodoInput onInsert={onInsert} />
        <TodoList todoList={todoList} />
      </div>
    </div>
  );
}

export default App;
