import { useState, useEffect } from 'react';
import UserService from "../Services/UserService"


const Register = ({ onTestSubmit }) => {
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
  const [completionMessage, setCompletionMessage] = useState('')
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
    console.log(results)
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
    // If one of the elements in results is null, stop the method and set a message
    if (results.includes(null)) {
      setMessage('For each pair select one letter before submitting');
      return;
    } 
    if (!completed) {
      const response = await UserService.sendTest(results, nameLetters, selectedGroup)
      response.json().then((message) => {
        console.log(message.message)
      })
      handleTestSubmit()
      setCompleted(true)
    }
  };

  const fetchGroups = async () => {
    const response = await UserService.getAllGroups()
    const data = await response.json()
    console.log(data)
    // Remove the first element of the list - total group
    data.shift()

    setGroups(data)
  }

  useEffect(() => {
    fetchGroups()
  }, []);


  const handleTestSubmit = () => {
    
    setCompletionMessage('The test has been successfully completed. Thank you. You can close this window.')

    // Clear the message after 3 seconds
    // setTimeout(() => {
    //     setCompletionMessage('');
    // }, 8000);
  };


  return (
    <div className="p-4 mx-auto max-w-md text-black">
      {!registered ? (
        <>
        <p className="pt-5 text-center text-2xl font-semibold">Welcome</p>
        <p className="pt-5 text-center"> In preparation for the next session, please complete the task below.<br/> Together with the registration, this will take no more than 2 minutes.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="group-select" className="block text-sm font-medium text-gray-700">Select a group:</label>
            <select
                id="group-select"
                name="group"
                value={selectedGroup}
                onChange={handleSelectChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            >
                <option value="" disabled>-- Select a group --</option>
                {groups.map((group, index) => (
                    <option key={index} value={group}>{group}</option>
                ))}
            </select>
        </div>        
        <div>
          <label className="block mb-1">First name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
        </div>
        <div>
          <label className="block mb-1">Last name:</label>
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
          Start
        </button>
      </form>
      <p className="text-gray-400 pt-3 text-center">Your data are not being saved. This form is for demonstration purposes only.</p>
      </>
  
      ) : (
        
        <>
          <h1 className="text-2xl font-bold text-center pb-4">Letter pairs: select the "bad" letters</h1>
          
          <p className='pb-8 text-center'>Below you find a sequence of two letters.<br/> For each pair, click on the letter that, for whatever reason, you like the <span className="text-red-600 font-bold">LEAST</span> of the two. Be quick.<br/> We will discuss the results during the training.</p>
          {message === '' ? null : <h2 className="text-3xl text-center text-red-600 py-6">{message}</h2>}
          {completionMessage === '' ? null : <h2 className="text-xl text-center text-green-600 py-4">{completionMessage}</h2>}
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
              Send</button>
        </>
      )}
    </div>
  );
};

export default Register;