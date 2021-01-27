import React from 'react';
import { render } from '@testing-library/react';
import App from '../components/App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });
});
