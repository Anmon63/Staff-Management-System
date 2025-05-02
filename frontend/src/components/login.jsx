import { useState } from "react";
import axios from "axios";
const Login = () => {
    const [role, setRole] = useState("staff"); // Default role is "staff"
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        console.log(role, username, password);
        try {
            const response = await axios.post("http://localhost:8000/api/login/", {
                username: username,
                password: password,
                role: role,
            });
        console.log("Login response:", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));  // // Optionally store user info in local storage/session
        localStorage.setItem("userRole", response.data.role);

        setRole("staff"); // Reset role to default after login
        setUsername("");
        setPassword("");

        if (response.data.role === "Admin") {
            window.location.href = "/AdminHome";
        }
        else if (response.data.role === "Staff") {
            window.location.href = "/StaffHome";
        }
        else if (response.data.role === "Hr") {
            window.location.href = "/HRHome";
        }
        else if (response.data.role === "Management") {
            window.location.href = "/ManagementHome";
        }
        else if (response.data.role === "Teamlead") {
            window.location.href = "/TeamLeadHome";
        } 
    }catch (error) {
        console.error("Login error:", error);
        alert("Login failed. Please check your credentials.");
    }
    };

    return (
        <>
            <form onSubmit={submit}>
                <h1>Login</h1>
                <label htmlFor="role">Role:</label>
                <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                    <option value="Hr">HR</option>
                    <option value="Management">Management</option>
                    <option value="Teamlead">Team Lead</option>
                </select>
                <br />
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <br />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <br />
                <button type="submit">Login</button>
            </form>
        </>
    );
};

export default Login;