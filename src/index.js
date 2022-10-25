import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import { AuthProvider } from './context/AuthProvider';
import App from './App';
import { BrowserRouter,Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

