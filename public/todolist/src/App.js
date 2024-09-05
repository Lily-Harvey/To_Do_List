import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/login/login';
import RegisterPage from './components/register/register';
import TaskManager from './components/TaskManager/TaskManager';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<TaskManager />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
