import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Example from './pages/Example.jsx'
import NotFound from './pages/NotFound.jsx'
import Home from './pages/Home.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/signup/Signup.jsx'
import SignupSuccess from './pages/signup/SignupSuccess.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Example" element={<Example />} />
        <Route path="/" element={<Home />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/signup/success" element={<SignupSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
};

export default App;
