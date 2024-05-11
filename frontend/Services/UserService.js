
const register = async (user)=> {
    console.log('registering')
    return await fetch(`http://localhost:3001/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}


const UserService = {
    register
}

export default UserService