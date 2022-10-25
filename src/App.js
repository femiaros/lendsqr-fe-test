import RequireAuth from './components/RequireAuth'; //to protect routes
import Layout from "./components/Layout";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import User from "./components/User";
import Missing from "./components/Missing";
import {Routes,Route} from 'react-router-dom';




function App() {

  

  return (
    <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/" element={<Layout />} >

          {/* public routes */}
          <Route element={<RequireAuth />} >
            <Route path="dashboard" element={<Dashboard  />} />
            <Route path="user/:id" element={<User  />} />
          </Route>


          {/* catch all */}
          <Route path="*" element={<Missing />} />
          
        </Route>
    </Routes>
  );
}

export default App;
//npm i react-video-js-player :to install video player