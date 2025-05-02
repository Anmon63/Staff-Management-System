import {useState } from "react";
import { useNavigate } from "react-router-dom";

const StaffReg = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [role, setRole] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !phone || !position || !joiningDate || !role) {
            alert("Please fill in all fields.");
            return;
        }
        console.log(name, email, phone, position, joiningDate, role);
        const staffData = {
            name: name,
            email: email,
            phone: phone,
            position: position,
            join_date: joiningDate,
            role: role,
        };
        fetch("http://127.0.0.1:8000/staff/api/staff/",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(staffData)
        })
        .then(response => {
            if (response.ok) {
                alert("Staff registered successfully!");
                navigate("");
            } else {
                alert("Error registering staff.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error registering staff.");
        });
    };
    return (
        <div>
            <h1>Staff Registration</h1>
            <form onSubmit={handleSubmit} className="staff-reg-form">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                <br />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <br />
                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <br />
                <label htmlFor="position">Position:</label>
                <input type="text" id="position" name="position" value={position} onChange={(e) => setPosition(e.target.value)} required />
                <br />
                <label htmlFor="joiningDate">Joining Date:</label>
                <input type="date" id="joiningDate" name="joiningDate" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} required />
                <br />
                <label htmlFor="role">Role:</label>
                <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                    <option value="admin">Admin</option>
                    <option value="hr">HR</option>
                    <option value="management">Management</option>
                    <option value="teamlead">Team Lead</option>
                    <option value="staff">Staff</option>
                </select>
                <br />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default StaffReg;