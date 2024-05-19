import "@/app/globals.css";
import { use, useEffect, useState } from 'react';
import AdminService from "../Services/AdminService"


const Admin = () => {
    const [groepen, setGroepen] = useState([])
    const [message, setMessage] = useState('')

    const handleGroepClick = async (groep) => {
        console.log(groep)
        const response = await AdminService.setActive(groep)
        const data = await response.json();
        setMessage(data)
    };

    useEffect(() => {
        AdminService.getAllGroups()
            .then(response => response.json())
            .then(data => setGroepen(data))
            .catch((error) => console.error('Error:', error))
    }, []);

    return (
        
        <div className="container mx-auto pt-3 max-w-screen-lg">
            <h1 className="text-2xl">Welkom Jan Van der Vurst</h1>

            {message === '' ? null : <h2 className="text-3xl text-center text-green-600 py-6">{message}</h2>}


            <h2 className="py-3 text-xl">Groepen</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Groep</th>
                    </tr>
                </thead>
                <tbody>
                    {groepen.map((groep, index) => (
                        <tr 
                            key={index} 
                            className="cursor-pointer hover:bg-gray-100"
                            onClick={() => handleGroepClick(groep)}
                        >
                            <td className="py-2 px-4 border-b border-gray-200">{groep}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    );

};

export default Admin