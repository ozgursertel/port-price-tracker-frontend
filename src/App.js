import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Ports from './components/Ports';
import AddPort from './components/AddPort';
import Price from './components/Price';
import AddPricing from './components/AddPricing'
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AddUser from './components/AddUser';
import AddCity from './components/AddCity';
import AddCountry from './components/AddCountry';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="container mt-5">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/ports" element={<Ports />} />
            <Route path="/pricing" element={<Price />} />
            <Route path="/add-pricing" element={<AddPricing />} />
          </Route>
          <Route element={<ProtectedRoute roles={['ROLE_ADMIN']} />}>
            <Route path="/register-user" element={<AddUser />} />
            <Route path="/add-city" element={<AddCity />} />
            <Route path="/add-port" element={<AddPort />} />
            <Route path="/add-country" element={<AddCountry />} />


          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
