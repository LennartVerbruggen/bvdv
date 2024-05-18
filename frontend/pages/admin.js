import "@/app/globals.css";
import { use, useEffect, useState } from 'react';
import AdminService from "../Services/AdminService"


const Admin = () => {
    const [groepen, setGroepen] = useState([])

    useEffect(() => {
        AdminService.getAllGroups()
            .then(response => response.json())
            .then(data => setGroepen(data))
            .catch((error) => console.error('Error:', error))
    }, []);

    return (
        
        <div className="container mx-auto pt-3 max-w-screen-lg">
            <h1 className="text-2xl">Welkom Jan Van der Vurst</h1>

            <h2 className="py-3 text-xl">Groepen</h2>
            <ul>
                {groepen.map((groep, index) => (
                    <li key={index}>{groep}</li>
                ))}
            </ul>
        </div>
        
    );

};

export default Admin