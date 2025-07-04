import { Routes, Route } from "react-router-dom";
import { LoginPage, MainPage, LandingPage, SignUpPage } from "./pages";
import { pathDomain } from "./utilities/pathDomain";

function App() {
  return (
    <div>
      <Routes>
        <Route path={pathDomain.LOGIN} element={<LoginPage />} />
        <Route path={pathDomain.LANDING} element={<LandingPage />} />
        <Route path={pathDomain.SIGNUP} element={<SignUpPage />} />
        <Route path={pathDomain.MAIN} element={<MainPage /> }>
         
        </Route>
        {/* <Route path={pathDomain.FORGOTPASS} element={<ForgotPass />} /> */}
        <Route path={pathDomain.STAR} element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;