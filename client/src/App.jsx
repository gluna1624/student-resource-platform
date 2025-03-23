import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ResourceList from './components/ResourceList';
import ResourceDetail from './components/ResourceDetail';
import ResourceUpload from './components/ResourceUpload';
import Login from './components/Login'; // Adjusted path

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<ResourceList />} />
          <Route path="/resources/:id" element={<ResourceDetail />} />
          <Route path="/upload" element={<ResourceUpload />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
