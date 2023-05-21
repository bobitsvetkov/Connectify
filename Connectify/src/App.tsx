import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignInPage from './pages/LandingPage';
import SignUpPage from './components/SignUp/SignUp';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signin" />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;