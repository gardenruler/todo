import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoApp from './TodoApp';

describe('<TodoApp/>', () => {
  it('renders TodoInput and TodoList', () => {
    const { getByText, getByTestId } = render(<TodoApp />);
    expect(getByText('+')).toBeTruthy();
    expect(getByTestId('TodoList')).toBeTruthy();
  });

  it('add new todo', () => {
    const { getByPlaceholderText, getByText } = render(<TodoApp />);
    fireEvent.change(getByPlaceholderText('Add a task'), {
      target: {
        value: 'new Todo',
      },
    });
    fireEvent.click(getByText('+'));
    expect(getByText('new Todo')).toBeTruthy();
  });
});
