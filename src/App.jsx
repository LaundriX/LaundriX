import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OrderList from './pages/OrderList';
import PreLoader from './components/PreLoader';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmation';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={isLoading ? <PreLoader /> : <LandingPage />} />
        <Route path="/OrderList" element={<OrderList />} />
        <Route path="/CheckoutPage" element={<CheckoutPage />} />
        <Route
          path="/OrderConfirmationPage"
          element={<OrderConfirmationPage />}
        />
      </Routes>
    </>
  );
}

export default App;
