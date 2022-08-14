import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../../store/PostStore';
import App from '../../App';

test('renders arbit blog link', () => {
  let store = configureStore({ reducer: { post: postReducer } });
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/Arbit Blog/i);
  expect(linkElement).toBeInTheDocument();
});
