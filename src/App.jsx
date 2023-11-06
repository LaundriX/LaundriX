import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OrderList from './pages/OrderList';
import PreLoader from './components/PreLoader';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmation';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={isLoading ? <PreLoader /> : <LandingPage />} />
        <Route
          path="/OrderList"
          element={isLoading ? <PreLoader /> : <OrderList />}
        />
        <Route
          path="/CheckoutPage"
          element={isLoading ? <PreLoader /> : <CheckoutPage />}
        />
        <Route
          path="/OrderConfirmationPage"
          element={isLoading ? <PreLoader /> : <OrderConfirmationPage />}
        />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </>
  );
}

export default App;
