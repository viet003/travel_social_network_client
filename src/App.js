import { Routes, Route, useLocation } from "react-router-dom";
import { MainPage, LandingPage, UserPage, HomePage, GroupPage, GroupDetailPage } from "./pages";
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
              <MainPage />
            </ProtectedRoute>
          }

        >
          <Route path={pathDomain.HOME} element={<HomePage />} />
          <Route path={pathDomain.USER} element={<ProtectedRoute requireAuth={true} redirectToLanding={false}><UserPage /></ProtectedRoute>} />
          <Route path={pathDomain.GROUP} element={<ProtectedRoute requireAuth={true} redirectToLanding={false}><GroupPage /></ProtectedRoute>} />
          <Route path={pathDomain.GROUP_DETAIL} element={<ProtectedRoute requireAuth={true} redirectToLanding={false}><GroupDetailPage /></ProtectedRoute>} />
        </Route>
        {/* Landing page - cho user chưa authenticate */}
        <Route path={pathDomain.LANDING} element={<ProtectedRoute requireAuth={false} redirectToLanding={false}><LandingPage /></ProtectedRoute>} />
        {/* Catch-all route - redirect dựa trên authentication status */}
        <Route path={pathDomain.STAR} element={<ProtectedRoute requireAuth={true} redirectToLanding={true}><MainPage /></ProtectedRoute>} />
      </Routes>
      <ToastContainer />
    </>
  );
}
export default App;
