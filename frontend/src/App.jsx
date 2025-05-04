import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login'; // Updated import
import Register from './pages/Register';
import UploadForm from './components/UploadForm';
import Search from './pages/Search';
import Profile from './pages/Profile';
import ResourceDetails from './pages/ResourceDetails';
// Other imports

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/upload" element={<UploadForm />} />
                <Route path="/search" element={<Search />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/resources/:resource_id" element={<ResourceDetails />} />
                {/* Other routes */}
            </Routes>
        </Router>
    );
}

export default App;