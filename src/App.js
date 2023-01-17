import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateOutlet from './components/PrivateOutlet';
import { CurrentUserContext } from './contexts/CurrentUserContext';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { api } from './utils/Api';

function App() {
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    api.getUserInfo().then((res) => setCurrentUser(res));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route element={<PrivateOutlet isAuth={false} />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
