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

  it('toggles todo done', () => {
    const { getByPlaceholderText, getByText } = render(<TodoApp />);
    // add todo
    fireEvent.change(getByPlaceholderText('Add a task'), {
      target: {
        value: 'new Todo',
      },
    });
    fireEvent.click(getByText('+'));
    const spanText = getByText('new Todo');

    // toggle todo
    fireEvent.click(spanText);
    expect(spanText).toHaveStyle('text-decoration: line-through;');

    fireEvent.click(spanText);
    expect(spanText).not.toHaveStyle('text-decoration: line-through;');
  });

  it('removes todo', () => {
    const { getByPlaceholderText, getByText } = render(<TodoApp />);
    // add todo
    fireEvent.change(getByPlaceholderText('Add a task'), {
      target: {
        value: 'new Todo',
      },
    });
    fireEvent.click(getByText('+'));
    const spanText = getByText('new Todo');

    // remove todo
    const removeButton = spanText.nextSibling;

    if (!removeButton) return;
    fireEvent.click(removeButton);
    expect(spanText).not.toBeInTheDocument(); // 페이지에서 사라졌음을 의미함
  });
});
