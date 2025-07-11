import { Routes, Route, useLocation } from "react-router-dom";
import { LoginPage, HomePage, LandingPage, SignUpPage } from "./pages";
import { ProtectedRoute } from "./components";
import { pathDomain } from "./utilities/pathDomain";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const location = useLocation();
  // Nếu có state.background thì dùng nó làm background cho modal
  const state = location.state;
  return (
    <>
      <Routes location={state && state.background ? state.background : location}>
        {/* Route chính - kiểm tra authentication */}
        <Route 
          path={pathDomain.HOME} 
          element={
            <ProtectedRoute requireAuth={true}>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        {/* Landing page - cho user chưa authenticate */}
        <Route path={pathDomain.LANDING} element={<LandingPage />} />
        {/* Catch-all route - redirect dựa trên authentication status */}
        <Route path={pathDomain.STAR} element={<ProtectedRoute requireAuth={true} redirectToLanding={true}><HomePage /></ProtectedRoute>} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;