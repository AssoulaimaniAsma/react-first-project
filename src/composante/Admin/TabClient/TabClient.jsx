import React ,{useState,useEffect}from "react";
import axios from "axios";
import "./TabClient.css";

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
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default TabClient;