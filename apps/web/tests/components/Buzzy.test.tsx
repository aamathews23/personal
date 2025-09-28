import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Buzzy } from '@/components/Buzzy';

describe('Buzzy', () => {
  it('mounts', () => {
    render(<Buzzy />);
    const buzzy = screen.getByTestId('buzzy');
    const circles = buzzy.querySelectorAll('circle');

    expect(buzzy).toBeInTheDocument();
    expect(buzzy).toHaveClass('h-16', 'w-16');
    expect(circles.length).toBeGreaterThanOrEqual(4); // 2 eyes + 2 arms
  });
});
