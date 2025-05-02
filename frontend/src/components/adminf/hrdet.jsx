import { useState} from "react";
import axios from "axios";

function StaffDetails() {
    const [staff, setStaff] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // for search


  const getStaff = () => {
    axios.get('http://localhost:8000/staff/api/staffdet/')
    .then(res=>{
        const filtered = res.data.filter(item => item.role === "hr")
        setStaff(filtered)
        console.log("Filtered Staff Data:", filtered)
        })
    .catch(err=>console.error(err))
};
const handleEdit = (id) => {
    const staffMember = staff.find(item => item.id === id);
    setSelectedStaff(staffMember);
    setNewPassword(staffMember.password || "");
    setShowPopup(true);
};
const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedStaff(null);
    setNewPassword("");
};
const handlePasswordUpdate = () => {
    axios.patch(`http://localhost:8000/staff/api/staffdet/${selectedStaff.id}/`,{
        password: newPassword,
    })
    .then(res => {
        alert("Password updated successfully!");
        handlePopupClose();
        getStaff();
    })
    .catch(err => {
        console.error("Update error:", err.response?.data || err.message);
        alert("Error updating password.");
    });
};

const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this HR member?");
    if (confirmDelete) {
        axios.delete(`http://localhost:8000/staff/api/staffdet/${id}/`)
            .then(() => {
                alert("HR member deleted successfully.");
                getStaff(); // Refresh the table
            })
            .catch(err => {
                console.error("Delete error:", err);
                alert("Error deleting hr member.");
            });
    }
};
return (
    <>
    <div className="bg2">
        <h2>HR Details</h2>
        <div style={{ marginBottom: "10px" }}>
            <label htmlFor="search">Search:</label>
            <input type="text" placeholder="Search by name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                padding: "8px",
                width: "200px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                }}
            />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Position</th>
                        <th>Join Date</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {staff
                    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.position}</td>
                            <td>{item.join_date}</td>
                            <td>{item.username}</td>
                            <td>{item.password}</td>
                            <td>
                                <button onClick={() => handleEdit(item.id)}>Edit Password</button>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={getStaff}>Get Staff Details</button>
        </div>
        {showPopup && (
                <div className="popup" style={{
                    position: "fixed",
                    top: "50%", left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "#fff",
                    padding: "20px",
                    border: "1px solid #ccc",
                    zIndex: 1000
                }}>
                    <h3>Edit Password for {selectedStaff.name}</h3>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                    />
                    <br />
                    <button onClick={handlePasswordUpdate}>Update</button>
                    <button onClick={handlePopupClose}>Cancel</button>
                </div>
            )}
    </>
);
}
export default StaffDetails;