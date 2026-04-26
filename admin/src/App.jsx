import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Add from './pages/Add';
import List from './pages/List';
import Orders from './pages/Orders';

function App() {
  const url = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
            <Route path="*" element={<Add url={url} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
