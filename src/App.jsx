import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OrderList from './pages/OrderList';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/OrderList" element={<OrderList />} />
      </Routes>
    </>
  );
}

export default App;
