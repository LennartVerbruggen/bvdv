import { use, useState } from 'react';
import UserService from "../Services/UserService"

const Registreer = () => {
  let data = Array.from({ length: 10 }, () => [null, null]);
  const [registered, setRegistered] = useState(false)
  const initialClickedState = data.map(() => [false, false]);
  const [clicked, setClicked] = useState(initialClickedState);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [pairs, setPairs] = useState('')
  // Initialize the results array
  const [results, setResults] = useState(Array(10).fill(null));
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

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
    setName(formData['firstName'].concat(" ", formData['lastName']))

    const response = await UserService.register(formData)
    data = await response.json();

    if (data.length === 10){
      setRegistered(true)
      setPairs(data)
    }    

  };

  const sendLetters = async () => {
    const response = await UserService.sendTest(results, name)
    response.json().then((message) => {
      setMessage(message.message)
    })
  }

  return (
    <div className="p-4 mx-auto max-w-md text-black">
      {!registered ? (
        <><h1 className="text-xl font-bold mb-4 text-center">Registreren</h1><form onSubmit={handleSubmit} className="space-y-4">
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
          <div>
            <label className="block mb-1">Wachtwoord:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block mb-1">Bevestig wachtwoord:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Registreer
          </button>
        </form></>
      ) : (
  
        <>
          <h1 className="text-2xl font-bold text-center pb-4">Selecteer de slechte letters</h1>
          {message === '' ? null : <h2 className='font-bold text-center text-xl pb-4 text-green-600'>{message}</h2>}
          {pairs.map((pair, rowIndex) => (
            <div key={rowIndex} className="flex justify-center space-x-4 pb-3">
              {pair.map((letter, buttonIndex) => (
                <button
                key={buttonIndex}
                onClick={() => handleButtonClick(rowIndex, buttonIndex)}
                className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50
                  ${clicked[rowIndex][buttonIndex] ? 'bg-green-500 text-white' : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'}
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