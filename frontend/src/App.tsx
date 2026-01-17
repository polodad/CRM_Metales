import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Reception } from './pages/Reception';
import { Sales } from './pages/Sales';
import { Contacts } from './pages/Contacts';
import { Materials } from './pages/Materials';
import LandingPage from './pages/LandingPage';
import { Reports } from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reception" element={<Reception />} />
              <Route path="/sales" element={<Sales />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/materials" element={<Materials />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/admin" element={<div className="p-4">Admin (WIP)</div>} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
