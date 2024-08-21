import { render, screen } from '@testing-library/react';
import Page from '../../../app/page';

test('renders greeting with name prop', () => {
  render(<Page />);
  const greetingElement = screen.getByText(/Hello, Alice!/i);
  expect(greetingElement).toBeInTheDocument();
});