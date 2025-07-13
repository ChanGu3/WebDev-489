import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Example from './pages/Example.jsx'
import NotFound from './pages/NotFound.jsx'
import Home from './pages/Home.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/signup/Signup.jsx'
import SignupSuccess from './pages/signup/SignupSuccess.jsx'
import About from './pages/About.jsx'
import Search from './pages/Search.jsx'
//import SafeSpace from './pages/SafeSpace.jsx'
import CategoryResult from './pages/CategoryResult.jsx'
//import Categories from './pages/Categories.jsx'
import AnimeDetails from './pages/AnimeDetails.jsx'
import AnimeStream from './pages/AnimeStream.jsx'

function MemberAuthorization({children, hideFromMember=false, redirectURL='/404'})
{
  const [auth, setAuth] = useState(null);

  useEffect(() =>
  {
    fetch('/api/authorize/member', {
      method: 'GET',
      credentials: 'include',
    }).then((response) => {
      if(response.ok)
      {
        setAuth(true); 
      }
      else
      {
        setAuth(false);
      }
    }).catch((error) => {
        setAuth(false);
    });


  }, []);

  if (auth === null) {
    return (
      <div>Loading...</div>
    )
  }

  if(auth && !hideFromMember) 
  {
      return children
  }
  else if(!auth  && hideFromMember)
  {
      return children
  }
  else
  {
    return ( <Navigate to={redirectURL} replace/> );
  }
}

function App() {


  return (
    <Router>
      <Routes>

        {/* FOR EXAMPLE WE CAN REMOVE LATER */}
        <Route path="/Example" element={<Example />} />

        {/*Root URL*/}
        <Route path="">
          <Route path="" element={<Home />} />
          <Route path="404" element={<NotFound />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={ <Navigate to='/404' replace/>} />
        </Route>

        <Route path="discover">
          <Route path="" element={<Navigate to='/404' replace/>} />
          <Route path="search" element={<Search />} />
          <Route path="genre/:genre" element={<CategoryResult isGenre={true} isAZ={true}/>} />
          <Route path="other/A-Z" element={<CategoryResult isGenre={false} isAZ={true}/>} />
          {/*<Route path="genres" element={<Categories typeTitle="Genres"/>} />*/}
          {/*<Route path="other" element={<Categories typeTitle="Other"/>} />*/}
        </Route>

        <Route path="series" >
          <Route path="" element={<Navigate to='/404' replace/>} />
          <Route path=":animeID/:title" element={<AnimeDetails />}/>
        </Route>

        <Route path="stream">
          <Route path=":streamID/:title" element={
              <MemberAuthorization hideFromMember={false} redirectURL={"/auth/signin"}>
                <AnimeStream />
              </MemberAuthorization>
          }/>
        </Route>

        {/* Authentication */}
        <Route path="auth">
          <Route path="" element={<Navigate to='/404' replace/>} />
          <Route path="signin" element={
              <MemberAuthorization hideFromMember={true}>
                <Signin/>
              </MemberAuthorization>
            } 
          />
          <Route path="signup" element={
              <MemberAuthorization hideFromMember={true}>
                <Signup/>
              </MemberAuthorization>
            } />
          <Route path="signup/success" element={
              <MemberAuthorization>
                <SignupSuccess />
              </MemberAuthorization>
            } />
        </Route>

        <Route path="profile">
          <Route path="" element={<Navigate to='/404' replace/>} />
          {/*<Route path="safespace" element={<SafeSpace />} /> */}
        </Route>

      </Routes>
    </Router>
  )
};

export default App;
