import React from 'react';
import TodoApp from './todo/TodoApp';
import './todo/Todo.scss';

function App(): JSX.Element {
  return (
    <div className="App">
      <TodoApp />
    </div>
  );
}

export default App;
