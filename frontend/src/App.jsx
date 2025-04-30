import './App.css';
import StaffReg from './components/hr/staffreg';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AdminHome from "./components/admin/adminhome";
function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<StaffReg />} />
        <Route path="/AdminHome" element={<AdminHome />} />
      </Routes>
      </Router>
    </>
  )
}

export default App
