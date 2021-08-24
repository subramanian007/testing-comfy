import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Sidebar, Footer } from './components';
import {
  HomePage,
  ErrorPage,
  AboutPage,
  AuthWrapper,
  CartPage,
  CheckoutPage,
  PrivateRoute,
  ProductsPage,
  SingleProductPage,
} from './pages';

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/about" exact>
            <AboutPage />
          </Route>
          <Route path="/cart" exact>
            <CartPage />
          </Route>
          <PrivateRoute path="/checkout" exact>
            <CheckoutPage />
          </PrivateRoute>
          <Route path="/products" exact>
            <ProductsPage />
          </Route>
          <Route path="/products/:id" exact children={<SingleProductPage />} />
          <Route path="*" exact>
            <ErrorPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
