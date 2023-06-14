import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../components/LandingPage/LandingPage";
import Layout from "../pages/Layout";
import ChatBox from "../components/ChatBox/ChatBox";
import ErrorPage from "../pages/ErrorPage";
import { useAuth } from "../Hooks/useAuth";

const routes = [
  {
    name: "Home",
    path: "/home",
    element: <Layout />,
  },
  {
    name: "Chat",
    path: "/chat/:chatUserId",
    element: (
      <Layout>
        <ChatBox chatType="individual" />
      </Layout>
    ),
  },
  {
    name: "TeamChat",
    path: "/:teamId/:channelId",
    element: (
      <Layout>
        <ChatBox chatType="team" />
      </Layout>
    ),
  },
  {
    name: "Error",
    path: "*",
    element: <ErrorPage />,
  },
];

const AppRoutes = () => {
  const { loading, currentUser } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or your preferred loading indicator
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              welcomeText="Welcome to the Connectify"
              detailsText="Please sign in or sign up"
            />
          }
        />
        {currentUser ? generateRoutes() : <Route path="*" element={<Navigate replace to="/" />} />}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};


function generateRoutes() {
  return routes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ));
}

export default AppRoutes;
