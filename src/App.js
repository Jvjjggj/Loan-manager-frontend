import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoanApplicationForm from './LoanApplicationForm';
import Dashboard from './Dashboard';
import Dashboard1 from './Dashboard1';
import UserDashboard from './Dashboard2';
import Dashboard3 from './Dashboard3';

function AppWrapper() {
  const location = useLocation();

  // Hide header on /dashboard
  const hideHeader = location.pathname === '/dashboard' || "/admin-dashboard";

  return (
    <div className="appContainer">
      {!hideHeader && (
        <header className="appHeader">
          <h1>Loan Manager Application</h1>
        </header>
      )}
      <main className="appMainContent">
        <Routes>
          <Route path="/" element={<LoanApplicationForm />} />
          <Route path="/verifier-dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<Dashboard1 />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/dashboard3" element={<Dashboard3 />} />
        </Routes>
      </main>
      <footer className="appFooter">
        <p className='copy-para'>&copy; 2024 Loan Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
