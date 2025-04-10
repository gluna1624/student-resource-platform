import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ResourceList from './components/ResourceList.tsx';
import ResourceDetail from './components/ResourceDetail.tsx';
import Login from './components/Login.tsx';
import Navbar from './components/Navbar.jsx';
import ResourceUpload from './components/ResourceUpload.tsx';

const App: React.FC = () => {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<ResourceList />} />
        <Route path="/resources/:id" element={<ResourceDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<ResourceUpload />} />
      </Routes>
    </div>
  );
};

export default App;