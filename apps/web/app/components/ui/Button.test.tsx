import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Button } from '@/components/ui/Button';

describe('<Button />', () => {
  test('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByTestId('button')).toHaveTextContent('Click me');
  });

  test('applies primary variant styles by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('data-button-variant', 'primary');
  });

  test('applies secondary variant styles', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('data-button-variant', 'secondary');
  });

  test('applies custom className', () => {
    render(<Button className="custom-class">With Class</Button>);
    const button = screen.getByTestId('button');
    expect(button.className).toContain('custom-class');
  });

  test('calls onClick handler when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    const button = screen.getByTestId('button');
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  test('sets the correct type attribute', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('sets data-testid attribute', () => {
    render(<Button data-testid="custom-id">TestId</Button>);
    const button = screen.getByTestId('custom-id');
    expect(button).toBeInTheDocument();
  });
});
