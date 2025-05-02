import { useNavigate } from "react-router-dom"; 

function StaffHome() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <table>
        <tr>
          <td><button onClick={logout}>Logout</button></td>
        </tr>
      </table>
    </div>
  );
}

export default StaffHome;
