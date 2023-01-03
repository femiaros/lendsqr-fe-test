import RequireAuth from './components/RequireAuth'; //to protect routes
import Layout from "./components/Layout";
import DashLayout from "./components/DashLayout";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import User from "./components/User";
import Missing from "./components/Missing";
import {Routes,Route} from 'react-router-dom';




function App() {

  

  return (
    <Routes>
      <Route path="/" element={<Layout />} >

        {/* public route */}
        <Route index element={<Login />} />

        {/* private routes */}
        <Route element={<RequireAuth />} >

          <Route path="dashboard" element={<DashLayout />} >
              <Route index element={<Dashboard  />} />
          </Route>

          <Route path="user" element={<DashLayout />} >
              <Route path=":id" element={<User  />} />
          </Route>

        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />  

      </Route>
    </Routes>
  );
}

export default App;