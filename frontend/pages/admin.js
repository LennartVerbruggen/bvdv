import "@/app/globals.css";
import { use, useEffect, useState } from 'react';
import AdminService from "../Services/AdminService"


const Admin = () => {
    const [groepen, setGroepen] = useState([])
    const [message, setMessage] = useState('')
    const [newGroep, setNewGroep] = useState('');

    const handleGroepClick = async (groep) => {
        console.log(groep)
        const response = await AdminService.setActive(groep)
        const data = await response.json();
        setMessage(data)
    };

    const handleInputChange = (e) => {
        setNewGroep(e.target.value);
    };

    const handleDeleteClick = async (groep) => {
        console.log('Delete groep:', groep);
        // You can also add logic to delete the group if needed

        const response = await AdminService.deleteGroep(newGroep)
        const data = await response.json();
        setMessage(data)

        fetchGroepen();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newGroep);

        const response = await AdminService.createGroep(newGroep)
        const data = await response.json();
        setMessage(data)

        fetchGroepen();
    };

    const fetchGroepen = async () => {
        try {
            const response = await AdminService.getAllGroups();
            const data = await response.json();
            setGroepen(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        fetchGroepen()
    }, []);

    return (
        
        <div className="container mx-auto pt-3 max-w-screen-lg">
            <h1 className="text-2xl">Welkom Jan Van der Vurst</h1>

            {message === '' ? null : <h2 className="text-3xl text-center text-green-600 py-6">{message}</h2>}


            <form onSubmit={handleSubmit} className="py-6">
                <label htmlFor="groep" className="block text-sm font-medium text-gray-700">Groepsnaam:</label>
                <input 
                    type="text" 
                    id="groep" 
                    name="groep" 
                    value={newGroep} 
                    onChange={handleInputChange} 
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                />
                <button type="submit" className="mt-3 p-2 bg-blue-500 text-white rounded-md">Groep aanmaken</button>
            </form>

            <h2 className="py-3 text-xl">Groepen</h2>
            <p>Klik op een groep om ze actief te maken</p>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 border border-gray-400">Groep</th>
                        <th className="py-2 border border-gray-400">Verwijder</th>
                    </tr>
                </thead>
                <tbody>
                    {groepen.map((groep, index) => (
                        <tr 
                            key={index} 
                            className="cursor-pointer hover:bg-gray-100"
                            onClick={() => handleGroepClick(groep)}
                        >
                            <td className="py-2 px-4 border border-gray-200">{groep}</td>
                            <td className="py-2 px-4 border border-gray-200">
                                <img 
                                    src="/delete.png" 
                                    alt="Delete" 
                                    className="h-6 w-6 cursor-pointer mx-auto" 
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent the row click event
                                        handleDeleteClick(groep);
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    );

};

export default Admin