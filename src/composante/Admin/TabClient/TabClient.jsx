import React ,{useState,useEffect}from "react";
import axios from "axios";
import "./TabClient.css";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function TabClient(){
    const [clients, setClient]= useState([]);
        useEffect(() => {
            // Récupérer les données depuis le serveur
            axios
            .get("http://localhost:3001/clients")
            .then((response) => {
                setClient(response.data); // Met à jour l'état avec les données reçues
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération des clients:", error);
            });
        }, []);

        //async est un mot-clé qu'on utilise pour déclarer une fonction asynchrone.Cela veut dire que cette fonction va attendre des opérations 
        // longues (comme une requête HTTP, un accès à une base de données, etc.) sans bloquer le reste du programme.
        const handleDelete = async (id) => {
            const confirmDelete = window.confirm("Are you sure you want to delete this client?");
            //Si l'utilisateur annule, on arrête l'exécution de la fonction 
            if (!confirmDelete) return;
          
            try {
                const res = await fetch(`http://localhost:3001/clients/${id}`, {
                method: "DELETE",
              });
          
              if (res.ok) {
                //garde tous les clients sauf celui qu’on vient de supprimer (user.id !== id)
                setClient((prev) => prev.filter((user) => user.id !== id));
              } else {
                console.error("Failed to delete user");
              }
            } catch (error) {
              console.error("Error deleting user:", error);
            }
          };
          
    return(
        <div className="DivTableClient">
            <h1 className="Clients">Clients</h1>
            <table className="TableClient">
                <thead>
                    <tr className="trTableClient">
                        <th>UserID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>Email Address</th>
                        <th>Approved</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map(client=>(
                    <tr key={client.id}>
                        <td className="tdTableClient">{client.id}</td>
                        <td className="tdTableClient">{client.first}</td>
                        <td className="tdTableClient">{client.last}</td>
                        <td className="tdTableClient">{client.phone}</td>
                        <td className="tdTableClient">{client.mail}</td>
                        <td className="tdTableClient">{client.approved}</td>
                        <td className="tdTableClient"><Link  className="LinkDeleteClient" onClick={()=> handleDelete(client.id)}><FaTrash/>Delete</Link></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default TabClient;