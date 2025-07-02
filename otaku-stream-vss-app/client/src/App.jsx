import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Example from './pages/Example.jsx'
import NotFound from './pages/NotFound.jsx'
import Home from './pages/Home.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/signup/Signup.jsx'
import SignupSuccess from './pages/signup/SignupSuccess.jsx'
import About from './pages/About.jsx'
import Search from './pages/Search.jsx'
import SafeSpace from './pages/SafeSpace.jsx'
import CategoryResult from './pages/CategoryResult.jsx'
import Categories from './pages/Categories.jsx'

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

        <Route path="discover">
          <Route path="search" element={<Search />} />
          <Route path="category" element={<CategoryResult/>} />
          <Route path="genres" element={<Categories typeTitle="Genres"/>} />
          <Route path="other" element={<Categories typeTitle="Other"/>} />
        </Route>


        {/* Authentication */}
        <Route path="auth">
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signup/success" element={<SignupSuccess />} />
        </Route>

        <Route path="profile">
          <Route path="safespace" element={<SafeSpace />} />
        </Route>

      </Routes>
    </Router>
  )
};

export default App;
