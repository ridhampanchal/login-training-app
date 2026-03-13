import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard';
import MainLayout from './layouts/MainLayout';
import { ThemeProvider } from './components/common/ThemeToggle';

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="auth">
              <Route path="login" element={<Auth type="login" />} />
              <Route path="otp" element={<Auth type="otp" />} />
            </Route>

            <Route path='/dashboard' element={<Dashboard />}></Route>

            <Route path="*" element={<Navigate to="/auth/login" replace />} />
          </Route>
        </Routes>
      </BrowserRouter >
    </ThemeProvider>
  );
}

export default App;
