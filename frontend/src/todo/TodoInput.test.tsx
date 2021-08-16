import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TodoInput from './TodoInput';

describe('<TodoForm/>', () => {
  const onInsert = jest.fn();
  it('has input and a button', () => {
    const { getByPlaceholderText, getByText } = render(
      <TodoInput onInsert={onInsert} />,
    );
    expect(getByPlaceholderText('Add a task')).toBeTruthy();
    expect(getByText('+')).toBeTruthy();
  });
  it('change input', () => {
    const { getByPlaceholderText } = render(<TodoInput onInsert={onInsert} />);
    const input = getByPlaceholderText('Add a task');
    fireEvent.change(input, {
      target: {
        value: 'TDD training',
      },
    });
    expect(input).toHaveAttribute('value', 'TDD training');
  });

  it('submit and clears input', () => {
    const { getByPlaceholderText, getByText } = render(
      <TodoInput onInsert={onInsert} />,
    );
    const input = getByPlaceholderText('Add a task');
    const button = getByText('+');
    fireEvent.change(input, {
      target: {
        value: 'TDD training',
      },
    });
    fireEvent.click(button);
    expect(onInsert).toBeCalledWith('TDD training');
    expect(input).toHaveAttribute('value', '');
  });
});
