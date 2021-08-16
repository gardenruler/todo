import React from 'react';
import TodoApp from './todo/TodoApp';
import './todo/Todo.scss';

function App(): JSX.Element {
  return (
    <div className="App">
      <h1>TODO</h1>
      <TodoApp />
    </div>
  );
}

export default App;
