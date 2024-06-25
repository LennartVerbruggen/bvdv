import { use, useState, useEffect } from 'react';
import UserService from "../Services/UserService"

const Registreer = ({ onTestSubmit }) => {
  let data = Array.from({ length: 10 }, () => [null, null]);
  const [registered, setRegistered] = useState(false)
  const initialClickedState = data.map(() => [false, false]);
  const [clicked, setClicked] = useState(initialClickedState);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [pairs, setPairs] = useState('')
  // Initialize the results array
  const [results, setResults] = useState(Array(10).fill(null));
  const [nameLetters, setNameLetters] = useState([])
  const [message, setMessage] = useState('')
  const [completed, setCompleted] = useState(false)

  const [selectedGroup, setSelectedGroep] = useState('')
  const [groups, setGroups] = useState([])

  const handleSelectChange = (e) => {
    const selectedGroup = e.target.value;
    setSelectedGroep(selectedGroup);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle button click
  const handleButtonClick = (rowIndex, buttonIndex) => {
    const newClickedState = clicked.map((row, i) => 
      i === rowIndex ? row.map((_, j) => j === buttonIndex) : row
    );
    setClicked(newClickedState);

    // Update the results array with the clicked letter
    const newResults = [...results];
    newResults[rowIndex] = pairs[rowIndex][buttonIndex];
    setResults(newResults);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation and submission logic here
    console.log(formData);

    const response = await UserService.register(formData)
    data = await response.json();

    let dataPairs = data.pairs
    let dataNameLetters = data.nameLetters
    if (dataPairs.length === 10){
      setRegistered(true)
      setPairs(dataPairs)
      setNameLetters(dataNameLetters)
    }    

  };

  const sendLetters = async () => {
    if (!completed) {
      const response = await UserService.sendTest(results, nameLetters, selectedGroup)
      console.log('fail')
      response.json().then((message) => {
        setMessage(message.message)
      })
      onTestSubmit();
      setCompleted(true)
    }
  };

  const fetchGroups = async () => {
    const response = await UserService.getAllGroups()
    const data = await response.json()
    setGroups(data)
  }
  
  useEffect(() => {
    fetchGroups()
  }, []);

  return (
    <div className="p-4 mx-auto max-w-md text-black">
      {!registered ? (
        <><h1 className="text-xl font-bold mb-4 text-center">Lettercombinaties</h1><form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="group-select" className="block text-sm font-medium text-gray-700">Selecteer een groep:</label>
            <select
                id="group-select"
                name="group"
                value={selectedGroup}
                onChange={handleSelectChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
                <option value="" disabled>-- Selecteer je groep --</option>
                {groups.map((group, index) => (
                    <option key={index} value={group}>{group}</option>
                ))}
            </select>
          </div> 
          <div>
            <label className="block mb-1">Voornaam:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block mb-1">Achternaam:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          </div>
            <div>
              <label className="block mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
            </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Beginnen
          </button>
        </form>
        <p className="text-gray-400 pt-3 text-center">Uw gegevens worden niet opgeslagen. Dit formulier wordt enkel gebruikt voor deze training.</p></>
      ) : (
  
        <>
          <h1 className="text-2xl font-bold text-center pb-4">Selecteer de slechte letters</h1>
          <p className='pb-8 text-center'>Hier vind je een reeks van telkens twee letters.<br/>
                                          Klik van elk paar de letter aan die je om welke reden dan ook het MINST aanspreekt? Deze kleurt rood.<br/>
                                          Werk snel. We bespreken dit verder tijdens de training.</p>
          {pairs.map((pair, rowIndex) => (
            <div key={rowIndex} className="flex justify-center space-x-4 pb-3">
              {pair.map((letter, buttonIndex) => (
                <button
                key={buttonIndex}
                onClick={() => handleButtonClick(rowIndex, buttonIndex)}
                className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50
                  ${clicked[rowIndex][buttonIndex] ? 'bg-red-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'}
                `}
              >
                  {letter}
                </button>
              ))}
            </div>
          ))}
          <button type="submit"
            className="w-full mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={() => sendLetters()}>
              Versturen</button>
        </>
      )}
      
    </div>
  );
};

export default Registreer;