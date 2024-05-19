const getAllGroups = async () => {
    return await fetch(`http://localhost:3000/admin/groups`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

const setActive = async (groep) => {
    return await fetch(`http://localhost:3000/admin/active/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({groep})
    })

}

const AdminService = {
    getAllGroups, setActive
}

export default AdminService