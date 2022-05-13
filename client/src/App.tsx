import {BrowserRouter, Routes, Route} from "react-router-dom"

import { ProtectedRoute } from "./routes/ProtectedRoute";
import Nav from "./components/Nav/Nav"
import Main from "./pages/Main";
import Patient from "./pages/Patient";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";


function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        
        <Route path="/user" element={<ProtectedRoute />}>
          <Route path="/user" element={<User />}></Route>
        </Route>

        <Route path="/patient/:id" element={<ProtectedRoute />}>
          <Route path="/patient/:id" element={<Patient />}></Route>
        </Route>
        
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
