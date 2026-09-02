import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import CollabsPage from './pages/Collabs/CollabsPage';
import BlogsPage from './pages/Blogs/BlogsPage';
import BlogArchivePage from './pages/Blogs/BlogArchivePage';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collabs" element={<CollabsPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/archive" element={<BlogArchivePage />} />
        <Route path="/blogs/archive" element={<BlogArchivePage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/login" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
