import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Dashboard from './pages/Dashboard';
import Receipts from './pages/Receipts';
import Pantry from './pages/Pantry';
import Budget from './pages/Budget';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-6 flex-grow">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/receipts" element={<Receipts />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;