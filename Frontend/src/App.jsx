import React from 'react'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './Pages/Auth/Login';
import SignUp from './Pages/Auth/SignUp';
import Home from './Pages/Dashboard/Home';
import Income from './Pages/Dashboard/income';
import Expense from './Pages/Dashboard/Expense';
import UserProvider from './Context/userContext';

const App = () => {
  return (

    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>

  );
};

export default App

const Root = () => {

  //check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");

  //redirect to dashboard if authenticated, otherwise to login

  return isAuthenticated ?
    (
      <Navigate to="/dashboard" />
    ) :
    (
      <Navigate to="/login" />
    )
}