import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Example from './pages/Example.jsx'
import NotFound from './pages/NotFound.jsx';
import Home from './pages/Home.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Example" element={<Example />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
};

export default App;
