import { screen, render } from '@testing-library/react';
import Icons from './icons';
describe('Component: Icons', () => {
  it('should render correctly', () => {
    render(<Icons />);
    expect(screen.getByTestId('icons')).toBeInTheDocument();
  });
}
);
