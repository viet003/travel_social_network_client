import { Routes, Route } from "react-router-dom";
import { LoginPage, HomePage, LandingPage, SignUpPage } from "./pages";
import { ProtectedRoute } from "./components";
import { pathDomain } from "./utilities/pathDomain";

function App() {
  return (
    <div>
      <Routes>
        {/* Public routes - chỉ dành cho guest */}
        <Route 
          path={pathDomain.LOGIN} 
          element={
            <ProtectedRoute requireAuth={false}>
              <LoginPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path={pathDomain.SIGNUP} 
          element={
            <ProtectedRoute requireAuth={false}>
              <SignUpPage />
            </ProtectedRoute>
          } 
        />
        
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
    </div>
  );
}

export default App;