import './App.css';
import StaffReg from './components/hr/staffreg';
import StaffDetails from './components/adminf/staffdet';
import Login from './components/login';
import HRDetails from './components/adminf/hrdet';
import TeamleadDetails from './components/adminf/teamlead';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminHome from "./components/adminf/adminhome";
import HrHome from "./components/hr/hrhome";
import ManagementHome from "./components/management/managementhome";
function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/HRDetails" element={<HRDetails />} />
        <Route path="/StaffDetails" element={<StaffDetails />} />
        <Route path="/TeamLeadDetails" element={<TeamleadDetails />} />
        <Route path="/StaffReg" element={<StaffReg />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/HRHome" element={<HrHome />} />
        <Route path="/ManagementHome" element={<ManagementHome />} />

      </Routes>
      </Router>
    </>
  )
}

export default App
