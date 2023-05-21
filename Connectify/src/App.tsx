import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './pages/LandingPage';
import SignUpPage from './components/SignUp/SignUp';
import { useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { ref, onValue } from 'firebase/database';
import { database } from './config/firebaseConfig';
import { setUsers } from './features/UsersSlice';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const usersRef = ref(database, 'users');
    onValue(usersRef, (snapshot) => {
      dispatch(setUsers(snapshot.val()));
    });
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
