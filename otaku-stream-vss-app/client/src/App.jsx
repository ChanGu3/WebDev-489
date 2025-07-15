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

import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import AnimeManagement from './pages/Admin/AnimeManagement.jsx';
import Analytics from './pages/Admin/Analytics.jsx';
import UserManagement from './pages/Admin/UserManagement.jsx';

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

        {/* Admin */}
        <Route path="admin">
          <Route path="" element={<AdminDashboard />} />
          <Route path="animeManagement" element={<AnimeManagement />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="userManagement" element={<UserManagement />} />
        </Route>

      </Routes>
    </Router>
  )
};

export default App;
