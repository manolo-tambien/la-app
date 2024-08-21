import { render, screen } from '@testing-library/react';
import Boton from '../../../app/login/boton';

test('renders greeting with name prop', () => {
  render(<Boton name="ola" />);
  const greetingElement = screen.getByText(/ola/i);
  expect(greetingElement).toBeInTheDocument();
});