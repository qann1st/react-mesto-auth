import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PrivateOutlet from './components/PrivateOutlet';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { api, authApi } from './utils/Api';

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isAuth, setIsAuth] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const navigate = useNavigate()

  React.useEffect(() => {
    handleCheck()
    api.getUserInfo().then((res) => setCurrentUser(res));
  }, []);

  function handleLogin(e, email, password) {
    e.preventDefault();
    authApi
      .loginUser(email, password)
      .then(({token}) => {
        localStorage.setItem('jwt', token)
        localStorage.setItem('email', email)
        authApi.setToken("Bearer " + token)
        handleCheck()
        setIsAuth(true)
        navigate('/')
      })
  }

  function handleCheck() {
    const token = localStorage.getItem('jwt')   
    if (token) {authApi.setToken('Bearer ' + token)
    authApi
    .authUser().then((res) => {
      setEmail(res.email)
      setIsAuth(true)
      navigate('/')
    })}
  }

  function handleLogout() {
    authApi.removeToken()
    localStorage.removeItem('jwt')
    localStorage.removeItem('email')
    setIsAuth(false)
    navigate('/auth')
    handleCheck()
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route element={<PrivateOutlet isAuth={isAuth} />}>
          <Route path="*" element={<HomePage currentUser={currentUser} setCurrentUser={setCurrentUser} onLogout={handleLogout} />} />
        </Route>
        <Route path="/login" element={<Login onLogin={handleLogin} email={email} setEmail={setEmail} />} />
        <Route path="/register" element={<Register />} email={email} setEmail={setEmail} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
