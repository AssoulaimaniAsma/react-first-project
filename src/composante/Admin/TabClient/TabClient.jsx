import React ,{useState,useEffect}from "react";
import "./TabClient.css";
import { FaTrash } from "react-icons/fa";
import { Link,useNavigate } from "react-router-dom";

function TabClient(){
    const [clients, setClient]= useState([]);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery]=useState("");
    const [username, setUsername] = useState("");
    const [profileImg,setProfileImg]=useState("");
    const [phone,setPhone]=useState("");
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [status,setStatus]=useState("");
    useEffect(() => {
        const fetchClients = async () => {
            const token = localStorage.getItem("authToken");
    
            if (!token) return navigate("/admin/login");
    
            try {
                const res = await fetch(`http://localhost:8080/admin/users/`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
    
                if (res.ok) {
                    const data = await res.json();
                    console.log("clients Data", data);
                    setClient(data);
                } else {
                    const errorData = await res.json();
                    console.error("Erreur server :", errorData);
                }
            } catch (error) {
                console.error("erreur reseau ou parsing", error);
            }
        };
    
        fetchClients();
    }, [navigate]);
    


    

            // Handle search input change
            const handleSearch = (e) => {
                setSearchQuery(e.target.value);
            };

              // Filter clients based on the search query, with safeguards for undefined values
            const filteredClients = clients.filter((client) =>
                (client.firstName ? client.firstName.toLowerCase() : "")
                .includes(searchQuery.toLowerCase()) ||
                (client.lastName ? client.lastName.toLowerCase() : "")
                .includes(searchQuery.toLowerCase()) ||
                (client.email ? client.email.toLowerCase() : "")
                .includes(searchQuery.toLowerCase()) ||
                (client.phone ? client.phone.toLowerCase() : "")
                .includes(searchQuery.toLowerCase()) ||
                (client.username ? client.username.toLowerCase() : "")
                .includes(searchQuery.toLowerCase()) ||
                (client.staus ? client.status.toLowerCase() : "")
                .includes(searchQuery.toLowerCase())
            );

            const handleDelete = async (userId) => {
                const confirmDelete = window.confirm("Are you sure you want to delete this client?");
                if (!confirmDelete) return;

                try {
                const res = await fetch(`http://localhost:8080/admin/users/${userId}`, {
                    method: "DELETE",
                });

                if (res.ok) {
                    setClient((prev) => prev.filter((client) => client.id !== userId));
                } else {
                    const errorText=await res.text();
                    console.error("Failed to delete user",errorText);
                }
                } catch (error) {
                console.error("Error deleting user:", error);
                }
            };
            const handleBan = async (userId) => {
                const token = localStorage.getItem("authToken")
            };


    return(
        <div className="DivTableClient">
            <input 
                type="text" 
                placeholder="Search For Client" 
                value={searchQuery}
                onChange={handleSearch} 
                className="searchBar"
            />
            <h1 className="Clients">Clients</h1>
            <table className="TableClient">
                <thead>
                    <tr className="trTableClient">
                        <th>UserID</th>
                        <th>Profile Image</th>
                        <th>User Name</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {filteredClients.map((client) => (
                        <tr key={client.id}>
                            <td className="tdTableClient">{client.id}</td>
                            <td className="tdTableClient">
                                <img
                                    src={client.profileImg}
                                    alt="Profile"
                                    style={{ width: "40px", borderRadius: "50%" }}
                                />
                            </td>
                            <td className="tdTableClient">{client.username}</td>
                            <td className="tdTableClient">{client.firstName}</td>
                            <td className="tdTableClient">{client.lastName}</td>
                            <td className="tdTableClient">{client.phone}</td>
                            <td className="tdTableClient">{client.email}</td>
                            <td className="tdTableClient">{client.status}</td>
                            <td className="tdTableClient">
                                <Link
                                    className="LinkDeleteClient"
                                    onClick={() => handleDelete(client.id)}
                                >
                                    <FaTrash /> Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default TabClient;