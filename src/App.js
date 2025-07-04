import { Routes, Route } from "react-router-dom";
import { Login, Main } from "./pages";
import { pathDomain } from "./utilities/pathDomain";

function App() {
  return (
    <div>
      <Routes>
        <Route path={pathDomain.LOGIN} element={<Login />} />
        {/* <Route exact path={pathDomain.} element={<SignUp />} /> */}
        <Route path={pathDomain.MAIN} element={<Main /> }>
         
        </Route>
        {/* <Route path={pathDomain.FORGOTPASS} element={<ForgotPass />} /> */}
        <Route path={pathDomain.STAR} element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;