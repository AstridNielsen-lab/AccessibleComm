import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { MessageDisplay } from '../../components/movement/MessageDisplay';

describe('MessageDisplay', () => {
  it('should display default message when no message is provided', () => {
    const { getByText } = render(<MessageDisplay message="" onSpeak={() => {}} />);
    expect(getByText('Your message will appear here...')).toBeInTheDocument();
  });

  it('should display the provided message', () => {
    const testMessage = 'Hello, World!';
    const { getByText } = render(<MessageDisplay message={testMessage} onSpeak={() => {}} />);
    expect(getByText(testMessage)).toBeInTheDocument();
  });

  it('should call onSpeak when speak button is clicked', () => {
    const onSpeak = vi.fn();
    const { getByRole } = render(<MessageDisplay message="Test message" onSpeak={onSpeak} />);

    fireEvent.click(getByRole('button'));
    expect(onSpeak).toHaveBeenCalled();
  });

  it('should disable speak button when message is empty', () => {
    const { getByRole } = render(<MessageDisplay message="" onSpeak={() => {}} />);
    expect(getByRole('button')).toBeDisabled();
  });
});