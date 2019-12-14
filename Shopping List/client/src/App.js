import React from 'react';
import AppNavbar from './components/appNavbar/AppNavbar';
import ShoppingList from './components/shoppingList/ShoppingList';
import {
  Container,
} from 'react-bootstrap';
import './App.css';
import {
  Provider
} from 'react-redux';
import store from './redux/store';
const App = () => {
  return (
    <Provider store={store}>
      <AppNavbar />
      <Container>
        <ShoppingList />
      </Container>
    </Provider>
  )
};

export default App;