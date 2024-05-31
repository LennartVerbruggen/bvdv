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

const createGroep = async (groep) => {
    return await fetch(`http://localhost:3000/admin/create/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({groep})
    })


}

const deleteGroep = async (groep) => {
    return await fetch(`http://localhost:3000/admin/delete/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({groep})
    })


}

const AdminService = {
    getAllGroups, setActive, createGroep, deleteGroep
}

export default AdminService