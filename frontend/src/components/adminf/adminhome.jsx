import { useNavigate } from "react-router-dom"; 

function AdminHome() {
  const navigate = useNavigate();

  const getStaff = () => {
    // your logic to fetch staff goes here
    console.log("Fetching staff...");
    navigate("/StaffDetails");
  };
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <table>
        <tr>
          <td><button onClick={getStaff}>Staff Details</button></td>
          <td><button onClick={logout}>Logout</button></td>
        </tr>
      </table>
    </div>
  );
}

export default AdminHome;
