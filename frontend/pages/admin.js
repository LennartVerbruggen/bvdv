import "@/app/globals.css";
import { act, use, useEffect, useState } from 'react';
import AdminService from "../Services/AdminService"
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const Admin = () => {
    const [groepen, setGroepen] = useState([])
    const [message, setMessage] = useState('')
    const [newGroep, setNewGroep] = useState('');
    const [selectedGroep, setSelectedGroep] = useState('');
    const [statsGroep, setStatsGroep] = useState({})
    const [totGroep, setTotGroep] = useState({})

    const handleInputChange = (e) => {
        setNewGroep(e.target.value);
    };

    const handleDeleteClick = async (groep) => {
        console.log('Delete groep:', groep);
        // You can also add logic to delete the group if needed

        const response = await AdminService.deleteGroep(groep)
        const data = await response.json();
        setMessage(data)

        fetchGroepen();
    };

    const handleSelectChange = (e) => {
        setSelectedGroep(e.target.value);
    };

    const handleGenerateStatistics = async () => {
        const response = await AdminService.generateStatistics(selectedGroep)
        const data = await response.json();

        setStatsGroep(data.groep)
        setTotGroep(data.totaal)
    };

    const pieData = statsGroep ? {
        labels: ['Aantal eigen letters verworpen', 'Aantal vreemde letters verworpen'],
        datasets: [{
            data: [statsGroep.Aantal_eigen_letters_verworpen, statsGroep.Aantal_vreemde_letters_verworpen],
            backgroundColor: ['#FF6384', '#36A2EB']
        }]
    } : null;

    const pieTotData = totGroep ? {
        labels: ['Aantal eigen letters verworpen', 'Aantal vreemde letters verworpen'],
        datasets: [{
            data: [totGroep.Aantal_eigen_letters_verworpen, totGroep.Aantal_vreemde_letters_verworpen],
            backgroundColor: ['#FF6384', '#36A2EB']
        }]
    } : null;
    

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
        fetchGroepen();
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
            <div className="py-6 flex items-center">
                <label htmlFor="select-groep" className="block font-medium text-gray-700 mr-4">Selecteer groep:</label>
                <select 
                    id="select-groep" 
                    name="select-groep" 
                    value={selectedGroep} 
                    onChange={handleSelectChange} 
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                >
                    <option value="" disabled>Selecteer een groep</option>
                    {groepen.map((groep, index) => (
                        <option key={index} value={groep}>{groep}</option>
                    ))}
                </select>
                <button 
                    onClick={handleGenerateStatistics} 
                    className="ml-4 p-2 bg-blue-500 text-white rounded-md"
                >
                    Genereer statistieken
                </button>
            </div>
            {statsGroep && (
                <div className="flex flex-row space-x-6">
                    <div className="w-1/2">
                        <Pie data={pieData} />
                    </div>
                    <div className="w-1/2">
                        <h3 className="text-xl font-bold mb-4">{selectedGroep} Details</h3>
                        <table className="min-w-full bg-white">
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 border border-gray-200">Groep</td>
                                    <td className="py-2 px-4 border border-gray-200">{statsGroep.Groep}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border border-gray-200">Aantal deelnemers</td>
                                    <td className="py-2 px-4 border border-gray-200">{statsGroep.Aantal_deelnemers}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border border-gray-200">Aantal letterparen naam</td>
                                    <td className="py-2 px-4 border border-gray-200">{statsGroep.Aantal_letterparen_naam}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border border-gray-200">Aantal letterparen dummy</td>
                                    <td className="py-2 px-4 border border-gray-200">{statsGroep.Aantal_letterparen_dummy}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border border-gray-200">Totaal letterparen</td>
                                    <td className="py-2 px-4 border border-gray-200">{statsGroep.Totaal_letterparen}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border border-gray-200">Aantal eigen letters verworpen</td>
                                    <td className="py-2 px-4 border border-gray-200">{statsGroep.Aantal_eigen_letters_verworpen}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border border-gray-200">Aantal vreemde letters verworpen</td>
                                    <td className="py-2 px-4 border border-gray-200">{statsGroep.Aantal_vreemde_letters_verworpen}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border border-gray-200">Significantie</td>
                                    <td className="py-2 px-4 border border-gray-200">{statsGroep.Significantie}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {totGroep && (
                <div className="pt-3 flex flex-row space-x-6">
                    <div className="w-1/2">
                        <Pie data={pieTotData} />
                    </div>
                    <div className="w-1/2">
                        <h3 className="text-xl font-bold mb-4">{totGroep.Groep} Details</h3>
                        <table className="min-w-full bg-white">
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 border border-gray-200">Groep</td>
                                    <td className="py-2 px-4 border border-gray-200">{totGroep.Groep}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border border-gray-200">Aantal deelnemers</td>
                                    <td className="py-2 px-4 border border-gray-200">{totGroep.Aantal_deelnemers}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border border-gray-200">Aantal letterparen naam</td>
                                    <td className="py-2 px-4 border border-gray-200">{totGroep.Aantal_letterparen_naam}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border border-gray-200">Aantal letterparen dummy</td>
                                    <td className="py-2 px-4 border border-gray-200">{totGroep.Aantal_letterparen_dummy}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border border-gray-200">Totaal letterparen</td>
                                    <td className="py-2 px-4 border border-gray-200">{totGroep.Totaal_letterparen}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border border-gray-200">Aantal eigen letters verworpen</td>
                                    <td className="py-2 px-4 border border-gray-200">{totGroep.Aantal_eigen_letters_verworpen}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border border-gray-200">Aantal vreemde letters verworpen</td>
                                    <td className="py-2 px-4 border border-gray-200">{totGroep.Aantal_vreemde_letters_verworpen}</td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border border-gray-200">Significantie</td>
                                    <td className="py-2 px-4 border border-gray-200">{totGroep.Significantie}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
        
    );

};

export default Admin