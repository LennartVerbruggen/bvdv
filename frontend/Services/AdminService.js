const getAllGroups = async () => {
    return await fetch(`http://localhost:3000/admin/groups`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
}

const AdminService = {
    getAllGroups
}

export default AdminService