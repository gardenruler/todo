import React from 'react';
import { render } from '@testing-library/react';
import TodoList, { Todo, TodoProps } from './TodoList';

describe('<Todolist/>', () => {
  const sampleTodo: Todo = {
    id: 1,
    text: 'TDD training',
    done: false,
  };
  const setup = ({ todo = sampleTodo }: TodoProps) => {
    const utils = render(<TodoList todo={todo} />);
    const { getByText } = utils;
    const span = getByText(todo.text);
    const button = getByText('delete');
    return {
      ...utils,
      span,
      button,
    };
  };
  it('has span and button', () => {
    const { span, button } = setup({ todo: sampleTodo });
    expect(span).toBeTruthy();
    expect(button).toBeTruthy();
  });
});
