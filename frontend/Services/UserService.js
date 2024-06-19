const getAllGroups = async () => {
    return await fetch(`${process.env.API_URL}/admin/groups`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}



const register = async (user)=> {
    return await fetch(`${process.env.API_URL}/users/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
}

const sendTest = async (letters, name, selectedGroup) => {
    console.log('Sending test')
    return await fetch(`${process.env.API_URL}/users/test`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({letters, name, selectedGroup})
    })
}


const UserService = {
    register, sendTest, getAllGroups
}

export default UserService