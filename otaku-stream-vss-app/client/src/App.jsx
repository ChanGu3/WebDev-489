import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Example from './pages/Example.jsx'
import NotFound from './pages/NotFound.jsx'
import Home from './pages/Home.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/signup/Signup.jsx'
import SignupSuccess from './pages/signup/SignupSuccess.jsx'
import About from './pages/About.jsx'

function App() {
  return (
    <Router>
      <Routes>

        {/* FOR EXAMPLE WE CAN REMOVE LATER */}
        <Route path="/Example" element={<Example />} />

        {/*Root URL*/}
        <Route path="">
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
          <Route path="about" element={<About />} />
        </Route>


        {/* Authentication */}
        <Route path="auth">
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signup/success" element={<SignupSuccess />} />
        </Route>

      </Routes>
    </Router>
  )
};

export default App;
