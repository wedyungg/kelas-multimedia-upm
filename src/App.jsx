import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Track from './pages/Track';
import Unit from './pages/Unit';
import Quiz from './pages/Quiz';
import Assignments from './pages/Assignments';
import AssignmentDetail from './pages/AssignmentDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { useGamificationStore } from './store/useGamificationStore';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useGamificationStore(state => state.user.isLoggedIn);
  if (!isLoggedIn) return <Navigate to="/onboarding" />;
  return children;
};

const App = () => {
  const theme = useGamificationStore(state => state.theme);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="track/:trackId" element={
            <ProtectedRoute>
              <Track />
            </ProtectedRoute>
          } />
          <Route path="unit/:unitId" element={
            <ProtectedRoute>
              <Unit />
            </ProtectedRoute>
          } />
          <Route path="quiz/:unitId" element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          } />
          <Route path="assignments" element={
            <ProtectedRoute>
              <Assignments />
            </ProtectedRoute>
          } />
          <Route path="assignment/:assignmentId" element={
            <ProtectedRoute>
              <AssignmentDetail />
            </ProtectedRoute>
          } />
          <Route path="admin/login" element={<AdminLogin />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
