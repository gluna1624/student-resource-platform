import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ResourceList from './components/ResourceList.tsx';
import ResourceDetail from './components/ResourceDetail.tsx';
import Login from './components/Login.tsx';
import Navbar from './components/Navbar.jsx';
import ResourceUpload from './components/ResourceUpload.tsx';
import Register from './components/Register.tsx';
import AdminPanel from './components/AdminPanel.tsx';

const App: React.FC = () => {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<ResourceList />} />
        <Route path="/resources/:id" element={<ResourceDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<ResourceUpload />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </div>
  );
};

export default App;