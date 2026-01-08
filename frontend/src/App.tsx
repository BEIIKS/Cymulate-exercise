import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { PhishingSimulationPage } from './pages/dashboard/PhishingSimulationPage';
import { Layout } from './components/ui/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
// import './App.css'; // Removed in favor of global styles

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<PhishingSimulationPage />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
          </Route>
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
