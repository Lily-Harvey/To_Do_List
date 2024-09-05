import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/login/login';
import RegisterPage from './components/register/register';
import TaskManager from './components/TaskManager/TaskManager';

function App() {
  return (
    // Router component to enable routing in the app
    <Router>
      <Routes>
        {/* Route for the task manager page */}
        <Route path='/' element={<TaskManager />} />
        {/* Route for the login page */}
        <Route path="/login" element={<LoginPage />} />
        {/* Route for the registration page */}
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
