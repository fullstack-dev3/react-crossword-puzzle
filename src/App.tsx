import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Level from './pages/Level';
import Category from './pages/Category';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/level" element={<Level />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;