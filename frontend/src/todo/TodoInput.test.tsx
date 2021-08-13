import React from 'react';
import { fireEvent, getByText, render } from '@testing-library/react';
import TodoInput from './TodoInput';

describe('<TodoForm/>', () => {
  it('has input and a button', () => {
    const { getByPlaceholderText, getByText } = render(<TodoInput />);
    getByPlaceholderText('Add a task');
    getByText('submit');
  });
  it('change input', () => {
    const { getByPlaceholderText } = render(<TodoInput />);
    const input = getByPlaceholderText('Add a task');
    fireEvent.change(input, {
      target: {
        value: 'TDD training',
      },
    });
    expect(input).toHaveAttribute('value', 'TDD training');
  });
});
