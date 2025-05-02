import { useNavigate } from "react-router-dom"; 

function HrHome() {
  const navigate = useNavigate();

  const staffReg = () => {
    // your logic to register staff goes here
    console.log("Registering staff...");
    navigate("/StaffReg");
  };
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <table>
        <tr>
          <td><button onClick={staffReg}>Staff Registration</button></td>
            <td><button onClick={() => navigate("/StaffDetails")}>Staff Details</button></td>
          <td><button onClick={logout}>Logout</button></td>
        </tr>
      </table>
    </div>
  );
}

export default HrHome;
