import './App.css';
import StaffReg from './components/hr/staffreg';
import StaffDetails from './components/adminf/staffdet';
import Login from './components/login';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminHome from "./components/adminf/adminhome";
function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/StaffDetails" element={<StaffDetails />} />
        <Route path="/StaffReg" element={<StaffReg />} />
        <Route path="/AdminHome" element={<AdminHome />} />
      </Routes>
      </Router>
    </>
  )
}

export default App
