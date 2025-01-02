import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { VirtualKeyboard } from '../../components/movement/VirtualKeyboard';

describe('VirtualKeyboard', () => {
  it('should render all letters', () => {
    const onLetterSelect = vi.fn();
    const { getByText } = render(<VirtualKeyboard onLetterSelect={onLetterSelect} />);

    // Test for presence of all letters
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
      expect(getByText(letter)).toBeInTheDocument();
    });

    // Test for special characters
    [' ', '.', '?', '!'].forEach(char => {
      expect(getByText(char)).toBeInTheDocument();
    });
  });

  it('should call onLetterSelect when a letter is clicked', () => {
    const onLetterSelect = vi.fn();
    const { getByText } = render(<VirtualKeyboard onLetterSelect={onLetterSelect} />);

    fireEvent.click(getByText('A'));
    expect(onLetterSelect).toHaveBeenCalledWith('A');

    fireEvent.click(getByText('Z'));
    expect(onLetterSelect).toHaveBeenCalledWith('Z');

    fireEvent.click(getByText(' '));
    expect(onLetterSelect).toHaveBeenCalledWith(' ');
  });
});