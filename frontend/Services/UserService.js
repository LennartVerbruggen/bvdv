
const register = async (user)=> {
    console.log('Registreren')
    return await fetch(`${process.env.API_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}

const sendTest = async (letters, name) => {
    console.log('Sending test')
    console.log(letters)
    return await fetch(`${process.env.API_URL}/users/test`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({letters, name})
    })
}


const UserService = {
    register, sendTest
}

export default UserService