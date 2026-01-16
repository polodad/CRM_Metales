
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Reception } from './pages/Reception';
import { Sales } from './pages/Sales';
import { Contacts } from './pages/Contacts';
import { Materials } from './pages/Materials';

import { Reports } from './pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="reception" element={<Reception />} />
          <Route path="sales" element={<Sales />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="materials" element={<Materials />} />
          {/* Prices route removed, use materials */}
          <Route path="reports" element={<Reports />} />
          <Route path="admin" element={<div className="p-4">Admin (WIP)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
