import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignInPage from "./components/SignIn/SignIn";
import SignUpPage from "./components/SignUp/SignUp";
import AppRoutes from "./Routing/AppRoutes";
function App() {
  return <AppRoutes />;
}

export default App;
